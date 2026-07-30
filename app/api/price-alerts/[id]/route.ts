import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const { isActive, maxPrice, minPrice, regions } = await request.json()

    // Verify ownership
    const { data: alert } = await supabase
      .from('price_alerts')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!alert || alert.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Alert not found or unauthorized' },
        { status: 404 }
      )
    }

    const { data: updated, error } = await supabase
      .from('price_alerts')
      .update({
        is_active: isActive,
        max_price: maxPrice,
        min_price: minPrice,
        regions: regions,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Failed to update price alert:', error)
    return NextResponse.json(
      { error: 'Failed to update price alert' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params

    // Verify ownership
    const { data: alert } = await supabase
      .from('price_alerts')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!alert || alert.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Alert not found or unauthorized' },
        { status: 404 }
      )
    }

    const { error } = await supabase
      .from('price_alerts')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete price alert:', error)
    return NextResponse.json(
      { error: 'Failed to delete price alert' },
      { status: 500 }
    )
  }
}
