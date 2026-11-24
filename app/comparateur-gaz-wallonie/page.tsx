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
    heading: "Le marché du gaz en Wallonie en 2026",
    paragraphs: [
      "Le marché du gaz est libéralisé en Wallonie : chaque ménage peut choisir et changer librement son fournisseur. Cette liberté permet de profiter de la concurrence entre acteurs, mais elle suppose de comparer régulièrement les offres pour ne pas rester bloqué sur un contrat devenu trop cher au fil du temps.",
      "Le gestionnaire de réseau dépend du point de fourniture et de la commune. Pour identifier le gestionnaire compétent et les conditions applicables, vérifiez les informations officielles relatives à votre adresse. Le fournisseur d’énergie et le gestionnaire de réseau remplissent des rôles distincts.",
      "Pour lire une facture, distinguez le prix de l’énergie des coûts de réseau, taxes et autres composantes. La composition et les montants dépendent de l’offre et des règles en vigueur; consultez les documents du fournisseur et les références officielles wallonnes.",
    ],
  },
  {
    id: "criteres-comparaison-gaz",
    heading: "Les critères pour bien comparer un contrat de gaz",
    paragraphs: [
      "Pour comparer des contrats, vérifiez le coût annuel estimé, les frais fixes, la durée, les conditions promotionnelles et le mode d’indexation. Les données doivent correspondre à votre consommation et être datées. Le parcours du site recueille des informations pour accompagner une demande; il ne compare pas en temps réel les tarifs de tous les fournisseurs.",
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
    heading: "Comment évaluer le coût d’un contrat de gaz ?",
    paragraphs: [
      "Une économie éventuelle dépend du contrat actuel, du profil de consommation, des conditions de la nouvelle offre et de la date de comparaison. Sans tarifs vérifiés et calculés sur une base comparable, il n’est pas possible d’annoncer un montant ou un pourcentage fiable.",
      "L’estimation affichée par le simulateur est indicative et repose sur les informations saisies. Elle ne constitue pas une économie garantie ni une comparaison personnalisée d’offres tarifaires en temps réel.",
      "Avant de décider, vérifiez le tarif et les conditions auprès du fournisseur concerné et comparez les composantes du coût annuel sur une période identique.",
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
      "Le gestionnaire de réseau dépend de votre point de fourniture et de votre commune. Consultez les informations officielles pour identifier le gestionnaire compétent et distinguer son rôle de celui du fournisseur.",
  },
  {
    question: "Le changement de fournisseur de gaz est-il gratuit en Wallonie ?",
    answer:
      "Les modalités dépendent du contrat et de votre situation. Vérifiez les clauses de résiliation et confirmez les éventuels frais ou délais auprès du fournisseur concerné.",
  },
  {
    question: "Vais-je risquer une coupure de gaz en changeant de fournisseur ?",
    answer:
      "Demandez au fournisseur choisi de confirmer les étapes de transition et les dispositions prévues pour assurer la continuité de votre fourniture dans votre situation.",
  },
  {
    question: "Quelles économies sur le gaz puis-je espérer en Wallonie ?",
    answer:
      "Le simulateur du site fournit une estimation indicative à partir des informations saisies. Il ne compare pas en temps réel les tarifs de fournisseurs et ne garantit pas d’économie.",
  },
  {
    question: "Tarif fixe ou variable pour le gaz en Wallonie ?",
    answer:
      "Un tarif fixe et un tarif variable ont des modalités et des risques différents. Comparez leur coût total, leur durée et les règles d’évolution du prix, puis vérifiez les conditions auprès du fournisseur.",
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
