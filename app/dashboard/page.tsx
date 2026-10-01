import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { checkProductionAccess } from '@/lib/admin/auth'
import { LogoutButton } from '@/components/auth/logout-button'
import { UserMenu } from '@/components/dashboard/user-menu'
import { SeedDataButton } from '@/components/dashboard/seed-data-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Zap, Users, AlertCircle, FilePlus2 } from 'lucide-react'

export const metadata = {
  title: 'Tableau de bord',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DashboardPage() {
  const supabase = await createClient()
  const { isProductionUser } = await checkProductionAccess()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  // Fetch counts from real tables
  let analyticsCount = 0
  let savingsCount = 0
  let alertsCount = 0
  let suppliersCount = 0

  try {
    const [analyticsRes, savingsRes, alertsRes, suppliersRes] = await Promise.all([
      supabase
        .from('user_analytics')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id),
      supabase
        .from('user_daily_savings')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id),
      supabase
        .from('user_price_alerts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id),
      supabase
        .from('user_supplier_interactions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id),
    ])

    analyticsCount = analyticsRes.count || 0
    savingsCount = savingsRes.count || 0
    alertsCount = alertsRes.count || 0
    suppliersCount = suppliersRes.count || 0
  } catch (err) {
    console.error('[v0] Dashboard count error:', err)
  }

  return (
    <main className="min-h-screen bg-background">
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
                lastSignIn={user.last_sign_in_at || null}
              />
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isProductionUser && (
          <Card className="mb-8 border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="text-sm font-medium text-primary">Ma production</p><h2 className="text-xl font-semibold">Encoder un contrat d&apos;énergie</h2><p className="text-sm text-muted-foreground">Créer, rechercher, modifier et exporter vos encodages.</p></div>
              <a href="/dashboard/encodage" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"><FilePlus2 className="mr-2 size-4" />Ouvrir l&apos;encodage</a>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Données Analytiques</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsCount}</div>
              <p className="text-xs text-muted-foreground">enregistrements</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Économies Quotidiennes</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{savingsCount}</div>
              <p className="text-xs text-muted-foreground">jours enregistrés</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fournisseurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{suppliersCount}</div>
              <p className="text-xs text-muted-foreground">interactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertes</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alertsCount}</div>
              <p className="text-xs text-muted-foreground">alertes actives</p>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Bienvenue sur votre tableau de bord</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm text-muted-foreground">
              Votre tableau de bord affiche un résumé de vos données d&apos;économies d&apos;énergie, vos interactions avec les fournisseurs, et vos alertes tarifaires.
            </p>
            <div className="space-y-3 text-sm">
              <h3 className="font-semibold text-foreground">Données disponibles:</h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li><strong className="text-foreground">{analyticsCount}</strong> entrées analytiques</li>
                <li><strong className="text-foreground">{savingsCount}</strong> jours d&apos;économies</li>
                <li><strong className="text-foreground">{suppliersCount}</strong> fournisseurs suivis</li>
                <li><strong className="text-foreground">{alertsCount}</strong> alertes configurées</li>
              </ul>
            </div>
            {analyticsCount === 0 && (
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">
                  Vous n&apos;avez pas encore de données. Cliquez sur le bouton ci-dessous pour charger des données d&apos;exemple:
                </p>
                <SeedDataButton />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Informations du compte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="text-foreground font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Compte créé:</span>
              <span className="text-foreground font-medium">
                {new Date(user.created_at).toLocaleDateString('fr-FR')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dernière connexion:</span>
              <span className="text-foreground font-medium">
                {user.last_sign_in_at
                  ? new Date(user.last_sign_in_at).toLocaleString('fr-FR')
                  : 'Première connexion'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
