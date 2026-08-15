import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Session expirée. Veuillez vous reconnecter.' }, { status: 401 })

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
