import type { Metadata } from "next"
import { SiloPageTemplate, type ContentSection } from "@/components/silo-page-template"
import { SILO_PAGES, getAlternates } from "@/lib/seo"

const page = SILO_PAGES.find((p) => p.slug === "comparateur-gaz-wallonie")!

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
  "En Wallonie, le gaz naturel reste le mode de chauffage le plus répandu dans les foyers. Face à la volatilité des prix de l'énergie, comparer les fournisseurs de gaz est devenu essentiel pour maîtriser son budget. Notre comparateur de gaz wallon analyse votre consommation et votre zone de distribution pour vous orienter vers l'offre la plus avantageuse, avec des économies pouvant atteindre 35 % sur la part énergie."

const highlights = [
  "Comparaison gratuite",
  "Fournisseurs actifs en Wallonie",
  "Sans engagement",
  "Conseil personnalisé",
]

const sections: ContentSection[] = [
  {
    id: "marche-gaz-wallonie",
    heading: "Le marché du gaz en Wallonie en 2026",
    paragraphs: [
      "Le marché du gaz est libéralisé en Wallonie : chaque ménage peut choisir et changer librement son fournisseur. Cette liberté permet de profiter de la concurrence entre acteurs, mais elle suppose de comparer régulièrement les offres pour ne pas rester bloqué sur un contrat devenu trop cher au fil du temps.",
      "En Wallonie, la distribution du gaz est assurée par des gestionnaires de réseau de distribution comme ORES et RESA, selon votre commune. Ces gestionnaires entretiennent les canalisations et relèvent votre compteur, mais ne vendent pas le gaz : le choix du fournisseur vous appartient entièrement. La régulation du marché wallon est supervisée par la CWaPE, la Commission wallonne pour l'Énergie.",
      "Votre facture de gaz en Wallonie comprend le coût de la molécule de gaz (la part concurrentielle), les coûts de réseau fixés par le gestionnaire et validés par la CWaPE, ainsi que les taxes et redevances régionales et fédérales. Seule la part énergie varie selon le fournisseur, mais c'est précisément là que se trouvent les économies potentielles.",
    ],
  },
  {
    id: "criteres-comparaison-gaz",
    heading: "Les critères pour bien comparer un contrat de gaz",
    paragraphs: [
      "Comparer un contrat de gaz wallon demande d'aller au-delà du seul prix affiché. Un contrat avantageux sur le papier peut s'avérer coûteux si la structure tarifaire ne correspond pas à votre profil de consommation. C'est pourquoi notre comparateur prend en compte un ensemble de critères déterminants.",
      "La distinction entre tarif fixe et tarif variable est centrale pour le gaz, dont les prix sont particulièrement sensibles aux marchés internationaux. Un tarif fixe sécurise votre budget sur la durée du contrat, tandis qu'un tarif variable peut profiter des baisses mais expose aux hausses brutales. Le choix dépend de votre situation et du contexte de marché au moment de la souscription.",
    ],
    bullets: [
      "Le prix du kWh de gaz et la redevance fixe annuelle",
      "Le type de tarif : fixe pour la stabilité ou variable indexé sur le marché",
      "Votre zone de distribution : ORES, RESA ou autre gestionnaire local",
      "Le niveau de consommation lié à votre type de chauffage et de logement",
      "Les réductions de bienvenue et la durée d'engagement éventuelle",
      "La qualité du service client et des outils de gestion en ligne",
    ],
  },
  {
    id: "economies-gaz-wallonie",
    heading: "Combien pouvez-vous économiser sur votre gaz en Wallonie ?",
    paragraphs: [
      "Les économies sur le gaz dépendent fortement de votre consommation annuelle et de votre contrat actuel. Les ménages wallons qui se chauffent au gaz et qui n'ont pas comparé leurs offres depuis plusieurs années sont souvent ceux qui ont le plus à gagner, leur facture annuelle étant élevée.",
      "Pour un foyer wallon avec un chauffage central au gaz, le passage d'un contrat historique à l'offre la plus compétitive du marché peut représenter une économie significative, pouvant atteindre 35 % sur la part énergie. En valeur absolue, ces économies se chiffrent souvent en plusieurs centaines d'euros par an pour les gros consommateurs.",
      "Notre simulateur estime votre économie potentielle en fonction de votre consommation réelle ou d'une estimation basée sur votre logement. La démarche est gratuite, rapide et sans engagement, et nos conseillers vous accompagnent ensuite si vous décidez de changer.",
    ],
  },
  {
    id: "demarche-changement-gaz",
    heading: "Changer de fournisseur de gaz en Wallonie : comment faire",
    paragraphs: [
      "Changer de fournisseur de gaz en Wallonie est une opération simple et sans risque pour votre approvisionnement. Le nouveau fournisseur prend en charge toutes les démarches administratives, y compris la résiliation auprès de votre ancien fournisseur. Aucune intervention technique n'est nécessaire et l'alimentation en gaz n'est jamais interrompue.",
      "La législation belge protège les consommateurs wallons : pour un contrat à durée indéterminée, vous pouvez résilier à tout moment avec un préavis d'un mois, gratuitement. Cela rend le changement totalement réversible et vous permet de saisir les meilleures opportunités du marché à chaque renouvellement.",
    ],
    bullets: [
      "Aucune coupure de gaz pendant le changement de fournisseur",
      "Le nouveau fournisseur s'occupe de toutes les formalités",
      "Préavis d'un mois maximum sans frais pour les contrats à durée indéterminée",
      "Votre compteur et votre raccordement ORES ou RESA restent inchangés",
    ],
  },
]

const faqs = [
  {
    question: "Qui distribue le gaz en Wallonie ?",
    answer:
      "En Wallonie, la distribution du gaz est assurée par des gestionnaires de réseau comme ORES et RESA, selon votre commune. Ils entretiennent le réseau et relèvent votre compteur, mais ne vendent pas le gaz : le choix du fournisseur reste libre.",
  },
  {
    question: "Le changement de fournisseur de gaz est-il gratuit en Wallonie ?",
    answer:
      "Oui. Le changement de fournisseur de gaz est gratuit en Wallonie. Pour un contrat à durée indéterminée, la résiliation se fait avec un préavis d'un mois, sans frais ni pénalité.",
  },
  {
    question: "Vais-je risquer une coupure de gaz en changeant de fournisseur ?",
    answer:
      "Non. Le changement est uniquement administratif. Votre compteur et votre raccordement restent identiques, et l'approvisionnement en gaz se poursuit sans interruption.",
  },
  {
    question: "Quelles économies sur le gaz puis-je espérer en Wallonie ?",
    answer:
      "Les économies peuvent atteindre 35 % sur la part énergie, en particulier pour les ménages chauffés au gaz qui n'ont pas comparé leur contrat depuis longtemps. Notre comparateur calcule votre potentiel gratuitement.",
  },
  {
    question: "Tarif fixe ou variable pour le gaz en Wallonie ?",
    answer:
      "Le tarif fixe protège votre budget contre les hausses, tandis que le tarif variable suit le marché et peut profiter des baisses. Compte tenu de la volatilité du gaz, le choix dépend de votre profil ; nos conseillers vous guident gratuitement.",
  },
]

export default function ComparateurGazWalloniePage() {
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
