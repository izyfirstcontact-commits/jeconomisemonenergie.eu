import type { Metadata } from "next"
import { SiloPageTemplate, type ContentSection } from "@/components/silo-page-template"
import { SILO_PAGES, getAlternates, SITE_URL } from "@/lib/seo"

const page = SILO_PAGES.find((p) => p.slug === "prix-electricite-trop-cher-belgique")!

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
  "Votre facture d'électricité ne cesse de grimper et vous avez l'impression de payer trop cher ? Vous n'êtes pas seul : en Belgique, des milliers de ménages restent chez leur fournisseur historique et paient un tarif bien au-dessus du marché. La bonne nouvelle, c'est que le marché est libéralisé : comparer les fournisseurs et changer de contrat est gratuit, sans coupure, et peut réduire la part énergie de votre facture jusqu'à 35 %. En moins de 2 minutes, découvrez combien vous pourriez économiser dès ce mois-ci."

const highlights = [
  "Comparaison en 2 minutes",
  "Jusqu'à 35% d'économie",
  "Bruxelles, Wallonie, Flandre",
  "100% gratuit, sans engagement",
]

const sections: ContentSection[] = [
  {
    id: "pourquoi-facture-elevee",
    heading: "Pourquoi votre facture d'électricité est-elle si élevée en Belgique ?",
    paragraphs: [
      "Si vous trouvez le prix de votre électricité trop cher, c'est rarement un hasard. La première raison est presque toujours la même : rester des années chez le même fournisseur, sur un contrat dont le tarif a été révisé à la hausse sans que vous vous en rendiez compte. Les fournisseurs réservent souvent leurs meilleures offres aux nouveaux clients, tandis que les anciens contrats glissent lentement vers des prix moins compétitifs.",
      "À cela s'ajoutent des facteurs structurels : la hausse des prix de gros de l'énergie ces dernières années, l'indexation des contrats variables sur les marchés, et des coûts de réseau qui varient selon votre région et votre gestionnaire (Sibelga à Bruxelles, ORES ou RESA en Wallonie, Fluvius en Flandre). Enfin, un compteur ou un contrat mal adapté à votre consommation réelle (simple, bihoraire, exclusif nuit) peut vous faire payer plus que nécessaire.",
    ],
    bullets: [
      "Un contrat ancien resté chez le fournisseur historique à un tarif non compétitif",
      "Un contrat variable indexé qui suit la hausse des marchés de l'énergie",
      "Des coûts de réseau différents selon votre région et votre gestionnaire",
      "Un type de compteur ou de contrat mal adapté à votre consommation",
      "Des promotions de bienvenue expirées, jamais renégociées",
    ],
  },
  {
    id: "comment-payer-moins",
    heading: "Comment payer moins cher dès ce mois-ci ?",
    paragraphs: [
      "La solution la plus efficace et la plus rapide est de comparer les offres du marché avec votre consommation réelle. Un comparateur applique automatiquement les tarifs de votre gestionnaire de réseau à partir de votre code postal, puis classe les fournisseurs du moins cher au plus cher pour votre profil précis. Vous voyez immédiatement l'écart entre votre contrat actuel et la meilleure offre disponible.",
      "Changer de fournisseur est ensuite purement administratif : votre compteur ne change pas, il n'y a aucune coupure, et le nouveau fournisseur se charge de résilier votre ancien contrat. La démarche est gratuite et prend quelques minutes. Vous pouvez commencer à payer moins cher dès la prise d'effet du nouveau contrat, sans aucune intervention technique chez vous.",
    ],
  },
  {
    id: "combien-economiser",
    heading: "Combien pouvez-vous réellement économiser ?",
    paragraphs: [
      "L'économie dépend de votre contrat actuel, de votre consommation annuelle et de votre région. Un ménage qui n'a jamais comparé depuis plusieurs années paie fréquemment plusieurs centaines d'euros de trop par an sur la part énergie. Plus votre contrat est ancien, plus l'écart avec les meilleures offres actuelles est important — et donc plus l'économie potentielle est élevée.",
      "Notre comparateur calcule votre économie estimée en moins de deux minutes, à partir de votre consommation réelle ou d'une estimation basée sur votre logement. Vous obtenez un résultat clair et chiffré, et si vous le souhaitez, nos conseillers vous accompagnent gratuitement dans le changement, sans aucune pression commerciale.",
    ],
  },
  {
    id: "fixe-ou-variable",
    heading: "Tarif fixe ou variable : lequel choisir pour ne plus payer trop cher ?",
    paragraphs: [
      "Le choix entre un tarif fixe et un tarif variable a un impact direct sur votre facture. Un tarif fixe verrouille le prix du kWh pour toute la durée du contrat : vous êtes protégé contre les hausses, ce qui apporte de la sérénité si vous craignez que les prix repartent à la hausse. Un tarif variable suit les marchés : il peut être moins cher quand les prix baissent, mais il expose aussi votre facture aux hausses.",
      "Il n'existe pas de réponse unique : le bon choix dépend de votre tolérance au risque et du contexte de marché. Notre comparateur vous montre les meilleures offres dans les deux catégories, avec une estimation annuelle claire, pour que vous décidiez en connaissance de cause plutôt que de subir un tarif trop cher par défaut.",
    ],
  },
]

const faqs = [
  {
    question: "Pourquoi mon prix d'électricité a-t-il autant augmenté en Belgique ?",
    answer:
      "Le plus souvent parce que votre contrat est ancien et n'a jamais été renégocié : les fournisseurs réservent leurs meilleurs tarifs aux nouveaux clients. S'ajoutent la hausse des prix de gros, l'indexation des contrats variables et les coûts de réseau propres à votre région. Comparer permet de voir immédiatement si vous payez au-dessus du marché.",
  },
  {
    question: "Est-ce vraiment gratuit de comparer et de changer de fournisseur ?",
    answer:
      "Oui, totalement. La comparaison et le changement de fournisseur sont gratuits et sans engagement en Belgique. Nous sommes rémunérés par les fournisseurs uniquement si vous décidez de souscrire, ce qui ne change rien au prix que vous payez.",
  },
  {
    question: "Vais-je subir une coupure d'électricité en changeant de fournisseur ?",
    answer:
      "Non. Le changement est purement administratif : votre compteur reste le même et l'alimentation continue sans aucune interruption. Le nouveau fournisseur se charge de résilier votre ancien contrat à votre place.",
  },
  {
    question: "En combien de temps puis-je payer moins cher ?",
    answer:
      "La comparaison prend moins de 2 minutes. Une fois votre nouveau contrat souscrit, le changement prend généralement effet sous quelques semaines selon les délais légaux, et vous commencez alors à bénéficier du tarif plus avantageux.",
  },
  {
    question: "Dois-je payer des frais de résiliation à mon ancien fournisseur ?",
    answer:
      "En Belgique, les contrats d'énergie des particuliers peuvent être résiliés sans frais moyennant un préavis d'un mois, même sur un contrat à durée déterminée. Vous n'avez donc pas de pénalité à craindre en changeant pour un tarif moins cher.",
  },
]

export default function PrixElectriciteTropCherBelgiquePage() {
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
