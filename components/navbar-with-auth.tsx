import { Navbar } from './navbar'
import { createClient } from '@/lib/supabase/server'

export async function NavbarWithAuth() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const isLoggedIn = !!data.user

  return <Navbar isLoggedIn={isLoggedIn} userEmail={data.user?.email} />
}
