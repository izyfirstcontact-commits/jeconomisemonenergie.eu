import type { Metadata } from "next"
import { SiloPageTemplate, type ContentSection } from "@/components/silo-page-template"
import { SILO_PAGES, getAlternates, SITE_URL } from "@/lib/seo"

const page = SILO_PAGES.find((p) => p.slug === "comparateur-energie-belgique")!

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  alternates: getAlternates(`/${page.slug}`),
  openGraph: {
    title: page.title,
    description: page.description,
    url: `${SITE_URL}/${page.slug}`,
    locale: "fr_BE",
    type: "article",
  },
}

const intro =
  "Que vous habitiez à Bruxelles, en Wallonie ou en Flandre, votre facture d'électricité et de gaz dépend autant de votre fournisseur que de votre région. Un comparateur d'énergie belge tient compte de votre gestionnaire de réseau (Sibelga, ORES, RESA ou Fluvius) et de votre consommation réelle pour identifier l'offre la plus avantageuse. En moyenne, un ménage qui n'a jamais comparé peut économiser jusqu'à 35 % sur la part énergie de sa facture."

const highlights = [
  "Bruxelles, Wallonie et Flandre",
  "Électricité et gaz comparés",
  "Tous les fournisseurs belges",
  "Gratuit et sans engagement",
]

const sections: ContentSection[] = [
  {
    id: "trois-regions",
    heading: "Un marché unique, trois régions, quatre gestionnaires de réseau",
    paragraphs: [
      "La Belgique a libéralisé son marché de l'énergie : chaque consommateur, particulier comme PME, choisit librement son fournisseur d'électricité et de gaz. Mais le pays reste organisé en trois régions, chacune dotée de son propre régulateur et de ses propres gestionnaires de réseau de distribution (GRD), ce qui influence directement les coûts de réseau facturés.",
      "À Bruxelles-Capitale, le GRD unique est Sibelga et le régulateur régional est Brugel. En Wallonie, la distribution est assurée principalement par ORES et par RESA (région liégeoise), sous la supervision de la CWaPE. En Flandre, c'est Fluvius qui gère l'ensemble du réseau, encadré par la VREG. Le régulateur fédéral, la CREG, surveille quant à lui les tarifs au niveau national.",
      "Concrètement, deux ménages avec la même consommation mais situés dans des régions différentes ne paient pas exactement la même facture, car les coûts de réseau et certaines surcharges varient. Un bon comparateur applique automatiquement les tarifs de votre GRD à partir de votre code postal.",
    ],
  },
  {
    id: "composition-facture",
    heading: "Ce que compare réellement un comparateur d'énergie",
    paragraphs: [
      "Votre facture se compose de trois blocs : le coût de l'énergie (la seule part réellement concurrentielle), les coûts de réseau fixés par votre GRD, et les taxes et surcharges. Comparer les fournisseurs revient donc à optimiser la part énergie, qui pèse suffisamment lourd pour générer des économies concrètes.",
      "Un comparateur fiable ne se limite pas au prix du kWh : il intègre la redevance fixe annuelle, le type de contrat (fixe ou variable), la part d'énergie verte, les promotions de bienvenue et votre profil de compteur (simple, bihoraire ou exclusif nuit).",
    ],
    bullets: [
      "Le prix du kWh d'électricité et du gaz, et la redevance fixe annuelle",
      "Le type de contrat : tarif fixe (stable) ou variable (indexé sur le marché)",
      "Votre gestionnaire de réseau selon la région : Sibelga, ORES, RESA ou Fluvius",
      "Le type de compteur : simple, bihoraire, exclusif nuit ou communicant",
      "Les promotions, kWh offerts et réductions de bienvenue",
      "La part d'énergie renouvelable et la qualité du service client",
    ],
  },
  {
    id: "electricite-et-gaz",
    heading: "Comparer électricité et gaz ensemble : l'offre double énergie",
    paragraphs: [
      "De nombreux fournisseurs belges proposent des contrats « double énergie » regroupant l'électricité et le gaz. Ces offres combinées s'accompagnent souvent d'une remise et simplifient la gestion avec une facture unique. Le comparateur simule à la fois l'offre groupée et deux contrats séparés, afin de vérifier laquelle est réellement la plus avantageuse pour votre profil.",
      "Pour le gaz, la zone tarifaire (indices TTF ou ZTP selon les contrats) et la redevance fixe peuvent faire varier sensiblement le total annuel. Pour l'électricité, le choix entre compteur simple et bihoraire dépend de la part de votre consommation en heures creuses. Notre simulateur teste ces scénarios automatiquement.",
    ],
  },
  {
    id: "economies-belgique",
    heading: "Quelles économies espérer en Belgique en 2026 ?",
    paragraphs: [
      "Les économies dépendent de votre contrat actuel et de votre consommation. Un ménage resté chez son fournisseur historique depuis plusieurs années paie souvent un tarif bien au-dessus du marché : le passage à l'offre la plus compétitive peut représenter plusieurs centaines d'euros par an sur la part énergie.",
      "Notre comparateur calcule votre économie potentielle en moins de deux minutes, à partir de votre consommation réelle ou estimée. Vous obtenez une estimation claire et, si vous le souhaitez, nos conseillers vous accompagnent gratuitement dans le changement, sans aucune coupure ni démarche technique.",
    ],
  },
]

const faqs = [
  {
    question: "Le comparateur fonctionne-t-il partout en Belgique ?",
    answer:
      "Oui. Notre comparateur couvre les trois régions et tous les gestionnaires de réseau : Sibelga à Bruxelles, ORES et RESA en Wallonie, et Fluvius en Flandre. Il applique automatiquement les tarifs de votre GRD à partir de votre code postal.",
  },
  {
    question: "Quelle est la différence entre le fournisseur et le gestionnaire de réseau ?",
    answer:
      "Le gestionnaire de réseau (Sibelga, ORES, RESA, Fluvius) achemine l'énergie et entretient le réseau ; il ne change jamais et ne se choisit pas. Le fournisseur est l'entreprise auprès de laquelle vous payez votre énergie, et vous pouvez en changer librement et gratuitement.",
  },
  {
    question: "Vaut-il mieux une offre double énergie ou deux contrats séparés ?",
    answer:
      "Cela dépend de votre profil. Les offres double énergie incluent souvent une remise et une facture unique, mais deux contrats séparés peuvent parfois être moins chers. Notre comparateur simule les deux scénarios pour vous indiquer le plus avantageux.",
  },
  {
    question: "Comparer les prix de l'énergie est-il gratuit ?",
    answer:
      "Oui, totalement. La comparaison est gratuite et sans engagement. Nous sommes rémunérés par les fournisseurs uniquement si vous décidez de souscrire, ce qui ne change rien au prix que vous payez.",
  },
  {
    question: "Le changement de fournisseur entraîne-t-il une coupure ?",
    answer:
      "Non. Le changement est purement administratif : votre compteur reste identique et l'alimentation continue sans interruption. Le nouveau fournisseur se charge de résilier votre ancien contrat.",
  },
]

export default function ComparateurEnergieBelgiquePage() {
  return (
    <SiloPageTemplate
      slug={page.slug}
      h1={page.h1}
      intro={intro}
      region={page.region}
      highlights={highlights}
      sections={sections}
      faqs={faqs}
    />
  )
}
