import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Prevent prerendering - fetch analytics data at request time
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user's invoices and calculate trends
  const { data: invoices } = await supabase
    .from('invoices')
    .select('*')
    .eq('user_id', user.id)
    .order('invoice_date', { ascending: true })

  // Fetch saved comparisons
  const { data: comparisons } = await supabase
    .from('saved_comparisons')
    .select('*')
    .eq('user_id', user.id)

  // Calculate stats
  const totalInvoices = invoices?.length || 0
  const avgConsumption =
    invoices && invoices.length > 0
      ? (invoices.reduce((sum, inv) => sum + (inv.monthly_consumption || 0), 0) / invoices.length).toFixed(2)
      : 0

  const totalSpent =
    invoices && invoices.length > 0
      ? invoices.reduce((sum, inv) => sum + (inv.invoice_amount || 0), 0).toFixed(2)
      : 0

  const avgBill = totalInvoices > 0 ? (Number(totalSpent) / totalInvoices).toFixed(2) : 0

  const totalSavings =
    comparisons && comparisons.length > 0
      ? comparisons.reduce((sum, comp) => sum + (comp.estimated_savings || 0), 0).toFixed(2)
      : 0

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Trends de consommation et économies</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard">Retour</Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Factures uploadées</p>
            <p className="text-3xl font-bold text-primary">{totalInvoices}</p>
            <p className="text-xs text-muted-foreground mt-2">Derniers 12 mois</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Consommation moyenne</p>
            <p className="text-3xl font-bold text-primary">{avgConsumption}</p>
            <p className="text-xs text-muted-foreground mt-2">kWh/mois</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Facture moyenne</p>
            <p className="text-3xl font-bold text-primary">€{avgBill}</p>
            <p className="text-xs text-muted-foreground mt-2">Par mois</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Économies potentielles</p>
            <p className="text-3xl font-bold text-green-600">€{totalSavings}</p>
            <p className="text-xs text-muted-foreground mt-2">Sur toutes les offres</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Consumption Trend */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Consommation mensuelle</h2>
            <div className="h-64 bg-muted/50 rounded flex items-center justify-center">
              <p className="text-muted-foreground">
                Recharts Chart Component
                <br />
                (À intégrer avec Recharts)
              </p>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Répartition des coûts</h2>
            <div className="h-64 bg-muted/50 rounded flex items-center justify-center">
              <p className="text-muted-foreground">
                Recharts Pie Chart
                <br />
                (À intégrer avec Recharts)
              </p>
            </div>
          </div>
        </div>

        {/* Recent Comparisons */}
        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Comparaisons récentes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-4">Titre</th>
                  <th className="text-left py-2 px-4">Type</th>
                  <th className="text-right py-2 px-4">Économies</th>
                  <th className="text-left py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {comparisons?.slice(0, 5).map((comp: any) => (
                  <tr key={comp.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-2 px-4">{comp.title}</td>
                    <td className="py-2 px-4">{comp.consumer_type === 'residential' ? 'Particulier' : 'PME'}</td>
                    <td className="py-2 px-4 text-right font-medium text-green-600">
                      €{comp.estimated_savings}
                    </td>
                    <td className="py-2 px-4 text-xs text-muted-foreground">
                      {new Date(comp.created_at).toLocaleDateString('fr-BE')}
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
