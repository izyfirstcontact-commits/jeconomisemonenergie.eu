import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = user.id

    // Insert sample analytics data (30 days)
    const analyticsData = Array.from({ length: 30 }, (_, i) => ({
      user_id: userId,
      recorded_date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
      consumption_kwh: 35 + Math.random() * 40,
      cost_eur: 10 + Math.random() * 15,
      provider: ['Eneco', 'Bolt', 'Luminus', 'TotalEnergie', 'Engie'][Math.floor(Math.random() * 5)],
    }))

    const { error: analyticsError } = await supabase
      .from('user_analytics')
      .upsert(analyticsData, { onConflict: 'user_id,recorded_date' })

    if (analyticsError) console.error('Analytics error:', analyticsError)

    // Insert sample daily savings data (20 days)
    const savingsData = Array.from({ length: 20 }, (_, i) => ({
      user_id: userId,
      recorded_date: new Date(Date.now() - (19 - i) * 86400000).toISOString().split('T')[0],
      savings_amount: 2 + Math.random() * 5,
      comparison_provider: ['Eneco', 'Bolt', 'Luminus', 'TotalEnergie'][Math.floor(Math.random() * 4)],
    }))

    const { error: savingsError } = await supabase
      .from('user_daily_savings')
      .upsert(savingsData, { onConflict: 'user_id,recorded_date' })

    if (savingsError) console.error('Savings error:', savingsError)

    // Insert sample supplier interactions (10 suppliers)
    const suppliers = ['Eneco', 'Bolt', 'Luminus', 'TotalEnergie', 'Engie', 'Ecofix', 'Octa+', 'Mega', 'Essent', 'NextEnergie']
    const interactionsData = suppliers.map((supplier, i) => ({
      user_id: userId,
      supplier_name: supplier,
      recorded_date: new Date(Date.now() - (9 - i) * 86400000).toISOString().split('T')[0],
      consultation_count: Math.floor(2 + Math.random() * 10),
    }))

    const { error: interactionsError } = await supabase
      .from('user_supplier_interactions')
      .upsert(interactionsData, { onConflict: 'user_id,supplier_name' })

    if (interactionsError) console.error('Interactions error:', interactionsError)

    // Insert sample price alerts (5 alerts)
    const alertsData = Array.from({ length: 5 }, (_, i) => ({
      user_id: userId,
      alert_date: new Date(Date.now() - (4 - i) * 86400000).toISOString().split('T')[0],
      alert_message: [
        'Prix favorable détecté chez TotalEnergie',
        'Opportunité d\'économies trouvée chez Luminus',
        'Nouvelle offre compétitive chez Bolt',
        'Alerte tarifaire: Eneco propose une baisse',
        'Comparaison favorable détectée',
      ][i],
    }))

    const { error: alertsError } = await supabase
      .from('user_price_alerts')
      .upsert(alertsData, { onConflict: 'user_id,alert_date' })

    if (alertsError) console.error('Alerts error:', alertsError)

    return NextResponse.json(
      {
        success: true,
        message: 'Données d\'exemple insérées avec succès',
        data: {
          analytics: analyticsData.length,
          savings: savingsData.length,
          interactions: interactionsData.length,
          alerts: alertsData.length,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'insertion des données' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  return POST(request)
}
