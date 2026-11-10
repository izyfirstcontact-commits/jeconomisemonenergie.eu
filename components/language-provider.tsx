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
    energyGuide: "Guide des comparateurs énergie",
    energyComparator: "Comparateur énergie Belgique",
    bestRate: "Meilleur tarif élec & gaz",
    switchSupplier: "Changer de fournisseur",
    supplierReviews: "Avis fournisseurs belges",
    socialRate: "Tarif social Wallonie & Flandre",
    brusselsBonus: "Prime énergie Bruxelles 2026",
    cwape: "CWaPE & simulateur",
    belgianComparator: "Votre comparateur belge",
    dashboard: "Tableau de bord",
    login: "Connexion",
    signup: "Créer un compte",
    mobileMenu: "Menu mobile",
  },
  en: {
    languageLabel: "Language",
    functionality: "Features",
    savings: "Savings",
    testimonials: "Testimonials",
    faq: "FAQ",
    guides: "Guides",
    energyGuide: "Energy comparison guide",
    energyComparator: "Belgium energy comparison",
    bestRate: "Best electricity & gas rate",
    switchSupplier: "Switch supplier",
    supplierReviews: "Belgian supplier reviews",
    socialRate: "Social tariff Wallonia & Flanders",
    brusselsBonus: "Brussels energy grant 2026",
    cwape: "CWaPE & calculator",
    belgianComparator: "Your Belgian comparison tool",
    dashboard: "Dashboard",
    login: "Log in",
    signup: "Sign up",
    mobileMenu: "Mobile menu",
  },
  nl: {
    languageLabel: "Taal",
    functionality: "Functies",
    savings: "Besparingen",
    testimonials: "Getuigenissen",
    faq: "FAQ",
    guides: "Gidsen",
    energyGuide: "Gids voor energievergelijkers",
    energyComparator: "Energievergelijking België",
    bestRate: "Beste elektriciteits- en gastarief",
    switchSupplier: "Van leverancier veranderen",
    supplierReviews: "Beoordelingen Belgische leveranciers",
    socialRate: "Sociaal tarief Wallonië & Vlaanderen",
    brusselsBonus: "Energiepremie Brussel 2026",
    cwape: "CWaPE & simulator",
    belgianComparator: "Uw Belgische vergelijker",
    dashboard: "Dashboard",
    login: "Aanmelden",
    signup: "Account aanmaken",
    mobileMenu: "Mobiel menu",
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
