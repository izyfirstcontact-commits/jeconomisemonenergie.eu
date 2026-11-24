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
  "Les marchés de l’énergie en Belgique sont organisés à l’échelle régionale. Cette page propose des repères généraux pour comprendre les éléments à vérifier avant de comparer un contrat. Le parcours commercial de Jeconomisemonenergie.eu est destiné au public wallon : il ne constitue pas un comparateur couvrant Bruxelles, la Wallonie et la Flandre ni une comparaison tarifaire en temps réel."

const highlights = [
  "Guide d’information Belgique",
  "Repères à vérifier par région",
  "Parcours commercial destiné au public wallon",
]

const sections: ContentSection[] = [
  {
    id: "trois-regions",
    heading: "Des marchés régionaux à prendre en compte",
    paragraphs: [
      "La Belgique comprend plusieurs marchés régionaux de l’énergie. Les règles, organismes compétents, offres disponibles et composantes de facture peuvent varier selon la région et le point de fourniture.",
      "Avant de comparer un contrat, identifiez votre région et consultez le régulateur compétent ainsi que les conditions du fournisseur. Cette page est un guide général; elle ne vérifie pas la disponibilité d’une offre à une adresse donnée.",
    ],
    links: [
      { href: "https://www.compacwape.be/", label: "Pour la Wallonie, consulter le comparateur officiel CompaCWaPE", external: true },
    ],
  },
  {
    id: "composition-facture",
    heading: "Les éléments à examiner dans un contrat",
    paragraphs: [
      "Les documents tarifaires peuvent présenter plusieurs composantes et conditions. Pour une comparaison valable, vérifiez la période, le profil de consommation, les frais fixes, la durée, les modalités d’évolution du prix et les critères des promotions éventuelles.",
      "Une estimation ou un classement n’est interprétable que si sa méthode, ses produits inclus, sa région de couverture et la date de ses données sont clairement précisés.",
    ],
    bullets: [
      "Le prix et les frais fixes affichés dans les documents du fournisseur",
      "La durée et les modalités d’évolution du tarif",
      "Les conditions d’éligibilité et de maintien d’une promotion",
      "La période et le profil utilisés pour calculer un coût annuel",
    ],
  },
  {
    id: "electricite-et-gaz",
    heading: "Électricité et gaz : comparer les conditions séparément",
    paragraphs: [
      "Si vous examinez plusieurs contrats, vérifiez les conditions de chaque produit séparément, même lorsqu’ils sont proposés ensemble. Une remise éventuelle doit être appréciée avec sa durée, ses critères et le prix applicable après la période promotionnelle.",
      "Jeconomisemonenergie.eu ne simule pas ici des offres groupées et des contrats séparés dans les trois régions. Vérifiez toute comparaison auprès d’un outil ou fournisseur qui publie sa couverture et sa méthode.",
    ],
  },
  {
    id: "economies-belgique",
    heading: "Périmètre du parcours de Jeconomisemonenergie.eu",
    paragraphs: [
      "Le parcours commercial proposé par Jeconomisemonenergie.eu s’adresse au public wallon. Il recueille des informations pour préparer une demande et peut afficher une estimation indicative; il ne constitue pas une comparaison de tarifs en temps réel ni une offre couvrant la Belgique entière.",
      "Pour la Wallonie, consultez aussi le guide des critères de comparaison et les informations officielles de CompaCWaPE. Vérifiez toujours les prix, dates et conditions auprès des fournisseurs concernés.",
    ],
    links: [
      { href: "/guides/comparateurs-prix-electricite-gaz-belgique", label: "Lire le guide sur les critères de comparaison en Wallonie" },
      { href: "/comparateur-gaz-wallonie", label: "Voir les repères sur les contrats de gaz en Wallonie" },
    ],
  },
]

const faqs = [
  {
    question: "Le parcours commercial couvre-t-il les trois régions ?",
    answer:
      "Non. Le parcours de Jeconomisemonenergie.eu est destiné au public wallon. Cette page nationale fournit des repères généraux et ne propose pas de comparaison commerciale pour Bruxelles et la Flandre.",
  },
  {
    question: "Cette page compare-t-elle les prix en temps réel ?",
    answer:
      "Non. Il s’agit d’un guide d’information; il ne classe pas les tarifs en temps réel. Consultez les outils officiels et les documents des fournisseurs pour les prix et conditions applicables.",
  },
  {
    question: "Où consulter les informations officielles pour la Wallonie ?",
    answer:
      "La CWaPE est le régulateur wallon des marchés de l’électricité et du gaz. CompaCWaPE est son comparateur officiel des offres en Wallonie.",
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
