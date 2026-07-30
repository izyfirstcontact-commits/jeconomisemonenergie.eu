import type { Metadata } from "next"
import { SiloPageTemplate, type ContentSection } from "@/components/silo-page-template"
import { SILO_PAGES, getAlternates, SITE_URL } from "@/lib/seo"

const page = SILO_PAGES.find((p) => p.slug === "cwape-simulateur")!

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
  "En Wallonie, la CWaPE (Commission wallonne pour l'énergie) est le régulateur du marché de l'électricité et du gaz. Elle met à disposition un simulateur tarifaire indépendant qui permet de comparer les offres des fournisseurs. Comprendre le rôle de la CWaPE et de son simulateur vous aide à décrypter votre facture ORES ou RESA et à choisir l'offre la plus avantageuse en 2026."

const highlights = [
  "Régulateur wallon indépendant",
  "Simulateur tarifaire officiel",
  "Réseaux ORES et RESA",
  "Électricité et gaz",
]

const sections: ContentSection[] = [
  {
    id: "role-cwape",
    heading: "Le rôle de la CWaPE en Wallonie",
    paragraphs: [
      "La CWaPE est la Commission wallonne pour l'énergie, l'organe de régulation du marché de l'électricité et du gaz en Région wallonne. Elle veille au bon fonctionnement du marché, contrôle les tarifs de distribution des gestionnaires de réseau et protège les intérêts des consommateurs wallons.",
      "Au niveau régional, la CWaPE complète le travail de la CREG, le régulateur fédéral. Tandis que la CREG encadre les aspects nationaux, la CWaPE supervise spécifiquement la Wallonie : tarifs de réseau d'ORES et de RESA, obligations de service public, primes et certificats verts liés au photovoltaïque.",
    ],
  },
  {
    id: "simulateur",
    heading: "Le simulateur tarifaire de la CWaPE",
    paragraphs: [
      "La CWaPE propose un simulateur tarifaire en ligne, indépendant et gratuit, qui compare les offres d'électricité et de gaz disponibles en Wallonie. C'est un outil officiel et neutre, particulièrement utile pour avoir une vision objective du marché wallon.",
      "Pour l'utiliser efficacement, vous avez besoin de votre consommation annuelle (en kWh) et de votre code postal, afin que les tarifs de votre gestionnaire de réseau (ORES ou RESA) soient correctement appliqués. Le simulateur affiche alors le coût annuel estimé de chaque offre.",
    ],
    bullets: [
      "Outil officiel, indépendant et gratuit du régulateur wallon",
      "Compare les offres d'électricité et de gaz en Wallonie",
      "Nécessite votre consommation annuelle et votre code postal",
      "Applique les tarifs de réseau d'ORES ou de RESA",
    ],
  },
  {
    id: "ores-resa",
    heading: "Comprendre votre facture : ORES, RESA et coûts de réseau",
    paragraphs: [
      "En Wallonie, la distribution de l'énergie est assurée principalement par ORES, et par RESA dans la région de Liège. Ces gestionnaires de réseau acheminent l'électricité et le gaz jusqu'à votre compteur : ils ne vendent pas d'énergie et ne se choisissent pas. Leurs tarifs de distribution, validés par la CWaPE, représentent une part importante de votre facture.",
      "Votre facture combine donc trois éléments : la part énergie (concurrentielle, qui dépend du fournisseur), les coûts de réseau d'ORES ou RESA, et les taxes et surcharges régionales et fédérales. Seule la part énergie varie entre fournisseurs : c'est sur elle que joue la comparaison.",
    ],
  },
  {
    id: "au-dela-cwape",
    heading: "Aller plus loin que le simulateur CWaPE",
    paragraphs: [
      "Le simulateur de la CWaPE donne une excellente photographie neutre du marché wallon. Pour passer de la simulation à l'action, notre comparateur va plus loin : il intègre les promotions et réductions de bienvenue, simule les offres double énergie et vous accompagne gratuitement dans le changement si vous le souhaitez.",
      "L'approche idéale combine les deux : vérifier les tarifs sur le simulateur officiel de la CWaPE pour la transparence, puis utiliser notre comparateur pour optimiser votre choix et finaliser la souscription sans coupure ni démarche technique.",
    ],
  },
]

const faqs = [
  {
    question: "Qu'est-ce que la CWaPE ?",
    answer:
      "La CWaPE (Commission wallonne pour l'énergie) est le régulateur du marché de l'électricité et du gaz en Région wallonne. Elle contrôle les tarifs de distribution d'ORES et de RESA et protège les consommateurs wallons, en complément du régulateur fédéral CREG.",
  },
  {
    question: "Le simulateur de la CWaPE est-il gratuit et fiable ?",
    answer:
      "Oui. Le simulateur tarifaire de la CWaPE est un outil officiel, indépendant et gratuit. Il compare objectivement les offres d'électricité et de gaz en Wallonie à partir de votre consommation et de votre code postal.",
  },
  {
    question: "Quelle est la différence entre la CWaPE et ORES ?",
    answer:
      "La CWaPE est le régulateur qui contrôle le marché et valide les tarifs. ORES est un gestionnaire de réseau de distribution qui achemine l'énergie jusqu'à votre compteur. ORES ne vend pas d'énergie et ne se choisit pas, contrairement au fournisseur.",
  },
  {
    question: "De quelles informations ai-je besoin pour simuler mes tarifs ?",
    answer:
      "Il vous faut votre consommation annuelle en kWh (électricité et/ou gaz) et votre code postal, afin que les tarifs de réseau d'ORES ou de RESA soient appliqués correctement. Ces données figurent sur votre dernière facture annuelle.",
  },
  {
    question: "Le comparateur Jeconomisemonenergie.eu remplace-t-il le simulateur CWaPE ?",
    answer:
      "Il le complète. Le simulateur CWaPE offre une vue neutre du marché ; notre comparateur intègre en plus les promotions, les offres double énergie et un accompagnement gratuit pour changer de fournisseur sans coupure.",
  },
]

export default function CwapeSimulateurPage() {
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
