'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { FavoritesSection } from './favorites-section'
import { PriceAlertsSection } from './price-alerts-section'
import { SavedComparisonsSection } from './saved-comparisons-section'
import { InvoicesSection } from './invoices-section'

interface DashboardData {
  favorites: any[]
  alerts: any[]
  comparisons: any[]
  invoices: any[]
}

export function DashboardMain({ userEmail }: { userEmail: string }) {
  const [data, setData] = useState<DashboardData>({
    favorites: [],
    alerts: [],
    comparisons: [],
    invoices: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      setError(null)

      try {
        const supabase = createClient()

        // Verify user is still authenticated
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()
        if (authError || !user) {
          setError('Session expired. Please login again.')
          return
        }

        // Fetch all data in parallel
        const [favoritesResult, alertsResult, comparisonsResult, invoicesResult] =
          await Promise.all([
            supabase.from('favorites').select('*').eq('user_id', user.id).then(r => r, () => ({ data: [] })),
            supabase
              .from('price_alerts')
              .select('*')
              .eq('user_id', user.id)
              .then(r => r, () => ({ data: [] })),
            supabase
              .from('saved_comparisons')
              .select('*')
              .eq('user_id', user.id)
              .then(r => r, () => ({ data: [] })),
            supabase.from('invoices').select('*').eq('user_id', user.id).then(r => r, () => ({ data: [] })),
          ])

        setData({
          favorites: favoritesResult.data || [],
          alerts: alertsResult.data || [],
          comparisons: comparisonsResult.data || [],
          invoices: invoicesResult.data || [],
        })
      } catch (err: any) {
        console.error('[v0] Error loading dashboard data:', err)
        setError('Impossible de charger vos données. Veuillez réessayer.')
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Chargement de vos données...</div>
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <FavoritesSection />
        <PriceAlertsSection />
        <SavedComparisonsSection />
        <InvoicesSection />
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Favoris" value={data.favorites.length} />
        <StatCard label="Alertes actives" value={data.alerts.filter((a) => a.is_active).length} />
        <StatCard label="Comparaisons" value={data.comparisons.length} />
        <StatCard label="Factures" value={data.invoices.length} />
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  )
}
