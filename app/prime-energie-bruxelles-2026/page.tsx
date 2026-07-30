import type { Metadata } from "next"
import { SiloPageTemplate, type ContentSection } from "@/components/silo-page-template"
import { SILO_PAGES, getAlternates, SITE_URL } from "@/lib/seo"

const page = SILO_PAGES.find((p) => p.slug === "prime-energie-bruxelles-2026")!

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
  "À Bruxelles, les primes énergie sont regroupées depuis 2022 sous le dispositif Renolution, géré par Bruxelles Environnement et Homegrade. En 2026, ces primes permettent aux propriétaires comme aux locataires de financer l'isolation, le chauffage performant, les panneaux solaires et la rénovation de leur logement. Le montant dépend de vos revenus et de la nature des travaux. Voici l'essentiel pour en profiter."

const highlights = [
  "Dispositif Renolution",
  "Bruxelles Environnement",
  "Montants selon vos revenus",
  "Propriétaires et locataires",
]

const sections: ContentSection[] = [
  {
    id: "renolution",
    heading: "Les primes Renolution à Bruxelles en 2026",
    paragraphs: [
      "Renolution est le guichet unique des primes à la rénovation et à l'énergie en Région de Bruxelles-Capitale. Il fusionne les anciennes primes énergie et primes rénovation en un seul système, afin de simplifier les démarches des Bruxellois. Les primes sont accordées par Bruxelles Environnement, avec l'accompagnement gratuit de Homegrade et du Réseau Habitat.",
      "Le principe est de récompenser les travaux qui améliorent la performance énergétique et la qualité du logement. Plus votre revenu est modeste, plus le pourcentage de prime est élevé : le dispositif est organisé en catégories de revenus qui majorent le montant de base.",
    ],
  },
  {
    id: "travaux-couverts",
    heading: "Quels travaux sont couverts par les primes ?",
    paragraphs: [
      "Les primes Renolution couvrent un large éventail de travaux, de l'audit énergétique jusqu'aux gros postes de rénovation. L'objectif régional est d'atteindre un parc immobilier plus performant, en ligne avec la stratégie de rénovation bruxelloise.",
    ],
    bullets: [
      "Isolation de la toiture, des murs et des sols",
      "Remplacement des châssis et vitrages performants",
      "Installation d'une pompe à chaleur ou d'une chaudière performante",
      "Pose de panneaux solaires photovoltaïques ou thermiques",
      "Audit énergétique et accompagnement par un professionnel",
      "Travaux de rénovation liés à la salubrité et à l'humidité",
    ],
  },
  {
    id: "conditions",
    heading: "Conditions et catégories de revenus",
    paragraphs: [
      "Le montant de la prime dépend de trois facteurs : la nature des travaux, la catégorie de revenus du demandeur et la localisation du bien. Bruxelles applique un système de majoration : les ménages aux revenus les plus modestes bénéficient des taux de prime les plus élevés, ce qui rend la rénovation accessible au plus grand nombre.",
      "Les primes sont ouvertes aux propriétaires occupants, aux propriétaires bailleurs et, dans certains cas, aux locataires avec l'accord du propriétaire. Il est essentiel d'introduire la demande dans les délais et de faire réaliser les travaux par un entrepreneur, en conservant les factures détaillées.",
    ],
    bullets: [
      "Trois catégories de revenus déterminant le taux de prime",
      "Logement situé en Région de Bruxelles-Capitale",
      "Travaux réalisés par un professionnel avec factures détaillées",
      "Demande introduite dans le délai prévu après la facture finale",
    ],
  },
  {
    id: "primes-et-facture",
    heading: "Primes et facture d'énergie : une stratégie complète",
    paragraphs: [
      "Les primes Renolution réduisent le coût de travaux qui, à terme, font baisser votre consommation et donc votre facture. Mais agir sur le bâti ne suffit pas : choisir le bon fournisseur reste le levier le plus rapide pour économiser dès maintenant, sans investissement.",
      "La stratégie la plus efficace combine les deux : profiter des primes pour améliorer la performance de votre logement, et comparer les fournisseurs pour optimiser la part énergie de votre facture. Notre comparateur vous indique gratuitement le tarif le plus avantageux à Bruxelles selon votre consommation.",
    ],
  },
]

const faqs = [
  {
    question: "Qu'est-ce que Renolution à Bruxelles ?",
    answer:
      "Renolution est le dispositif unique des primes à l'énergie et à la rénovation en Région de Bruxelles-Capitale, géré par Bruxelles Environnement. Il regroupe les anciennes primes énergie et rénovation pour simplifier les démarches des Bruxellois.",
  },
  {
    question: "Qui peut bénéficier des primes énergie à Bruxelles en 2026 ?",
    answer:
      "Les propriétaires occupants, les propriétaires bailleurs et, sous conditions, les locataires avec accord du propriétaire. Le montant de la prime est majoré pour les ménages aux revenus modestes, répartis en trois catégories de revenus.",
  },
  {
    question: "Quels travaux donnent droit à une prime à Bruxelles ?",
    answer:
      "L'isolation (toiture, murs, sols), le remplacement des châssis, l'installation d'une pompe à chaleur ou d'une chaudière performante, les panneaux solaires, l'audit énergétique et certains travaux de salubrité. Les travaux doivent être réalisés par un professionnel.",
  },
  {
    question: "Le montant de la prime dépend-il de mes revenus ?",
    answer:
      "Oui. Bruxelles applique un système de majoration selon trois catégories de revenus : plus votre revenu est modeste, plus le pourcentage de prime est élevé, afin de rendre la rénovation accessible au plus grand nombre.",
  },
  {
    question: "Une prime fait-elle baisser ma facture d'énergie immédiatement ?",
    answer:
      "La prime réduit le coût des travaux, qui diminuent votre consommation à terme. Pour économiser tout de suite sans investissement, comparez votre fournisseur : notre comparateur identifie gratuitement l'offre la plus avantageuse à Bruxelles.",
  },
]

export default function PrimeEnergieBruxelles2026Page() {
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
