'use client'

import { useEffect } from 'react'

/**
 * Composant pour vérifier et logger le statut du pixel Meta
 * Utile pour le debugging en développement
 */
export function MetaPixelDebugger() {
  useEffect(() => {
    // Vérifier que le pixel Meta est chargé
    if (typeof window !== 'undefined' && (window as any).fbq) {
      console.log('[v0] Pixel Meta chargé avec succès')
      console.log('[v0] Pixel ID: 639424978923873')
      console.log('[v0] fbq disponible:', typeof (window as any).fbq)
      
      // Vérifier que la queue est vide (tous les événements ont été envoyés)
      const fbq = (window as any).fbq
      if (fbq && fbq.queue) {
        console.log('[v0] Queue Meta:', fbq.queue.length, 'événements')
      }
    } else {
      console.warn('[v0] Pixel Meta non disponible')
    }
  }, [])

  return null
}
