import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkProductionAccess } from '@/lib/admin/auth'

export async function GET() {
  try {
    const supabase = await createClient()
    const { user, isProductionUser } = await checkProductionAccess()
    if (!user || !isProductionUser) return NextResponse.json({ error: 'Accès réservé à l’équipe commerciale.' }, { status: 403 })

    const { data, error } = await supabase
      .from('energy_contracts')
      .select('*, energy_contract_energy(*), energy_contract_products(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data: data ?? [] })
  } catch {
    return NextResponse.json({ error: 'Impossible de charger les contrats.' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { user, isProductionUser } = await checkProductionAccess()
    if (!user || !isProductionUser) return NextResponse.json({ error: 'Accès réservé à l’équipe commerciale.' }, { status: 403 })
    const id = new URL(request.url).searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Contrat introuvable.' }, { status: 400 })
    const { error } = await supabase.from('energy_contracts').delete().eq('id', id).eq('user_id', user.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Impossible de supprimer le contrat.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { user, isProductionUser } = await checkProductionAccess()
    if (!user || !isProductionUser) return NextResponse.json({ error: 'Accès réservé à l’équipe commerciale.' }, { status: 403 })

    const body = await request.json()
    const { contract, energy, products, id } = body
    const contractRow = { ...contract, user_id: user.id, updated_at: new Date().toISOString() }
    const result = id
      ? await supabase.from('energy_contracts').update(contractRow).eq('id', id).eq('user_id', user.id).select().single()
      : await supabase.from('energy_contracts').insert(contractRow).select().single()
    if (result.error || !result.data) return NextResponse.json({ error: result.error?.message || 'Contrat impossible à enregistrer.' }, { status: 400 })

    const contractId = result.data.id
    const energyResult = id
      ? await supabase.from('energy_contract_energy').upsert({ ...energy, contract_id: contractId, updated_at: new Date().toISOString() }, { onConflict: 'contract_id' })
      : await supabase.from('energy_contract_energy').insert({ ...energy, contract_id: contractId })
    if (energyResult.error) return NextResponse.json({ error: energyResult.error.message }, { status: 400 })

    if (id) {
      const deleteResult = await supabase.from('energy_contract_products').delete().eq('contract_id', contractId)
      if (deleteResult.error) return NextResponse.json({ error: deleteResult.error.message }, { status: 400 })
    }
    const productsResult = await supabase.from('energy_contract_products').insert((products || []).map((product: Record<string, unknown>) => ({ ...product, contract_id: contractId })))
    if (productsResult.error) return NextResponse.json({ error: productsResult.error.message }, { status: 400 })

    return NextResponse.json({ data: result.data })
  } catch {
    return NextResponse.json({ error: 'Erreur lors de l’enregistrement du contrat.' }, { status: 500 })
  }
}
