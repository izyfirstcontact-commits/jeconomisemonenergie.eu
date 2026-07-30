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
  "Changer de fournisseur d'énergie en Belgique est l'un des gestes les plus simples et les plus rentables pour réduire ses factures d'électricité et de gaz. Pourtant, beaucoup de ménages hésitent par crainte de démarches compliquées ou d'une coupure. En réalité, la procédure est gratuite, rapide et entièrement gérée par le nouveau fournisseur. Ce guide complet vous explique tout, étape par étape."

const highlights = [
  "Démarche 100 % gratuite",
  "Aucune coupure",
  "Valable dans les 3 régions",
  "Sans engagement",
]

const sections: ContentSection[] = [
  {
    id: "pourquoi-changer",
    heading: "Pourquoi changer de fournisseur d'énergie en Belgique ?",
    paragraphs: [
      "Depuis la libéralisation du marché de l'énergie, tous les consommateurs belges, à Bruxelles, en Wallonie comme en Flandre, sont libres de choisir leur fournisseur d'électricité et de gaz. Cette liberté est une arme puissante contre la hausse des factures, mais elle reste sous-utilisée : une grande partie des ménages n'a jamais changé de contrat.",
      "Conserver un contrat ancien revient souvent à payer son énergie plus cher que nécessaire. Les fournisseurs ajustent régulièrement leurs offres, et les clients fidèles ne bénéficient pas toujours des meilleures conditions, réservées aux nouveaux souscripteurs. Comparer et changer permet de remettre la concurrence à votre service.",
      "Au-delà du prix, changer de fournisseur peut aussi répondre à d'autres motivations : choisir une électricité 100 % verte, bénéficier d'un meilleur service client, ou opter pour un tarif fixe afin de sécuriser son budget face à la volatilité des marchés. Quelle que soit votre priorité, la démarche reste la même.",
    ],
  },
  {
    id: "etapes-changement",
    heading: "Les étapes du changement de fournisseur",
    paragraphs: [
      "Changer de fournisseur d'énergie suit un processus balisé et sécurisé. L'essentiel des démarches est pris en charge par votre nouveau fournisseur, ce qui réduit votre intervention au strict minimum. Voici comment cela se déroule concrètement, de la comparaison à l'activation du nouveau contrat.",
      "Avant de commencer, munissez-vous d'une facture récente : elle contient les informations utiles comme votre code EAN (le numéro unique de votre point de fourniture), votre consommation annuelle et votre tarif actuel. Ces éléments permettent une comparaison précise et une souscription sans erreur.",
    ],
    bullets: [
      "Comparez les offres à partir de votre consommation réelle ou estimée",
      "Choisissez l'offre la plus adaptée à votre profil et à vos priorités",
      "Souscrivez auprès du nouveau fournisseur avec votre code EAN",
      "Le nouveau fournisseur résilie automatiquement votre ancien contrat",
      "Le changement prend effet sans coupure, généralement en quelques semaines",
      "Vous recevez une facture de clôture de votre ancien fournisseur",
    ],
  },
  {
    id: "vos-droits",
    heading: "Vos droits et la résiliation sans frais",
    paragraphs: [
      "La législation belge protège fortement le consommateur en matière d'énergie. Pour un contrat à durée indéterminée, vous pouvez résilier à tout moment moyennant un préavis d'un mois, sans aucun frais ni indemnité de rupture. Cette règle s'applique dans les trois régions du pays.",
      "Pour les contrats à durée déterminée, le même préavis d'un mois s'applique en pratique pour la plupart des clients résidentiels, grâce aux protections prévues par le Code de droit économique. Vous n'êtes donc jamais réellement prisonnier d'un contrat, ce qui rend le changement totalement réversible.",
      "Le changement de fournisseur n'entraîne par ailleurs aucune modification de votre installation : votre compteur reste le même, géré par le gestionnaire de réseau de votre région (Sibelga à Bruxelles, ORES ou RESA en Wallonie, Fluvius en Flandre). Seule l'entreprise qui vous facture l'énergie change.",
    ],
  },
  {
    id: "erreurs-a-eviter",
    heading: "Les erreurs à éviter lors du changement",
    paragraphs: [
      "Bien que le changement de fournisseur soit simple, quelques pièges peuvent réduire les bénéfices attendus. Les connaître vous permet de faire un choix vraiment optimal et durable, plutôt que de courir après des promotions de court terme.",
      "L'erreur la plus fréquente consiste à ne regarder que la réduction de bienvenue, sans vérifier le prix réel sur la durée complète du contrat. Une remise attractive la première année peut masquer un tarif élevé ensuite. Il faut donc raisonner sur le coût total annuel, et non sur la seule promotion initiale.",
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
    question: "Changer de fournisseur d'énergie est-il vraiment gratuit en Belgique ?",
    answer:
      "Oui. Le changement de fournisseur est gratuit dans les trois régions. Pour un contrat à durée indéterminée, la résiliation se fait avec un préavis d'un mois, sans frais ni indemnité de rupture.",
  },
  {
    question: "Vais-je subir une coupure d'électricité ou de gaz ?",
    answer:
      "Non. Le changement est purement administratif. Votre compteur reste le même et l'alimentation en énergie se poursuit sans aucune interruption pendant toute la procédure.",
  },
  {
    question: "Combien de temps prend un changement de fournisseur ?",
    answer:
      "Le changement prend généralement quelques semaines, le temps que le nouveau fournisseur traite votre dossier et coordonne la bascule avec le gestionnaire de réseau. Vous n'avez aucune démarche technique à effectuer.",
  },
  {
    question: "Qu'est-ce que le code EAN et où le trouver ?",
    answer:
      "Le code EAN est le numéro unique de votre point de fourniture d'énergie. Il figure sur votre facture et permet d'identifier précisément votre raccordement lors de la souscription d'un nouveau contrat.",
  },
  {
    question: "Dois-je prévenir mon ancien fournisseur ?",
    answer:
      "Non. C'est votre nouveau fournisseur qui se charge de résilier votre ancien contrat. Vous recevrez simplement une facture de clôture de votre ancien fournisseur après la bascule.",
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
