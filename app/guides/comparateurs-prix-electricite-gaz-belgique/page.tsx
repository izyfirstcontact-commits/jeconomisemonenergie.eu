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
  "Comparer des contrats d’électricité ou de gaz en Wallonie suppose de regarder les conditions complètes et de partir d’un profil de consommation adapté. Ce guide présente les principaux éléments à vérifier et les limites d’une estimation lorsque les tarifs et leurs dates de validité ne sont pas disponibles."

const highlights = [
  "Marché wallon",
  "Électricité et gaz",
  "Particuliers et professionnels",
  "Conditions à vérifier",
]

const sections: GuideSection[] = [
  {
    id: "pourquoi-comparateur",
    heading: "Quels éléments comparer en Wallonie ?",
    blocks: [
      {
        type: "ordered",
        items: [
          "Le prix de l’énergie, les frais fixes, la durée du contrat et les modalités d’indexation.",
          "Les coûts de réseau, taxes et prélèvements, présentés séparément du prix de l’énergie.",
          "Les conditions promotionnelles, leur durée et les critères pour en bénéficier.",
          "La période de comparaison et le profil de consommation utilisés pour calculer un coût annuel.",
        ],
      },
    ],
  },
  {
    id: "comparateur-fiable",
    heading: "Comment vérifier la fiabilité d’une comparaison ?",
    blocks: [
      { type: "paragraph", text: "Une comparaison utile doit indiquer les produits réellement inclus, le public éligible, la région couverte, la source et la date des prix, ainsi que les composantes non incluses. Vérifiez que votre profil et votre période de consommation correspondent aux hypothèses du calcul." },
      { type: "paragraph", text: "CompaCWaPE est l’outil officiel de la CWaPE pour comparer les offres d’électricité et de gaz en Wallonie. Le parcours de Jeconomisemonenergie.eu est distinct : il recueille des informations pour préparer une demande et fournit une estimation indicative, sans comparer les tarifs en temps réel." },
      { type: "links", links: [{ href: "https://www.compacwape.be/", label: "Consulter le comparateur officiel CompaCWaPE", external: true }, { href: "/comparateur-gaz-wallonie", label: "Lire nos repères pour examiner un contrat de gaz en Wallonie" }] },

    ],
  },
  {
    id: "electricite-vs-gaz",
    heading: "Particuliers et professionnels : des besoins différents",
    blocks: [
      { type: "paragraph", text: "Les contrats résidentiels et professionnels ne sont pas nécessairement interchangeables. Les professionnels doivent notamment vérifier l’éligibilité de leur entreprise, la puissance, le type de local et les conditions applicables à leur profil de consommation." },
      { type: "note", text: "Le parcours du site recueille des informations pour accompagner une demande. Son estimation est indicative et ne constitue pas une comparaison de tarifs en temps réel ni une offre contractuelle." },
    ],
  },
  {
    id: "moins-chers",
    heading: "Préparer une comparaison avant de changer",
    blocks: [
      { type: "paragraph", text: "Rassemblez une facture récente, votre consommation annuelle, le type de contrat et les informations utiles sur votre point de fourniture. Pour une entreprise, préparez aussi les données propres au site et à la puissance concernée." },
      { type: "paragraph", text: "Les tarifs et conditions évoluent. Ne vous fiez pas à un classement ou à un montant d’économie sans date, source, profil de référence et méthode de calcul clairement indiqués." },
    ],
  },
]

const faqs = [
  {
    question: "Le parcours du site fournit-il un tarif contractuel ?",
    answer:
      "Non. L’estimation affichée est indicative et ne constitue ni une offre contractuelle ni une comparaison de tarifs en temps réel. Vérifiez les prix et conditions directement auprès du fournisseur.",
  },
  {
    question: "Quelles informations préparer pour comparer ?",
    answer:
      "Une facture récente et votre consommation annuelle sont utiles. Selon le contrat, il peut aussi être nécessaire de vérifier le type de compteur, les conditions tarifaires et les données de votre point de fourniture.",
  },
]

export default function ComparateursPrixElectriciteGazBelgiquePage() {
  return (
    <GuidePageTemplate
      slug={page.slug}
      h1={page.h1}
      intro={intro}
      highlights={highlights}
      ctaLabel="Préparer ma demande énergie en Wallonie"
      sections={sections}
      faqs={faqs}
    />
  )
}
