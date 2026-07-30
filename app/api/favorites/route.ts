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
    const { data: favorites, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(favorites || [])
  } catch (error) {
    console.error('Failed to fetch favorites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
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
    const { supplierId, supplierName, offerType } = await request.json()

    if (!supplierId || !supplierName || !offerType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if already favorited
    const { data: existing } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('supplier_id', supplierId)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Already favorited' },
        { status: 409 }
      )
    }

    const { data: favorite, error } = await supabase
      .from('favorites')
      .insert([
        {
          user_id: user.id,
          supplier_id: supplierId,
          supplier_name: supplierName,
          offer_type: offerType,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(favorite, { status: 201 })
  } catch (error) {
    console.error('Failed to add favorite:', error)
    return NextResponse.json(
      { error: 'Failed to add favorite' },
      { status: 500 }
    )
  }
}
