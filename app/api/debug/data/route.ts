import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Get current user for verification
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Debug: Check all tables and their data for this user
    const debug: any = {}

    // Check user_daily_savings
    try {
      const { data: savingsData, error: savingsError } = await supabase
        .from('user_daily_savings')
        .select('*')
        .eq('user_id', userId)
        .limit(5)

      debug.user_daily_savings = {
        error: savingsError?.message,
        count: savingsData?.length,
        sample: savingsData?.[0],
      }
    } catch (err) {
      debug.user_daily_savings = { error: String(err) }
    }

    // Check user_supplier_interactions
    try {
      const { data: suppliersData, error: suppliersError } = await supabase
        .from('user_supplier_interactions')
        .select('*')
        .eq('user_id', userId)
        .limit(5)

      debug.user_supplier_interactions = {
        error: suppliersError?.message,
        count: suppliersData?.length,
        sample: suppliersData?.[0],
      }
    } catch (err) {
      debug.user_supplier_interactions = { error: String(err) }
    }

    // Check user_analytics
    try {
      const { data: analyticsData, error: analyticsError } = await supabase
        .from('user_analytics')
        .select('*')
        .eq('user_id', userId)
        .limit(5)

      debug.user_analytics = {
        error: analyticsError?.message,
        count: analyticsData?.length,
        sample: analyticsData?.[0],
      }
    } catch (err) {
      debug.user_analytics = { error: String(err) }
    }

    // Check user_price_alerts
    try {
      const { data: alertsData, error: alertsError } = await supabase
        .from('user_price_alerts')
        .select('*')
        .eq('user_id', userId)
        .limit(5)

      debug.user_price_alerts = {
        error: alertsError?.message,
        count: alertsData?.length,
        sample: alertsData?.[0],
      }
    } catch (err) {
      debug.user_price_alerts = { error: String(err) }
    }

    return NextResponse.json({
      user: { id: user.id, email: user.email },
      userId,
      debug,
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
