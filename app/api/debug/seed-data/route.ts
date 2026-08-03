import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || '92154921-a84e-4c7e-9a9f-fb3a3f130b68'

    const supabase = await createClient()

    // Verify user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Insert user_daily_savings data
    const dailySavingsData = [
      { user_id: userId, recorded_date: '2026-07-10', savings_amount: 15.50, comparison_provider: 'Octa+' },
      { user_id: userId, recorded_date: '2026-07-15', savings_amount: 12.80, comparison_provider: 'Bolt' },
      { user_id: userId, recorded_date: '2026-07-20', savings_amount: 18.30, comparison_provider: 'Engie' },
      { user_id: userId, recorded_date: '2026-07-25', savings_amount: 14.20, comparison_provider: 'Luminus' },
      { user_id: userId, recorded_date: '2026-08-01', savings_amount: 16.90, comparison_provider: 'Eneco' },
      { user_id: userId, recorded_date: '2026-08-02', savings_amount: 19.50, comparison_provider: 'TotalEnergie' },
    ]

    const { error: savingsError } = await supabase
      .from('user_daily_savings')
      .insert(dailySavingsData)

    if (savingsError) {
      console.error('Savings insert error:', savingsError)
      return NextResponse.json({ error: `Savings insert failed: ${savingsError.message}` }, { status: 500 })
    }

    // Insert user_supplier_interactions data
    const suppliersData = [
      { user_id: userId, supplier_name: 'Engie', consultation_count: 3, recorded_date: '2026-07-15' },
      { user_id: userId, supplier_name: 'Bolt', consultation_count: 2, recorded_date: '2026-07-17' },
      { user_id: userId, supplier_name: 'Luminus', consultation_count: 2, recorded_date: '2026-07-22' },
      { user_id: userId, supplier_name: 'TotalEnergie', consultation_count: 4, recorded_date: '2026-07-29' },
      { user_id: userId, supplier_name: 'Ecofix', consultation_count: 2, recorded_date: '2026-08-01' },
    ]

    const { error: suppliersError } = await supabase
      .from('user_supplier_interactions')
      .insert(suppliersData)

    if (suppliersError) {
      console.error('Suppliers insert error:', suppliersError)
      return NextResponse.json({ error: `Suppliers insert failed: ${suppliersError.message}` }, { status: 500 })
    }

    // Insert user_analytics data
    const analyticsData = [
      { user_id: userId, recorded_date: '2026-07-10', consumption_kwh: 48.50, cost_eur: 13.40, provider: 'Eneco' },
      { user_id: userId, recorded_date: '2026-07-15', consumption_kwh: 42.30, cost_eur: 11.80, provider: 'Bolt' },
      { user_id: userId, recorded_date: '2026-07-20', consumption_kwh: 55.80, cost_eur: 15.50, provider: 'Engie' },
      { user_id: userId, recorded_date: '2026-07-25', consumption_kwh: 50.20, cost_eur: 14.00, provider: 'Luminus' },
      { user_id: userId, recorded_date: '2026-08-01', consumption_kwh: 45.90, cost_eur: 12.75, provider: 'TotalEnergie' },
      { user_id: userId, recorded_date: '2026-08-02', consumption_kwh: 52.10, cost_eur: 14.50, provider: 'Ecofix' },
    ]

    const { error: analyticsError } = await supabase
      .from('user_analytics')
      .insert(analyticsData)

    if (analyticsError) {
      console.error('Analytics insert error:', analyticsError)
      return NextResponse.json({ error: `Analytics insert failed: ${analyticsError.message}` }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Data seeded successfully',
      inserted: {
        daily_savings: dailySavingsData.length,
        suppliers: suppliersData.length,
        analytics: analyticsData.length,
      },
    })
  } catch (err) {
    console.error('Seed error:', err)
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
  }
}
