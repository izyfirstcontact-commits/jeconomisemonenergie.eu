"use client"

import { motion } from "framer-motion"
import { Shield, Award, Users, Zap } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: Shield,
    title: "Sécurité renforcée",
    description: "Données protégées, traitement conforme RGPD et confidentialité garantie.",
  },
  {
    icon: Award,
    title: "Conseillers certifiés",
    description: "Un accompagnement expert pour vous aider à choisir l'offre la plus avantageuse.",
  },
  {
    icon: Users,
    title: "Expérience personnalisée",
    description: "Chaque solution est adaptée à votre foyer, vos habitudes et votre budget.",
  },
  {
    icon: Zap,
    title: "Processus simplifié",
    description: "Nous gérons l'ensemble des démarches, vous profitez des économies rapidement.",
  },
]

const logos = [
  { name: "Engie", path: "/logos/engie.png" },
  { name: "Luminus", path: "/logos/luminus.png" },
  { name: "TotalEnergies", path: "/logos/totalenergies.png" },
  { name: "Eneco", path: "/logos/eneco.png" },
  { name: "Mega", path: "/logos/mega.png" },
  { name: "Octa+", path: "/logos/octa-plus.png" },
  { name: "Ecofix", path: "/logos/ecofix.png" },
  { name: "Frank Énergie", path: "/logos/frank-energie.png" },
]

export function TrustSection() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 bg-secondary/30">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.06),_transparent_40%)]" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-14 space-y-4">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary font-semibold">Partenaires et garanties</p>
          <h2 className="text-xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl text-balance">
            Toutes les offres belges, triées pour votre confort.
          </h2>
          <p className="mx-auto max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground">
            Comparez en quelques minutes et accédez à une analyse client premium, chiffrée et transparente.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 md:p-8 shadow-sm">
          <p className="text-center text-sm text-muted-foreground mb-6 font-medium">Fournisseurs comparés</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 px-2 py-2">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex flex-col items-center gap-2 min-w-[6rem] md:min-w-[8rem] text-center transition hover:scale-105"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 relative bg-secondary/50 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={logo.path}
                    alt={`${logo.name} logo`}
                    width={64}
                    height={64}
                    className="w-10 h-10 md:w-14 md:h-14 object-contain"
                  />
                </div>
                <span className="text-xs md:text-sm font-semibold text-foreground/80">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 md:mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm transition hover:shadow-md hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-6 md:size-7" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
