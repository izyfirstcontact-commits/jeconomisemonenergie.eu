import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { email, password, productionOnly } = await request.json()
    if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
      return NextResponse.json({ error: 'Adresse e-mail et mot de passe requis.' }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) return NextResponse.json({ error: error.message }, { status: 401 })

    if (productionOnly === true) {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: staff } = user
        ? await supabase.from('admin_users').select('role').eq('id', user.id).maybeSingle()
        : { data: null }
      const allowed = ['super_admin', 'manager', 'commercial'].includes(staff?.role ?? '')
      if (!allowed) {
        await supabase.auth.signOut()
        return NextResponse.json({ error: 'Cet espace est réservé aux télévendeurs autorisés de jeconomisemonenergie.eu.' }, { status: 403 })
      }
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Impossible de se connecter.' }, { status: 500 })
  }
}
