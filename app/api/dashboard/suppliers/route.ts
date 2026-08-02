import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: suppliersData, error: queryError } = await supabase
      .from('user_supplier_interactions')
      .select('supplier_name, consultation_count')
      .eq('user_id', user.id)
      .order('consultation_count', { ascending: false })

    if (queryError) {
      console.error('Query error:', queryError)
      return NextResponse.json({ error: 'Query failed' }, { status: 500 })
    }

    // Transform consultation_count to interaction_count for frontend compatibility
    const transformedData = (suppliersData || []).map(item => ({
      supplier_name: item.supplier_name,
      interaction_count: item.consultation_count,
    }))

    return NextResponse.json(transformedData)
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
