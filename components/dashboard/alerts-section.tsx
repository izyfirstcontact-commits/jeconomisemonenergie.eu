'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Bell, Loader2, AlertCircle, Trash2 } from 'lucide-react'

interface PriceAlert {
  id: string
  alert_name: string
  supplier_name: string
  price_threshold: number
  alert_type: string
  is_active: boolean
  triggered_at: string | null
}

export function AlertsSection() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true)
        const supabase = createClient()

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) {
          setError('Authentification requise')
          return
        }

        const { data: alertsData, error: queryError } = await supabase
          .from('user_price_alerts')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (queryError && queryError.code !== 'PGRST116') {
          console.error('Query error:', queryError)
          setError('Erreur lors du chargement')
          return
        }

        setAlerts(alertsData || [])
      } catch (err) {
        console.error('Fetch error:', err)
        setError('Erreur lors du chargement')
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()
  }, [])

  const handleDeleteAlert = async (alertId: string) => {
    try {
      const supabase = createClient()
      await supabase.from('user_price_alerts').delete().eq('id', alertId)
      setAlerts(alerts.filter(a => a.id !== alertId))
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

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
          {alerts.filter(a => a.is_active).length}
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="flex items-center justify-center h-48 rounded-lg border border-dashed border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">Aucune alerte configurée</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 transition"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-foreground truncate">{alert.alert_name}</h4>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold flex-shrink-0 ${
                      alert.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {alert.is_active ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                <div className="mt-1 space-y-0.5">
                  <p className="text-xs text-muted-foreground">
                    {alert.supplier_name} • {alert.alert_type}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Seuil: {alert.price_threshold.toFixed(2)}€
                    {alert.triggered_at && (
                      <span className="ml-2 text-green-600">
                        Déclenché le {new Date(alert.triggered_at).toLocaleDateString('fr-FR')}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteAlert(alert.id)}
                className="ml-2 p-2 text-muted-foreground hover:text-destructive transition flex-shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
