import type { Metadata } from "next"
import { SiloPageTemplate, type ContentSection } from "@/components/silo-page-template"
import { SILO_PAGES, getAlternates } from "@/lib/seo"

const page = SILO_PAGES.find((p) => p.slug === "prime-energie-belgique")!

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
  "Les primes énergie en Belgique sont un levier essentiel pour financer vos travaux de rénovation et réduire durablement vos factures. Mais le système varie fortement d'une région à l'autre : Bruxelles, la Wallonie et la Flandre disposent chacune de leurs propres aides, conditions et montants. Ce guide complet vous présente l'ensemble des primes énergie disponibles en 2026, région par région, pour ne rien laisser passer."

const highlights = [
  "Aides par région",
  "Conditions 2026",
  "Travaux et factures",
  "Guide gratuit",
]

const sections: ContentSection[] = [
  {
    id: "comprendre-primes",
    heading: "Comprendre les primes énergie en Belgique",
    paragraphs: [
      "En Belgique, les primes énergie sont des aides financières destinées à encourager les particuliers à améliorer la performance énergétique de leur logement. Elles couvrent une partie du coût de travaux comme l'isolation, le remplacement d'une chaudière, l'installation d'une pompe à chaleur ou la pose de panneaux solaires.",
      "La particularité belge tient à la régionalisation des compétences énergétiques. Chaque région gère ses propres dispositifs : les montants, les conditions d'éligibilité et les démarches diffèrent donc selon que vous habitez à Bruxelles, en Wallonie ou en Flandre. Il est essentiel de se référer aux règles de sa propre région pour estimer correctement les aides auxquelles on a droit.",
      "Au-delà des primes pour travaux, certaines aides visent aussi à protéger les ménages en difficulté, comme le tarif social pour l'énergie. Combinées à un contrat d'énergie bien choisi, ces aides permettent de réduire significativement le coût global de l'énergie sur le long terme.",
    ],
  },
  {
    id: "primes-par-region",
    heading: "Les primes énergie par région : Bruxelles, Wallonie, Flandre",
    paragraphs: [
      "Chaque région belge a structuré ses primes énergie autour de priorités proches, mais avec des modalités propres. Voici les grands dispositifs à connaître selon votre lieu de résidence. Les conditions précises et les montants évoluant régulièrement, il convient toujours de vérifier les barèmes en vigueur au moment de votre projet.",
      "À Bruxelles, les primes Renolution regroupent l'essentiel des aides à la rénovation énergétique, avec des montants modulés selon les revenus du ménage. En Wallonie, les primes Habitation couvrent l'audit énergétique et les travaux qui en découlent, également selon les revenus. En Flandre, la prime Mijn VerbouwPremie centralise les aides régionales pour la rénovation et les installations économes en énergie.",
    ],
    bullets: [
      "Bruxelles : primes Renolution pour isolation, chauffage et énergies renouvelables",
      "Wallonie : primes Habitation conditionnées à un audit énergétique préalable",
      "Flandre : Mijn VerbouwPremie pour la rénovation et les équipements performants",
      "Montants souvent modulés selon les revenus du ménage",
      "Aides cumulables sous conditions avec d'autres dispositifs régionaux",
    ],
  },
  {
    id: "travaux-eligibles",
    heading: "Quels travaux sont éligibles aux primes énergie ?",
    paragraphs: [
      "Les travaux ouvrant droit à une prime énergie visent tous le même objectif : réduire la consommation d'énergie du logement et donc les factures. Les postes les plus soutenus sont généralement ceux qui offrent le meilleur retour sur investissement en matière d'économies d'énergie.",
      "L'isolation arrive en tête des priorités dans toutes les régions, car c'est souvent le travail le plus rentable pour réduire les besoins de chauffage. Viennent ensuite le remplacement des systèmes de chauffage anciens par des solutions plus efficaces, et les installations d'énergies renouvelables qui réduisent la dépendance aux énergies fossiles.",
      "Avant d'engager des travaux, il est vivement recommandé de vérifier les conditions exactes de votre région et, le cas échéant, de réaliser l'audit énergétique requis. Certaines primes imposent en effet le recours à des entrepreneurs agréés ou le respect de critères techniques précis pour être accordées.",
    ],
    bullets: [
      "Isolation du toit, des murs et des sols",
      "Remplacement de châssis et de vitrages performants",
      "Installation d'une pompe à chaleur ou d'une chaudière performante",
      "Pose de panneaux solaires photovoltaïques ou thermiques",
      "Ventilation économe et systèmes de régulation du chauffage",
    ],
  },
  {
    id: "primes-et-facture",
    heading: "Primes énergie et réduction de votre facture",
    paragraphs: [
      "Les primes énergie agissent sur le long terme en réduisant les besoins énergétiques de votre logement. Mais pour maximiser les économies, elles gagnent à être combinées avec une optimisation de votre contrat d'énergie. Réduire sa consommation tout en payant son énergie au meilleur tarif est la stratégie la plus efficace.",
      "Concrètement, après des travaux de rénovation soutenus par une prime, votre consommation diminue. Si, dans le même temps, vous comparez et choisissez un contrat d'électricité ou de gaz plus avantageux, l'effet se cumule : la double économie peut représenter une part importante de votre budget énergie annuel.",
      "Notre comparateur vous aide à optimiser la partie contrat, avec des économies pouvant atteindre 35 % sur la part énergie. Combinée aux primes régionales pour vos travaux, cette optimisation contribue à alléger durablement votre facture. La simulation est gratuite et sans engagement.",
    ],
  },
]

const faqs = [
  {
    question: "Les primes énergie sont-elles les mêmes partout en Belgique ?",
    answer:
      "Non. Les primes énergie sont régionalisées : Bruxelles (Renolution), la Wallonie (primes Habitation) et la Flandre (Mijn VerbouwPremie) ont chacune leurs dispositifs, conditions et montants. Il faut se référer aux règles de sa région.",
  },
  {
    question: "Quels travaux donnent droit à une prime énergie ?",
    answer:
      "Les travaux éligibles incluent l'isolation, le remplacement de châssis, l'installation d'une pompe à chaleur ou d'une chaudière performante, et la pose de panneaux solaires. Les conditions précises dépendent de votre région.",
  },
  {
    question: "Les primes énergie dépendent-elles de mes revenus ?",
    answer:
      "Dans la plupart des régions, les montants des primes sont modulés selon les revenus du ménage : les revenus plus modestes bénéficient généralement de primes plus élevées. Vérifiez les barèmes en vigueur dans votre région.",
  },
  {
    question: "Faut-il un audit énergétique pour obtenir une prime ?",
    answer:
      "Cela dépend de la région et du type de travaux. En Wallonie notamment, certaines primes Habitation sont conditionnées à la réalisation préalable d'un audit énergétique par un professionnel agréé.",
  },
  {
    question: "Puis-je cumuler primes et changement de fournisseur ?",
    answer:
      "Oui. Les primes financent vos travaux et réduisent votre consommation, tandis que le changement de fournisseur réduit le prix de votre énergie. Combiner les deux maximise vos économies. Notre comparateur optimise gratuitement la partie contrat.",
  },
]

export default function PrimeEnergieBelgiquePage() {
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
