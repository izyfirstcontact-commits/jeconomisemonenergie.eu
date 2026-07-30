import type { Metadata } from "next"
import { SiloPageTemplate, type ContentSection } from "@/components/silo-page-template"
import { SILO_PAGES, getAlternates } from "@/lib/seo"

const page = SILO_PAGES.find((p) => p.slug === "prix-energie-flandre")!

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  alternates: getAlternates(`/${page.slug}`),
  openGraph: {
    title: page.title,
    description: page.description,
    url: `https://jeconomisemonenergie.eu/${page.slug}`,
    locale: "fr_BE",
    type: "article",
  },
}

const intro =
  "Les prix de l'énergie en Flandre suivent les mêmes grandes tendances qu'ailleurs en Belgique, mais avec des spécificités régionales liées au gestionnaire de réseau Fluvius et aux taxes flamandes. Comprendre comment se forme votre facture d'électricité et de gaz en Flandre est la première étape pour la réduire. Notre comparateur vous aide à identifier les meilleures offres et à économiser jusqu'à 35 % sur la part énergie."

const highlights = [
  "Électricité et gaz comparés",
  "Réseau Fluvius",
  "Comparaison gratuite",
  "Sans engagement",
]

const sections: ContentSection[] = [
  {
    id: "composition-prix-flandre",
    heading: "Comment se compose le prix de l'énergie en Flandre",
    paragraphs: [
      "En Flandre comme dans le reste de la Belgique, le prix de l'énergie que vous payez se décompose en plusieurs éléments distincts. Comprendre cette structure est essentiel pour savoir sur quoi vous pouvez réellement agir et où se cachent les économies possibles.",
      "La première composante est le coût de l'énergie elle-même, c'est-à-dire l'électricité ou le gaz fournis. C'est la seule partie soumise à la concurrence entre fournisseurs, et donc la seule sur laquelle vous pouvez économiser en changeant de contrat. La deuxième composante regroupe les coûts de réseau, fixés par le gestionnaire de distribution Fluvius et validés par le régulateur flamand VREG. La troisième correspond aux taxes, surcharges et redevances régionales et fédérales.",
      "En Flandre, Fluvius est le gestionnaire de réseau de distribution unique pour l'électricité et le gaz. Il assure l'entretien du réseau, le relevé des compteurs et le déploiement des compteurs numériques (digitale meter), désormais largement installés dans la région. Comme partout, Fluvius ne vend pas d'énergie : le choix du fournisseur reste entièrement libre.",
    ],
  },
  {
    id: "electricite-gaz-flandre",
    heading: "Prix de l'électricité et du gaz en Flandre : ce qui varie",
    paragraphs: [
      "Pour comparer efficacement les prix de l'énergie en Flandre, il faut distinguer ce qui est commun à tous les consommateurs de ce qui dépend de votre fournisseur. Les coûts de réseau Fluvius et les taxes flamandes sont identiques pour tout le monde dans une même zone, mais la part énergie peut varier sensiblement d'une offre à l'autre.",
      "Le compteur numérique généralisé en Flandre ouvre par ailleurs de nouvelles possibilités, notamment pour les ménages équipés de panneaux solaires ou souhaitant adapter leur consommation aux heures les plus avantageuses. Cela rend le choix du contrat encore plus stratégique, en particulier pour les profils dits prosumers.",
    ],
    bullets: [
      "La part énergie (électricité et gaz) varie selon le fournisseur choisi",
      "Les coûts de réseau Fluvius sont identiques dans une même zone de distribution",
      "Le compteur numérique permet un suivi précis et des tarifs adaptés",
      "Les ménages avec panneaux solaires ont intérêt à choisir un contrat adapté",
      "Le tarif fixe sécurise le budget, le variable suit les marchés",
    ],
  },
  {
    id: "reduire-facture-flandre",
    heading: "Réduire sa facture d'énergie en Flandre",
    paragraphs: [
      "Réduire sa facture d'énergie en Flandre passe avant tout par une comparaison régulière des offres. Beaucoup de ménages flamands conservent le même contrat pendant des années, sans réaliser que des offres plus compétitives sont apparues entre-temps. Or, sur un poste de dépense aussi important, l'écart peut représenter plusieurs centaines d'euros par an.",
      "Pour les profils à forte consommation, comme les familles ou les logements mal isolés, le potentiel d'économie est encore plus marqué. Le passage à l'offre la plus avantageuse peut atteindre 35 % d'économie sur la part énergie, à laquelle peuvent s'ajouter des optimisations liées au compteur numérique et à l'autoconsommation solaire.",
      "Notre simulateur estime gratuitement votre économie potentielle en quelques minutes, à partir de votre consommation réelle ou estimée. Vous recevez une évaluation claire et, si vous le souhaitez, un accompagnement gratuit pour effectuer le changement.",
    ],
  },
  {
    id: "changer-flandre",
    heading: "Changer de fournisseur d'énergie en Flandre",
    paragraphs: [
      "Le changement de fournisseur d'énergie en Flandre est simple, gratuit et sans coupure. Comme dans les autres régions belges, votre nouveau fournisseur se charge de toutes les démarches, y compris la résiliation de l'ancien contrat. Le compteur Fluvius reste inchangé et l'alimentation se poursuit sans interruption.",
      "La loi belge garantit que, pour un contrat à durée indéterminée, vous pouvez résilier à tout moment avec un préavis d'un mois, sans frais. Cette flexibilité vous permet de profiter en continu des meilleures conditions du marché flamand, sans crainte d'être bloqué dans un contrat désavantageux.",
    ],
    bullets: [
      "Aucune coupure d'électricité ou de gaz pendant le changement",
      "Le nouveau fournisseur gère l'ensemble des démarches",
      "Préavis d'un mois maximum sans frais pour les contrats à durée indéterminée",
      "Votre compteur numérique Fluvius reste identique",
    ],
  },
]

const faqs = [
  {
    question: "Qui est le gestionnaire de réseau d'énergie en Flandre ?",
    answer:
      "En Flandre, Fluvius est le gestionnaire de réseau de distribution unique pour l'électricité et le gaz. Il entretient le réseau et relève les compteurs, mais ne vend pas d'énergie : le choix du fournisseur reste libre.",
  },
  {
    question: "Pourquoi les prix de l'énergie varient-ils entre fournisseurs en Flandre ?",
    answer:
      "Seule la part énergie est soumise à la concurrence. Les coûts de réseau Fluvius et les taxes flamandes sont identiques dans une même zone. C'est donc sur la part énergie que vous pouvez réaliser des économies en changeant de fournisseur.",
  },
  {
    question: "Le compteur numérique change-t-il quelque chose à ma facture ?",
    answer:
      "Le compteur numérique (digitale meter) permet un suivi précis de votre consommation et l'accès à des tarifs adaptés, notamment pour les ménages avec panneaux solaires. Il facilite l'optimisation de votre contrat selon vos habitudes.",
  },
  {
    question: "Combien puis-je économiser sur mon énergie en Flandre ?",
    answer:
      "Les économies peuvent atteindre 35 % sur la part énergie, surtout si vous n'avez pas comparé votre contrat depuis longtemps. Notre comparateur calcule votre potentiel d'économie gratuitement et sans engagement.",
  },
  {
    question: "Changer de fournisseur en Flandre est-il payant ?",
    answer:
      "Non. Le changement de fournisseur est gratuit en Flandre. Pour un contrat à durée indéterminée, la résiliation se fait avec un préavis d'un mois, sans frais ni pénalité.",
  },
]

export default function PrixEnergieFlandrePage() {
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
