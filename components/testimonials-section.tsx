"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Marie D.",
    location: "Bruxelles",
    rating: 5,
    savings: "312 EUR/an",
    text: "J'étais sceptique au début, mais le conseiller a pris le temps de m'expliquer toutes les options. Résultat : je paie 26 EUR de moins par mois !",
    date: "Il y a 2 semaines",
  },
  {
    name: "Thomas V.",
    location: "Liège",
    rating: 5,
    savings: "540 EUR/an",
    text: "Service rapide et professionnel. En 15 minutes, j'avais toutes les informations nécessaires. Le changement de fournisseur s'est fait sans aucun souci.",
    date: "Il y a 1 mois",
  },
  {
    name: "Sophie L.",
    location: "Gand",
    rating: 5,
    savings: "468 EUR/an",
    text: "Très satisfaite du service. Le comparateur est simple à utiliser et les économies sont réelles. Je recommande vivement !",
    date: "Il y a 3 semaines",
  },
  {
    name: "Pierre M.",
    location: "Namur",
    rating: 5,
    savings: "624 EUR/an",
    text: "Avec l'augmentation des prix, j'étais inquiet. Grâce à JECONOMISEMONENERGIE.EU, j'ai trouvé une offre bien plus avantageuse. Merci !",
    date: "Il y a 1 semaine",
  },
]

export function TestimonialsSection() {
  return (
    <section id="avis" className="py-12 md:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 space-y-4">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 font-medium">Témoignages</Badge>
          <h2 className="text-xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl text-balance">
            Ils ont déjà réduit leur facture.
          </h2>
          <p className="mx-auto max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground">
            Des avis authentiques, des économies concrètes et un service qui apporte de la sérénité à chaque étape.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="relative overflow-hidden border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md h-full">
                <CardContent className="p-6 space-y-5">
                  <Quote className="size-8 text-primary/20" />
                  <p className="text-sm leading-relaxed text-foreground">{testimonial.text}</p>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <div className="rounded-2xl border border-border bg-secondary/50 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-foreground break-words">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                      </div>
                      <Badge className="text-xs bg-primary/10 text-primary border-primary/20 shrink-0">-{testimonial.savings}</Badge>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">{testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 md:p-6 text-center shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary font-semibold">Preuves sociales</p>
            <p className="mt-3 text-xl md:text-2xl font-bold text-foreground text-balance">15,000+ clients satisfaits en Belgique</p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-xl md:text-2xl font-bold text-primary">4.9/5</p>
            <p className="text-sm text-muted-foreground">Basé sur plus de 3,200 avis authentiques</p>
          </div>
        </div>
      </div>
    </section>
  )
}
