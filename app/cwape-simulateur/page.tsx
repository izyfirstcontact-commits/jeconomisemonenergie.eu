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
  "La CWaPE est le régulateur wallon des marchés de l’électricité et du gaz. CompaCWaPE est son comparateur officiel des offres d’énergie en Wallonie. Jeconomisemonenergie.eu propose un parcours commercial distinct, avec une estimation indicative qui ne remplace pas l’outil officiel et ne compare pas les tarifs en temps réel."

const highlights = [
  "CWaPE : régulateur wallon",
  "CompaCWaPE : comparateur officiel",
  "Outil public et parcours commercial distincts",
]

const sections: ContentSection[] = [
  {
    id: "role-cwape",
    heading: "Le rôle de la CWaPE",
    paragraphs: [
      "La CWaPE (Commission wallonne pour l’Énergie) est le régulateur wallon des marchés de l’électricité et du gaz. Elle est distincte des fournisseurs d’énergie et du parcours commercial proposé par Jeconomisemonenergie.eu.",
    ],
    links: [
      { href: "https://www.cwape.be/", label: "Consulter le site officiel de la CWaPE", external: true },
    ],
  },
  {
    id: "simulateur",
    heading: "CompaCWaPE, le comparateur officiel",
    paragraphs: [
      "CompaCWaPE est présenté par la CWaPE comme son comparateur des offres d’énergie en Région wallonne. Les prix et conditions évoluent : consultez l’outil officiel et les fiches tarifaires des fournisseurs pour vérifier les informations valables au moment de votre comparaison.",
      "La page officielle consultée indiquait une mise à jour des prix du mois d’octobre publiée le 5 novembre 2026. Cette date est un repère de consultation, pas une garantie que les offres affichées restent valables par la suite.",
    ],
    links: [
      { href: "https://www.compacwape.be/", label: "Ouvrir CompaCWaPE — comparateur officiel de la CWaPE", external: true },
    ],
  },
  {
    id: "ores-resa",
    heading: "Distinguer régulateur, comparateur et service commercial",
    paragraphs: [
      "La CWaPE est le régulateur régional. CompaCWaPE est l’outil officiel de comparaison qu’elle met à disposition. Jeconomisemonenergie.eu est un service privé distinct : son parcours recueille des informations pour préparer une demande et peut afficher une estimation indicative. Il ne s’agit ni d’un service de la CWaPE ni d’une équivalence démontrée avec CompaCWaPE.",
      "Pour connaître la couverture, la méthode et les conditions du service privé, consultez les informations affichées dans le parcours avant de transmettre une demande. Pour comparer les offres wallonnes, utilisez directement CompaCWaPE et vérifiez les fiches tarifaires des fournisseurs.",
    ],
    links: [
      { href: "/comparateur-gaz-wallonie", label: "Lire nos repères pour comparer un contrat de gaz en Wallonie" },
    ],
  },
  {
    id: "au-dela-cwape",
    heading: "Un parcours commercial distinct",
    paragraphs: [
      "Le parcours de Jeconomisemonenergie.eu ne remplace pas le comparateur officiel et ne prétend pas en reproduire les fonctions. Il s’agit d’une démarche commerciale séparée; toute estimation affichée est indicative, ne constitue pas une offre contractuelle et ne compare pas les tarifs en temps réel.",
      "Pour une demande d’accompagnement, utilisez le parcours du site après avoir consulté les conditions qui y sont présentées. Pour comparer les offres et leurs prix, rendez-vous directement sur CompaCWaPE.",
    ],
  },
]

const faqs = [
  {
    question: "Quel est le rôle de la CWaPE ?",
    answer:
      "La CWaPE est le régulateur wallon des marchés de l’électricité et du gaz. Consultez son site officiel pour ses missions et ses informations à jour.",
  },
  {
    question: "Qu’est-ce que CompaCWaPE ?",
    answer:
      "CompaCWaPE est le comparateur officiel de la CWaPE pour les offres d’énergie en Wallonie. Les prix et conditions doivent être vérifiés dans l’outil au moment de la consultation.",
  },
  {
    question: "Jeconomisemonenergie.eu est-il un service de la CWaPE ?",
    answer:
      "Non. Jeconomisemonenergie.eu propose un parcours commercial distinct. Il ne remplace pas CompaCWaPE et ses estimations ne constituent pas une comparaison tarifaire en temps réel.",
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
