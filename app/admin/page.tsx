import { redirect } from 'next/navigation'
import { checkAdminAccess } from '@/lib/admin/auth'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Prevent prerendering - fetch admin data at request time
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

export default async function AdminPage() {
  const { isAdmin } = await checkAdminAccess()
  
  if (!isAdmin) {
    redirect('/dashboard')
  }

  const supabase = await createClient()

  // Fetch system stats
  const { count: usersCount } = await supabase
    .from('auth.users')
    .select('*', { count: 'exact', head: true })

  const { count: alertsCount } = await supabase
    .from('price_alerts')
    .select('*', { count: 'exact', head: true })

  const { count: invoicesCount } = await supabase
    .from('invoices')
    .select('*', { count: 'exact', head: true })

  const { data: webhookLogs } = await supabase
    .from('webhook_logs')
    .select('*')
    .gte(
      'created_at',
      new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    )

  const { data: recentAuditLogs } = await supabase
    .from('audit_logs')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(10)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button asChild variant="outline">
            <Link href="/dashboard">Retour au Dashboard</Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Utilisateurs totaux</p>
            <p className="text-3xl font-bold text-primary">{usersCount || 0}</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Alertes actives</p>
            <p className="text-3xl font-bold text-primary">{alertsCount || 0}</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Factures uploadées</p>
            <p className="text-3xl font-bold text-primary">{invoicesCount || 0}</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Webhooks (24h)</p>
            <p className="text-3xl font-bold text-primary">{webhookLogs?.length || 0}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Button asChild className="h-20 text-lg">
            <Link href="/admin/users">Gestion des utilisateurs</Link>
          </Button>

          <Button asChild className="h-20 text-lg">
            <Link href="/admin/webhooks">Logs des webhooks</Link>
          </Button>

          <Button asChild className="h-20 text-lg">
            <Link href="/admin/audit">Audit logs</Link>
          </Button>

          <Button asChild className="h-20 text-lg">
            <Link href="/admin/reports">Rapports</Link>
          </Button>
        </div>

        {/* Recent Audit Logs */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Audit logs récents</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-4">Action</th>
                  <th className="text-left py-2 px-4">Table</th>
                  <th className="text-left py-2 px-4">Admin</th>
                  <th className="text-left py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentAuditLogs?.map((log: any) => (
                  <tr key={log.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-2 px-4">{log.action}</td>
                    <td className="py-2 px-4">{log.table_name}</td>
                    <td className="py-2 px-4 text-xs text-muted-foreground">{log.admin_id.slice(0, 8)}...</td>
                    <td className="py-2 px-4 text-xs text-muted-foreground">
                      {new Date(log.timestamp).toLocaleString('fr-BE')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
