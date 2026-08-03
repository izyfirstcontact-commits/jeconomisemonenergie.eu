'use client'

import { useEffect, useState } from 'react'
import { Bell, Loader2, AlertCircle } from 'lucide-react'

interface PriceAlert {
  id: string
  alert_message: string
}

interface AlertsSectionProps {
  userId: string
}

export function AlertsSection({ userId }: AlertsSectionProps) {
  const [alerts, setAlerts] = useState<PriceAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/dashboard/alerts?userId=${userId}`)

        if (!response.ok) {
          if (response.status === 401) {
            setError('Authentification requise')
          } else {
            setError('Erreur lors du chargement')
          }
          return
        }

        const alertsData = await response.json()
        setAlerts(alertsData || [])
      } catch (err) {
        console.error('Fetch error:', err)
        setError('Erreur lors du chargement')
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()
  }, [userId])



  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-amber-50 p-2">
            <Bell className="h-5 w-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Alertes de Prix</h3>
        </div>
        <div className="flex items-center justify-center h-48">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-amber-50 p-2">
            <Bell className="h-5 w-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Alertes de Prix</h3>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-amber-50 p-2">
            <Bell className="h-5 w-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Alertes de Prix</h3>
        </div>
        <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
          {alerts.length}
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="flex items-center justify-center h-48 rounded-lg border border-dashed border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">Aucune alerte disponible</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-lg border border-border p-4 hover:bg-muted/50 transition"
            >
              <p className="text-sm text-foreground">{alert.alert_message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
