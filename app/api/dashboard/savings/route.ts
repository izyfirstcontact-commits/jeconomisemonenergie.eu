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

    // Fetch last 30 days of savings for the specified user
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data: savingsData, error: queryError } = await supabase
      .from('user_daily_savings')
      .select('recorded_date, savings_amount')
      .eq('user_id', userId)
      .gte('recorded_date', thirtyDaysAgo.toISOString().split('T')[0])
      .order('recorded_date', { ascending: true })

    if (queryError) {
      console.error('Query error:', queryError)
      return NextResponse.json({ error: 'Query failed' }, { status: 500 })
    }

    return NextResponse.json(savingsData || [])
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
