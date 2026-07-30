import type { Metadata } from "next"
import { SiloPageTemplate, type ContentSection } from "@/components/silo-page-template"
import { SILO_PAGES, getAlternates } from "@/lib/seo"

const page = SILO_PAGES.find((p) => p.slug === "comparateur-electricite-bruxelles")!

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
  "À Bruxelles, la facture d'électricité représente un poste de dépense majeur pour les ménages comme pour les indépendants. Pourtant, peu de Bruxellois comparent réellement les offres disponibles sur le marché libéralisé. Notre comparateur d'électricité vous aide à identifier le fournisseur le plus avantageux selon votre consommation, votre quartier et votre profil, et à économiser jusqu'à 35 % sur votre facture annuelle."

const highlights = [
  "Comparaison 100 % gratuite",
  "Tous les fournisseurs bruxellois",
  "Sans engagement",
  "Réponse en 2 minutes",
]

const sections: ContentSection[] = [
  {
    id: "marche-electricite-bruxelles",
    heading: "Le marché de l'électricité à Bruxelles en 2026",
    paragraphs: [
      "Depuis la libéralisation du marché de l'énergie en Région de Bruxelles-Capitale, chaque consommateur est libre de choisir son fournisseur d'électricité. Cette liberté est une opportunité réelle d'économies, mais elle reste largement sous-exploitée : de nombreux ménages bruxellois conservent par défaut le même contrat depuis des années, parfois à des tarifs nettement supérieurs à ceux du marché actuel.",
      "À Bruxelles, la distribution de l'électricité est assurée par Sibelga, le gestionnaire de réseau de distribution unique pour les 19 communes de la Région. Sibelga ne vend pas d'électricité : son rôle est d'acheminer l'énergie jusqu'à votre compteur, de relever votre consommation et d'entretenir le réseau. Le fournisseur, lui, est l'entreprise auprès de laquelle vous payez votre électricité et que vous pouvez changer librement.",
      "Votre facture d'électricité à Bruxelles se compose de trois grandes parties : le coût de l'énergie elle-même (la part sur laquelle joue la concurrence entre fournisseurs), les coûts de réseau fixés par Sibelga et validés par le régulateur Brugel, et enfin les taxes et surcharges régionales et fédérales. Seule la première partie varie réellement d'un fournisseur à l'autre, mais elle représente une fraction suffisamment importante pour générer des économies substantielles.",
    ],
  },
  {
    id: "comparer-fournisseurs",
    heading: "Comment comparer les fournisseurs d'électricité à Bruxelles",
    paragraphs: [
      "Comparer les fournisseurs d'électricité ne se résume pas à regarder le prix du kWh. Plusieurs critères entrent en jeu et peuvent transformer une offre apparemment attractive en mauvaise affaire si on les néglige. Notre comparateur intègre l'ensemble de ces paramètres pour vous donner une estimation réaliste et personnalisée.",
      "Le premier critère est le type de tarif : fixe ou variable. Un tarif fixe vous garantit un prix stable pendant toute la durée du contrat, ce qui protège contre les hausses mais ne profite pas des baisses. Un tarif variable suit l'évolution des marchés de gros, avec un potentiel d'économie en période de prix bas mais un risque en cas de flambée. Le bon choix dépend de votre tolérance au risque et du contexte du marché.",
    ],
    bullets: [
      "Le prix du kWh et la redevance fixe annuelle du fournisseur",
      "Le type de contrat : tarif fixe (stable) ou variable (indexé sur le marché)",
      "La part d'énergie verte et l'origine de l'électricité fournie",
      "La qualité du service client et la facilité de gestion en ligne",
      "Les éventuelles réductions de bienvenue et conditions de durée",
      "Votre profil de consommation : compteur simple, bihoraire ou exclusif nuit",
    ],
  },
  {
    id: "economies-possibles",
    heading: "Quelles économies espérer sur votre électricité à Bruxelles ?",
    paragraphs: [
      "Les économies réalisables dépendent avant tout de votre contrat actuel et de votre niveau de consommation. Un ménage bruxellois qui n'a jamais changé de fournisseur depuis la libéralisation peut souvent économiser plusieurs centaines d'euros par an simplement en passant à une offre compétitive et adaptée à son profil.",
      "Pour un ménage avec une consommation moyenne, le passage d'un tarif historique à l'offre la plus avantageuse du marché peut représenter une économie allant jusqu'à 35 % sur la part énergie. Pour les profils à forte consommation, comme les familles nombreuses ou les logements chauffés à l'électricité, le gain potentiel en euros est encore plus important.",
      "Notre simulateur calcule votre économie potentielle en quelques minutes, à partir de votre consommation réelle ou estimée. Vous obtenez une estimation claire, sans jargon, et nos conseillers vous accompagnent ensuite gratuitement dans la démarche de changement si vous le souhaitez.",
    ],
  },
  {
    id: "changer-bruxelles",
    heading: "Changer de fournisseur d'électricité à Bruxelles : la démarche",
    paragraphs: [
      "Changer de fournisseur d'électricité à Bruxelles est une démarche simple, gratuite et sans risque de coupure. Votre nouveau fournisseur se charge de l'ensemble des formalités, y compris la résiliation de votre ancien contrat. Vous n'avez aucune intervention technique à prévoir : votre compteur Sibelga reste identique, et l'électricité continue d'arriver sans interruption.",
      "La loi belge protège le consommateur : pour un contrat à durée indéterminée, vous pouvez résilier à tout moment moyennant un préavis d'un mois, sans frais ni indemnité. Cette protection rend le changement totalement réversible et sans engagement à long terme, ce qui vous permet de profiter en continu des meilleures offres du marché.",
    ],
    bullets: [
      "Aucune coupure d'électricité pendant le changement",
      "Le nouveau fournisseur gère la résiliation de l'ancien contrat",
      "Préavis d'un mois maximum, sans frais pour les contrats à durée indéterminée",
      "Votre compteur et votre installation restent inchangés",
    ],
  },
]

const faqs = [
  {
    question: "Qui est le gestionnaire de réseau d'électricité à Bruxelles ?",
    answer:
      "À Bruxelles, le gestionnaire de réseau de distribution est Sibelga, pour les 19 communes de la Région de Bruxelles-Capitale. Sibelga achemine l'électricité et relève votre compteur, mais ne vend pas d'énergie : vous choisissez librement votre fournisseur.",
  },
  {
    question: "Changer de fournisseur d'électricité à Bruxelles est-il payant ?",
    answer:
      "Non. Le changement de fournisseur est totalement gratuit à Bruxelles. Pour un contrat à durée indéterminée, la résiliation se fait avec un préavis d'un mois, sans frais ni indemnité de rupture.",
  },
  {
    question: "Vais-je subir une coupure de courant en changeant de fournisseur ?",
    answer:
      "Non. Le changement de fournisseur est purement administratif. Votre compteur Sibelga reste le même et l'alimentation électrique continue sans aucune interruption.",
  },
  {
    question: "Combien puis-je économiser sur ma facture d'électricité à Bruxelles ?",
    answer:
      "Les économies peuvent atteindre 35 % sur la part énergie, surtout si vous n'avez jamais changé de fournisseur. Notre comparateur calcule votre économie potentielle gratuitement en quelques minutes.",
  },
  {
    question: "Tarif fixe ou tarif variable : que choisir à Bruxelles ?",
    answer:
      "Un tarif fixe garantit un prix stable et protège contre les hausses. Un tarif variable suit le marché et peut être avantageux quand les prix baissent. Le choix dépend de votre tolérance au risque ; nos conseillers vous aident à décider gratuitement.",
  },
]

export default function ComparateurElectriciteBruxellesPage() {
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
