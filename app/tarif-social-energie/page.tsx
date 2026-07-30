import type { Metadata } from "next"
import { SiloPageTemplate, type ContentSection } from "@/components/silo-page-template"
import { SILO_PAGES, getAlternates, SITE_URL } from "@/lib/seo"

const page = SILO_PAGES.find((p) => p.slug === "tarif-social-energie")!

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
  "Le tarif social pour l'énergie est une mesure fédérale belge qui permet aux ménages en situation de précarité de bénéficier du tarif d'électricité et de gaz le plus avantageux du marché. Il s'applique de la même manière en Wallonie et en Flandre, mais les démarches et l'application automatique peuvent varier selon votre situation. Voici comment savoir si vous y avez droit et comment en bénéficier en 2026."

const highlights = [
  "Mesure fédérale (SPF Économie)",
  "Wallonie et Flandre",
  "Application souvent automatique",
  "Électricité et gaz",
]

const sections: ContentSection[] = [
  {
    id: "definition",
    heading: "Qu'est-ce que le tarif social pour l'énergie ?",
    paragraphs: [
      "Le tarif social est un tarif réduit pour l'électricité et le gaz naturel, fixé par la CREG (le régulateur fédéral) quatre fois par an. Il correspond au tarif commercial le plus bas du marché et est identique partout en Belgique, quel que soit votre fournisseur ou votre gestionnaire de réseau (ORES et RESA en Wallonie, Fluvius en Flandre).",
      "Il s'agit d'une mesure de protection sociale fédérale, gérée par le SPF Économie. Contrairement à une prime ponctuelle, le tarif social s'applique de manière continue tant que vous remplissez les conditions, et il couvre aussi bien l'électricité que le gaz si vous êtes chauffé au gaz naturel.",
    ],
  },
  {
    id: "beneficiaires",
    heading: "Qui a droit au tarif social en Wallonie et en Flandre ?",
    paragraphs: [
      "Le droit au tarif social dépend du statut du ménage et non de la région. Les bénéficiaires sont les personnes ou ménages qui reçoivent certaines allocations ou interventions des organismes fédéraux et régionaux. Les catégories sont identiques en Wallonie et en Flandre.",
    ],
    bullets: [
      "Bénéficiaires du revenu d'intégration sociale (RIS) via le CPAS / OCMW",
      "Bénéficiaires de la GRAPA (garantie de revenus aux personnes âgées)",
      "Personnes percevant une allocation pour personne handicapée (SPF Sécurité sociale)",
      "Bénéficiaires de l'intervention majorée (statut BIM) dans certaines conditions",
      "Locataires de logements sociaux chauffés collectivement au gaz naturel",
    ],
  },
  {
    id: "demarches",
    heading: "Comment obtenir le tarif social : démarches automatiques",
    paragraphs: [
      "Dans la grande majorité des cas, le tarif social est appliqué automatiquement. Le SPF Économie croise les données des organismes sociaux et transmet l'information à votre fournisseur, qui ajuste votre tarif sans démarche de votre part. Vous recevez un courrier vous informant de l'application du tarif social.",
      "Si vous estimez y avoir droit mais que le tarif n'est pas appliqué, vous pouvez demander une attestation auprès de l'organisme qui vous verse l'allocation (CPAS, SPF Sécurité sociale, etc.) et la transmettre à votre fournisseur. En Wallonie comme en Flandre, la procédure est la même puisque la mesure est fédérale.",
    ],
    bullets: [
      "Application automatique via le croisement de données du SPF Économie",
      "Courrier de confirmation envoyé au ménage bénéficiaire",
      "À défaut, attestation à demander à l'organisme social et à remettre au fournisseur",
      "Effet rétroactif possible selon la date d'ouverture du droit",
    ],
  },
  {
    id: "apres-tarif-social",
    heading: "Que faire si vous n'avez pas droit au tarif social ?",
    paragraphs: [
      "Si vous ne remplissez pas les conditions du tarif social, comparer les fournisseurs reste le meilleur moyen de réduire votre facture. De nombreux ménages wallons et flamands paient un tarif commercial bien supérieur au marché simplement parce qu'ils n'ont jamais changé d'offre.",
      "Notre comparateur identifie gratuitement l'offre la plus avantageuse selon votre région et votre consommation. Et si votre situation évolue (ouverture d'un droit social), pensez à vérifier votre éligibilité au tarif social, qui reste plus avantageux que n'importe quelle offre commerciale.",
    ],
  },
]

const faqs = [
  {
    question: "Le tarif social est-il différent en Wallonie et en Flandre ?",
    answer:
      "Non. Le tarif social est une mesure fédérale fixée par la CREG : son montant et ses conditions sont identiques en Wallonie, en Flandre et à Bruxelles. Seuls les coûts de réseau de votre GRD (ORES, RESA ou Fluvius) diffèrent, mais ils sont aussi couverts par le tarif réduit.",
  },
  {
    question: "Le tarif social s'applique-t-il automatiquement ?",
    answer:
      "Dans la plupart des cas, oui. Le SPF Économie croise les données des organismes sociaux et informe votre fournisseur, qui applique le tarif sans démarche de votre part. Vous recevez un courrier de confirmation.",
  },
  {
    question: "Le tarif social couvre-t-il l'électricité et le gaz ?",
    answer:
      "Oui. Le tarif social s'applique à l'électricité et au gaz naturel si vous êtes chauffé au gaz. Les locataires de logements sociaux chauffés collectivement au gaz peuvent également en bénéficier sous conditions.",
  },
  {
    question: "Puis-je changer de fournisseur tout en gardant le tarif social ?",
    answer:
      "Oui. Le tarif social vous suit quel que soit le fournisseur choisi, puisqu'il est imposé par la réglementation fédérale. Vous restez libre de changer de fournisseur sans perdre votre droit.",
  },
  {
    question: "Que faire si je pense avoir droit au tarif social sans le recevoir ?",
    answer:
      "Demandez une attestation à l'organisme qui vous verse votre allocation (CPAS, SPF Sécurité sociale, etc.) et transmettez-la à votre fournisseur. Le tarif peut être appliqué avec effet rétroactif selon la date d'ouverture de votre droit.",
  },
]

export default function TarifSocialEnergiePage() {
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
