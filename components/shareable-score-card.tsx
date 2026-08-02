"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Award, Check, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type SavingsEstimate, formatEUR, getScoreLabel } from "@/lib/savings"

type ShareableScoreCardProps = {
  estimate: SavingsEstimate
  referralCode?: string
}

export function ShareableScoreCard({ estimate, referralCode }: ShareableScoreCardProps) {
  const [copied, setCopied] = useState(false)

  const ogImageUrl = `/api/og?bill=${estimate.monthlyBill}`

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${referralCode ? `?ref=${referralCode}` : ""}`
      : "https://jeconomisemonenergie.eu/"

  const shareText = `J'ai obtenu un score de ${estimate.score}/100 et je peux économiser ${formatEUR(
    estimate.yearlySavings,
  )}/an sur mon énergie ! Calculez le vôtre :`

  async function handleShare() {
    const data = { title: "Mon score d'économies", text: shareText, url: shareUrl }
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data)
        return
      } catch {
        // L'utilisateur a annulé : on retombe sur la copie.
      }
    }
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Clipboard indisponible : rien à faire.
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Carte score (visuel partageable) */}
      <div className="overflow-hidden rounded-3xl border border-primary/20 bg-card premium-shadow">
        <div className="flex items-center justify-between bg-primary px-6 py-4 text-primary-foreground">
          <div className="flex items-center gap-2 font-semibold">
            <Award className="size-5" />
            {getScoreLabel(estimate.score)}
          </div>
          <span className="text-sm opacity-90">Jeconomisemonenergie.eu</span>
        </div>

        <div className="flex flex-col items-center gap-2 px-6 py-8 text-center">
          <p className="text-sm font-medium text-muted-foreground">Votre score d{"'"}économies</p>
          <div className="flex items-baseline gap-1">
            <span className="text-6xl font-extrabold tracking-tight text-primary md:text-7xl">{estimate.score}</span>
            <span className="text-2xl font-bold text-muted-foreground">/100</span>
          </div>
          <p className="mt-2 text-lg text-foreground text-balance">
            Vous pouvez économiser{" "}
            <span className="font-bold text-primary">{formatEUR(estimate.yearlySavings)}/an</span>
          </p>

          <div className="mt-4 grid w-full grid-cols-2 gap-3">
            <div className="rounded-2xl bg-secondary/50 p-4">
              <p className="text-xs text-muted-foreground">Facture actuelle</p>
              <p className="text-lg font-semibold text-foreground">{formatEUR(estimate.monthlyBill)}</p>
            </div>
            <div className="rounded-2xl bg-primary/10 p-4 border border-primary/20">
              <p className="text-xs text-muted-foreground">Facture optimisée</p>
              <p className="text-lg font-semibold text-primary">{formatEUR(estimate.newMonthlyBill)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions de partage */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button onClick={handleShare} size="lg" className="flex-1 gap-2">
          {copied ? <Check className="size-5" /> : <Share2 className="size-5" />}
          {copied ? "Lien copié !" : "Partager mon score"}
        </Button>
        <Button asChild variant="outline" size="lg" className="flex-1 gap-2 bg-transparent">
          <a href={ogImageUrl} target="_blank" rel="noopener noreferrer" download>
            <Download className="size-5" />
            Télécharger l{"'"}image
          </a>
        </Button>
      </div>

      {/* Message de succès */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 rounded-lg border-2 border-green-500 bg-green-50 p-6"
      >
        <p className="text-center text-base leading-relaxed text-green-900 font-bold">
          ✓ Bravo, un conseiller vous contactera sous peu pour vous aider à réaliser cette économie avec le meilleur tarif
        </p>
      </motion.div>
    </motion.div>
  )
}
