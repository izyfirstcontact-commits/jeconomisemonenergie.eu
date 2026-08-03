'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react'

export function SeedDataButton() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSeed = async () => {
    try {
      setLoading(true)
      setStatus('idle')

      const response = await fetch('/api/seed', { method: 'POST' })
      const data = await response.json()

      if (!response.ok) {
        setStatus('error')
        setMessage(data.error || 'Erreur lors de l\'insertion')
        return
      }

      setStatus('success')
      setMessage(`Succès! ${data.data.analytics} analyses, ${data.data.savings} économies, ${data.data.interactions} fournisseurs, ${data.data.alerts} alertes`)

      // Refresh page after 2 seconds
      setTimeout(() => window.location.reload(), 2000)
    } catch (err) {
      setStatus('error')
      setMessage('Erreur réseau')
      console.error('[v0] Seed error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleSeed}
        disabled={loading}
        variant="default"
        className="w-full sm:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Chargement...
          </>
        ) : (
          'Remplir avec des données d\'exemple'
        )}
      </Button>

      {status === 'success' && (
        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-3 rounded-md border border-green-200">
          <CheckCircle className="h-4 w-4" />
          <span>{message}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 p-3 rounded-md border border-red-200">
          <AlertCircle className="h-4 w-4" />
          <span>{message}</span>
        </div>
      )}
    </div>
  )
}
