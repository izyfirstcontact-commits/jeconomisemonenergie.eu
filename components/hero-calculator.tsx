"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, TrendingDown } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { GateResultModal } from "@/components/gate-result-modal"
import { ShareableScoreCard } from "@/components/shareable-score-card"
import {
  SLIDER_MAX,
  SLIDER_MIN,
  SLIDER_STEP,
  type LeadContact,
  computeSavings,
  formatEUR,
  generateReferralCode,
  getStoredLead,
  saveLead,
} from "@/lib/savings"

export function HeroCalculator() {
  const [bill, setBill] = useState(150)
  const [gateOpen, setGateOpen] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [referralCode, setReferralCode] = useState("")

  const estimate = useMemo(() => computeSavings(bill), [bill])

  // Reprise d'un visiteur déjà identifié (localStorage, pas de base de données).
  useEffect(() => {
    const stored = getStoredLead()
    if (stored) {
      setBill(stored.monthlyBill)
      setReferralCode(stored.referralCode)
      setUnlocked(true)
    } else {
      setReferralCode(generateReferralCode())
    }
  }, [])

  function handleUnlock(contact: LeadContact) {
    const code = referralCode || generateReferralCode()
    saveLead({
      ...contact,
      monthlyBill: estimate.monthlyBill,
      yearlySavings: estimate.yearlySavings,
      score: estimate.score,
      clientType: "particulier",
      referralCode: code,
      createdAt: new Date().toISOString(),
    })
    setReferralCode(code)
    setUnlocked(true)
    setGateOpen(false)
  }

  return (
    <section className="mx-auto w-full max-w-xl">
      <div className="rounded-3xl border border-border bg-card p-6 premium-shadow md:p-8">
        <div className="mb-5 flex items-center gap-2">
          <Badge className="gap-1 bg-primary/10 text-primary border-primary/20 font-medium">
            <Sparkles className="size-3.5" />
            Estimateur gratuit
          </Badge>
        </div>

        <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl text-balance">
          Quelle est votre facture d{"'"}énergie mensuelle ?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Déplacez le curseur pour estimer vos économies en direct.
        </p>

        {/* Valeur courante du curseur */}
        <div className="mt-6 flex items-end justify-between">
          <span className="text-sm font-medium text-muted-foreground">Facture mensuelle</span>
          <span className="text-2xl font-extrabold text-foreground">
            {formatEUR(bill)}
            <span className="text-base font-medium text-muted-foreground">/mois</span>
          </span>
        </div>

        <div className="mt-4">
          <Slider
            value={[bill]}
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            step={SLIDER_STEP}
            onValueChange={(v) => setBill(v[0])}
            aria-label="Facture mensuelle en euros"
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{SLIDER_MIN} EUR</span>
            <span>{SLIDER_MAX}+ EUR</span>
          </div>
        </div>

        {/* Résultat : flouté tant que l'e-mail n'est pas fourni */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {unlocked ? (
              <motion.div key="unlocked" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <ShareableScoreCard estimate={estimate} referralCode={referralCode} />
              </motion.div>
            ) : (
              <motion.button
                key="locked"
                type="button"
                onClick={() => setGateOpen(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative block w-full overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-5 text-left transition hover:border-primary/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Économie annuelle estimée</p>
                    <p className="select-none text-3xl font-extrabold text-primary blur-md" aria-hidden="true">
                      {formatEUR(estimate.yearlySavings)}
                    </p>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <TrendingDown className="size-6" />
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                  Révéler mon économie
                  <ArrowRight className="size-4" />
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <GateResultModal
        open={gateOpen}
        onOpenChange={setGateOpen}
        estimate={estimate}
        referralCode={referralCode}
        onUnlock={handleUnlock}
      />
    </section>
  )
}
