import { createClient } from '@supabase/supabase-js'
import { withTimeout, apiResponse } from '@/lib/api-utils'

export const revalidate = 3600 // Revalide toutes les heures

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
    console.error('[v0] Error fetching offres:', error)
    throw error
  }
}

export async function GET() {
  try {
    const data = await getOffres()
    return apiResponse(data, 'success')
  } catch (error) {
    // Always return 200 for graceful degradation
    return apiResponse([], 'error')
  }
}
