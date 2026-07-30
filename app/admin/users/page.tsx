import { redirect } from 'next/navigation'
import { checkAdminAccess } from '@/lib/admin/auth'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Prevent prerendering - fetch admin data at request time
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

export default async function AdminUsersPage() {
  const { isAdmin } = await checkAdminAccess()
  
  if (!isAdmin) {
    redirect('/dashboard')
  }

  const supabase = await createClient()

  // Fetch all users with their stats
  const { data: users } = await supabase
    .from('auth.users')
    .select(
      `
      id,
      email,
      created_at,
      last_sign_in_at,
      price_alerts:price_alerts(count),
      invoices:invoices(count)
    `
    )
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
          <Button asChild variant="outline">
            <Link href="/admin">Retour</Link>
          </Button>
        </div>

        {/* Users Table */}
        <div className="rounded-lg border border-border bg-card p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Email</th>
                <th className="text-left py-3 px-4 font-semibold">Créé</th>
                <th className="text-left py-3 px-4 font-semibold">Dernière connexion</th>
                <th className="text-right py-3 px-4 font-semibold">Alertes</th>
                <th className="text-right py-3 px-4 font-semibold">Factures</th>
                <th className="text-right py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: any) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString('fr-BE')}
                  </td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">
                    {user.last_sign_in_at
                      ? new Date(user.last_sign_in_at).toLocaleString('fr-BE')
                      : 'Jamais'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-block bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium">
                      {user.price_alerts?.[0]?.count || 0}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-block bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium">
                      {user.invoices?.[0]?.count || 0}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm">
                      Détails
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
