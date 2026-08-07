import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const POSTAL_CODE_RE = /^\d{4}$/

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

function booleanValue(value: unknown): boolean {
  return value === true || value === "true"
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const type_client = clean(body?.type_client)
    const type_logement = clean(body?.type_logement)
    const code_postal = clean(body?.code_postal)
    const nom = clean(body?.nom)
    const prenom = clean(body?.prenom)
    const email = clean(body?.email).toLowerCase()
    const telephone = clean(body?.telephone)
    const mensualite = Number(body?.mensualite)

    if (!type_client || !type_logement || !nom || !prenom || !telephone) {
      return NextResponse.json({ error: "Les informations obligatoires sont incomplètes." }, { status: 400 })
    }
    if (!POSTAL_CODE_RE.test(code_postal)) {
      return NextResponse.json({ error: "Le code postal est invalide." }, { status: 400 })
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "L'adresse e-mail est invalide." }, { status: 400 })
    }
    if (!Number.isFinite(mensualite) || mensualite <= 0) {
      return NextResponse.json({ error: "La mensualité est invalide." }, { status: 400 })
    }

    const forwardedFor = request.headers.get("x-forwarded-for")
    const ip_address = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
    const user_agent = request.headers.get("user-agent") || "unknown"
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("leads")
      .insert({
        type_client,
        type_logement,
        code_postal,
        mensualite: Math.round(mensualite),
        nom,
        prenom,
        email,
        telephone,
        consent_cookies: booleanValue(body?.consent_cookies),
        consent_analytics: booleanValue(body?.consent_analytics),
        consent_date: new Date().toISOString(),
        ip_address,
        user_agent,
      })
      .select("consent_id")
      .single()

    if (error) {
      console.error("[v0] Erreur Supabase lors de l'enregistrement du lead:", error.message)
      return NextResponse.json({ error: "Impossible d'enregistrer votre demande." }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      consent_id: data?.consent_id ?? null,
      message: "Vos informations ont été enregistrées avec succès",
    })
  } catch (error) {
    console.error("[v0] Erreur API leads:", error)
    return NextResponse.json({ error: "Erreur serveur. Veuillez réessayer." }, { status: 500 })
  }
}
