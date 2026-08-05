"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Shield, Sparkles, Users, Clock } from "lucide-react"

const features = [
  {
    title: "Analyse instantanée",
    description:
      "Une estimation claire et personnalisée en quelques clics, sans paperasse inutile.",
    icon: Sparkles,
  },
  {
    title: "Offres exclusives",
    description:
      "Nous comparons plus de 30 fournisseurs pour vous proposer les meilleures économies réelles.",
    icon: Shield,
  },
  {
    title: "Accompagnement humain",
    description:
      "Un conseiller dédié vous guide pas à pas pour garantir une transition simple et sereine.",
    icon: Users,
  },
  {
    title: "Résultats mesurables",
    description:
      "Des propositions chiffrées et transparentes, basées sur votre consommation réelle.",
    icon: Clock,
  },
]

export function FeatureSection() {
  return (
    <section id="features" className="relative overflow-hidden py-12 md:py-20">
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.06),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.05),_transparent_35%)]" />
      <div className="relative mx-auto w-full px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-[1fr_0.8fr_1fr] items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src="/images/family-savings.png"
              alt="Famille belge heureuse"
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </motion.div>

          <div className="space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">Avantages</Badge>
            <h2 className="text-xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl text-balance">
              Une expérience premium pour maîtriser votre budget énergie.
            </h2>
            <p className="max-w-2xl text-sm md:text-lg leading-relaxed text-muted-foreground">
              Nous combinons technologie, expertise et accompagnement humain pour vous faire économiser davantage, sans rien changer à votre quotidien.
            </p>
            <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group rounded-2xl border border-border bg-card p-4 md:p-6 shadow-sm transition hover:shadow-md"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5 md:size-6" />
                    </div>
                    <h3 className="text-base md:text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 md:p-8 shadow-sm">
            <div className="space-y-6">
              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent p-5 md:p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Stratégie d{"'"}économies</p>
                <h3 className="mt-3 text-xl md:text-3xl font-bold text-foreground text-balance">Performance améliorée, facture réduite.</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Un suivi proactif et des recommandations claires pour prendre les meilleures décisions en toute confiance.
                </p>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-secondary/50 p-5">
                  <p className="text-2xl md:text-3xl font-bold text-primary">35%</p>
                  <p className="mt-2 text-sm text-muted-foreground">Économies potentielles</p>
                </div>
                <div className="rounded-2xl border border-border bg-secondary/50 p-5">
                  <p className="text-2xl md:text-3xl font-bold text-primary">4.9/5</p>
                  <p className="mt-2 text-sm text-muted-foreground">Note moyenne client</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src="/images/woman-confidence.png"
              alt="Femme confiance économies"
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
