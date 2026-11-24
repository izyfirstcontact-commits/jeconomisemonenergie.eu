import type { Metadata } from "next"
import { SiloPageTemplate, type ContentSection } from "@/components/silo-page-template"
import { SILO_PAGES, getAlternates, SITE_URL } from "@/lib/seo"

const page = SILO_PAGES.find((p) => p.slug === "changer-fournisseur-electricite-gaz-belgique")!

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
  "Ce guide présente les informations à réunir et les points à vérifier avant un changement de fournisseur d’électricité ou de gaz en Belgique. Les délais, frais éventuels et démarches dépendent des règles en vigueur et de votre situation : confirmez-les dans les sources officielles et auprès des fournisseurs. Le parcours commercial de Jeconomisemonenergie.eu est destiné au public wallon."

const highlights = [
  "Guide d’information Belgique",
  "Conditions à vérifier selon la situation",
  "Parcours commercial destiné au public wallon",
]

const sections: ContentSection[] = [
  {
    id: "pourquoi-changer",
    heading: "Examiner son contrat avant de changer",
    paragraphs: [
      "Un changement peut être envisagé lorsque vous souhaitez revoir les prix, les conditions ou le service associé à votre contrat. Comparez les documents tarifaires sur une même période et selon un profil de consommation comparable; ne présumez pas qu’un changement entraîne une économie.",
      "L’électricité et le gaz peuvent être souscrits séparément ou ensemble selon les offres disponibles. Vérifiez les conditions propres à chaque produit et à votre région avant de décider.",
    ],
  },
  {
    id: "etapes",
    heading: "Les étapes à vérifier avant de souscrire",
    paragraphs: [
      "Les démarches et leur ordre peuvent dépendre de votre situation et des conditions contractuelles. Demandez au fournisseur choisi quelles actions il prend en charge, quelle date de prise d’effet est prévue et si vous devez accomplir une démarche auprès de votre fournisseur actuel.",
    ],
    bullets: [
      "Rassemblez une facture récente et les informations de consommation utiles",
      "Vérifiez le produit, le tarif, la période de validité et les conditions d’éligibilité",
      "Consultez les clauses de résiliation de votre contrat actuel",
      "Demandez au fournisseur choisi de confirmer les démarches et la date de prise d’effet",
      "Conservez les confirmations et documents liés à la demande",
    ],
    links: [
      { href: "https://www.cwape.be/", label: "Consulter les informations officielles de la CWaPE", external: true },
      { href: "https://economie.fgov.be/fr/themes/energie", label: "Consulter les informations Énergie du SPF Économie (page mise à jour le 10 juin 2025)", external: true },
      { href: "/changement-fournisseur-energie", label: "Voir le guide pratique pour la Wallonie" },
    ],
  },
  {
    id: "code-ean",
    heading: "Le code EAN : la clé de votre raccordement",
    paragraphs: [
      "Le code EAN est un numéro unique à 18 chiffres qui identifie votre point de raccordement à l'électricité ou au gaz. Il commence par 54 et figure sur votre facture d'énergie. Vous avez un code EAN distinct pour l'électricité et pour le gaz.",
      "Ce code permet au nouveau fournisseur et à votre gestionnaire de réseau (Sibelga, ORES, RESA ou Fluvius) d'identifier précisément votre installation lors du transfert. Le fournir évite toute erreur d'adresse et garantit un changement fluide. En cas de déménagement, ce sont les codes EAN du nouveau logement qu'il faut communiquer.",
    ],
  },
  {
    id: "delais-droits",
    heading: "Vérifier les délais et droits applicables",
    paragraphs: [
      "Cette page ne fixe pas de délai légal unique. Le préavis, les éventuels frais de résiliation, le droit de rétractation et les démarches à effectuer doivent être vérifiés selon le contrat, la manière dont il a été conclu, le type de client et les règles en vigueur à la date de votre demande.",
      "Avant de souscrire ou de résilier, consultez les informations officielles applicables à votre situation et demandez au fournisseur de confirmer par écrit les délais, frais éventuels et date de prise d’effet. Les pages générales citées ci-dessous sont des points de départ; elles ne remplacent pas la vérification des textes et conditions spécifiques en vigueur.",
    ],
    links: [
      { href: "https://www.cwape.be/", label: "CWaPE — régulateur wallon de l’énergie", external: true },
      { href: "https://economie.fgov.be/fr/themes/energie", label: "SPF Économie — rubrique Énergie (mise à jour le 10 juin 2025)", external: true },
    ],
  },
]

const faqs = [
  {
    question: "Quelles informations préparer avant une demande ?",
    answer:
      "Une facture récente aide à retrouver les informations de votre contrat et de votre point de fourniture. Le fournisseur vous précisera les données nécessaires à votre situation.",
  },
  {
    question: "Quels délais et frais s’appliquent à un changement ?",
    answer:
      "Ils dépendent des règles en vigueur, de votre contrat et de votre situation. Vérifiez les conditions officielles et demandez au fournisseur de confirmer les modalités applicables avant de souscrire.",
  },
  {
    question: "Où trouver mon code EAN ?",
    answer:
      "Le code EAN identifie un point de fourniture et figure généralement sur les documents du fournisseur ou une facture récente. Vérifiez le code et les données demandées avant de les transmettre.",
  },
]

export default function ChangerFournisseurElectriciteGazBelgiquePage() {
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
