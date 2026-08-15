import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ContractEncodingDashboard from '@/components/dashboard/contract-encoding-dashboard'

export const metadata = { title: 'Encodage des contrats | Tableau de bord' }
export const dynamic = 'force-dynamic'

export default async function ContractEncodingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?redirectTo=%2Fdashboard%2Fencodage')

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div><p className="text-sm text-muted-foreground">Ma production</p><h1 className="text-lg font-semibold">Encodage énergie</h1></div>
          <a href="/dashboard" className="text-sm text-primary hover:underline">Retour au dashboard</a>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><ContractEncodingDashboard /></div>
    </main>
  )
}
