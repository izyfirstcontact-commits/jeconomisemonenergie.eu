import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LogoutButton } from '@/components/auth/logout-button'
import { SupabaseDashboard } from '@/components/dashboard/supabase-dashboard'

// Prevent prerendering - fetch user data at request time
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/login')
  }

  const user = data.user

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
            <p className="text-sm text-muted-foreground">Bienvenue, {user.email}</p>
          </div>
          <LogoutButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SupabaseDashboard />

        {/* Account Info */}
        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Informations du compte</h2>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Email: </span>
              <span className="text-foreground">{user.email}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Créé le: </span>
              <span className="text-foreground">
                {new Date(user.created_at).toLocaleDateString('fr-BE')}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Dernière connexion: </span>
              <span className="text-foreground">
                {user.last_sign_in_at
                  ? new Date(user.last_sign_in_at).toLocaleString('fr-BE')
                  : 'Jamais'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
