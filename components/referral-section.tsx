"use client"

import { useEffect, useState } from "react"
import { Check, Copy, Gift, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getStoredLead, generateReferralCode } from "@/lib/savings"

export function ReferralSection() {
  const [referralUrl, setReferralUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const stored = getStoredLead()
    const code = stored?.referralCode || generateReferralCode()
    const origin = window.location.origin
    setReferralUrl(`${origin}/?ref=${code}`)
  }, [])

  const message = `Je viens de découvrir combien je peux économiser sur mon énergie en Belgique. Calcule ton économie gratuitement avec mon lien : ${referralUrl}`

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Clipboard indisponible.
    }
  }

  async function handleNativeShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Économisez sur votre énergie", text: message, url: referralUrl })
      } catch {
        // Annulé.
      }
    } else {
      handleCopy()
    }
  }

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(message)}`

  return (
    <section className="mx-auto w-full max-w-2xl px-4">
      <div className="rounded-3xl border border-primary/20 bg-card p-6 premium-shadow md:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
            <Gift className="size-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground md:text-xl">Parrainez vos proches</h2>
            <p className="text-sm text-muted-foreground">Partagez votre lien unique et aidez-les à économiser.</p>
          </div>
        </div>

        {/* Lien unique */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input value={referralUrl} readOnly aria-label="Votre lien de parrainage" className="font-mono text-sm" />
          <Button onClick={handleCopy} variant="outline" className="shrink-0 gap-2 bg-transparent">
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copié" : "Copier"}
          </Button>
        </div>

        {/* Boutons de partage */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="flex-1 gap-2 bg-[#25D366] text-white hover:bg-[#1ebe5b]"
          >
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-5" />
              Partager sur WhatsApp
            </a>
          </Button>
          <Button onClick={handleNativeShare} variant="outline" size="lg" className="flex-1 gap-2 bg-transparent">
            <Share2 className="size-5" />
            Autres options
          </Button>
        </div>
      </div>
    </section>
  )
}
