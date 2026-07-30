import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import crypto from 'crypto'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Verify webhook signature (HMAC SHA256)
function verifyWebhookSignature(payload: string, signature: string): boolean {
  const secret = process.env.WEBHOOK_SECRET || 'default-secret'
  const hash = crypto.createHmac('sha256', secret).update(payload).digest('hex')
  return hash === signature
}

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-webhook-signature') || ''

    // Verify signature
    if (!verifyWebhookSignature(body, signature)) {
      console.warn('[v0] Invalid webhook signature')
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const payload = JSON.parse(body)
    const { supplier, offer_id, offer_type, regions, new_price, old_price, timestamp } = payload

    console.log(`[v0] Webhook received: ${supplier} - Offer ${offer_id} price update`)

    const supabase = await createClient()

    // Update offer price in database
    const { error: updateError } = await supabase
      .from('offres_tarifaires')
      .update({
        prix_kwh_hp: new_price,
        updated_at: new Date().toISOString(),
      })
      .eq('id', offer_id)

    if (updateError) throw updateError

    // Find all matching price alerts
    const { data: alerts, error: alertsError } = await supabase
      .from('price_alerts')
      .select(
        `
        id,
        user_id,
        alert_name,
        max_price,
        min_price,
        is_active,
        users:user_id (email)
      `
      )
      .eq('is_active', true)
      .eq('offer_type', offer_type)
      .lt('max_price', new_price)

    if (alertsError) throw alertsError

    // Send emails to matching users
    let emailsSent = 0
    for (const alert of alerts || []) {
      // Only send if price decreased significantly (more than 5%)
      if (old_price && new_price < old_price * 0.95) {
        const savings = (old_price - new_price).toFixed(2)

        const userEmail = Array.isArray(alert.users) 
          ? (alert.users[0] as any)?.email 
          : (alert.users as any)?.email
        if (!userEmail) continue

        // Send email if Resend is configured
        if (resend) {
          await resend.emails.send({
            from: 'alerts@jeconomisemonenergie.eu',
            to: userEmail,
            subject: `Prix baissé! ${supplier} - ${savings}€/mois d'économies`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #22c55e;">✓ Prix baissé!</h2>
              <p><strong>${supplier}</strong> a baissé ses prix!</p>
              
              <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
                <p style="font-size: 14px; color: #666; margin: 0;">Ancien prix</p>
                <p style="font-size: 14px; color: #666; margin: 4px 0;">€${old_price}/mois</p>
                
                <p style="font-size: 24px; color: #22c55e; margin: 16px 0;">€${new_price}/mois</p>
                
                <p style="color: #22c55e; font-weight: bold;">
                  Économies: €${savings}/mois
                </p>
              </div>
              
              <p>
                <a href="https://jeconomisemonenergie.eu/dashboard#alertes" 
                   style="background-color: #22c55e; color: white; padding: 10px 20px; 
                          text-decoration: none; border-radius: 4px; display: inline-block;">
                  Voir les offres
                </a>
              </p>
            </div>
          `,
          })
          emailsSent++
        }
      }
    }

    // Log webhook event
    const { error: logError } = await supabase
      .from('webhook_logs')
      .insert({
        source: 'price_update',
        supplier,
        offer_id,
        old_price,
        new_price,
        alerts_triggered: emailsSent,
        payload,
      })

    if (logError) console.warn('[v0] Failed to log webhook:', logError)

    return new Response(
      JSON.stringify({
        success: true,
        message: `Price updated for ${supplier}`,
        alerts_triggered: emailsSent,
        timestamp: new Date().toISOString(),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('[v0] Webhook error:', error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
