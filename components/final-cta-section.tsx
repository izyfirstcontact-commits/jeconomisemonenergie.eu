"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function FinalCTASection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-border bg-card p-6 md:p-10 shadow-sm"
        >
          <div className="grid gap-6 md:gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">Prêt à économiser ?</Badge>
              <h2 className="text-xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl text-balance">
                Lancez votre bilan énergie et recevez une proposition sur mesure.
              </h2>
              <p className="max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground">
                Avec JECONOMISEMONENERGIE.EU, vous bénéficiez d{"'"}un comparateur expert et d{"'"}un accompagnement complet sans aucun engagement.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:gap-4 sm:flex-row sm:justify-end">
              <Button asChild size="lg" className="w-full sm:w-auto min-h-[56px] shadow-lg hover:shadow-xl transition-shadow">
                <a href="/#formulaire">Démarrer ma simulation</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto min-h-[56px] border-2">
                <a href="/#faq">Voir la FAQ</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
