import { createClient } from '@supabase/supabase-js'
import { triggerPriceAlerts } from '@/lib/services/price-alert-service'
import { withTimeout, apiResponse } from '@/lib/api-utils'

export const dynamic = 'force-dynamic'
export const revalidate = false

async function getOffres(): Promise<unknown[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase env vars not configured')
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    // Add 10s timeout to Supabase query
    const result = await withTimeout(
      supabase
        .from('offres_tarifaires')
        .select(`
          id,
          nom_offre,
          type_energie,
          type_compteur,
          type_prix,
          duree_mois,
          prix_kwh_hp,
          prix_kwh_hc,
          prix_kwh_mono,
          redevance_elec_an,
          prix_kwh_gaz,
          redevance_gaz_an,
          actif,
          fournisseurs (nom, logo_url)
        `)
        .eq('actif', true)
        .order('type_energie') as unknown as Promise<{ data: unknown; error: unknown }>,
      10000
    )
    const { data, error } = result as { data: unknown; error: unknown }
    if (error) throw error
    return (Array.isArray(data) ? data : []) as unknown[]
  } catch (error) {
    console.error('[v0] Timeout or error fetching offres:', error)
    throw error
  }
}

export async function GET(req: Request) {
  try {
    // Vérifier le secret pour autoriser le cron job
    const authHeader = req.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    console.log('[v0] Cron job called - Authorization check')

    if (!cronSecret) {
      console.warn('[v0] CRON_SECRET not set in environment variables')
      return new Response(
        JSON.stringify({ warning: 'CRON_SECRET not configured', timestamp: new Date().toISOString() }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (authHeader !== `Bearer ${cronSecret}`) {
      console.warn('[v0] Unauthorized cron attempt')
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    console.log('[v0] Cron job executing - Fetching offres tarifaires from Supabase')

    // Récupérer les offres depuis Supabase
    const offres = await getOffres()
    console.log('[v0] Offres fetched:', offres?.length || 0)

    // Déclencher les alertes de prix
    console.log('[v0] Triggering price alerts...')
    const alertsResult = await triggerPriceAlerts()
    console.log('[v0] Price alerts triggered:', alertsResult)

    return new Response(
      JSON.stringify({
        success: true,
        offres: {
          total: offres?.length || 0,
          message: 'Offres tarifaires récupérées avec succès',
        },
        priceAlerts: alertsResult,
        timestamp: new Date().toISOString(),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    // Return 200 with error details for graceful degradation
    return new Response(
      JSON.stringify({
        success: false,
        timestamp: new Date().toISOString(),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
