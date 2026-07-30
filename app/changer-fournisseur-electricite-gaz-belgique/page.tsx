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
  "Changer de fournisseur d'électricité et de gaz en Belgique est gratuit, rapide et sans aucune coupure. Que vous gériez deux contrats séparés ou une offre double énergie, la démarche est encadrée par la loi et entièrement prise en charge par votre nouveau fournisseur. Voici le mode d'emploi complet, étape par étape, avec le rôle du code EAN, les délais légaux et les pièges à éviter."

const highlights = [
  "Sans coupure d'énergie",
  "Gratuit et sans frais",
  "Préavis d'un mois maximum",
  "Électricité et gaz",
]

const sections: ContentSection[] = [
  {
    id: "pourquoi-changer",
    heading: "Pourquoi changer de fournisseur d'électricité et de gaz ?",
    paragraphs: [
      "Sur le marché libéralisé belge, les fournisseurs ajustent régulièrement leurs tarifs et leurs promotions. Un ménage resté plusieurs années chez le même fournisseur paie souvent un tarif nettement supérieur aux meilleures offres du moment. Changer permet de récupérer cet écart, sur l'électricité comme sur le gaz.",
      "Le changement est d'autant plus intéressant pour le gaz, où la redevance fixe et la formule tarifaire varient fortement d'un contrat à l'autre. Comparer électricité et gaz ensemble, via une offre double énergie ou deux contrats distincts, maximise l'économie totale.",
    ],
  },
  {
    id: "etapes",
    heading: "Les étapes pour changer de fournisseur en Belgique",
    paragraphs: [
      "La procédure est volontairement simple pour encourager la concurrence. Vous n'avez aucune intervention technique à prévoir : votre compteur et votre raccordement restent identiques, et seul le nom inscrit sur votre facture change.",
    ],
    bullets: [
      "Comparez les offres d'électricité et de gaz selon votre consommation et votre région",
      "Munissez-vous de votre code EAN (18 chiffres) et de votre dernière facture",
      "Souscrivez auprès du nouveau fournisseur, qui résilie automatiquement l'ancien contrat",
      "Recevez la confirmation de reprise et vérifiez l'index de compteur transmis",
      "Aucune coupure : l'alimentation continue sans interruption pendant le transfert",
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
    heading: "Délais légaux et droits du consommateur",
    paragraphs: [
      "La législation belge protège fortement le consommateur. Pour un contrat à durée indéterminée, vous pouvez résilier à tout moment moyennant un préavis d'un mois, sans frais ni indemnité de rupture. Pour un contrat à durée déterminée, vous bénéficiez aussi de ce droit de résiliation avec préavis d'un mois, sans pénalité.",
      "Le transfert effectif prend généralement quelques semaines, le temps que le gestionnaire de réseau traite la reprise. Vous disposez par ailleurs d'un droit de rétractation de 14 jours après une souscription à distance. Aucun de ces droits n'entraîne de coupure ni de frais cachés.",
    ],
    bullets: [
      "Résiliation avec préavis d'un mois, sans frais (durée indéterminée comme déterminée)",
      "Droit de rétractation de 14 jours pour une souscription à distance",
      "Aucune indemnité de rupture pour les particuliers",
      "Le nouveau fournisseur gère l'ensemble des formalités administratives",
    ],
  },
]

const faqs = [
  {
    question: "Changer de fournisseur d'électricité et de gaz est-il payant ?",
    answer:
      "Non. Le changement est totalement gratuit en Belgique. Pour les particuliers, la résiliation se fait avec un préavis d'un mois, sans frais ni indemnité de rupture, que le contrat soit à durée déterminée ou indéterminée.",
  },
  {
    question: "Vais-je subir une coupure de gaz ou d'électricité ?",
    answer:
      "Non. Le changement est purement administratif. Votre compteur et votre raccordement restent identiques, et l'alimentation en énergie continue sans aucune interruption pendant le transfert.",
  },
  {
    question: "Où trouver mon code EAN ?",
    answer:
      "Le code EAN est un numéro à 18 chiffres commençant par 54, indiqué sur votre facture d'énergie. Vous en avez un pour l'électricité et un pour le gaz. Il identifie votre point de raccordement auprès du gestionnaire de réseau.",
  },
  {
    question: "Combien de temps prend le changement de fournisseur ?",
    answer:
      "Le transfert prend généralement quelques semaines, le temps que le gestionnaire de réseau (Sibelga, ORES, RESA ou Fluvius) traite la reprise. Vous n'avez aucune démarche technique à effectuer durant cette période.",
  },
  {
    question: "Vaut-il mieux une offre double énergie ou deux contrats séparés ?",
    answer:
      "Les offres double énergie incluent souvent une remise et une facture unique, mais deux contrats séparés peuvent parfois être moins chers selon votre profil. Notre comparateur teste les deux scénarios pour vous indiquer le plus avantageux.",
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
