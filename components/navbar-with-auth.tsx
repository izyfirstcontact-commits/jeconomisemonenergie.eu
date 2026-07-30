import { Navbar } from './navbar'
import { createClient } from '@/lib/supabase/server'

export async function NavbarWithAuth() {
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    const isLoggedIn = !!data.user

    return <Navbar isLoggedIn={isLoggedIn} userEmail={data.user?.email} />
  } catch (error) {
    // If Supabase is not configured, render navbar without auth
    console.error('[v0] NavbarWithAuth error:', error instanceof Error ? error.message : 'Unknown error')
    return <Navbar isLoggedIn={false} userEmail={undefined} />
  }
}
