import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET - List user's invoices
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get invoices from database (RLS will filter by user_id)
    const { data: invoices, error: dbError } = await supabase
      .from('invoices')
      .select('*')
      .eq('user_id', user.id)
      .order('uploaded_at', { ascending: false })

    if (dbError) {
      return NextResponse.json(
        { error: 'Failed to fetch invoices' },
        { status: 500 }
      )
    }

    return NextResponse.json({ invoices: invoices || [] })
  } catch (error) {
    console.error('GET /api/invoices error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Upload a new invoice
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const supplier = formData.get('supplier') as string
    const monthlyConsumption = formData.get('monthlyConsumption') as string
    const invoiceAmount = formData.get('invoiceAmount') as string
    const invoiceDate = formData.get('invoiceDate') as string

    if (!file || !supplier || !monthlyConsumption || !invoiceAmount || !invoiceDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large (max 10MB)' },
        { status: 400 }
      )
    }

    // Upload to Blob storage
    const fileName = `${user.id}/${Date.now()}-${file.name}`
    const buffer = await file.arrayBuffer()

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('invoices')
      .upload(fileName, buffer, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError || !uploadData) {
      console.error('Upload error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      )
    }

    // Save invoice metadata to database
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 365) // 1 year expiration

    const { data: invoice, error: dbError } = await supabase
      .from('invoices')
      .insert({
        user_id: user.id,
        file_name: file.name,
        file_path: uploadData.path,
        file_size: file.size,
        supplier,
        monthly_consumption: parseFloat(monthlyConsumption),
        invoice_amount: parseFloat(invoiceAmount),
        invoice_date: invoiceDate,
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single()

    if (dbError) {
      console.error('DB error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save invoice' },
        { status: 500 }
      )
    }

    return NextResponse.json({ invoice }, { status: 201 })
  } catch (error) {
    console.error('POST /api/invoices error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
