import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@/lib/supabase/server"
import { computeSavings, formatEUR, getScoreLabel } from "@/lib/savings"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Jeconomisemonenergie.eu <onboarding@resend.dev>"
const LEADS_EMAIL = process.env.LEADS_NOTIFICATION_EMAIL || "contactenergie@izyfirstcontact.fr"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+]?[\d\s().-]{8,}$/
const POSTAL_RE = /^\d{4}$/

function clean(value: unknown): string {
  return String(value ?? "").trim()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const firstName = clean(body?.firstName)
    const lastName = clean(body?.lastName)
    const email = clean(body?.email).toLowerCase()
    const phone = clean(body?.phone)
    const street = clean(body?.street)
    const streetNumber = clean(body?.streetNumber)
    const postalCode = clean(body?.postalCode)
    const birthDate = clean(body?.birthDate)
    const currentSupplier = clean(body?.currentSupplier)
    const meterType = clean(body?.meterType)
    const formula = clean(body?.formula)
    const exclusiveNightMeter = body?.exclusiveNightMeter === true
    const monthlyBill = Number(body?.monthlyBill)
    const referralCode = clean(body?.referralCode)

    // Validation serveur
    if (!firstName || !lastName) {
      return NextResponse.json({ error: "Nom et prénom requis." }, { status: 400 })
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 })
    }
    if (!PHONE_RE.test(phone)) {
      return NextResponse.json({ error: "Numéro de téléphone invalide." }, { status: 400 })
    }
    if (!street || !streetNumber) {
      return NextResponse.json({ error: "Adresse de rue requise." }, { status: 400 })
    }
    if (!POSTAL_RE.test(postalCode)) {
      return NextResponse.json({ error: "Code postal invalide." }, { status: 400 })
    }
    if (!birthDate || Number.isNaN(new Date(birthDate).getTime())) {
      return NextResponse.json({ error: "Date de naissance invalide." }, { status: 400 })
    }
    if (!Number.isFinite(monthlyBill) || monthlyBill <= 0) {
      return NextResponse.json({ error: "Facture mensuelle invalide." }, { status: 400 })
    }
    if (!currentSupplier) {
      return NextResponse.json({ error: "Fournisseur requis." }, { status: 400 })
    }
    if (!meterType) {
      return NextResponse.json({ error: "Type de compteur requis." }, { status: 400 })
    }
    if (!formula) {
      return NextResponse.json({ error: "Formule requise." }, { status: 400 })
    }

    const estimate = computeSavings(monthlyBill)

    // 1) Enregistrement du lead dans Supabase (best-effort)
    let stored = false
    try {
      const supabase = await createClient()
      const { error: dbError } = await supabase.from("leads").insert({
        prenom: firstName,
        nom: lastName,
        email,
        telephone: phone,
        rue: street,
        numero_rue: streetNumber,
        code_postal: postalCode,
        date_naissance: birthDate,
        fournisseur_actuel: currentSupplier,
        type_compteur: meterType,
        formule: formula,
        compteur_exclusif_nuit: exclusiveNightMeter,
        mensualite: Math.round(monthlyBill),
        facture_mensuelle: Math.round(monthlyBill),
        economie_estimee: Math.round(estimate.yearlySavings),
      })
      if (dbError) {
        console.log("[v0] Erreur insertion lead Supabase:", dbError.message)
      } else {
        stored = true
      }
    } catch (dbErr) {
      console.log("[v0] Exception insertion lead Supabase:", dbErr)
    }

    // 2) Envoi des e-mails (notification admin + récap visiteur)
    let emailed = false
    if (resend) {
      const lead = {
        firstName,
        lastName,
        email,
        phone,
        street,
        streetNumber,
        postalCode,
        birthDate,
        currentSupplier,
        meterType,
        formula,
        exclusiveNightMeter,
      }

      // Notification interne (nouveau lead)
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: LEADS_EMAIL,
          replyTo: email,
          subject: `Nouveau lead : ${firstName} ${lastName} (${estimate.score}/100)`,
          html: buildLeadEmailHtml({ lead, estimate }),
        })
      } catch (notifyErr) {
        console.log("[v0] Erreur notification lead:", notifyErr)
      }

      // Récapitulatif au visiteur
      try {
        const { error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: `Votre score d'économies : ${estimate.score}/100`,
          html: buildVisitorEmailHtml({ estimate, referralCode }),
        })
        emailed = !error
        if (error) console.log("[v0] Erreur Resend visiteur:", error)
      } catch (visitorErr) {
        console.log("[v0] Exception Resend visiteur:", visitorErr)
      }
    } else {
      console.log("[v0] RESEND_API_KEY manquant — e-mails non envoyés.")
    }

    return NextResponse.json({ success: true, stored, emailed, estimate })
  } catch (error) {
    console.log("[v0] Erreur API lead:", error)
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 })
  }
}

function buildLeadEmailHtml({
  lead,
  estimate,
}: {
  lead: {
    firstName: string
    lastName: string
    email: string
    phone: string
    street: string
    streetNumber: string
    postalCode: string
    birthDate: string
    currentSupplier: string
    meterType: string
    formula: string
    exclusiveNightMeter: boolean
  }
  estimate: ReturnType<typeof computeSavings>
}): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 0;color:#475569;">${label}</td><td style="text-align:right;font-weight:600;color:#0f172a;">${value}</td></tr>`

  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f1f5f4;padding:32px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
      <div style="background:#0f172a;padding:24px 32px;color:#ffffff;">
        <h1 style="margin:0;font-size:18px;">Nouveau lead — Jeconomisemonenergie.eu</h1>
      </div>
      <div style="padding:28px 32px;">
        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          ${row("Prénom", lead.firstName)}
          ${row("Nom", lead.lastName)}
          ${row("E-mail", lead.email)}
          ${row("Téléphone", lead.phone)}
          ${row("Adresse", `${lead.street} ${lead.streetNumber}`)}
          ${row("Code postal", lead.postalCode)}
          ${row("Date de naissance", lead.birthDate)}
          ${row("Fournisseur actuel", lead.currentSupplier)}
          ${row("Type de compteur", lead.meterType)}
          ${row("Formule", lead.formula)}
          ${row("Compteur exclusif nuit", lead.exclusiveNightMeter ? "Oui" : "Non")}
          ${row("Acompte mensuel", `${formatEUR(estimate.monthlyBill)}/mois`)}
          ${row("Économie estimée", `${formatEUR(estimate.yearlySavings)}/an`)}
          ${row("Score", `${estimate.score}/100 — ${getScoreLabel(estimate.score)}`)}
        </table>
      </div>
    </div>
  </div>`
}

function buildVisitorEmailHtml({
  estimate,
  referralCode,
}: {
  estimate: ReturnType<typeof computeSavings>
  referralCode: string
}): string {
  const referralLine = referralCode
    ? `<p style="margin:24px 0 0;font-size:14px;color:#475569;">Parrainez vos proches avec votre code <strong>${referralCode}</strong> et aidez-les à économiser eux aussi.</p>`
    : ""

  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f1f5f4;padding:32px;">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
      <div style="background:#16a34a;padding:28px 32px;color:#ffffff;">
        <h1 style="margin:0;font-size:20px;">Votre potentiel d'économies</h1>
        <p style="margin:8px 0 0;opacity:.9;font-size:14px;">${getScoreLabel(estimate.score)}</p>
      </div>
      <div style="padding:32px;">
        <div style="text-align:center;margin-bottom:24px;">
          <div style="font-size:48px;font-weight:800;color:#16a34a;line-height:1;">${estimate.score}<span style="font-size:20px;color:#94a3b8;">/100</span></div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:15px;color:#0f172a;">
          <tr><td style="padding:8px 0;color:#475569;">Facture actuelle</td><td style="text-align:right;font-weight:600;">${formatEUR(estimate.monthlyBill)}/mois</td></tr>
          <tr><td style="padding:8px 0;color:#475569;">Facture optimisée</td><td style="text-align:right;font-weight:600;color:#16a34a;">${formatEUR(estimate.newMonthlyBill)}/mois</td></tr>
          <tr><td style="padding:8px 0;color:#475569;">Économie estimée</td><td style="text-align:right;font-weight:800;color:#16a34a;">${formatEUR(estimate.yearlySavings)}/an</td></tr>
        </table>
        <a href="https://jeconomisemonenergie.eu/#formulaire" style="display:block;margin-top:28px;background:#16a34a;color:#ffffff;text-decoration:none;text-align:center;padding:14px;border-radius:12px;font-weight:600;">Finaliser mon analyse gratuite</a>
        ${referralLine}
        <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;">Estimation indicative basée sur votre facture mensuelle. Sans engagement.</p>
      </div>
    </div>
  </div>`
}
