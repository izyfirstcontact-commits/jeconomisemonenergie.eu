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
  "Cette page aide les particuliers de Wallonie à comprendre les principaux éléments d’un contrat de gaz et à préparer une comparaison. Les prix et conditions varient selon le produit, la période et le profil; les estimations du site ne constituent pas une comparaison de tarifs en temps réel ni une offre contractuelle."

const highlights = [
  "Repères pour la Wallonie",
  "Contrats de gaz",
  "Conditions à vérifier",
  "Particuliers",
]

const sections: ContentSection[] = [
  {
    id: "marche-gaz-wallonie",
    heading: "Comprendre un contrat de gaz en Wallonie",
    paragraphs: [
      "Le choix d’un contrat dépend des conditions proposées par le fournisseur et de votre situation. Pour examiner une offre, vérifiez le prix de l’énergie, les frais fixes, la durée, les conditions promotionnelles et les modalités d’évolution du tarif.",
      "Le gestionnaire de réseau et le fournisseur ont des rôles distincts. Les modalités applicables à votre point de fourniture sont à vérifier dans vos documents contractuels et auprès des sources officielles wallonnes.",
      "Distinguez le prix de l’énergie des coûts de réseau, taxes et autres composantes de la facture. Les montants dépendent de l’offre et des règles en vigueur; consultez des informations datées avant toute comparaison.",
    ],
  },
  {
    id: "criteres-comparaison-gaz",
    heading: "Les critères pour bien comparer un contrat de gaz",
    paragraphs: [
      "Pour comparer des contrats, vérifiez le coût annuel estimé, les frais fixes, la durée, les conditions promotionnelles et le mode d’indexation. Les données doivent correspondre à votre consommation et être datées. Le parcours du site recueille des informations pour accompagner une demande; il ne compare pas en temps réel les tarifs de tous les fournisseurs.",
      "Les offres à prix fixe et variable peuvent avoir des modalités différentes. Examinez la durée, les règles d’évolution du prix et les conditions contractuelles propres à l’offre; ne déduisez pas son coût futur d’une seule indication tarifaire.",
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
    heading: "Comment évaluer le coût d’un contrat de gaz ?",
    paragraphs: [
      "Une économie éventuelle dépend du contrat actuel, du profil de consommation, des conditions de la nouvelle offre et de la date de comparaison. Sans tarifs vérifiés et calculés sur une base comparable, il n’est pas possible d’annoncer un montant ou un pourcentage fiable.",
      "L’estimation affichée par le simulateur est indicative et repose sur les informations saisies. Elle ne constitue pas une économie garantie ni une comparaison personnalisée d’offres tarifaires en temps réel.",
      "Avant de décider, vérifiez le tarif et les conditions auprès du fournisseur concerné et comparez les composantes du coût annuel sur une période identique.",
    ],
  },
  {
    id: "demarche-changement-gaz",
    heading: "Préparer un changement de fournisseur de gaz",
    paragraphs: [
      "Avant de souscrire, vérifiez les modalités, les délais et les éventuels frais applicables à votre contrat auprès du fournisseur concerné et dans les sources officielles. Ne supposez pas que toutes les situations suivent les mêmes conditions.",
      "Le parcours de Jeconomisemonenergie.eu est une démarche commerciale distincte. Son estimation est indicative; elle ne constitue pas une comparaison tarifaire en temps réel ni une promesse d’économie.",
    ],
    links: [
      { href: "/changement-fournisseur-energie", label: "Consulter le guide pratique du changement en Wallonie" },
    ],
  },
]

const faqs = [
  {
    question: "Quels critères examiner dans un contrat de gaz ?",
    answer:
      "Vérifiez le prix de l’énergie, les frais fixes, la durée, les promotions et les modalités d’évolution du tarif dans les conditions du fournisseur.",
  },
  {
    question: "Le parcours compare-t-il les tarifs de gaz en temps réel ?",
    answer:
      "Non. Le parcours fournit une estimation indicative; il ne compare pas en temps réel l’ensemble des tarifs disponibles et ne garantit pas d’économie.",
  },
  {
    question: "Où vérifier les conditions de changement ?",
    answer:
      "Consultez les conditions de votre contrat, les informations du fournisseur choisi et les ressources officielles wallonnes avant de souscrire.",
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
