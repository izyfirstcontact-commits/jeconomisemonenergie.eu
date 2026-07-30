import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data: alerts, error } = await supabase
      .from('price_alerts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(alerts || [])
  } catch (error) {
    console.error('Failed to fetch price alerts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch price alerts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { alertName, offerType, maxPrice, minPrice, regions } =
      await request.json()

    if (!alertName || !offerType || !regions || regions.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data: alert, error } = await supabase
      .from('price_alerts')
      .insert([
        {
          user_id: user.id,
          alert_name: alertName,
          offer_type: offerType,
          max_price: maxPrice || null,
          min_price: minPrice || null,
          regions: regions,
          is_active: true,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(alert, { status: 201 })
  } catch (error) {
    console.error('Failed to create price alert:', error)
    return NextResponse.json(
      { error: 'Failed to create price alert' },
      { status: 500 }
    )
  }
}
