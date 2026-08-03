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

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all analytics data for the specified user
    const { data: analyticsData, error: queryError } = await supabase
      .from('user_analytics')
      .select('consumption_kwh, cost_eur, savings_amount, recorded_date')
      .eq('user_id', userId)

    if (queryError) {
      console.error('Query error:', queryError)
      return NextResponse.json({ error: 'Query failed' }, { status: 500 })
    }

    // Calculate totals
    const records = analyticsData || []
    const total_savings = records.reduce((sum, r) => sum + (r.savings_amount || 0), 0)
    
    // Get current month savings
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    
    const monthly_savings = records
      .filter(r => {
        if (!r.recorded_date) return false
        const date = new Date(r.recorded_date)
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear
      })
      .reduce((sum, r) => sum + (r.savings_amount || 0), 0)

    return NextResponse.json({
      total_savings: total_savings.toFixed(2),
      monthly_savings: monthly_savings.toFixed(2),
      total_simulations: 0,
      favorite_supplier: null,
      total_favorites: 0,
    })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
