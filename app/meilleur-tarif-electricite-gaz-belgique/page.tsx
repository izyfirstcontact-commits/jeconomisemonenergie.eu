import type { Metadata } from "next"
import { SiloPageTemplate, type ContentSection } from "@/components/silo-page-template"
import { SILO_PAGES, getAlternates, SITE_URL } from "@/lib/seo"

const page = SILO_PAGES.find((p) => p.slug === "meilleur-tarif-electricite-gaz-belgique")!

export const metadata: Metadata = {
  title: { absolute: page.title },
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
  "Que vous habitiez en Wallonie, à Bruxelles ou en Flandre, le meilleur tarif d'électricité et de gaz dépend de votre consommation et de votre gestionnaire de réseau (ORES, RESA, Sibelga ou Fluvius). En comparant les offres fixes et variables de tous les fournisseurs belges, vous pouvez économiser jusqu'à 35% sur votre facture annuelle, en quelques minutes et sans engagement."

const highlights = [
  "Wallonie, Bruxelles et Flandre",
  "Tarif fixe et variable comparés",
  "ORES, RESA, Sibelga, Fluvius",
  "Jusqu'à 35% d'économie",
]

const sections: ContentSection[] = [
  {
    id: "tarif-par-region",
    heading: "Pourquoi le meilleur tarif varie selon votre région",
    paragraphs: [
      "En Belgique, votre facture d'énergie se compose du prix de l'énergie (fixé par le fournisseur), des frais de réseau (fixés par votre gestionnaire de réseau de distribution) et des taxes et prélèvements. Les frais de réseau représentent une part importante du total et diffèrent fortement d'une région à l'autre.",
      "Un même contrat chez Engie ou Luminus n'aboutit donc pas au même montant à Liège, à Bruxelles ou à Anvers. Pour identifier le meilleur tarif, la comparaison doit impérativement intégrer votre gestionnaire de réseau local via votre code postal.",
    ],
    bullets: [
      "Bruxelles-Capitale : gestionnaire unique Sibelga.",
      "Wallonie : principalement ORES, et RESA dans la région de Liège.",
      "Flandre : gestionnaire unique Fluvius.",
    ],
  },
  {
    id: "criteres",
    heading: "Les critères qui déterminent le meilleur tarif",
    paragraphs: [
      "Le tarif le moins cher pour un voisin n'est pas forcément le meilleur pour vous. Plusieurs paramètres entrent en jeu et un comparateur fiable les prend tous en compte automatiquement.",
    ],
    bullets: [
      "Votre consommation annuelle en kWh d'électricité et de gaz.",
      "Le type de compteur : simple, bi-horaire ou exclusif nuit.",
      "La formule : tarif fixe (budget sécurisé) ou variable (souvent plus bas en 2026).",
      "Les promotions en cours : welcome pack, kWh offerts, remise en ligne.",
      "La présence de panneaux solaires et du tarif prosumer.",
    ],
  },
  {
    id: "fixe-vs-variable",
    heading: "Fixe ou variable : comment comparer en 2026",
    paragraphs: [
      "Le tarif fixe garantit un prix du kWh stable pendant la durée du contrat : idéal si vous voulez maîtriser votre budget. Le tarif variable suit les marchés de gros (TTF pour le gaz, indices pour l'électricité) et peut s'avérer plus avantageux quand les prix baissent.",
      "Le meilleur réflexe consiste à simuler les deux formules pour votre profil exact. Un comparateur affiche alors le coût annuel estimé de chaque option, ce qui rend la décision objective plutôt qu'intuitive.",
    ],
  },
  {
    id: "changer",
    heading: "Comparer et changer sans coupure ni frais",
    paragraphs: [
      "Changer de fournisseur pour le meilleur tarif est gratuit en Belgique et n'entraîne aucune coupure : votre compteur et votre raccordement restent identiques. Le nouveau fournisseur s'occupe de toutes les démarches, y compris la résiliation de l'ancien contrat.",
      "Le délai légal de changement est d'environ trois semaines, et vous pouvez quitter un contrat à durée indéterminée à tout moment moyennant un préavis d'un mois, sans indemnité.",
    ],
    bullets: [
      "Aucun frais de changement de fournisseur.",
      "Aucune interruption de fourniture d'électricité ou de gaz.",
      "Munissez-vous de votre code EAN (sur votre facture) et de votre dernier relevé.",
    ],
  },
]

const faqs = [
  {
    question: "Comment trouver le meilleur tarif d'énergie en Belgique ?",
    answer:
      "Le meilleur tarif dépend de votre consommation annuelle, de votre région et de votre gestionnaire de réseau (ORES ou RESA en Wallonie, Sibelga à Bruxelles, Fluvius en Flandre). Un comparateur applique automatiquement ces frais de réseau, compare les offres fixes et variables des fournisseurs (Engie, Luminus, Mega, TotalEnergies, Eneco, Octa+, Ecofix) et identifie le contrat le moins cher pour votre profil.",
  },
  {
    question: "Le meilleur tarif est-il le même à Bruxelles, en Wallonie et en Flandre ?",
    answer:
      "Non. À consommation égale, la facture diffère selon la région car les frais de réseau de distribution varient : Sibelga à Bruxelles, ORES et RESA en Wallonie, Fluvius en Flandre. Le meilleur fournisseur pour un Wallon n'est donc pas forcément le meilleur pour un Bruxellois ou un Flamand. La comparaison se fait toujours via votre code postal.",
  },
  {
    question: "Faut-il choisir un tarif fixe ou variable en 2026 ?",
    answer:
      "En 2026, le tarif variable redevient souvent compétitif après la flambée des prix, mais le tarif fixe sécurise votre budget pendant 1 à 3 ans. Le bon choix dépend de votre tolérance au risque : un comparateur sérieux simule les deux formules afin que vous compariez le meilleur tarif fixe et le meilleur tarif variable côte à côte.",
  },
  {
    question: "Comparer le meilleur tarif est-il gratuit ?",
    answer:
      "Oui, la comparaison avec Jeconomisemonenergie.eu est 100% gratuite et sans engagement. Nous sommes rémunérés par les fournisseurs uniquement si vous décidez de souscrire un nouveau contrat via notre service.",
  },
]

export default function MeilleurTarifPage() {
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
