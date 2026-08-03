"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Clock, TrendingDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

interface Fournisseur {
  nom: string
  logo_url?: string
}

interface Offre {
  id: string
  nom_offre: string
  type_energie: string
  type_compteur: string
  type_prix: string
  duree_mois: number
  prix_kwh_hp?: number
  prix_kwh_hc?: number
  prix_kwh_mono?: number
  redevance_elec_an?: number
  prix_kwh_gaz?: number
  redevance_gaz_an?: number
  fournisseurs: Fournisseur
}

interface TarifsResponse {
  data: Offre[]
  error?: string
}

export function TarifsSection() {
  const [offres, setOffres] = useState<Offre[]>([])
  const [lastUpdate, setLastUpdate] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchOffres() {
      try {
        setLoading(true)
        const response = await fetch("/api/tarifs")
        const result: TarifsResponse = await response.json()

        if (result.error) {
          setError("Impossible de charger les offres tarifaires")
        } else {
          setOffres(result.data || [])
          const now = new Date().toLocaleDateString('fr-BE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })
          setLastUpdate(now)
        }
      } catch (err) {
        console.error("[v0] Error fetching offres:", err)
        setError("Erreur lors du chargement des offres")
      } finally {
        setLoading(false)
      }
    }

    fetchOffres()
  }, [])

  if (error) {
    return (
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto w-full px-4 md:px-6 lg:px-8">
        {/* Image Grid Wrapper */}
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr_1fr] items-start mb-12">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative hidden lg:block h-72 rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Grande%20maison%20Flandre-qUwUDi8hWEqCqLcu1x3JCH1ZEiXR0I.jpg"
              alt="Quartier résidentiel Flandre"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Center Content */}
          <div>
            {/* Header */}
            <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl text-balance">
            Tarifs d{"'"}énergie en Belgique
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Consultez les tarifs actuels des principaux fournisseurs d{"'"}électricité et de gaz.
          </p>
        </div>

        {/* Dernière mise à jour */}
        {lastUpdate && (
          <div className="mb-8 flex items-center justify-center gap-2 rounded-lg bg-primary/5 px-4 py-3 border border-primary/10">
            <Clock className="size-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Dernière MAJ : {lastUpdate}
            </span>
          </div>
        )}

        {/* Offres Grid */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : offres.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offres.map((offre) => (
              <Card key={offre.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{offre.fournisseurs.nom}</h3>
                      <p className="text-sm text-muted-foreground">{offre.nom_offre}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      offre.type_prix === 'Fixe'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {offre.type_prix}
                    </div>
                  </div>

                  {/* Info offre */}
                  <div className="mb-4 pb-4 border-b border-border space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Énergie :</span>
                      <span className="font-medium">{offre.type_energie}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compteur :</span>
                      <span className="font-medium">{offre.type_compteur}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Durée :</span>
                      <span className="font-medium">{offre.duree_mois} mois</span>
                    </div>
                  </div>

                  {/* Tarifs */}
                  <div className="space-y-3 mb-4 pb-4 border-b border-border">
                    {offre.prix_kwh_hp && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">HP (jour)</span>
                        <span className="font-semibold">{offre.prix_kwh_hp?.toFixed(4) || '-'} €/kWh</span>
                      </div>
                    )}
                    {offre.prix_kwh_hc && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">HC (nuit)</span>
                        <span className="font-semibold">{offre.prix_kwh_hc?.toFixed(4) || '-'} €/kWh</span>
                      </div>
                    )}
                    {offre.prix_kwh_mono && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Monophasé</span>
                        <span className="font-semibold">{offre.prix_kwh_mono?.toFixed(4) || '-'} €/kWh</span>
                      </div>
                    )}
                    {offre.prix_kwh_gaz && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Gaz</span>
                        <span className="font-semibold">{offre.prix_kwh_gaz?.toFixed(4) || '-'} €/kWh</span>
                      </div>
                    )}
                  </div>

                  {/* Redevances */}
                  <div className="space-y-2">
                    {offre.redevance_elec_an && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Redevance élec</span>
                        <span className="font-medium">{offre.redevance_elec_an?.toFixed(2) || '-'} €/an</span>
                      </div>
                    )}
                    {offre.redevance_gaz_an && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Redevance gaz</span>
                        <span className="font-medium">{offre.redevance_gaz_an?.toFixed(2) || '-'} €/an</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">Aucune offre disponible pour le moment</p>
            </div>
          )}
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block h-72 rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Appartement%20Bruxelles%2022html-SuQFDEEIETP6HUPa67xVCG06CzFESG.jpg"
              alt="Appartement moderne Bruxelles"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
