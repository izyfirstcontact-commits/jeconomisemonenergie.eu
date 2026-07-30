"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, Home, Building, Building2, Store, Warehouse, Wrench, User, Briefcase } from "lucide-react"
import { useClientType } from "@/components/client-type-context"

type SavingsExample = {
  icon: typeof Home
  type: string
  location: string
  currentBill: number
  newBill: number
  savings: number
  percentage: number
  badge: string | null
  image: string
  imageAlt: string
}

const particulierExamples: SavingsExample[] = [
  {
    icon: Home,
    type: "Appartement",
    location: "Bruxelles",
    currentBill: 120,
    newBill: 85,
    savings: 420,
    percentage: 29,
    badge: "Populaire",
    image: "/images/savings/appartement-bruxelles.jpg",
    imageAlt: "Salon lumineux d'un appartement moderne à Bruxelles avec cuisine ouverte",
  },
  {
    icon: Building,
    type: "Maison",
    location: "Flandre",
    currentBill: 280,
    newBill: 196,
    savings: 1008,
    percentage: 30,
    badge: "Meilleure économie",
    image: "/images/savings/maison-flandre.png",
    imageAlt: "Maison moderne en Flandre équipée de panneaux solaires et d'une pompe à chaleur",
  },
  {
    icon: Building2,
    type: "Studio",
    location: "Wallonie",
    currentBill: 75,
    newBill: 56,
    savings: 228,
    percentage: 25,
    badge: null,
    image: "/images/savings/studio-wallonie.jpg",
    imageAlt: "Intérieur épuré d'un studio en Wallonie avec coin cuisine et salon",
  },
]

const professionnelExamples: SavingsExample[] = [
  {
    icon: Briefcase,
    type: "Bureau",
    location: "Bruxelles",
    currentBill: 450,
    newBill: 315,
    savings: 1620,
    percentage: 30,
    badge: "Populaire",
    image: "/images/savings/pro-bureau.png",
    imageAlt: "Espace de bureau professionnel moderne et lumineux",
  },
  {
    icon: Store,
    type: "Commerce",
    location: "Flandre",
    currentBill: 680,
    newBill: 476,
    savings: 2448,
    percentage: 30,
    badge: "Meilleure économie",
    image: "/images/savings/pro-commerce.png",
    imageAlt: "Intérieur d'un commerce de détail moderne et accueillant",
  },
  {
    icon: Warehouse,
    type: "Entrepôt",
    location: "Wallonie",
    currentBill: 1200,
    newBill: 900,
    savings: 3600,
    percentage: 25,
    badge: null,
    image: "/images/savings/pro-entrepot.png",
    imageAlt: "Entrepôt industriel moderne avec éclairage LED et rayonnages",
  },
  {
    icon: Wrench,
    type: "Atelier",
    location: "Flandre",
    currentBill: 540,
    newBill: 405,
    savings: 1620,
    percentage: 25,
    badge: null,
    image: "/images/savings/pro-atelier.png",
    imageAlt: "Atelier professionnel d'artisan avec établis et outillage",
  },
]

export function SavingsCards() {
  // Type de client partagé avec le formulaire (toggle synchronisé)
  const { clientType: profile, setClientType: setProfile } = useClientType()
  const isPro = profile === "professionnel"
  const examples = isPro ? professionnelExamples : particulierExamples

  return (
    <section id="economies" className="py-12 md:py-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 font-medium">Exemples d{"'"}économies</Badge>
          <h2 className="text-xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl text-balance">
            Ce que nos clients économisent en moyenne.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground">
            Des profils variés, des économies réelles et une approche premium pour alléger votre budget énergie.
          </p>
        </div>

        {/* Toggle Particulier / Professionnel */}
        <div className="mb-8 md:mb-12 flex justify-center">
          <div
            role="tablist"
            aria-label="Choisir un type de profil"
            className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 shadow-sm"
          >
            {[
              { value: "particulier" as const, label: "Particulier", icon: User },
              { value: "professionnel" as const, label: "Professionnel", icon: Briefcase },
            ].map((opt) => {
              const Icon = opt.icon
              const active = profile === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setProfile(opt.value)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-base font-medium transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={profile}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-6 grid-cols-1 sm:grid-cols-2 ${isPro ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
          >
            {examples.map((example, index) => {
              const Icon = example.icon
              return (
                <motion.div
                  key={example.type}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Card className="relative overflow-hidden border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-md h-full flex flex-col">
                    {/* Visuel */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={example.image || "/placeholder.svg"}
                        alt={example.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                      {example.badge && (
                        <div className="absolute right-3 top-3">
                          <Badge
                            variant={example.badge === "Meilleure économie" ? "default" : "secondary"}
                            className={example.badge === "Meilleure économie" ? "bg-primary" : ""}
                          >
                            {example.badge}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3">
                        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="size-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold text-foreground">{example.type}</CardTitle>
                          <p className="text-sm text-muted-foreground">{example.location}</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6 mt-auto">
                      <div className="flex items-center justify-between gap-2 md:gap-3 rounded-2xl bg-secondary/50 p-4">
                        <div className="min-w-0">
                          <p className="text-sm text-muted-foreground">Avant</p>
                          <p className="text-base md:text-lg font-semibold text-foreground break-words">
                            {example.currentBill} EUR/mois
                          </p>
                        </div>
                        <TrendingDown className="size-5 md:size-6 text-primary shrink-0" />
                        <div className="text-right min-w-0">
                          <p className="text-sm text-muted-foreground">Après</p>
                          <p className="text-base md:text-lg font-semibold text-primary break-words">
                            {example.newBill} EUR/mois
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-primary/10 p-4 text-center border border-primary/20">
                        <p className="text-sm text-muted-foreground mb-1">Économie annuelle</p>
                        <p className="text-2xl md:text-3xl font-bold text-primary">
                          {example.savings.toLocaleString("fr-BE")} EUR
                        </p>
                        <p className="mt-1 text-sm font-medium text-primary/80">soit -{example.percentage}%</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 md:mt-12 text-center">
          <a
            href="/#formulaire"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-primary px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
          >
            Calculer mes économies
          </a>
        </div>
      </div>
    </section>
  )
}
