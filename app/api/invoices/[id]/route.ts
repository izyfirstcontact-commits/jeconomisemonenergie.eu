import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// DELETE - Remove an invoice
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

    // Get invoice to verify ownership and get file path
    const { data: invoice, error: fetchError } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      )
    }

    // Delete from Blob storage
    const fileName = `${user.id}/${invoice.file_name}`
    const { error: storageError } = await supabase.storage
      .from('invoices')
      .remove([fileName])

    if (storageError) {
      console.error('Storage deletion error:', storageError)
      // Continue anyway - delete from DB even if storage deletion fails
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (dbError) {
      return NextResponse.json(
        { error: 'Failed to delete invoice' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/invoices/[id] error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
