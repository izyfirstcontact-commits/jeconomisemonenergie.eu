import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Image from "next/image"

const suppliers = [
  { name: "Engie", note: "Électricité & gaz", logo: "/logos/engie.png" },
  { name: "Luminus", note: "Électricité & gaz", logo: "/logos/luminus.png" },
  { name: "Mega", note: "Tarifs compétitifs", logo: "/logos/mega.png" },
  { name: "Octa+", note: "Fournisseur belge", logo: "/logos/octa-plus.png" },
  { name: "Eneco", note: "Énergie durable", logo: "/logos/eneco.png" },
  { name: "Ecofix", note: "Prix fixe vert", logo: "/logos/ecofix.png" },
  { name: "Frank Énergie", note: "100% renouvelable", logo: "/logos/frank-energie.png" },
  { name: "TotalEnergies", note: "Électricité & gaz", logo: "/logos/totalenergies.png" },
]

export function SuppliersSection() {
  return (
    <section id="fournisseurs" className="py-12 md:py-20 bg-card">
      <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 font-medium">Fournisseurs belges</Badge>
          <h2 className="text-xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl text-balance">
            Fournisseurs belges comparés
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground">
            Jeconomisemonenergie.eu compare les principaux fournisseurs d{"'"}énergie actifs à Bruxelles, en Wallonie et en
            Flandre pour trouver l{"'"}offre la plus avantageuse selon votre consommation.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {suppliers.map((supplier) => (
            <li
              key={supplier.name}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-background px-4 py-6 text-center transition hover:border-primary/40 hover:shadow-md"
            >
              <div className="w-16 h-16 relative bg-secondary/50 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={supplier.logo}
                  alt={`${supplier.name} logo`}
                  width={64}
                  height={64}
                  className="w-14 h-14 object-contain"
                />
              </div>
              <span className="text-base md:text-lg font-bold text-foreground">{supplier.name}</span>
              <span className="text-xs text-muted-foreground">{supplier.note}</span>
              <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary">
                <Check className="size-3.5" />
                Comparé
              </span>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          Les noms et marques cités appartiennent à leurs propriétaires respectifs. Jeconomisemonenergie.eu est un service de
          comparaison indépendant et n{"'"}est affilié à aucun fournisseur.
        </p>
      </div>
    </section>
  )
}
