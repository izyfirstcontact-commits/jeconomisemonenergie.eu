import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function triggerPriceAlerts() {
  const supabase = await createClient()

  try {
    // Fetch all active price alerts
    const { data: alerts, error: alertsError } = await supabase
      .from('price_alerts')
      .select(
        `
        id,
        user_id,
        alert_name,
        offer_type,
        max_price,
        min_price,
        regions,
        is_active,
        last_triggered_at,
        users:user_id (email)
      `
      )
      .eq('is_active', true)
      .not('last_triggered_at', 'is', null)
      .lt('last_triggered_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    if (alertsError) throw alertsError
    if (!alerts || alerts.length === 0) {
      console.log('[v0] No active price alerts to trigger')
      return { success: true, triggered: 0 }
    }

    let triggered = 0
    const errors: string[] = []

    for (const alert of alerts) {
      try {
        // Simulate fetching matching offers from API
        const matchingOffers = await getMatchingOffers(alert)

        if (matchingOffers.length > 0) {
          // Send email notification
          const bestOffer = matchingOffers[0]
          const savings = alert.max_price - bestOffer.price

          const userEmail = Array.isArray(alert.users)
            ? alert.users[0]?.email
            : (alert.users as { email?: string } | null)?.email

          if (resend && userEmail) {
            await resend.emails.send({
            from: 'alerts@jeconomisemonenergie.eu',
            to: userEmail,
            subject: `Alerte prix: Nouvelle offre pour ${alert.alert_name}!`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #22c55e;">✓ Nouvelle offre trouvée!</h2>
                <p>Alerte: <strong>${alert.alert_name}</strong></p>
                
                <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
                  <p><strong>${bestOffer.supplier}</strong></p>
                  <p style="font-size: 24px; color: #22c55e; margin: 8px 0;">
                    €${bestOffer.price}/mois
                  </p>
                  <p style="color: #666;">
                    Économies estimées: <strong style="color: #22c55e;">€${savings}/mois</strong>
                  </p>
                </div>
                
                <p>
                  <a href="https://jeconomisemonenergie.eu/dashboard#alertes" 
                     style="background-color: #22c55e; color: white; padding: 10px 20px; 
                            text-decoration: none; border-radius: 4px; display: inline-block;">
                    Voir mes alertes
                  </a>
                </p>
              </div>
            `,
            })
          }

          // Update last_triggered_at
          const { error: updateError } = await supabase
            .from('price_alerts')
            .update({ last_triggered_at: new Date().toISOString() })
            .eq('id', alert.id)

          if (updateError) throw updateError
          triggered++
        }
      } catch (error) {
        errors.push(`Alert ${alert.id}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    return {
      success: errors.length === 0,
      triggered,
      errors: errors.length > 0 ? errors : undefined,
    }
  } catch (error) {
    console.error('[v0] Error triggering price alerts:', error)
    throw error
  }
}

async function getMatchingOffers(alert: any) {
  // This is a placeholder - in production, you'd fetch from your offers API
  // For now, we simulate some matching offers
  return [
    {
      supplier: 'Engie',
      price: alert.min_price + 5,
      type: alert.offer_type,
      regions: alert.regions,
    },
    {
      supplier: 'Electrabel',
      price: alert.min_price + 10,
      type: alert.offer_type,
      regions: alert.regions,
    },
  ]
}
