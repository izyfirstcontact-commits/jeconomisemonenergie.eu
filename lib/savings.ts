// Logique de calcul d'économies + score, partagée client/serveur.
// Aucune base de données : tout est dérivé de la facture mensuelle.

export type ClientType = "particulier" | "professionnel"

export const SLIDER_MIN = 40
export const SLIDER_MAX = 1500
export const SLIDER_STEP = 5

/**
 * Pourcentage d'économie estimé selon la facture mensuelle.
 * Plus la facture est élevée, plus le potentiel d'optimisation est important.
 */
export function getSavingsPercentage(monthlyBill: number): number {
  if (monthlyBill < 100) return 0.22
  if (monthlyBill < 200) return 0.27
  if (monthlyBill < 400) return 0.3
  return 0.32
}

export type SavingsEstimate = {
  monthlyBill: number
  percentage: number
  monthlySavings: number
  yearlySavings: number
  newMonthlyBill: number
  score: number
}

/**
 * Calcule l'estimation complète d'économies pour une facture donnée.
 */
export function computeSavings(monthlyBill: number): SavingsEstimate {
  const bill = Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, Math.round(monthlyBill)))
  const percentage = getSavingsPercentage(bill)
  const monthlySavings = Math.round(bill * percentage)
  const yearlySavings = monthlySavings * 12
  const newMonthlyBill = bill - monthlySavings

  return {
    monthlyBill: bill,
    percentage,
    monthlySavings,
    yearlySavings,
    newMonthlyBill,
    score: computeScore(bill, percentage),
  }
}

/**
 * Score d'opportunité /100. Combine le potentiel (%) et le volume (EUR/an).
 * Borné entre 58 et 99 pour rester motivant.
 */
export function computeScore(monthlyBill: number, percentage: number): number {
  const potential = (percentage - 0.2) / 0.15 // 0 -> 1 sur la plage de %
  const volume = Math.min(1, monthlyBill / SLIDER_MAX) // 0 -> 1 selon la facture
  const raw = 58 + potential * 22 + volume * 19
  return Math.max(58, Math.min(99, Math.round(raw)))
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return "Potentiel exceptionnel"
  if (score >= 80) return "Excellent potentiel"
  if (score >= 70) return "Beau potentiel"
  return "Bon potentiel"
}

export function formatEUR(value: number): string {
  return `${Math.round(value).toLocaleString("fr-BE")} EUR`
}

// --- Persistance locale (localStorage, pas de base de données) ---

export const STORAGE_KEYS = {
  lead: "jeme_lead",
  referralCode: "jeme_referral_code",
} as const

export type LeadContact = {
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  streetNumber: string
  postalCode: string
  birthDate: string
  currentSupplier: string
  meterType: string
  formula: string
  exclusiveNightMeter: boolean
}

export type StoredLead = LeadContact & {
  monthlyBill: number
  yearlySavings: number
  score: number
  clientType: ClientType
  referralCode: string
  createdAt: string
}

export function generateReferralCode(): string {
  // Code court, lisible, sans dépendance externe.
  const part = () => Math.random().toString(36).slice(2, 6).toUpperCase()
  return `${part()}-${part()}`
}

export function saveLead(lead: StoredLead): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEYS.lead, JSON.stringify(lead))
    window.localStorage.setItem(STORAGE_KEYS.referralCode, lead.referralCode)
  } catch {
    // localStorage indisponible (mode privé) : on ignore silencieusement.
  }
}

export function getStoredLead(): StoredLead | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.lead)
    return raw ? (JSON.parse(raw) as StoredLead) : null
  } catch {
    return null
  }
}
