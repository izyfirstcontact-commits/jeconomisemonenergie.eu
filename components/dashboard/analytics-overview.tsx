'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, Zap, Target, Calendar, Loader2, AlertCircle } from 'lucide-react'

interface AnalyticsData {
  total_savings: number
  monthly_savings: number
  total_simulations: number
  favorite_supplier: string | null
  total_favorites: number
}

interface AnalyticsOverviewProps {
  userId: string
}

export function AnalyticsOverview({ userId }: AnalyticsOverviewProps) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/dashboard/analytics?userId=${userId}`)

        if (!response.ok) {
          if (response.status === 401) {
            setError('Authentification requise')
          } else {
            setError('Erreur lors du chargement des analytics')
          }
          return
        }

        const analyticsData = await response.json()
        setData(analyticsData || {
          total_savings: 0,
          monthly_savings: 0,
          total_simulations: 0,
          favorite_supplier: null,
          total_favorites: 0,
        })
      } catch (err) {
        console.error('Fetch error:', err)
        setError('Erreur lors du chargement')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Savings */}
      <StatsCard
        icon={TrendingUp}
        label="Économies Totales"
        value={`${(data?.total_savings || 0).toFixed(2)}€`}
        color="text-green-600"
        bgColor="bg-green-50"
      />

      {/* Monthly Savings */}
      <StatsCard
        icon={Zap}
        label="Économies ce Mois"
        value={`${(data?.monthly_savings || 0).toFixed(2)}€`}
        color="text-blue-600"
        bgColor="bg-blue-50"
      />

      {/* Total Simulations */}
      <StatsCard
        icon={Target}
        label="Simulations"
        value={data?.total_simulations || 0}
        color="text-purple-600"
        bgColor="bg-purple-50"
      />

      {/* Favorite Supplier */}
      <StatsCard
        icon={Calendar}
        label="Fournisseur Favori"
        value={data?.favorite_supplier || 'N/A'}
        color="text-amber-600"
        bgColor="bg-amber-50"
      />
    </div>
  )
}

function StatsCard({
  icon: Icon,
  label,
  value,
  color,
  bgColor,
}: {
  icon: any
  label: string
  value: string | number
  color: string
  bgColor: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`${bgColor} rounded-lg p-3 flex-shrink-0`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  )
}
