// Configuration SEO centralisée pour jeconomisemonenergie.eu (ciblage Wallonie francophone)

export const SITE_URL = "https://jeconomisemonenergie.eu"
export const SITE_NAME = "Jeconomisemonenergie.eu"
export const SITE_LOCALE = "fr-BE"
export const SITE_PHONE = "+32 71 94 24 08"
export const SITE_EMAIL = "contactenergie@izyfirstcontact.fr"

// Pages silo SEO (clusters de contenu)
export interface SiloPage {
  slug: string
  title: string
  h1: string
  description: string
  region: string
  keywords: string[]
  priority: number
}

export const SILO_PAGES: SiloPage[] = [
  {
    slug: "comparateur-electricite-bruxelles",
    title: "Comparateur électricité Bruxelles 2026 | Meilleurs tarifs",
    h1: "Comparateur d'électricité à Bruxelles : trouvez le meilleur tarif en 2026",
    description:
      "Comparez gratuitement les fournisseurs d'électricité à Bruxelles. Tarifs Sibelga, primes, et économies jusqu'à 35% sur votre facture. Sans engagement.",
    region: "Bruxelles-Capitale",
    keywords: [
      "comparateur électricité Bruxelles",
      "fournisseur électricité Bruxelles",
      "tarif électricité Bruxelles",
      "Sibelga",
      "prix kWh Bruxelles",
    ],
    priority: 0.9,
  },
  {
    slug: "comparateur-gaz-wallonie",
    title: "Comparer un contrat de gaz en Wallonie : critères et repères | Guide",
    h1: "Comment comparer un contrat de gaz en Wallonie ?",
    description:
      "Les critères pour examiner un contrat de gaz en Wallonie : prix, frais fixes, durée et conditions. Notre parcours fournit une estimation indicative, pas un classement de tarifs en temps réel.",
    region: "Wallonie",
    keywords: [
      "comparateur gaz Wallonie",
      "fournisseur gaz Wallonie",
      "tarif gaz Wallonie",
      "ORES",
      "RESA",
      "prix gaz Wallonie",
    ],
    priority: 0.9,
  },
  {
    slug: "prix-energie-flandre",
    title: "Prix énergie Flandre 2026 | Électricité et gaz comparés",
    h1: "Prix de l'énergie en Flandre : électricité et gaz comparés en 2026",
    description:
      "Découvrez les prix de l'énergie en Flandre. Comparaison des tarifs électricité et gaz, Fluvius, primes flamandes et économies jusqu'à 35%. Gratuit et sans engagement.",
    region: "Flandre",
    keywords: [
      "prix énergie Flandre",
      "tarif électricité Flandre",
      "tarif gaz Flandre",
      "Fluvius",
      "fournisseur énergie Flandre",
    ],
    priority: 0.9,
  },
  {
    slug: "changement-fournisseur-energie",
    title: "Changer de fournisseur d’énergie en Wallonie | Guide",
    h1: "Changer de fournisseur d’énergie en Wallonie : les démarches",
    description:
      "Repères pour préparer un changement de fournisseur d’électricité ou de gaz en Wallonie. Vérifiez les modalités et délais applicables auprès de votre fournisseur.",
    region: "Wallonie",
    keywords: [
      "changement fournisseur énergie",
      "changer de fournisseur électricité",
      "changer fournisseur gaz Wallonie",
      "résiliation contrat énergie",
    ],
    priority: 0.9,
  },
  {
    slug: "prime-energie-belgique",
    title: "Prime énergie Belgique 2026 | Aides et subventions par région",
    h1: "Prime énergie en Belgique : toutes les aides 2026 par région",
    description:
      "Toutes les primes énergie en Belgique en 2026 : Bruxelles, Wallonie et Flandre. Conditions, montants, démarches et économies sur vos travaux et factures. Guide gratuit.",
    region: "Belgique",
    keywords: [
      "prime énergie Belgique",
      "prime énergie Wallonie",
      "prime énergie Bruxelles",
      "prime énergie Flandre",
      "subvention énergie Belgique",
    ],
    priority: 0.9,
  },
  {
    slug: "comparateur-energie-belgique",
    title: "Marché de l’énergie en Belgique : repères par région | Guide",
    h1: "Comprendre les marchés de l’énergie en Belgique : repères par région",
    description:
      "Comprenez les différences entre marchés régionaux de l’énergie en Belgique. Le parcours d’accompagnement de Jeconomisemonenergie.eu est destiné au public wallon et fournit une estimation indicative.",
    region: "Belgique",
    keywords: [
      "comparateur énergie Belgique",
      "comparateur électricité gaz Belgique",
      "comparateur Bruxelles Wallonie Flandre",
      "Sibelga",
      "ORES",
      "Fluvius",
    ],
    priority: 0.9,
  },
  {
    slug: "tarif-social-energie",
    title: "Tarif social énergie 2026 | Wallonie et Flandre",
    h1: "Tarif social pour l'énergie en Wallonie et en Flandre : conditions et démarches 2026",
    description:
      "Le tarif social fédéral pour l'électricité et le gaz en Belgique : bénéficiaires, montants, application automatique en Wallonie et en Flandre. Guide gratuit.",
    region: "Wallonie & Flandre",
    keywords: [
      "tarif social énergie",
      "tarif social électricité Belgique",
      "tarif social gaz",
      "tarif social Wallonie",
      "tarif social Flandre",
    ],
    priority: 0.8,
  },
  {
    slug: "prime-energie-bruxelles-2026",
    title: "Prime énergie Bruxelles 2026 | Renolution et aides",
    h1: "Prime énergie à Bruxelles en 2026 : Renolution et aides disponibles",
    description:
      "Toutes les primes énergie à Bruxelles en 2026 : Renolution, isolation, pompe à chaleur, panneaux solaires. Conditions, montants et démarches. Guide gratuit.",
    region: "Bruxelles-Capitale",
    keywords: [
      "prime énergie Bruxelles",
      "prime Renolution",
      "prime rénovation Bruxelles 2026",
      "prime isolation Bruxelles",
      "Bruxelles Environnement",
    ],
    priority: 0.8,
  },
  {
    slug: "changer-fournisseur-electricite-gaz-belgique",
    title: "Changer de fournisseur d’énergie en Belgique : étapes et droits | Guide",
    h1: "Changer de fournisseur d’énergie en Belgique : les étapes et conditions à vérifier",
    description:
      "Les étapes pour préparer un changement de fournisseur en Belgique : contrat, point de fourniture et démarches. Les délais et conditions doivent être vérifiés selon votre situation et les règles en vigueur.",
    region: "Belgique",
    keywords: [
      "changer fournisseur électricité gaz Belgique",
      "changer de fournisseur énergie",
      "code EAN",
      "résiliation contrat énergie",
      "double énergie",
    ],
    priority: 0.8,
  },
  {
    slug: "avis-fournisseurs-energie-belgique",
    title: "Avis fournisseurs énergie Belgique 2026 | Engie, Luminus, Mega",
    h1: "Avis sur les fournisseurs d'énergie en Belgique : Engie Electrabel, Luminus, Eneco, TotalEnergies, Mega, Octa+ et Ecofix",
    description:
      "Avis 2026 sur les fournisseurs d'énergie belges : Engie Electrabel, Luminus, Eneco, TotalEnergies, Mega, Octa+ et Ecofix. Tarifs, service client et avantages.",
    region: "Belgique",
    keywords: [
      "avis fournisseur énergie Belgique",
      "avis Engie Electrabel",
      "avis Luminus",
      "avis Mega énergie",
      "avis Octa+ Ecofix Eneco TotalEnergies",
    ],
    priority: 0.8,
  },
  {
    slug: "cwape-simulateur",
    title: "CompaCWaPE : comparateur officiel en Wallonie | Guide",
    h1: "CompaCWaPE : utiliser le comparateur officiel de la CWaPE en Wallonie",
    description:
      "Comprenez le rôle de la CWaPE et de CompaCWaPE, son outil officiel de comparaison des offres en Wallonie. Consultez les informations directement sur compacwape.be.",
    region: "Wallonie",
    keywords: [
      "CWaPE",
      "CWaPE simulateur",
      "simulateur tarifaire Wallonie",
      "comparateur CWaPE",
      "ORES RESA tarif",
    ],
    priority: 0.8,
  },
  {
    slug: "prix-electricite-trop-cher-belgique",
    title: "Prix Électricité Trop Cher Belgique 2026 | Comparateur Gratuit",
    h1: "Prix de l'électricité trop cher en Belgique ? Comparez et payez moins dès ce mois",
    description:
      "Facture d'électricité qui explose en Belgique ? Comparez en 2 min les fournisseurs les moins chers près de chez vous. 100% gratuit, sans engagement.",
    region: "Belgique",
    keywords: [
      "prix électricité trop cher Belgique",
      "facture électricité trop élevée",
      "réduire facture électricité Belgique",
      "électricité moins chère Belgique",
      "pourquoi ma facture électricité augmente",
      "fournisseur électricité moins cher",
    ],
    priority: 0.9,
  },
  {
    slug: "meilleur-tarif-electricite-gaz-belgique",
    title: "Meilleur tarif électricité & gaz Belgique 2026 | Wallonie, Bruxelles, Flandre",
    h1: "Comparer le meilleur tarif d'électricité et de gaz en Wallonie, à Bruxelles et en Flandre",
    description:
      "Trouvez le meilleur tarif d'électricité et de gaz en Belgique en 2026. Comparez fixe et variable selon votre région (ORES, Sibelga, Fluvius) et économisez jusqu'à 35%.",
    region: "Belgique",
    keywords: [
      "meilleur tarif électricité Belgique",
      "meilleur tarif gaz Belgique",
      "meilleur tarif énergie Wallonie",
      "meilleur tarif énergie Bruxelles",
      "meilleur tarif énergie Flandre",
    ],
    priority: 0.9,
  },
]

// Pages guides SEO (contenu éditorial long format, route /guides/*)
export interface GuidePage {
  slug: string
  title: string
  h1: string
  description: string
  region: string
  keywords: string[]
  priority: number
}

export const GUIDE_PAGES: GuidePage[] = [
  {
    slug: "comparateurs-prix-electricite-gaz-belgique",
    title: "Comparer l’électricité et le gaz en Wallonie | Guide",
    h1: "Comparer les contrats d’électricité et de gaz en Wallonie",
    description:
      "Repères pour examiner les contrats d’électricité et de gaz en Wallonie, les composantes du prix et les informations à vérifier avant de changer de fournisseur.",
    region: "Wallonie",
    keywords: [
      "comparateur énergie Wallonie",
      "comparateur électricité Wallonie",
      "comparateur gaz Wallonie",
      "contrat énergie Wallonie",
      "changer de fournisseur Wallonie",
    ],
    priority: 0.8,
  },
]

// Génère le schema.org LocalBusiness
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    image: `${SITE_URL}/og-image.jpg`,
    url: SITE_URL,
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    priceRange: "EUR",
    description:
      "Jeconomisemonenergie.eu accompagne les particuliers et les professionnels dans leurs démarches liées aux contrats d’électricité et de gaz en Wallonie.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Charleroi",
      addressRegion: "Hainaut",
      addressCountry: "BE",
    },
    areaServed: { "@type": "AdministrativeArea", name: "Wallonie" },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.4108,
      longitude: 4.4446,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [],
  }
}

// Génère le schema.org Organization (ciblage Belgique + langue française)
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.jpg`,
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Wallonie",
    },
    availableLanguage: "French",
    sameAs: [],
  }
}

// Génère le schema.org FAQPage
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

// Génère le schema.org BreadcrumbList
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

// Génère les alternates avec hreflang fr-BE pour une page
export function getAlternates(path: string) {
  const url = `${SITE_URL}${path}`
  return {
    canonical: url,
    languages: {
      "fr-BE": url,
      "x-default": url,
    },
  }
}
