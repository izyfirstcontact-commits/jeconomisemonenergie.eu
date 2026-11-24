"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type Language = "fr" | "en" | "nl"

const translations = {
  fr: {
    languageLabel: "Langue",
    functionality: "Fonctionnalités",
    savings: "Économies",
    testimonials: "Témoignages",
    faq: "FAQ",
    guides: "Guides",
    energyGuide: "Guide pour comparer l’énergie en Wallonie",
    energyComparator: "Contrats de gaz en Wallonie",
    switchSupplier: "Changer de fournisseur en Wallonie",
    socialRate: "Tarif social : conditions",
    cwape: "Référence CWaPE en Wallonie",
    belgianComparator: "Votre comparateur en Wallonie",
    dashboard: "Tableau de bord",
    login: "Connexion",
    signup: "Créer un compte",
    mobileMenu: "Menu mobile",
    heroTitle: "Comparez les options d'énergie en Wallonie avec",
    heroDescription: "Un parcours d'accompagnement pour les particuliers et les professionnels qui souhaitent faire le point sur leur contrat d'électricité ou de gaz en Wallonie.",
    upToSavings: "Électricité et gaz pour particuliers et professionnels en Wallonie",
    freeComparison: "Comparaison gratuite",
    fastResponse: "Réponse rapide",
    tailoredOffers: "Accompagnement personnalisé",
    free: "100% Gratuit",
    noCommitment: "Sans engagement",
  },
  en: {
    languageLabel: "Language",
    functionality: "Features",
    savings: "Savings",
    testimonials: "Testimonials",
    faq: "FAQ",
    guides: "Guides",
    energyGuide: "Energy comparison guide for Wallonia",
    energyComparator: "Gas contracts in Wallonia",
    switchSupplier: "Switch supplier in Wallonia",
    socialRate: "Social tariff: eligibility",
    cwape: "CWaPE reference for Wallonia",
    belgianComparator: "Your Wallonia energy comparison tool",
    dashboard: "Dashboard",
    login: "Log in",
    signup: "Sign up",
    mobileMenu: "Mobile menu",
    heroTitle: "Explore energy options in Wallonia with",
    heroDescription: "An assistance journey for households and professionals who want to review their electricity or gas contract in Wallonia.",
    upToSavings: "Electricity and gas for households and professionals in Wallonia",
    freeComparison: "Free comparison",
    fastResponse: "Fast response",
    tailoredOffers: "Tailored offers",
    free: "100% Free",
    noCommitment: "No commitment",
  },
  nl: {
    languageLabel: "Taal",
    functionality: "Functies",
    savings: "Besparingen",
    testimonials: "Getuigenissen",
    faq: "FAQ",
    guides: "Gidsen",
    energyGuide: "Gids om energie in Wallonië te vergelijken",
    energyComparator: "Gascontracten in Wallonië",
    switchSupplier: "Van leverancier veranderen in Wallonië",
    socialRate: "Sociaal tarief: voorwaarden",
    cwape: "CWaPE-referentie voor Wallonië",
    belgianComparator: "Uw energievergelijker in Wallonië",
    dashboard: "Dashboard",
    login: "Aanmelden",
    signup: "Account aanmaken",
    mobileMenu: "Mobiel menu",
    heroTitle: "Ontdek energieopties in Wallonië met",
    heroDescription: "Een begeleid traject voor gezinnen en professionals die hun elektriciteits- of gascontract in Wallonië willen bekijken.",
    upToSavings: "Elektriciteit en gas voor gezinnen en professionals in Wallonië",
    freeComparison: "Gratis vergelijking",
    fastResponse: "Snel antwoord",
    tailoredOffers: "Aangepaste aanbiedingen",
    free: "100% Gratis",
    noCommitment: "Zonder verplichting",
  },
} as const

type TranslationKey = keyof typeof translations.fr

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")

  useEffect(() => {
    const saved = window.localStorage.getItem("site-language")
    if (saved === "fr" || saved === "en" || saved === "nl") setLanguageState(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === "fr" ? "fr-BE" : language
    window.localStorage.setItem("site-language", language)
  }, [language])

  const value = useMemo(() => ({
    language,
    setLanguage: (nextLanguage: Language) => setLanguageState(nextLanguage),
    t: (key: TranslationKey) => translations[language][key],
  }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider")
  return context
}
