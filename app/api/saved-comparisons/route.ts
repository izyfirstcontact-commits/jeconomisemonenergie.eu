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
    const { data: comparisons, error } = await supabase
      .from('saved_comparisons')
      .select('*')
      .eq('user_id', user.id)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(comparisons || [])
  } catch (error) {
    console.error('Failed to fetch saved comparisons:', error)
    return NextResponse.json(
      { error: 'Failed to fetch saved comparisons' },
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
    const {
      title,
      monthlyConsumption,
      consumerType,
      selectedSuppliers,
      estimatedSavings,
    } = await request.json()

    if (
      !title ||
      !monthlyConsumption ||
      !consumerType ||
      !selectedSuppliers ||
      selectedSuppliers.length === 0
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Set expiry to 90 days from now
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 90)

    const { data: comparison, error } = await supabase
      .from('saved_comparisons')
      .insert([
        {
          user_id: user.id,
          title,
          monthly_consumption: monthlyConsumption,
          consumer_type: consumerType,
          selected_suppliers: selectedSuppliers,
          estimated_savings: estimatedSavings || 0,
          expires_at: expiresAt.toISOString(),
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(comparison, { status: 201 })
  } catch (error) {
    console.error('Failed to save comparison:', error)
    return NextResponse.json(
      { error: 'Failed to save comparison' },
      { status: 500 }
    )
  }
}
