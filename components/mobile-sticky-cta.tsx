"use client"

import { useState, useEffect } from "react"
import { Phone, ArrowUp } from "lucide-react"

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 520)
      setShowScrollTop(window.scrollY > 900)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-4 mb-4 rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur-xl">
          <a
            href="/#formulaire"
            className="flex items-center justify-center gap-3 w-full rounded-xl bg-primary px-5 py-4 text-center text-sm font-semibold text-primary-foreground shadow-md transition hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
          >
            <Phone className="size-5" />
            Verifier mes economies
          </a>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            100% gratuit - Sans engagement - Resultats rapides
          </p>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        aria-label="Retour en haut"
        className={`fixed bottom-24 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="size-5" />
      </button>
    </>
  )
}
