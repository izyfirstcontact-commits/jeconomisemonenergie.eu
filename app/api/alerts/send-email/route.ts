import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// POST - Send price alert email
export async function POST(request: NextRequest) {
  try {
    const { alertId, userEmail, alertName, newPrice, supplier, savings } = await request.json()

    if (!alertId || !userEmail || !alertName || !newPrice || !supplier) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Send email via Resend
    const emailResult = await resend.emails.send({
      from: 'alerts@jeconomisemonenergie.eu',
      to: userEmail,
      subject: `🔔 Alerte: Nouvelle offre disponible pour ${alertName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00C896;">Alerte de prix activée!</h2>
          <p>Bonjour,</p>
          <p>Une offre correspondant à votre alerte <strong>${alertName}</strong> vient d'être trouvée:</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">${supplier}</h3>
            <p style="font-size: 24px; color: #00C896; margin: 10px 0;">
              <strong>${newPrice} EUR/mois</strong>
            </p>
            ${savings ? `
              <p style="color: #666;">
                Économies potentielles: <strong style="color: #00C896;">${savings} EUR/an</strong>
              </p>
            ` : ''}
          </div>
          
          <p>
            <a href="https://jeconomisemonenergie.eu/dashboard" 
               style="display: inline-block; background-color: #00C896; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              Voir mes alertes
            </a>
          </p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 12px; color: #999;">
            Vous recevez cet email car vous avez une alerte active sur Jeconomisemonenergie.eu.
            <br>
            <a href="https://jeconomisemonenergie.eu/dashboard/settings" style="color: #00C896; text-decoration: none;">
              Gérer mes préférences d'alertes
            </a>
          </p>
        </div>
      `,
    })

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    // Update last_triggered_at in database
    const supabase = await createClient()
    const { error: updateError } = await supabase
      .from('price_alerts')
      .update({ last_triggered_at: new Date().toISOString() })
      .eq('id', alertId)

    if (updateError) {
      console.error('Update error:', updateError)
    }

    return NextResponse.json({ 
      success: true, 
      emailId: emailResult.data?.id 
    })
  } catch (error) {
    console.error('POST /api/alerts/send-email error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
