import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Prevent prerendering - fetch user settings at request time
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

export default async function SettingsPage() {
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">← Retour</Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>
              <p className="text-sm text-muted-foreground">Gérez vos préférences de notification</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Email Preferences */}
        <div className="rounded-lg border border-border bg-card p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Préférences d'email</h2>
          
          <div className="space-y-5">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h3 className="font-medium">Alertes de prix</h3>
                <p className="text-sm text-muted-foreground">
                  Recevez une notification email quand une nouvelle offre correspond à votre alerte
                </p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h3 className="font-medium">Nouveautés et actualisations</h3>
                <p className="text-sm text-muted-foreground">
                  Recevez les dernières offres spéciales et mises à jour du marché
                </p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h3 className="font-medium">Rappels de renouvellement</h3>
                <p className="text-sm text-muted-foreground">
                  Rappels quand votre contrat approche de son renouvellement
                </p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </label>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="rounded-lg border border-border bg-card p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Compte</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <p className="p-2 border border-border rounded bg-muted text-muted-foreground">
                {user.email}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Membre depuis</label>
              <p className="p-2 border border-border rounded bg-muted text-muted-foreground">
                {new Date(user.created_at).toLocaleDateString('fr-BE')}
              </p>
            </div>
          </div>
        </div>

        {/* Privacy & Data */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Confidentialité et données</h2>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Vos données personnelles sont protégées conformément à notre{' '}
              <Link href="/politique-de-confidentialite" className="text-primary hover:underline">
                politique de confidentialité
              </Link>.
            </p>
            
            <div>
              <Button variant="outline" className="w-full">
                Télécharger mes données (RGPD)
              </Button>
            </div>

            <div>
              <Button variant="destructive" className="w-full">
                Supprimer mon compte
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
