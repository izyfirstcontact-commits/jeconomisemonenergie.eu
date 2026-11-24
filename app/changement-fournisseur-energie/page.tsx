import type { Metadata } from "next"
import { SiloPageTemplate, type ContentSection } from "@/components/silo-page-template"
import { SILO_PAGES, getAlternates } from "@/lib/seo"

const page = SILO_PAGES.find((p) => p.slug === "changement-fournisseur-energie")!

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
  "Ce guide aide les ménages de Wallonie à préparer un éventuel changement de fournisseur d’électricité ou de gaz. Les modalités, délais et frais éventuels dépendent de la situation et du contrat : vérifiez les conditions applicables auprès de votre fournisseur avant toute décision."

const highlights = [
  "Guide pratique pour la Wallonie",
  "Électricité et gaz",
  "Conditions à vérifier selon le contrat",
  "Particuliers",
]

const sections: ContentSection[] = [
  {
    id: "pourquoi-changer",
    heading: "Préparer un changement de fournisseur en Wallonie",
    paragraphs: [
      "Avant de changer, rassemblez les informations de votre contrat actuel, votre consommation et vos préférences (prix fixe ou variable, modalités et service). Vérifiez ensuite que l’offre envisagée est disponible pour votre point de fourniture en Wallonie.",
      "Un tarif d’appel ou une promotion ne suffit pas à établir le coût total. Examinez les frais fixes, la durée, les conditions de remise et les modalités de variation du prix.",
      "Les étapes et conditions peuvent dépendre du type de contrat et de votre situation. Consultez les informations actuelles de votre fournisseur et les sources officielles wallonnes avant de prendre une décision.",
    ],
  },
  {
    id: "etapes-changement",
    heading: "Les étapes du changement de fournisseur",
    paragraphs: [
      "Le parcours dépend des conditions contractuelles et des informations demandées par le fournisseur choisi. Avant toute souscription, vérifiez les étapes, la date de prise d’effet et les éventuels frais applicables à votre situation.",
      "Une facture récente peut aider à retrouver votre consommation, votre type de contrat et les identifiants du point de fourniture. Ne transmettez que les informations nécessaires au fournisseur ou au service sollicité.",
    ],
    bullets: [
      "Rassemblez une facture récente et les informations de consommation utiles",
      "Vérifiez la disponibilité de l’offre pour votre point de fourniture en Wallonie",
      "Lisez les conditions tarifaires, promotionnelles et de résiliation",
      "Confirmez avec le fournisseur choisi les démarches et la date de prise d’effet",
      "Conservez les documents et confirmations liés à votre demande",
    ],
  },
  {
    id: "vos-droits",
    heading: "Vérifier les conditions de résiliation",
    paragraphs: [
      "Les droits de résiliation et les délais applicables dépendent du type de contrat et des règles en vigueur. Vérifiez les conditions de votre contrat et les informations officielles avant de résilier ou de signer une nouvelle offre.",
      "Conservez les confirmations et relevés liés au changement et demandez au fournisseur de préciser toute condition ou frais qui ne serait pas clair.",
      "Un changement de fournisseur concerne le contrat de fourniture. Si vous avez une question sur votre raccordement, votre compteur ou votre gestionnaire de réseau, adressez-vous au gestionnaire compétent pour votre commune.",
    ],
  },
  {
    id: "erreurs-a-eviter",
    heading: "Les points à vérifier avant de souscrire",
    paragraphs: [
      "Avant de souscrire, lisez le contrat et vérifiez que les prix et conditions correspondent à votre situation. Une promotion doit être évaluée avec sa durée, ses critères d’éligibilité et le tarif qui s’applique ensuite.",
      "Comparez des coûts établis sur la même période et le même profil de consommation. Si une donnée manque ou n’est pas datée, demandez une confirmation au fournisseur.",
    ],
    bullets: [
      "Ne pas comparer uniquement sur la réduction de bienvenue",
      "Vérifier le type de tarif (fixe ou variable) et sa durée",
      "Prendre en compte votre consommation réelle, pas une moyenne générique",
      "Ne pas oublier de relever votre index au moment du changement",
      "Comparer à nouveau à l'échéance pour rester sur la meilleure offre",
    ],
  },
]

const faqs = [
  {
    question: "Quels éléments préparer avant de changer de fournisseur en Wallonie ?",
    answer:
      "Une facture récente permet de retrouver les informations de consommation et de contrat. Vérifiez auprès du fournisseur les données nécessaires à votre demande.",
  },
  {
    question: "Le changement est-il toujours gratuit et sans frais ?",
    answer:
      "Les conditions peuvent dépendre du contrat et de votre situation. Consultez les clauses de résiliation et demandez au fournisseur de confirmer tout frais ou délai éventuel.",
  },
  {
    question: "Combien de temps prend un changement de fournisseur ?",
    answer:
      "Le délai de prise d’effet dépend de la situation et des modalités applicables. Demandez une date prévisionnelle au fournisseur choisi et vérifiez les informations indiquées dans votre contrat.",
  },
  {
    question: "Où trouver les informations de mon point de fourniture ?",
    answer:
      "Consultez une facture récente ou les documents transmis par votre fournisseur. Ne communiquez ces données qu’au service concerné et lorsque cela est nécessaire à votre demande.",
  },
  {
    question: "Dois-je prévenir mon ancien fournisseur ?",
    answer:
      "Les démarches dépendent du contrat et du parcours de souscription. Confirmez avec le nouveau fournisseur qui effectue la résiliation et quelles actions restent à votre charge.",
  },
]

export default function ChangementFournisseurEnergiePage() {
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
