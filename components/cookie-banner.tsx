"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Cookie, Shield, X } from "lucide-react"

const COOKIE_CONSENT_KEY = "jeconomise_cookie_consent"

interface CookieConsent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  timestamp: number
}

// Export pour récupérer les préférences de consentement dans d'autres composants
export function getConsentPreferences(): CookieConsent | null {
  if (typeof window === "undefined") return null
  try {
    const saved = localStorage.getItem(COOKIE_CONSENT_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
    timestamp: 0,
  })

  useEffect(() => {
    // Check if user has already given consent
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!savedConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const saveConsent = (consentData: CookieConsent) => {
    const dataWithTimestamp = { ...consentData, timestamp: Date.now() }
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(dataWithTimestamp))
    setShowBanner(false)

    // If analytics accepted, enable Google Analytics
    if (consentData.analytics && typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      })
    }

    // If marketing accepted, enable marketing cookies
    if (consentData.marketing && typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      })
    }
  }

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    })
  }

  const acceptNecessary = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    })
  }

  const savePreferences = () => {
    saveConsent(consent)
  }

  if (!showBanner) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Main Banner */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Cookie className="size-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Protection de vos donnees</h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic. 
                En cliquant sur &quot;Accepter tout&quot;, vous consentez à l&apos;utilisation de cookies et au traitement 
                des données que vous nous transmettez via le formulaire : nom, prénom, email, téléphone, 
                adresse, conformément à notre politique de confidentialité.
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={acceptNecessary}
            >
              <X className="size-4" />
              <span className="sr-only">Fermer</span>
            </Button>
          </div>

          {/* Detailed preferences */}
          {showDetails && (
            <div className="mt-6 space-y-4 border-t pt-6">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Shield className="size-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Cookies necessaires</p>
                    <p className="text-xs text-muted-foreground">Essentiels au fonctionnement du site</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Toujours actif</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="size-5 rounded bg-blue-500/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">A</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Cookies analytiques</p>
                    <p className="text-xs text-muted-foreground">Nous aident a comprendre l&apos;utilisation du site</p>
                  </div>
                </div>
                <button
                  onClick={() => setConsent(prev => ({ ...prev, analytics: !prev.analytics }))}
                  className={`w-12 h-6 rounded-full transition-colors ${consent.analytics ? "bg-primary" : "bg-muted-foreground/30"}`}
                >
                  <span className={`block size-5 rounded-full bg-white shadow transition-transform ${consent.analytics ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="size-5 rounded bg-orange-500/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-orange-600">M</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Cookies marketing</p>
                    <p className="text-xs text-muted-foreground">Permettent de personnaliser les publicites</p>
                  </div>
                </div>
                <button
                  onClick={() => setConsent(prev => ({ ...prev, marketing: !prev.marketing }))}
                  className={`w-12 h-6 rounded-full transition-colors ${consent.marketing ? "bg-primary" : "bg-muted-foreground/30"}`}
                >
                  <span className={`block size-5 rounded-full bg-white shadow transition-transform ${consent.marketing ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Masquer les details" : "Personnaliser"}
            </Button>
            {showDetails ? (
              <Button className="flex-1" onClick={savePreferences}>
                Enregistrer mes preferences
              </Button>
            ) : (
              <>
                <Button variant="outline" className="flex-1" onClick={acceptNecessary}>
                  Necessaires uniquement
                </Button>
                <Button className="flex-1" onClick={acceptAll}>
                  Accepter tout
                </Button>
              </>
            )}
          </div>

          {/* Legal links */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <a href="/politique-de-confidentialite" className="hover:text-primary transition-colors">
              Politique de confidentialité
            </a>
            <span>|</span>
            <a href="/mentions-legales" className="hover:text-primary transition-colors">
              Mentions légales
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, string>) => void
  }
}
