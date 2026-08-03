import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LogoutButton } from '@/components/auth/logout-button'
import { UserMenu } from '@/components/dashboard/user-menu'
import { SupabaseDashboard } from '@/components/dashboard/supabase-dashboard'
import { AnalyticsDashboard } from '@/components/dashboard/analytics-dashboard'

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
      <div className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">Tableau de bord</h1>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Bienvenue, {user.email}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 justify-end flex-shrink-0">
              <UserMenu
                email={user.email!}
                userId={user.id}
                createdAt={user.created_at}
                lastSignIn={user.last_sign_in_at}
              />
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <div className="mb-8 border-b border-border">
          <div className="flex gap-6">
            <button className="pb-3 px-1 text-sm font-medium text-foreground border-b-2 border-primary">
              Analytics
            </button>
            <button className="pb-3 px-1 text-sm font-medium text-muted-foreground hover:text-foreground transition">
              Historique
            </button>
          </div>
        </div>

        {/* Analytics Section */}
        <AnalyticsDashboard userId={user.id} />

        {/* Original Dashboard (Hidden but kept for reference) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Mes Données</h2>
          <SupabaseDashboard />
        </div>

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
