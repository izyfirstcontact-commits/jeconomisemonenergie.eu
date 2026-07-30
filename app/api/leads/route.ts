import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      type_client,
      type_logement,
      code_postal,
      mensualite,
      nom,
      prenom,
      email,
      telephone,
      consent_cookies,
      consent_analytics,
    } = body

    // Récupérer les infos du client
    const ip_address = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const user_agent = request.headers.get("user-agent") || "unknown"

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("leads")
      .insert({
        type_client,
        type_logement,
        code_postal,
        mensualite,
        nom,
        prenom,
        email,
        telephone,
        consent_cookies: consent_cookies ?? false,
        consent_analytics: consent_analytics ?? false,
        consent_date: new Date().toISOString(),
        ip_address,
        user_agent,
      })
      .select("consent_id")
      .single()

    if (error) {
      console.error("Erreur Supabase:", error)
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      consent_id: data.consent_id,
      message: "Vos informations ont été enregistrées avec succès",
    })
  } catch (error) {
    console.error("Erreur API:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
