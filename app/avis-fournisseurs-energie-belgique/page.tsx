import type { Metadata } from "next"
import { SiloPageTemplate, type ContentSection } from "@/components/silo-page-template"
import { SILO_PAGES, getAlternates, SITE_URL } from "@/lib/seo"

const page = SILO_PAGES.find((p) => p.slug === "avis-fournisseurs-energie-belgique")!

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
  "Engie Electrabel, Luminus, Eneco, TotalEnergies, Mega, Octa+ et Ecofix figurent parmi les principaux fournisseurs d'électricité et de gaz actifs en Belgique. Chacun a ses forces : prix, énergie verte, service client ou stabilité tarifaire. Ce comparatif 2026 vous aide à y voir clair, mais le meilleur fournisseur reste toujours celui qui correspond à votre consommation et à votre région."

const highlights = [
  "7 fournisseurs comparés",
  "Tarifs et service client",
  "Énergie verte évaluée",
  "Belgique entière",
]

const sections: ContentSection[] = [
  {
    id: "historiques",
    heading: "Engie Electrabel et Luminus : les fournisseurs historiques",
    paragraphs: [
      "Engie Electrabel est le plus grand fournisseur d'énergie en Belgique et l'acteur historique du marché. Il séduit par la solidité de son service client, son réseau d'agences et une large gamme d'offres fixes et variables. En contrepartie, ses tarifs ne sont pas toujours les plus compétitifs : les clients fidèles depuis des années paient souvent plus cher que le marché.",
      "Luminus, deuxième fournisseur du pays, est un acteur majeur de l'énergie renouvelable, notamment grâce à ses parcs éoliens et hydrauliques. Son offre est large et son service client bien noté. Comme pour Engie, il est conseillé de comparer régulièrement, car les tarifs d'entrée promotionnels évoluent à la hausse une fois la première année écoulée.",
    ],
    bullets: [
      "Engie Electrabel : leader du marché, service complet, tarifs à surveiller",
      "Luminus : forte composante renouvelable, offres variées, bon service client",
      "Pour les deux : comparez à l'échéance pour éviter les hausses post-promotion",
    ],
  },
  {
    id: "challengers",
    heading: "Eneco, TotalEnergies et Mega : les alternatives compétitives",
    paragraphs: [
      "Eneco mise sur l'énergie 100 % verte d'origine belge et sur une image durable. Ses tarifs sont compétitifs et son application de suivi de consommation est appréciée. C'est un choix cohérent pour les ménages attachés à l'origine renouvelable de leur énergie.",
      "TotalEnergies propose des offres souvent attractives à l'entrée, avec des réductions de bienvenue et une présence commerciale forte. Mega, fournisseur belge basé à Malmedy, est régulièrement cité parmi les moins chers du marché : sa structure légère lui permet de proposer des prix bas, avec un service client à taille humaine.",
    ],
    bullets: [
      "Eneco : énergie verte belge, bon outil de suivi, tarifs compétitifs",
      "TotalEnergies : promotions de bienvenue intéressantes, forte présence",
      "Mega : souvent parmi les moins chers, fournisseur belge à taille humaine",
    ],
  },
  {
    id: "specialistes",
    heading: "Octa+ et Ecofix : les acteurs spécialisés",
    paragraphs: [
      "Octa+ est un fournisseur familial belge, présent de longue date, qui combine énergie et services (dont les cartes carburant). Il met en avant la proximité et un service client local, avec des offres fixes et variables adaptées aux particuliers comme aux indépendants.",
      "Ecofix se positionne sur la stabilité avec des formules à prix fixe et une orientation énergie verte. C'est une option pertinente pour les ménages qui privilégient la prévisibilité de leur facture et veulent se protéger contre la volatilité des marchés. Comme toujours, l'intérêt réel d'une offre dépend de votre profil de consommation.",
    ],
    bullets: [
      "Octa+ : fournisseur belge familial, service de proximité, offres fixes et variables",
      "Ecofix : prix fixe et énergie verte, idéal pour la prévisibilité budgétaire",
      "Les deux conviennent aux profils recherchant stabilité et service local",
    ],
  },
  {
    id: "choisir",
    heading: "Comment choisir le bon fournisseur en 2026 ?",
    paragraphs: [
      "Aucun fournisseur n'est universellement « le meilleur » : tout dépend de votre consommation, de votre région et de vos priorités (prix, énergie verte, stabilité, service). Une offre très compétitive pour un petit appartement bruxellois ne le sera pas forcément pour une grande maison chauffée au gaz en Wallonie.",
      "Plutôt que de vous fier uniquement à la notoriété ou aux avis, le plus fiable est de simuler votre situation réelle. Notre comparateur confronte gratuitement les offres de ces fournisseurs selon votre profil et votre gestionnaire de réseau, et vous indique l'économie potentielle en quelques minutes.",
    ],
  },
]

const faqs = [
  {
    question: "Quel est le fournisseur d'énergie le moins cher en Belgique ?",
    answer:
      "Mega est régulièrement cité parmi les moins chers, mais le fournisseur le plus avantageux dépend de votre consommation et de votre région. Une comparaison personnalisée est le seul moyen fiable de le déterminer pour votre profil.",
  },
  {
    question: "Quelle différence entre Engie et Electrabel ?",
    answer:
      "Il s'agit du même fournisseur : Electrabel appartient au groupe Engie et commercialise ses offres en Belgique sous le nom Engie. C'est l'acteur historique et le plus grand fournisseur d'énergie du pays.",
  },
  {
    question: "Quels fournisseurs proposent de l'énergie 100 % verte ?",
    answer:
      "Eneco, Luminus et Ecofix mettent fortement en avant l'énergie renouvelable, et la plupart des fournisseurs belges proposent au moins une offre verte. La part et l'origine de l'énergie verte varient d'une offre à l'autre.",
  },
  {
    question: "Les avis sur un fournisseur suffisent-ils pour choisir ?",
    answer:
      "Non. Les avis renseignent sur le service client, mais le coût réel dépend de votre consommation, de votre région et du type de contrat. Une simulation personnalisée reste indispensable pour comparer les tarifs sur une base objective.",
  },
  {
    question: "Puis-je changer facilement si je ne suis pas satisfait de mon fournisseur ?",
    answer:
      "Oui. En Belgique, le changement est gratuit, sans coupure, avec un préavis d'un mois et sans indemnité pour les particuliers. Vous pouvez donc changer dès qu'une offre plus avantageuse apparaît.",
  },
]

export default function AvisFournisseursEnergieBelgiquePage() {
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
