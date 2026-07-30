'use client'

import { useState, useEffect } from 'react'
import { Bell, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { PriceAlert } from '@/lib/types/dashboard'

export function PriceAlertsSection() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/price-alerts')
      if (!response.ok) throw new Error('Failed to fetch price alerts')
      const data = await response.json()
      setAlerts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteAlert = async (id: string) => {
    try {
      const response = await fetch(`/api/price-alerts/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete alert')
      setAlerts(alerts.filter((a) => a.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const toggleAlert = async (id: string, isActive: boolean) => {
    try {
      const alert = alerts.find((a) => a.id === id)
      if (!alert) return

      const response = await fetch(`/api/price-alerts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isActive: !isActive,
          maxPrice: alert.maxPrice,
          minPrice: alert.minPrice,
          regions: alert.regions,
        }),
      })

      if (!response.ok) throw new Error('Failed to update alert')
      await fetchAlerts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const activeCount = alerts.filter((a) => a.isActive).length

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Alertes de Prix
          </CardTitle>
          <CardDescription>
            {activeCount} alerte{activeCount !== 1 ? 's' : ''} active{activeCount !== 1 ? 's' : ''}
          </CardDescription>
        </div>
        <Button size="sm" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle alerte
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center text-muted-foreground">Chargement...</div>
        ) : error ? (
          <div className="text-sm text-red-500">{error}</div>
        ) : alerts.length === 0 ? (
          <div className="text-center text-muted-foreground">
            Aucune alerte créée. Créez une alerte pour être notifié des changements de prix.
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{alert.alertName}</p>
                    <Badge variant={alert.isActive ? 'default' : 'secondary'}>
                      {alert.isActive ? 'Actif' : 'Inactif'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {alert.regions.join(', ')} • {alert.offerType.replace('_', ' ')}
                  </p>
                  {(alert.minPrice || alert.maxPrice) && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {alert.minPrice && `Min: €${alert.minPrice}`}
                      {alert.minPrice && alert.maxPrice && ' • '}
                      {alert.maxPrice && `Max: €${alert.maxPrice}`}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleAlert(alert.id, alert.isActive)}
                  >
                    {alert.isActive ? 'Désactiver' : 'Activer'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteAlert(alert.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
