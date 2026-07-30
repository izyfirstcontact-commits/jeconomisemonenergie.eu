import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

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

    // Verify ownership before deleting
    const { data: favorite } = await supabase
      .from('favorites')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!favorite || favorite.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Favorite not found or unauthorized' },
        { status: 404 }
      )
    }

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete favorite:', error)
    return NextResponse.json(
      { error: 'Failed to delete favorite' },
      { status: 500 }
    )
  }
}
