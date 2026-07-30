"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const SESSION_KEY = "floating-help-widget-seen"
const INACTIVITY_DELAY = 25_000 // 25 secondes

export function FloatingHelpWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Une fois "vu" (auto-ouvert ou fermé) dans la session, plus d'ouverture auto.
  const seenRef = useRef(false)

  const markSeen = useCallback(() => {
    seenRef.current = true
    try {
      sessionStorage.setItem(SESSION_KEY, "1")
    } catch {
      // sessionStorage indisponible (mode privé strict) : on ignore.
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const openChat = useCallback(() => {
    setIsOpen(true)
    markSeen()
  }, [markSeen])

  const closeChat = useCallback(() => {
    setIsOpen(false)
    markSeen()
  }, [markSeen])

  // Déclencheur automatique : 25s d'inactivité, une seule fois par session.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        seenRef.current = true
      }
    } catch {
      // ignore
    }

    if (seenRef.current) return

    const resetTimer = () => {
      if (seenRef.current) return
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setIsOpen(true)
        markSeen()
      }, INACTIVITY_DELAY)
    }

    const events: (keyof WindowEventMap)[] = ["click", "scroll", "keydown", "mousemove", "touchstart"]
    events.forEach((event) => window.addEventListener(event, resetTimer, { passive: true }))
    resetTimer()

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [markSeen])

  // "Oui, commencer" : amène l'utilisateur au formulaire d'estimation.
  const goToEstimateur = useCallback(() => {
    closeChat()
    const el = document.getElementById("calculateur")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      window.location.href = "/#calculateur"
    }
  }, [closeChat])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Fenêtre de chat */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Assistance"
          className="w-[calc(100vw-3rem)] max-w-sm origin-bottom-right animate-in fade-in slide-in-from-bottom-4 duration-200 rounded-2xl border border-border bg-card p-5 shadow-2xl"
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-lg font-bold text-foreground">Bonjour 👋</h2>
            <button
              type="button"
              onClick={closeChat}
              aria-label="Fermer la fenêtre d'assistance"
              className="-mr-1 -mt-1 rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Je peux estimer gratuitement vos économies. Cela prend moins de 2 minutes.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <Button onClick={goToEstimateur} className="w-full">
              Oui, commencer
            </Button>
            <Button onClick={closeChat} variant="ghost" className="w-full">
              Non merci
            </Button>
          </div>
        </div>
      )}

      {/* Bouton flottant */}
      {!isOpen && (
        <button
          type="button"
          onClick={openChat}
          aria-label="Besoin d'aide ? Ouvrir l'assistance"
          className="flex items-center gap-2 rounded-full bg-primary py-3 pl-4 pr-5 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            💬
          </span>
          Besoin d{"'"}aide ?
        </button>
      )}
    </div>
  )
}
