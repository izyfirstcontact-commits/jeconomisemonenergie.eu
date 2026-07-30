'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Favorite } from '@/lib/types/dashboard'

export function FavoritesSection() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/favorites')
      if (!response.ok) throw new Error('Failed to fetch favorites')
      const data = await response.json()
      setFavorites(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const removeFavorite = async (id: string) => {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to remove favorite')
      setFavorites(favorites.filter((f) => f.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Mes Offres Favoris
        </CardTitle>
        <CardDescription>
          {favorites.length} offre{favorites.length !== 1 ? 's' : ''} sauvegardée{favorites.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center text-muted-foreground">Chargement...</div>
        ) : error ? (
          <div className="text-sm text-red-500">{error}</div>
        ) : favorites.length === 0 ? (
          <div className="text-center text-muted-foreground">
            Aucune offre sauvegardée. Explorez nos offres partenaires pour en ajouter une.
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div>
                  <p className="font-medium">{favorite.supplierName}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {favorite.offerType.replace('_', ' ')}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFavorite(favorite.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Supprimer
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
