"use client"

import { motion } from "framer-motion"
import { MultiStepForm } from "@/components/multi-step-form"
import { Sparkles, Shield, Clock, MapPin, Check, Zap } from "lucide-react"

const trustBadges = [
  { icon: Sparkles, label: "100% Gratuit" },
  { icon: Shield, label: "Sans engagement" },
  { icon: MapPin, label: "Comparateur Belge" },
  { icon: Clock, label: "Réponse rapide" },
]

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden py-8 lg:py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/An_47hnqIDreAR-89Tgn6WR2qUdYTYuhjXE1GHUw3yzuSYS5tkmKtPYGIjyt-2dvwNEl9yPUCUq5rzEBaHDoU-yMeetWY29lRQxozZUIrvNmbpDRyjvwmOWkLN3WFITFHoYrbLxhZ4xdiorWZg3RXPBHOQCbvplRAyNb-RTjYuYS-llhPi_HFYegH3dLAPeJK0wDv3fnKnNicVNXl2W0_X-uibedNfCJ5nmZwvvJREpQt7HVRDKsS.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
      <div className="relative mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:gap-12 lg:grid-cols-[1fr_420px] items-start justify-items-start">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 pt-4 lg:pt-0 max-w-2xl"
          >
            {/* Badge */}
            <span className="inline-block rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground">
              Comparateur Belge
            </span>

            {/* Main Heading */}
            <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl leading-[1.2] md:leading-[1.1]">
              Réduisez votre facture d{"'"}énergie en Belgique avec{" "}
              <span className="text-primary">Jeconomisemonenergie.eu</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-sm md:text-lg leading-relaxed text-muted-foreground">
              Actif à Bruxelles, en Wallonie et en Flandre, Jeconomisemonenergie.eu compare gratuitement le gaz et
              l{"'"}électricité{" "}
              <span className="font-semibold text-foreground">
                (Engie, Luminus, TotalEnergie, Eneco, Octa+, Ecofix, Mega et Bolt)
              </span>{" "}
              selon votre consommation. Jusqu{"'"}à{" "}
              <span className="font-semibold text-foreground">35%</span> d{"'"}économie pour les particuliers et les PME.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
              {trustBadges.map((badge) => {
                const Icon = badge.icon
                return (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2 rounded-full border border-border bg-card px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-foreground"
                  >
                    <Icon className="size-4 text-primary shrink-0" />
                    {badge.label}
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Side - Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
            id="formulaire"
          >
            {/* Form Card with Green Header */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-border bg-card">
              {/* Green Header */}
              <div className="bg-primary px-4 md:px-6 py-4 md:py-5">
                <div className="flex items-start gap-3 md:gap-4">
                  {/* Logo */}
                  <div className="size-10 md:size-12 rounded-xl bg-white flex items-center justify-center shrink-0">
                    <Zap className="size-5 md:size-6 text-amber-500" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base md:text-lg font-bold text-white tracking-wide break-words">
                      JECONOMISEMONENERGIE.EU
                    </h2>
                    <p className="text-white/90 text-xs md:text-sm mt-0.5">
                      Réduisez jusqu{"'"}à 35% votre facture d{"'"}énergie en Belgique
                    </p>
                    
                    {/* Checkmarks */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-white/90 text-xs md:text-sm">
                      <span className="flex items-center gap-1.5">
                        <Check className="size-4" />
                        Comparaison gratuite
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Check className="size-4" />
                        Sans engagement
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Check className="size-4" />
                        Réponse rapide
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Check className="size-4" />
                        Offres adaptées
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-4 md:p-6">
                <MultiStepForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
