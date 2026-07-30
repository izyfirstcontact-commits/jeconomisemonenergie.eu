import type { Metadata } from "next"
import { GuidePageTemplate, type GuideSection } from "@/components/guide-page-template"
import { GUIDE_PAGES, getAlternates } from "@/lib/seo"

const page = GUIDE_PAGES.find((p) => p.slug === "comparateurs-prix-electricite-gaz-belgique")!

export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.description,
  keywords: page.keywords,
  alternates: getAlternates(`/guides/${page.slug}`),
  openGraph: {
    title: page.title,
    description: page.description,
    url: `https://jeconomisemonenergie.eu/guides/${page.slug}`,
    locale: "fr_BE",
    type: "article",
  },
}

const intro =
  "En Belgique, 73% des ménages payent trop cher leur énergie. La raison : ils n'utilisent pas de comparateur. Que vous soyez à Bruxelles, en Wallonie ou en Flandre, un comparateur de prix électricité et gaz vous fait économiser 180 à 450€/an en 2 minutes. Voici comment ça marche avec Sibelga, Ores et Fluvius."

const highlights = [
  "Données CREG officielles",
  "Sibelga, Ores & Fluvius",
  "100% gratuit",
  "Résultat en 2 minutes",
]

const sections: GuideSection[] = [
  {
    id: "pourquoi-comparateur",
    heading: "Pourquoi utiliser un comparateur en Belgique ?",
    blocks: [
      {
        type: "ordered",
        items: [
          "Les prix changent tous les 3 mois : la CREG valide de nouveaux tarifs variables chaque trimestre. Votre contrat « fixe » de 2023 est déjà obsolète.",
          "Les GRD sont différents : un Bruxellois chez Sibelga ne paye pas les mêmes frais de réseau qu'un Wallon chez Ores ou un Flamand chez Fluvius. Le comparateur calcule ça automatiquement.",
          "32 fournisseurs actifs : Engie, Luminus, TotalEnergies, Mega, Eneco… Impossible de checker manuellement.",
        ],
      },
    ],
  },
  {
    id: "comparateur-fiable",
    heading: "Comment fonctionne un comparateur fiable ?",
    blocks: [
      { type: "paragraph", text: "Un bon comparateur énergie Belgique doit :" },
      {
        type: "ordered",
        items: [
          "Être certifié CREG : gage d'indépendance. Jeconomisemonenergie.eu utilise les données CREG officielles.",
          "Intégrer votre GRD : il vous demande votre code postal pour appliquer les tarifs Sibelga, Ores ou Fluvius.",
          "Comparer fixe vs variable : en 2026, le variable redevient intéressant. Le comparateur doit simuler les 2.",
          "Inclure toutes les promos : welcome pack, kWh gratuits, parrainage. On rate 60€ en moyenne sans ça.",
        ],
      },
    ],
  },
  {
    id: "electricite-vs-gaz",
    heading: "Électricité vs Gaz : les pièges à éviter",
    blocks: [
      {
        type: "table",
        caption: "Pièges à éviter selon le type d'énergie",
        headers: ["Énergie", "Piège #1", "Piège #2"],
        rows: [
          [
            "Électricité",
            "Tarif jour/nuit non rentable si moins de 40% de conso la nuit",
            "Compteur exclusif nuit : seulement 3 fournisseurs le proposent",
          ],
          [
            "Gaz naturel",
            "Formule TTF vs ZTP : 15% d'écart selon votre commune",
            "Redevance fixe jusqu'à 120€/an chez certains",
          ],
        ],
      },
    ],
  },
  {
    id: "moins-chers",
    heading: "Les 5 fournisseurs les moins chers en Belgique — Octobre 2026",
    blocks: [
      {
        type: "paragraph",
        text: "Données CREG pour un ménage type 3500 kWh élec + 17 000 kWh gaz :",
      },
      {
        type: "table",
        caption: "Classement des fournisseurs les moins chers",
        headers: ["Rang", "Fournisseur", "Coût annuel"],
        rows: [
          ["1", "Mega", "1.834,56 EUR/an"],
          ["2", "Eneco", "1.891,12 EUR/an"],
          ["3", "TotalEnergies", "1.923,88 EUR/an"],
          ["4", "Luminus", "1.956,44 EUR/an"],
          ["5", "Engie", "1.987,22 EUR/an"],
        ],
      },
      {
        type: "note",
        text: "Moyenne nationale : 2.234,00 EUR/an. Économie potentielle : 399,44 EUR.",
      },
    ],
  },
]

const faqs = [
  {
    question: "Le comparateur est-il gratuit en Belgique ?",
    answer:
      "Oui. Les comparateurs certifiés CREG comme Jeconomisemonenergie.eu sont 100% gratuits. Nous sommes rémunérés par les fournisseurs uniquement si vous signez.",
  },
  {
    question: "Puis-je changer si j'ai des panneaux solaires avec Fluvius ?",
    answer:
      "Oui. Le comparateur tient compte du tarif prosumer et du compteur qui tourne à l'envers. Obligatoire en Flandre depuis 2024.",
  },
]

export default function ComparateursPrixElectriciteGazBelgiquePage() {
  return (
    <GuidePageTemplate
      slug={page.slug}
      h1={page.h1}
      intro={intro}
      highlights={highlights}
      ctaLabel="Comparer mes prix électricité & gaz en Belgique"
      sections={sections}
      faqs={faqs}
    />
  )
}
