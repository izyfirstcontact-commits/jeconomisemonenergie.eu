'use client'

import { useState, useEffect } from 'react'
import { Archive, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SavedComparison } from '@/lib/types/dashboard'

export function SavedComparisonsSection() {
  const [comparisons, setComparisons] = useState<SavedComparison[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchComparisons()
  }, [])

  const fetchComparisons = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/saved-comparisons')
      if (!response.ok) throw new Error('Failed to fetch saved comparisons')
      const data = await response.json()
      setComparisons(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteComparison = async (id: string) => {
    try {
      const response = await fetch(`/api/saved-comparisons/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete comparison')
      setComparisons(comparisons.filter((c) => c.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-BE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Archive className="h-5 w-5" />
          Comparaisons Sauvegardées
        </CardTitle>
        <CardDescription>
          {comparisons.length} comparaison{comparisons.length !== 1 ? 's' : ''} disponible{comparisons.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center text-muted-foreground">Chargement...</div>
        ) : error ? (
          <div className="text-sm text-red-500">{error}</div>
        ) : comparisons.length === 0 ? (
          <div className="text-center text-muted-foreground">
            Aucune comparaison sauvegardée. Créez une comparaison et sauvegardez-la pour la retrouver ici.
          </div>
        ) : (
          <div className="space-y-3">
            {comparisons.map((comparison) => (
              <div
                key={comparison.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{comparison.title}</p>
                    <Badge variant="outline" className="capitalize">
                      {comparison.consumerType === 'residential' ? 'Particulier' : 'PME'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Consommation: {comparison.monthlyConsumption} EUR/mois
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm">
                      <span className="font-semibold text-primary">
                        Économies estimées: €{comparison.estimatedSavings}/an
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Sauvegardée le {formatDate(comparison.createdAt)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteComparison(comparison.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
