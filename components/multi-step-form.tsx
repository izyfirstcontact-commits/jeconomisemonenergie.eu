"use client"

import { useState, useCallback, useEffect, useRef, type ChangeEvent } from "react"
import { motion } from "framer-motion"
import { useForm, ValidationError } from "@formspree/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FloatingField } from "@/components/ui/floating-input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, Upload, Phone, ArrowRight, ArrowLeft, Zap, Flame, Home, MapPin, FileText, User, Loader2, AlertCircle, X, Monitor, Cloud, RotateCcw, Building2, Briefcase, Gift } from "lucide-react"
import { getConsentPreferences } from "@/components/cookie-banner"
import { useClientType } from "@/components/client-type-context"

// ─── Types ───────────────────────────────────────────────

type ClientType = "particulier" | "professionnel"

interface FormData {
  // Client type toggle
  clientType: ClientType
  // Pro company block (Step 0)
  denominationSociale: string
  formeJuridique: string
  numeroTVA: string
  numeroBCE: string
  // Step 1
  region: string
  fournisseur: string
  typeContrat: string
  typeLogement: string
  typeLocal: string
  superficie: string
  nombre_personnes: string
  panneaux_photovoltaiques: string
  // Step 2
  mensualite: string
  type_compteur: string
  type_tarif: string
  compteur_nuit: boolean
  compteurCategorie: string
  compteurTarif: string
  puissanceSouscrite: string
  chauffage: string
  nom: string
  prenom: string
  fonction: string
  telephone: string
  telephoneSecondaire: string
  email: string
  adresse: string
  numeroRue: string
  numero_boite: string
  rue: string
  numero: string
  ville: string
  codePostal: string
  addressSearch: string
  type_energie: string
  a_facture: string
  a_ean: string
  eanElectricite: string
  eanGaz: string
  rgpdConsent: boolean
  rgpdLead: boolean
  cguConsent: boolean
  facture: File | null
  factureUrl: string | null
  factureNom: string | null
  factureUrl2: string | null
  factureNom2: string | null
}

type ValidationErrors = Record<string, string>

interface FileUploadState {
  isUploading: boolean
  progress: number
  error: string | null
  success: boolean
}

const regions = ["Bruxelles", "Wallonie", "Flandre"]
const fournisseurs = ["Engie", "Mega", "Luminus", "Eneco", "Octa+", "TotalEnergies", "Ecofix", "Bolt", "Frank Énergie", "Autre"]
const typesContrat = [
  { value: "electricite", label: "Électricité", icon: Zap },
  { value: "gaz", label: "Gaz", icon: Flame },
  { value: "les-deux", label: "Les deux", icon: Home },
]
const typesLogement = [
  { value: "maison", label: "Maison" },
  { value: "appartement", label: "Appartement" },
  { value: "studio", label: "Studio" },
]
const superficieOptions = [
  { value: "0-50", label: "0 à 50 m²" },
  { value: "50-100", label: "50 à 100 m²" },
  { value: "100-150", label: "100 à 150 m²" },
  { value: "150-200", label: "150 à 200 m²" },
]
const nombrePersonnesParticulier = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "7+", label: "+ de 7" },
]
const nombrePersonnesProfessionnel = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "4", label: "4" },
  { value: "6", label: "6" },
  { value: "8", label: "8" },
  { value: "10+", label: "+ de 10" },
]
const panneauxOptions = [
  { value: "oui", label: "Oui" },
  { value: "non", label: "Non" },
]
const typesCompteur = [
  { value: "intelligent", label: "Intelligent" },
  { value: "analogique", label: "Analogique" },
]
const typesTarif = [
  { value: "monohoraire", label: "Monohoraire" },
  { value: "bihoraire", label: "Bihoraire" },
]
const typesChauffage = ["Gaz", "Mazout", "Pellet", "Electrique", "Bois"]

// ─── Professionnel ───────────────────────────────────────
const formesJuridiques = ["SRL", "SA", "SPRL", "SC", "ASBL", "Indépendant", "Autre"]
const typesLocal = [
  { value: "bureau", label: "Bureau" },
  { value: "commerce", label: "Commerce" },
  { value: "entrepot", label: "Entrepôt" },
  { value: "atelier", label: "Atelier" },
  { value: "horeca", label: "Horeca" },
  { value: "autre", label: "Autre" },
]
const compteurCategories = [
  { value: "intelligent", label: "Compteur intelligent" },
  { value: "analogique", label: "Compteur analogique / classique" },
]
const compteurTarifs = [
  { value: "bi", label: "Bi-horaire" },
]

const initialFormData: FormData = {
  clientType: "particulier",
  denominationSociale: "",
  formeJuridique: "",
  numeroTVA: "",
  numeroBCE: "",
  region: "",
  fournisseur: "",
  typeContrat: "",
  typeLogement: "",
  typeLocal: "",
  superficie: "",
  nombre_personnes: "",
  panneaux_photovoltaiques: "",
  mensualite: "",
  type_compteur: "",
  type_tarif: "",
  compteur_nuit: false,
  compteurCategorie: "",
  compteurTarif: "",
  puissanceSouscrite: "",
  chauffage: "",
  nom: "",
  prenom: "",
  fonction: "",
  telephone: "",
  telephoneSecondaire: "",
  email: "",
  adresse: "",
  numeroRue: "",
  numero_boite: "",
  rue: "",
  numero: "",
  ville: "",
  codePostal: "",
  addressSearch: "",
  type_energie: "",
  a_facture: "",
  a_ean: "",
  eanElectricite: "",
  eanGaz: "",
  factureUrl: null,
  factureNom: null,
  factureUrl2: null,
  factureNom2: null,
  facture: null,
  rgpdConsent: false,
  rgpdLead: false,
  cguConsent: false,
}

// Regex améliorée pour les numéros belges - accepte plusieurs formats
// +32 4XX XX XX XX, 04XX XX XX XX, 04XXXXXXXX, +32XXXXXXXXX, 32XXXXXXXXX
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Fonction de nettoyage et validation des numéros belges
function cleanBelgianPhone(phone: string): string {
  // Supprime tous les espaces, tirets, points
  return phone.replace(/[\s.\-()]/g, '')
}

function isValidBelgianPhone(phone: string): boolean {
  const cleaned = cleanBelgianPhone(phone)
  
  // Formats acceptés:
  // +32XXXXXXXXX (11 caractères)
  // 32XXXXXXXXX (11 caractères sans +)
  // 0XXXXXXXXX (10 caractères)
  
  // Numero avec +32
  if (/^\+32[1-9]\d{7,8}$/.test(cleaned)) return true
  
  // Numero avec 32 sans +
  if (/^32[1-9]\d{7,8}$/.test(cleaned)) return true
  
  // Numero avec 0 (format belge local)
  if (/^0[1-9]\d{7,8}$/.test(cleaned)) return true
  
  return false
}

// File upload configuration
const FILE_CONFIG = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedMimeTypes: [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ],
  allowedExtensions: ['.pdf', '.jpg', '.jpeg', '.png', '.webp'],
}

// ─── Step Icons ────────────────────────────────────────

const stepConfig = [
  { title: "Situation", icon: MapPin },
  { title: "Consommation", icon: Zap },
  { title: "Coordonnées", icon: User },
  { title: "Facture", icon: FileText },
]

// ─── Main Component ──────────────────────────────────────

export function MultiStepForm() {
  const { clientType: sharedClientType, setClientType: setSharedClientType } = useClientType()
  const [state, handleFormspreeSubmit] = useForm("xwvygzvz")
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [dragActive, setDragActive] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [fileUploadState, setFileUploadState] = useState<FileUploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    success: false,
  })
  const [fileUploadState2, setFileUploadState2] = useState<FileUploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    success: false,
  })
  const [showCloudOptions, setShowCloudOptions] = useState(false)
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([])
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false)
  const [showSecondInvoice, setShowSecondInvoice] = useState(false)
  const totalSteps = 5

  // Conteneur du formulaire (pour le scroll inter-étapes)
  const stepContainerRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  // Synchronise le type de client partagé (modifié depuis la section économies)
  // vers le formulaire, pour garder les deux toggles alignés.
  useEffect(() => {
    setFormData((prev) => (prev.clientType === sharedClientType ? prev : { ...prev, clientType: sharedClientType }))
  }, [sharedClientType])

  // ─── Balise Google Ads de conversion (AW-18288090875) ───
  // Chargée uniquement sur l'écran de succès, après la soumission du formulaire.
  useEffect(() => {
    if (!(state.succeeded && currentStep === 5)) return
    if (document.getElementById("google-ads-conversion")) return

    const script = document.createElement("script")
    script.id = "google-ads-conversion"
    script.async = true
    script.src = "https://www.googletagmanager.com/gtag/js?id=AW-18288090875"
    document.head.appendChild(script)

    const w = window as unknown as { dataLayer: Array<Record<string, unknown>> }
    w.dataLayer = w.dataLayer || []
    function gtag(...args: Array<string | Date>) {
      w.dataLayer.push({ args })
    }
    gtag("js", new Date())
    gtag("config", "AW-18288090875")

    // Event personnalise pour GTM et analytics
    w.dataLayer.push({
      event: "form_success",
      superficie: formData.superficie,
      nombre_personnes: formData.nombre_personnes,
      panneaux_photovoltaiques: formData.panneaux_photovoltaiques,
      code_postal: formData.codePostal,
      ville: formData.ville,
      type_logement: formData.typeLogement,
      ...(formData.numero_boite && { numero_boite: formData.numero_boite }),
      type_energie: formData.type_energie,
      a_facture: formData.a_facture,
      facture_uploadee: formData.factureUrl ? true : false,
      nombre_fichiers_uploades: (formData.factureUrl ? 1 : 0) + (formData.factureUrl2 ? 1 : 0),
      a_ean: formData.a_ean,
      ...(formData.eanElectricite && { ean_electricite: formData.eanElectricite }),
      ...(formData.eanGaz && { ean_gaz: formData.eanGaz }),
      ...(formData.type_compteur && { type_compteur: formData.type_compteur }),
      ...(formData.type_tarif && { type_tarif: formData.type_tarif }),
      ...(formData.compteur_nuit && { compteur_nuit: formData.compteur_nuit }),
    })
  }, [state.succeeded, currentStep])

  // ─── Scroll & focus à chaque changement d'étape ─────���───
  // Corrige le bug où la page restait scrollée en bas après "Continuer".
  useEffect(() => {
    // Ne pas scroller au tout premier rendu (l'utilisateur arrive sur la page)
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const container = stepContainerRef.current
    // Remonter en haut du formulaire (header + progress bar visibles)
    if (container) {
      container.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Placer le focus sur le premier champ de l'étape, sans re-scroller
    const focusTimer = window.setTimeout(() => {
      const firstField = container?.querySelector<HTMLElement>(
        'input:not([type="hidden"]):not([disabled]), textarea, [role="combobox"]',
      )
      firstField?.focus({ preventScroll: true })
    }, 450)

    return () => window.clearTimeout(focusTimer)
  }, [currentStep])

  // Cloud service picker handlers
  const openGoogleDrive = () => {
    // Open Google Drive picker in a new window
    const width = 800
    const height = 600
    const left = (window.innerWidth - width) / 2
    const top = (window.innerHeight - height) / 2
    window.open(
      'https://drive.google.com/drive/my-drive',
      'GoogleDrive',
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,status=no`
    )
  }

  const openDropbox = () => {
    const width = 800
    const height = 600
    const left = (window.innerWidth - width) / 2
    const top = (window.innerHeight - height) / 2
    window.open(
      'https://www.dropbox.com/home',
      'Dropbox',
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,status=no`
    )
  }

  const openOneDrive = () => {
    const width = 800
    const height = 600
    const left = (window.innerWidth - width) / 2
    const top = (window.innerHeight - height) / 2
    window.open(
      'https://onedrive.live.com/',
      'OneDrive',
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,status=no`
    )
  }

  const clearValidationError = (field: string) => {
    setValidationErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field as keyof ValidationErrors]
      return newErrors
    })
  }

  const setValidationError = (field: string, error: string) => {
    setValidationErrors((prev) => ({ ...prev, [field]: error }) as ValidationErrors)
  }

  const updateFormData = (field: keyof FormData, value: string | boolean | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (validationErrors[field as keyof ValidationErrors]) {
      clearValidationError(field)
    }
  }

  // Fonction pour appeler l'API Nominatim (OpenStreetMap) - API gratuite, pas de clé requise
  const handleAddressSearch = async (query: string) => {
    updateFormData("adresse", query)
    
    if (query.length < 2) {
      setAddressSuggestions([])
      setShowAddressSuggestions(false)
      return
    }

    try {
      // Utilise un AbortController pour implémenter un timeout de 2s
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 2000)

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ' Belgium')}&addressdetails=1&limit=5`,
        {
          headers: { 'User-Agent': 'JeEconomiseMonEnergie' },
          signal: controller.signal,
        }
      )
      clearTimeout(timeoutId)

      const data = await response.json()
      
      // Mappe les résultats Nominatim au format attendu
      const suggestions = data.map((item: any) => ({
        label: item.display_name,
        value: item.display_name,
        road: item.address?.road || item.address?.pedestrian || '',
        postcode: item.address?.postcode || '',
        city: item.address?.city || item.address?.town || item.address?.village || '',
      }))

      setAddressSuggestions(suggestions)
      setShowAddressSuggestions(suggestions.length > 0)
    } catch (error) {
      // En cas d'erreur ou de timeout, on n'affiche aucune suggestion
      // mais on laisse l'utilisateur taper à la main
      setAddressSuggestions([])
      setShowAddressSuggestions(false)
    }
  }

  // Fonction appelée au clic sur une suggestion
  const handleAddressSelect = (suggestion: any) => {
    updateFormData("adresse", suggestion.road || suggestion.value)
    updateFormData("codePostal", suggestion.postcode || "")
    updateFormData("ville", suggestion.city || "")
    setShowAddressSuggestions(false)
    
    // Focus sur le champ "Numéro"
    setTimeout(() => {
      document.getElementById("numeroRue")?.focus()
    }, 0)
  }

  // ─── File Validation ─────────────────────�����───────────

  const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
    if (file.size > FILE_CONFIG.maxSize) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1)
      return { valid: false, error: `Fichier trop volumineux (${sizeMB} Mo). Maximum autorisé : 10 Mo.` }
    }
    if (file.size === 0) {
      return { valid: false, error: "Le fichier semble vide. Veuillez sélectionner un autre fichier." }
    }
    if (!FILE_CONFIG.allowedMimeTypes.includes(file.type)) {
      return { valid: false, error: `Format "${file.type || 'inconnu'}" non supporté. Formats acceptés : PDF, JPG, PNG, WEBP.` }
    }
    const extension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!FILE_CONFIG.allowedExtensions.includes(extension)) {
      return { valid: false, error: `Extension "${extension}" non supportée. Utilisez : PDF, JPG, PNG ou WEBP.` }
    }
    return { valid: true }
  }, [])

  // ─── File Processing with Vercel Blob ─────────────────────────────────

  const processFile = useCallback(async (file: File) => {
    setFileUploadState({ isUploading: true, progress: 0, error: null, success: false })
    clearValidationError("facture")

    const validation = validateFile(file)
    if (!validation.valid) {
      setFileUploadState({ isUploading: false, progress: 0, error: validation.error || null, success: false })
      if (validation.error) {
        setValidationError("facture", validation.error)
      }
      return
    }

    try {
      // Progress simulation while uploading
      setFileUploadState(prev => ({ ...prev, progress: 20 }))

      // Upload to Vercel Blob via API
      const formData = new FormData()
      formData.append('file', file)

      setFileUploadState(prev => ({ ...prev, progress: 40 }))

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      setFileUploadState(prev => ({ ...prev, progress: 80 }))

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors du téléchargement')
      }

      const data = await response.json()

      setFileUploadState(prev => ({ ...prev, progress: 100 }))

      // Store file info and URL
      updateFormData("facture", file)
      updateFormData("factureUrl", data.url)
      setFileUploadState({ isUploading: false, progress: 100, error: null, success: true })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur lors du traitement du fichier"
      setFileUploadState({ isUploading: false, progress: 0, error: errorMessage, success: false })
      setValidationError("facture", errorMessage)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateFile])

  const removeFile = useCallback(() => {
    updateFormData("facture", null)
    updateFormData("factureUrl", null)
    setFileUploadState({ isUploading: false, progress: 0, error: null, success: false })
    clearValidationError("facture")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ─── File Processing for Second Invoice ─────────────────────────────────

  const processFile2 = useCallback(async (file: File) => {
    setFileUploadState2({ isUploading: true, progress: 0, error: null, success: false })
    clearValidationError("facture2")

    const validation = validateFile(file)
    if (!validation.valid) {
      setFileUploadState2({ isUploading: false, progress: 0, error: validation.error || null, success: false })
      if (validation.error) {
        setValidationError("facture2", validation.error)
      }
      return
    }

    try {
      setFileUploadState2(prev => ({ ...prev, progress: 20 }))

      const formData = new FormData()
      formData.append('file', file)

      setFileUploadState2(prev => ({ ...prev, progress: 40 }))

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      setFileUploadState2(prev => ({ ...prev, progress: 80 }))

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors du téléchargement')
      }

      const data = await response.json()

      setFileUploadState2(prev => ({ ...prev, progress: 100 }))

      // Store file info and URL for second invoice
      updateFormData("factureNom2", file.name)
      updateFormData("factureUrl2", data.url)
      setFileUploadState2({ isUploading: false, progress: 100, error: null, success: true })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur lors du traitement du fichier"
      setFileUploadState2({ isUploading: false, progress: 0, error: errorMessage, success: false })
      setValidationError("facture2", errorMessage)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateFile])

  const removeFile2 = useCallback(() => {
    updateFormData("factureUrl2", null)
    updateFormData("factureNom2", null)
    setFileUploadState2({ isUploading: false, progress: 0, error: null, success: false })
    clearValidationError("facture2")
    setShowSecondInvoice(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ─── Step Validation ─────────────────────────────────

  const validateStep1 = (): boolean => {
    const errors: ValidationErrors = {}
    if (formData.clientType === "professionnel") {
      if (!formData.denominationSociale.trim()) errors.denominationSociale = "La dénomination sociale est obligatoire"
      if (!formData.formeJuridique) errors.formeJuridique = "Veuillez sélectionner la forme juridique"
      if (!formData.numeroTVA.trim()) errors.numeroTVA = "Le numéro de TVA est obligatoire"
      if (!formData.numeroBCE.trim()) errors.numeroBCE = "Le numéro BCE est obligatoire"
    }
    if (!formData.region) errors.region = "Veuillez sélectionner votre région"
    if (!formData.fournisseur) errors.fournisseur = "Veuillez sélectionner votre fournisseur"
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateStep3 = (): boolean => {
    const errors: ValidationErrors = {}
    if (!formData.telephone) {
      errors.telephone = "Le téléphone est obligatoire"
    } else if (!isValidBelgianPhone(formData.telephone)) {
      errors.telephone = "Veuillez entrer un numéro belge valide (ex: 0470 12 34 56)"
    }
    if (!formData.email) {
      errors.email = "L'email est obligatoire"
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Veuillez entrer un email valide"
    }
    if (!formData.rgpdConsent) {
      errors.rgpdConsent = "Vous devez accepter la politique de confidentialité"
    }
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) return
    if (currentStep === 3 && !validateStep3()) return
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1)
  }

  // ─── Drag & Drop ─────────────────────────────────────

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }, [processFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  // ─── Form Submission ─────────────────────────────────

  const handleSubmit = async () => {
  if (isSubmitting || fileUploadState.isUploading || fileUploadState2.isUploading) return
  setSubmissionError(null)

    if (!validateStep3()) { setCurrentStep(3); return }
    if (!validateStep1()) { setCurrentStep(1); return }

    setIsSubmitting(true)

  // Compteur lisible pour Particulier et Pro
  const compteurLabel = isPro
    ? [
        compteurCategories.find((c) => c.value === formData.compteurCategorie)?.label,
        formData.compteurCategorie === "analogique"
          ? compteurTarifs.find((t) => t.value === formData.compteurTarif)?.label
          : null,
      ].filter(Boolean).join(" - ")
    : [
        typesCompteur.find((t) => t.value === formData.type_compteur)?.label,
        typesTarif.find((t) => t.value === formData.type_tarif)?.label,
        formData.compteur_nuit ? "Compteur nuit" : null,
      ].filter(Boolean).join(" - ")

    const submitData = new FormData()
    submitData.append("clientType", isPro ? "Professionnel" : "Particulier")
    if (isPro) {
      submitData.append("denominationSociale", formData.denominationSociale)
      submitData.append("formeJuridique", formData.formeJuridique)
      submitData.append("numeroTVA", formData.numeroTVA)
      submitData.append("numeroBCE", formData.numeroBCE)
      if (formData.puissanceSouscrite) submitData.append("puissanceSouscrite", `${formData.puissanceSouscrite} kVA`)
      if (formData.fonction) submitData.append("fonction", formData.fonction)
    }
    submitData.append("region", formData.region)
    submitData.append("fournisseur", formData.fournisseur)
    submitData.append("typeContrat", formData.typeContrat)
    submitData.append(
      isPro ? "typeLocal" : "typeLogement",
      isPro
        ? (typesLocal.find((t) => t.value === formData.typeLocal)?.label ?? formData.typeLocal)
        : formData.typeLogement
    )
    submitData.append("superficie", superficieOptions.find((s) => s.value === formData.superficie)?.label ?? formData.superficie)
    submitData.append("nombre_personnes", (isPro ? nombrePersonnesProfessionnel : nombrePersonnesParticulier).find((p) => p.value === formData.nombre_personnes)?.label ?? formData.nombre_personnes)
    submitData.append("panneaux_photovoltaiques", panneauxOptions.find((p) => p.value === formData.panneaux_photovoltaiques)?.label ?? formData.panneaux_photovoltaiques)
    submitData.append("mensualite", formData.mensualite)
    submitData.append("typeCompteur", compteurLabel)
    submitData.append("chauffage", formData.chauffage)
    submitData.append("nom", formData.nom)
    submitData.append("prenom", formData.prenom)
    submitData.append("telephone", formData.telephone)
    if (formData.telephoneSecondaire) {
      submitData.append("telephoneSecondaire", formData.telephoneSecondaire)
    }
    submitData.append("email", formData.email)
    
    // Concaténe l'adresse avec le numéro de boîte si appartement
    const adresseComplete = formData.numero_boite 
      ? `${formData.adresse} ${formData.numeroRue} bte ${formData.numero_boite}`
      : `${formData.adresse} ${formData.numeroRue}`
    
    submitData.append("adresse", adresseComplete)
    submitData.append("numeroRue", formData.numeroRue)
    if (formData.numero_boite) {
      submitData.append("numeroBoite", formData.numero_boite)
    }
    submitData.append("ville", formData.ville)
    submitData.append("codePostal", formData.codePostal)
    if (formData.eanElectricite) {
      submitData.append("eanElectricite", formData.eanElectricite)
    }
    if (formData.eanGaz) {
      submitData.append("eanGaz", formData.eanGaz)
    }
    submitData.append("rgpdConsent", formData.rgpdConsent ? "Oui" : "Non")

    // Add file info with direct download link from Vercel Blob
    if (formData.facture && formData.factureUrl && fileUploadState.success) {
      submitData.append("factureNom", formData.facture.name)
      submitData.append("factureTaille", `${(formData.facture.size / 1024).toFixed(0)} Ko`)
      submitData.append("factureType", formData.facture.type)
      submitData.append("factureLien", formData.factureUrl)
    }

    // Add second invoice if present
    if (formData.factureUrl2) {
      submitData.append("factureLien2", formData.factureUrl2)
    }

    try {
      // Enregistrement confirmé dans Supabase avant d'afficher la réussite.
      const consentPrefs = getConsentPreferences()
      const leadResponse = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type_client: isPro ? "Professionnel" : "Particulier",
          type_logement: isPro
            ? (typesLocal.find((t) => t.value === formData.typeLocal)?.label ?? formData.typeLocal)
            : formData.typeLogement,
          code_postal: formData.codePostal,
          mensualite: formData.mensualite,
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
          consent_cookies: consentPrefs?.necessary ?? false,
          consent_analytics: consentPrefs?.analytics ?? false,
        }),
      })

      if (!leadResponse.ok) {
        const payload = await leadResponse.json().catch(() => null)
        throw new Error(payload?.error ?? "Impossible d'enregistrer votre demande.")
      }

      await handleFormspreeSubmit(submitData)

      // Tracking conversion : événement Lead sur soumission validée du comparateur
      // ⚠️ IMPORTANT: Les événements gtag ne se déclenchent QUE si Formspree a réussi (state.succeeded)
      // Cela évite de compter les leads échoués comme des conversions
      if (state.succeeded && typeof window !== "undefined") {
        // Google Analytics 4
        if (typeof (window as any).gtag === "function") {
          ;(window as any).gtag("event", "generate_lead", {
            currency: "EUR",
            value: 1,
            region: formData.region,
            type_logement: formData.typeLogement,
          })
          // Google Ads Conversion Tracking
          ;(window as any).gtag("event", "conversion", {
            'send_to': 'AW-18288090875/3crvCK_v_skcEPu9uJBE',
            'value': 1.0,
            'currency': 'EUR'
          })
        }
        // Meta Pixel
        if (typeof (window as any).fbq === "function") {
          ;(window as any).fbq("track", "Lead")
        }
      }

      setCurrentStep(5)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Impossible d'envoyer votre demande. Veuillez réessayer."
      setSubmissionError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ─── Step validity ───────────────────────────────────

  const isPro = formData.clientType === "professionnel"

  const isProCompanyValid = !isPro || (
    formData.denominationSociale.trim() &&
    formData.formeJuridique &&
    formData.numeroTVA.trim() &&
    formData.numeroBCE.trim()
  )
  const isStep1Valid = isProCompanyValid && formData.region && formData.fournisseur && formData.typeContrat && (isPro ? formData.typeLocal : formData.typeLogement) && formData.superficie && formData.nombre_personnes && formData.panneaux_photovoltaiques
  const isStep2Valid = isPro
    ? formData.chauffage && formData.compteurCategorie && (formData.compteurCategorie === "intelligent" || formData.compteurTarif)
    : formData.mensualite && formData.type_compteur && formData.type_tarif && formData.chauffage
  const isStep3Valid = formData.nom && formData.prenom && formData.telephone && formData.email && formData.numeroRue && formData.adresse && formData.codePostal && formData.ville && (formData.typeLogement === "appartement" ? formData.numero_boite : true) && formData.rgpdConsent

  const canProceed = () => {
    switch (currentStep) {
      case 1: return isStep1Valid
      case 2: return isStep2Valid
      case 3: return isStep3Valid
      case 4: return true
      default: return true
    }
  }

  const stepTitles = stepConfig

  // ─── Success Screen ──────────────────────────────────

  if (state.succeeded && currentStep === 5) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-4">
          <div className="size-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-in zoom-in duration-500">
            <CheckCircle2 className="size-10 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary">
              Votre demande a bien été envoyée
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Un conseiller en énergie vous contactera rapidement.
            </p>
          </div>
        </div>

        <div className="bg-primary/5 rounded-xl p-4 space-y-3 border border-primary/20">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-5 text-primary shrink-0" />
            <p className="font-medium text-sm">Merci {formData.prenom} !</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Un conseiller analysera votre dossier et vous contactera avec les meilleures offres.
          </p>
        </div>

        <Button size="lg" className="w-full h-12 gap-2">
          <Phone className="size-4" />
          Être rappelé gratuitement
        </Button>

        {/* Navigation post-soumission */}
        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            onClick={() => {
              window.location.href = "/merci"
            }}
            className="w-full h-12 gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white"
          >
            <Gift className="size-4" />
            Parrainer mes proches
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setCurrentStep(1)}
            className="w-full h-12 gap-2"
          >
            <RotateCcw className="size-4" />
            Faire une nouvelle simulation
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              window.location.href = "/"
            }}
            className="w-full h-12 gap-2"
          >
            <Home className="size-4" />
            Retour à l{"'"}accueil
          </Button>
        </div>
      </div>
    )
  }

  // ─── Form Render ─────────���───────────────────────────

  return (
    <div ref={stepContainerRef} id="step-container" className="space-y-6 scroll-mt-4">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Étape {currentStep} sur {totalSteps - 1}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round((currentStep / (totalSteps - 1)) * 100)}%
          </span>
        </div>
        <Progress value={(currentStep / (totalSteps - 1)) * 100} className="h-1.5" />
        
        <div className="flex justify-between">
          {stepTitles.map((step, index) => {
            const StepIcon = step.icon
            const isCompleted = index + 1 < currentStep
            const isCurrent = index + 1 === currentStep
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className={`size-9 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isCurrent
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="size-4" />
                  ) : (
                    <StepIcon className="size-4" />
                  )}
                </div>
                <span
                  className={`hidden min-[400px]:block text-xs font-medium text-center ${
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Formspree errors */}
      {state.errors && Object.keys(state.errors).length > 0 && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
          <AlertCircle className="size-4 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm text-destructive">Erreur lors de l&apos;envoi</p>
            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-destructive mt-1" />
          </div>
        </div>
      )}

      <div>
        {/* Step 1: Situation */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Toggle Particulier / Professionnel */}
            <div className="space-y-2">
              <Label>Vous êtes</Label>
              <RadioGroup
                value={formData.clientType}
                onValueChange={(v) => {
                  updateFormData("clientType", v)
                  setSharedClientType(v as ClientType)
                }}
                className="grid grid-cols-2 gap-2 md:gap-3"
              >
                {[
                  { value: "particulier", label: "Particulier", icon: User },
                  { value: "professionnel", label: "Professionnel", icon: Briefcase },
                ].map((opt) => {
                  const Icon = opt.icon
                  return (
                    <div key={opt.value}>
                      <RadioGroupItem value={opt.value} id={`clientType-${opt.value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`clientType-${opt.value}`}
                        className="flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-card p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                      >
                        <Icon className="size-5 text-primary" />
                        <span className="text-sm font-medium">{opt.label}</span>
                      </Label>
                    </div>
                  )
                })}
              </RadioGroup>
            </div>

            {/* Bloc société (Professionnel uniquement) */}
            {isPro && (
              <div className="space-y-5 rounded-xl border border-border bg-secondary/20 p-4 md:p-5">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Building2 className="size-4" />
                  Informations de votre entreprise
                </p>

                <div className="space-y-2">
                  <FloatingField
                    id="denominationSociale"
                    label="Dénomination sociale *"
                    value={formData.denominationSociale}
                    onChange={(e) => updateFormData("denominationSociale", e.target.value)}
                    error={validationErrors.denominationSociale}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="formeJuridique" className="flex items-center gap-1">
                    Forme juridique <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.formeJuridique} onValueChange={(v) => updateFormData("formeJuridique", v)}>
                    <SelectTrigger
                      id="formeJuridique"
                      className={`h-12 ${validationErrors.formeJuridique ? "border-destructive ring-destructive/20" : ""}`}
                    >
                      <SelectValue placeholder="Sélectionnez la forme juridique" />
                    </SelectTrigger>
                    <SelectContent>
                      {formesJuridiques.map((f) => (
                        <SelectItem key={f} value={f}>{f}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {validationErrors.formeJuridique && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="size-3" />
                      {validationErrors.formeJuridique}
                    </p>
                  )}
                </div>

                <FloatingField
                  id="numeroTVA"
                  label="Numéro de TVA *"
                  placeholder="Ex: BE0123456789"
                  value={formData.numeroTVA}
                  onChange={(e) => updateFormData("numeroTVA", e.target.value)}
                  error={validationErrors.numeroTVA}
                  hint="Vous pourrez corriger plus tard si besoin"
                />

                <FloatingField
                  id="numeroBCE"
                  label="Numéro BCE *"
                  placeholder="Ex: 0123456789"
                  value={formData.numeroBCE}
                  onChange={(e) => updateFormData("numeroBCE", e.target.value)}
                  error={validationErrors.numeroBCE}
                  hint="Vous pourrez corriger plus tard si besoin"
                />
              </div>
            )}

            <CardHeader className="p-0">
              <CardTitle className="text-xl md:text-2xl">Votre situation actuelle</CardTitle>
              <CardDescription>
                Ces informations nous permettent de trouver les meilleures offres pour vous
              </CardDescription>
            </CardHeader>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="region" className="flex items-center gap-1">
                  Région <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.region} onValueChange={(v) => updateFormData("region", v)}>
                  <SelectTrigger 
                    id="region" 
                    className={`h-12 ${validationErrors.region ? "border-destructive ring-destructive/20" : ""}`}
                  >
                    <SelectValue placeholder="Sélectionnez votre région" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.region && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {validationErrors.region}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fournisseur" className="flex items-center gap-1">
                  Fournisseur actuel <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.fournisseur} onValueChange={(v) => updateFormData("fournisseur", v)}>
                  <SelectTrigger 
                    id="fournisseur" 
                    className={`h-12 ${validationErrors.fournisseur ? "border-destructive ring-destructive/20" : ""}`}
                  >
                    <SelectValue placeholder="Sélectionnez votre fournisseur" />
                  </SelectTrigger>
                  <SelectContent>
                    {fournisseurs.map((f) => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.fournisseur && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {validationErrors.fournisseur}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label>Type de contrat</Label>
                <RadioGroup
                  value={formData.typeContrat}
                  onValueChange={(v) => updateFormData("typeContrat", v)}
                  className="grid grid-cols-3 gap-2 md:gap-3"
                >
                  {typesContrat.map((type) => {
                    const Icon = type.icon
                    return (
                      <div key={type.value}>
                        <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
                        <Label
                          htmlFor={type.value}
                          className="flex flex-col items-center justify-center rounded-xl border-2 border-border bg-card p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                        >
                          <Icon className="mb-2 size-5 md:size-6 text-primary" />
                          <span className="text-xs md:text-sm font-medium">{type.label}</span>
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </div>

              {isPro ? (
                <div className="space-y-3">
                  <Label>Type de local</Label>
                  <RadioGroup
                    value={formData.typeLocal}
                    onValueChange={(v) => updateFormData("typeLocal", v)}
                    className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3"
                  >
                    {typesLocal.map((type) => (
                      <div key={type.value}>
                        <RadioGroupItem value={type.value} id={`local-${type.value}`} className="peer sr-only" />
                        <Label
                          htmlFor={`local-${type.value}`}
                          className="flex items-center justify-center rounded-xl border-2 border-border bg-card p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                        >
                          <span className="text-xs md:text-sm font-medium">{type.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ) : (
                <div className="space-y-3">
                  <Label>Type de logement</Label>
                  <RadioGroup
                    value={formData.typeLogement}
                    onValueChange={(v) => updateFormData("typeLogement", v)}
                    className="grid grid-cols-3 gap-2 md:gap-3"
                  >
                    {typesLogement.map((type) => (
                      <div key={type.value}>
                        <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
                        <Label
                          htmlFor={type.value}
                          className="flex items-center justify-center rounded-xl border-2 border-border bg-card p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                        >
                          <span className="text-xs md:text-sm font-medium">{type.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Superficie - affichée uniquement si typeLogement ou typeLocal est sélectionné */}
              {(formData.typeLogement || formData.typeLocal) && (
                <div className="space-y-3">
                  <Label>Superficie *</Label>
                  <RadioGroup
                    value={formData.superficie}
                    onValueChange={(v) => updateFormData("superficie", v)}
                    className="grid grid-cols-2 gap-2 md:gap-3"
                  >
                    {superficieOptions.map((option) => (
                      <div key={option.value}>
                        <RadioGroupItem value={option.value} id={`sup-${option.value}`} className="peer sr-only" />
                        <Label
                          htmlFor={`sup-${option.value}`}
                          className="flex items-center justify-center rounded-xl border-2 border-border bg-card p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                        >
                          <span className="text-xs md:text-sm font-medium">{option.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Nombre de personnes - affichée uniquement si typeLogement ou typeLocal est sélectionné */}
              {(formData.typeLogement || formData.typeLocal) && (
                <div className="space-y-3">
                  <Label>Nombre de personnes dans le foyer *</Label>
                  <RadioGroup
                    value={formData.nombre_personnes}
                    onValueChange={(v) => updateFormData("nombre_personnes", v)}
                    className="grid grid-cols-4 gap-2 md:gap-3"
                  >
                    {(isPro ? nombrePersonnesProfessionnel : nombrePersonnesParticulier).map((option) => (
                      <div key={option.value}>
                        <RadioGroupItem value={option.value} id={`personnes-${option.value}`} className="peer sr-only" />
                        <Label
                          htmlFor={`personnes-${option.value}`}
                          className="flex items-center justify-center rounded-xl border-2 border-border bg-card p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                        >
                          <span className="text-xs md:text-sm font-medium">{option.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Panneaux photovoltaïques - affichée uniquement si typeLogement ou typeLocal est sélectionné */}
              {(formData.typeLogement || formData.typeLocal) && (
                <div className="space-y-3">
                  <Label>Disposez-vous de panneaux photovoltaïques? *</Label>
                  <RadioGroup
                    value={formData.panneaux_photovoltaiques}
                    onValueChange={(v) => updateFormData("panneaux_photovoltaiques", v)}
                    className="grid grid-cols-2 gap-2 md:gap-3"
                  >
                    {panneauxOptions.map((option) => (
                      <div key={option.value}>
                        <RadioGroupItem value={option.value} id={`panneaux-${option.value}`} className="peer sr-only" />
                        <Label
                          htmlFor={`panneaux-${option.value}`}
                          className="flex items-center justify-center rounded-xl border-2 border-border bg-card p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                        >
                          <span className="text-xs md:text-sm font-medium">{option.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 2: Consommation */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="space-y-6"
          >
            <CardHeader className="p-0">
              <CardTitle className="text-xl md:text-2xl">Votre consommation</CardTitle>
              <CardDescription>
                Ces détails nous aident à estimer vos économies potentielles.
              </CardDescription>
            </CardHeader>

            <div className="space-y-5">
              <div className="space-y-2">
                <FloatingField
                  id="mensualite"
                  label={isPro ? "Mensualité actuelle (EUR/mois) (optionnel)" : "Mensualité actuelle (EUR/mois)"}
                  type="number"
                  placeholder={isPro ? "Si vous la connaissez" : undefined}
                  value={formData.mensualite}
                  onChange={(e) => updateFormData("mensualite", e.target.value)}
                />
              </div>

              {isPro ? (
                <div className="space-y-3">
                  <Label htmlFor="compteurCategorie" className="flex items-center gap-1">
                    Type de compteur <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.compteurCategorie}
                    onValueChange={(v) => {
                      updateFormData("compteurCategorie", v)
                      // Réinitialise le tarif si compteur intelligent
                      if (v === "intelligent") updateFormData("compteurTarif", "")
                    }}
                  >
                    <SelectTrigger id="compteurCategorie" className="h-12 rounded-xl border border-border bg-secondary/30 px-4 text-left">
                      <SelectValue placeholder="Sélectionnez votre type de compteur" />
                    </SelectTrigger>
                    <SelectContent>
                      {compteurCategories.map((c) => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {formData.compteurCategorie === "analogique" && (
                    <Select value={formData.compteurTarif} onValueChange={(v) => updateFormData("compteurTarif", v)}>
                      <SelectTrigger id="compteurTarif" className="h-12 rounded-xl border border-border bg-secondary/30 px-4 text-left">
                        <SelectValue placeholder="Tarif : mono-horaire ou bi-horaire" />
                      </SelectTrigger>
                      <SelectContent>
                        {compteurTarifs.map((t) => (
                          <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Étape 1: Type de compteur */}
                  <div className="space-y-3">
                    <Label className="inline-flex items-center gap-2 text-sm font-medium">Type de compteur *</Label>
                    <RadioGroup
                      value={formData.type_compteur}
                      onValueChange={(v) => updateFormData("type_compteur", v)}
                      className="grid grid-cols-2 gap-2 md:gap-3"
                    >
                      {typesCompteur.map((type) => (
                        <div key={type.value}>
                          <RadioGroupItem value={type.value} id={`compteur-${type.value}`} className="peer sr-only" />
                          <Label
                            htmlFor={`compteur-${type.value}`}
                            className="flex items-center justify-center rounded-xl border-2 border-border bg-card p-3 md:p-4 text-center text-xs md:text-sm font-medium text-foreground transition hover:border-primary hover:bg-primary/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
                          >
                            {type.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Étape 2: Type de tarif (affichée après sélection du type) */}
                  {formData.type_compteur && (
                    <div className="space-y-3">
                      <Label htmlFor="type-tarif" className="inline-flex items-center gap-2 text-sm font-medium">Type de tarif *</Label>
                      <Select value={formData.type_tarif} onValueChange={(v) => updateFormData("type_tarif", v)}>
                        <SelectTrigger id="type-tarif" className="border-2">
                          <SelectValue placeholder="Sélectionner un tarif" />
                        </SelectTrigger>
                        <SelectContent>
                          {typesTarif.map((tarif) => (
                            <SelectItem key={tarif.value} value={tarif.value}>
                              {tarif.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Étape 3: Checkbox nuit (affichée seulement si Bihoraire) */}
                  {formData.type_tarif === "bihoraire" && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id="compteur-nuit"
                          checked={formData.compteur_nuit}
                          onCheckedChange={(checked) => updateFormData("compteur_nuit", checked as boolean)}
                        />
                        <Label htmlFor="compteur-nuit" className="text-sm font-medium cursor-pointer">
                          J&apos;ai un compteur exclusif nuit
                        </Label>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="chauffage">Chauffage principal</Label>
                <Select value={formData.chauffage} onValueChange={(v) => updateFormData("chauffage", v)}>
                  <SelectTrigger id="chauffage" className="h-12 rounded-xl border border-border bg-secondary/30 px-4 text-left">
                    <SelectValue placeholder="Sélectionnez votre type de chauffage" />
                  </SelectTrigger>
                  <SelectContent>
                    {typesChauffage.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {isPro && (
                <div className="relative">
                  <FloatingField
                    id="puissanceSouscrite"
                    label="Puissance souscrite (kVA) (optionnel)"
                    type="number"
                    placeholder="Si vous la connaissez"
                    value={formData.puissanceSouscrite}
                    onChange={(e) => updateFormData("puissanceSouscrite", e.target.value)}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 3: Coordonnees */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="space-y-6"
          >
            <CardHeader className="p-0">
              <CardTitle className="text-xl md:text-2xl">Vos coordonnées</CardTitle>
              <CardDescription>
                Pour recevoir votre simulation personnalisée.
              </CardDescription>
            </CardHeader>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
              <FloatingField
                id="prenom"
                label={isPro ? "Contact - Prénom" : "Prénom"}
                value={formData.prenom}
                onChange={(e) => updateFormData("prenom", e.target.value)}
              />
              <FloatingField
                id="nom"
                label={isPro ? "Contact - Nom" : "Nom"}
                value={formData.nom}
                onChange={(e) => updateFormData("nom", e.target.value)}
              />
              </div>

              {isPro && (
                <FloatingField
                  id="fonction"
                  label="Fonction (optionnel)"
                  value={formData.fonction}
                  onChange={(e) => updateFormData("fonction", e.target.value)}
                />
              )}

              <FloatingField
                id="telephone"
                label={isPro ? "Téléphone pro" : "Téléphone"}
                type="tel"
                value={formData.telephone}
                onChange={(e) => updateFormData("telephone", e.target.value)}
                error={validationErrors.telephone}
                hint="Ex: 0470 12 34 56, +32 470 12 34 56"
              />

              <FloatingField
                id="telephoneSecondaire"
                label="Téléphone secondaire (optionnel)"
                type="tel"
                value={formData.telephoneSecondaire}
                onChange={(e) => updateFormData("telephoneSecondaire", e.target.value)}
              />

              <FloatingField
                id="email"
                label={isPro ? "Email pro" : "Email"}
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                error={validationErrors.email}
              />

              {/* Address Section */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                  <MapPin className="size-4" />
                  {isPro ? "Adresse du site" : "Adresse de facturation"}
                </p>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <FloatingField
                      id="numeroRue"
                      label="Numéro *"
                      value={formData.numeroRue}
                      onChange={(e) => updateFormData("numeroRue", e.target.value)}
                    />
                    {/* Champ Numéro de boîte - conditionnel si Appartement */}
                    {formData.typeLogement === "appartement" && (
                      <FloatingField
                        id="numero_boite"
                        label="Numéro de boîte *"
                        placeholder="Ex: 12, A, RDC"
                        value={formData.numero_boite}
                        onChange={(e) => updateFormData("numero_boite", e.target.value)}
                      />
                    )}
                    {/* Champ Rue avec autocomplétion */}
                    <div className={formData.typeLogement === "appartement" ? "col-span-1 relative" : "col-span-2 relative"}>
                      <FloatingField
                        id="adresse"
                        label="Rue *"
                        value={formData.adresse}
                        onChange={(e) => handleAddressSearch(e.target.value)}
                        autoComplete="off"
                      />
                      {/* Dropdown des suggestions */}
                      {showAddressSuggestions && addressSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
                          {addressSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleAddressSelect(suggestion)}
                              className="w-full text-left px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors text-sm"
                            >
                              {suggestion.label || suggestion.value}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingField
                      id="codePostal"
                      label="Code postal *"
                      value={formData.codePostal}
                      onChange={(e) => updateFormData("codePostal", e.target.value)}
                    />
                    <FloatingField
                      id="ville"
                      label="Ville *"
                      value={formData.ville}
                      onChange={(e) => updateFormData("ville", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Question conditionnelle EAN */}
              <div className="pt-4 border-t border-border">
                <Label>Avez-vous vos codes EAN sous la main ? *</Label>
                <RadioGroup
                  value={formData.a_ean}
                  onValueChange={(v) => updateFormData("a_ean", v)}
                  className="grid grid-cols-2 gap-2 md:gap-3 mt-3"
                >
                  <div>
                    <RadioGroupItem value="oui" id="ean-oui" className="peer sr-only" />
                    <Label
                      htmlFor="ean-oui"
                      className="flex items-center justify-center rounded-xl border-2 border-border bg-card p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                    >
                      <span className="text-xs md:text-sm font-medium">Oui</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="non" id="ean-non" className="peer sr-only" />
                    <Label
                      htmlFor="ean-non"
                      className="flex items-center justify-center rounded-xl border-2 border-border bg-card p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                    >
                      <span className="text-xs md:text-sm font-medium">Non, je les donnerai plus tard</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Champs EAN - affichés uniquement si a_ean = 'oui' */}
              {formData.a_ean === "oui" && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                    <Zap className="size-4" />
                    Codes EAN <span className="font-normal">(optionnel)</span>
                  </p>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                    Le code EAN est le numéro à 18 chiffres (commençant par 54) qui identifie votre
                    compteur. Vous le trouvez sur votre facture d&apos;énergie ou sur votre espace
                    client. Pas obligatoire : laissez vide si vous ne l&apos;avez pas sous la main, un
                    conseiller le récupérera pour vous.
                  </p>
                  <div className="space-y-4">
                    <FloatingField
                      id="eanElectricite"
                      label="Code EAN Électricité (optionnel)"
                      inputMode="numeric"
                      value={formData.eanElectricite}
                      onChange={(e) => updateFormData("eanElectricite", e.target.value)}
                    />
                    <FloatingField
                      id="eanGaz"
                      label="Code EAN Gaz (optionnel)"
                      inputMode="numeric"
                      value={formData.eanGaz}
                      onChange={(e) => updateFormData("eanGaz", e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    Vous ne trouvez pas votre code EAN ? Vous pouvez le rechercher par adresse sur le
                    site officiel de votre gestionnaire de réseau :{" "}
                    <a
                      href="https://www.fluvius.be/fr/themes/raccordements/votre-code-ean"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 hover:no-underline"
                    >
                      Fluvius (Flandre)
                    </a>
                    ,{" "}
                    <a
                      href="https://www.sibelga.be"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 hover:no-underline"
                    >
                      Sibelga (Bruxelles)
                    </a>{" "}
                    ou{" "}
                    <a
                      href="https://www.ores.be"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 hover:no-underline"
                    >
                      ORES (Wallonie)
                    </a>
                    .
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-border">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="rgpdConsent"
                    checked={formData.rgpdConsent}
                    onCheckedChange={(checked) => updateFormData("rgpdConsent", checked === true)}
                    className={validationErrors.rgpdConsent ? "border-destructive" : ""}
                  />
                  <Label htmlFor="rgpdConsent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    J&apos;accepte que mes données personnelles soient traitées conformément à la politique de confidentialité pour recevoir une offre personnalisée. <span className="text-destructive">*</span>
                  </Label>
                </div>
                {validationErrors.rgpdConsent && (
                  <p className="text-sm text-destructive flex items-center gap-1 mt-2">
                    <AlertCircle className="size-3" />
                    {validationErrors.rgpdConsent}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Upload Facture */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <CardHeader className="p-0">
              <CardTitle className="text-xl md:text-2xl">Ajoutez votre facture</CardTitle>
              <CardDescription>
                Pour une estimation plus précise de vos économies (optionnel)
              </CardDescription>
            </CardHeader>

            {/* Question: Avez-vous une facture ? */}
            <div className="space-y-3">
              <Label className="text-base">
                {formData.type_energie === "electricite" && "Avez-vous une facture d'électricité à nous envoyer ? *"}
                {formData.type_energie === "gaz" && "Avez-vous une facture de gaz à nous envoyer ? *"}
                {formData.type_energie === "les_deux" && "Avez-vous votre facture d'électricité et/ou de gaz à nous envoyer ? *"}
              </Label>
              <RadioGroup
                value={formData.a_facture}
                onValueChange={(v) => updateFormData("a_facture", v)}
                className="grid grid-cols-2 gap-2 md:gap-3"
              >
                <div>
                  <RadioGroupItem value="oui" id="facture-oui" className="peer sr-only" />
                  <Label
                    htmlFor="facture-oui"
                    className="flex items-center justify-center rounded-xl border-2 border-border bg-card p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                  >
                    <span className="text-xs md:text-sm font-medium">Oui</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="non" id="facture-non" className="peer sr-only" />
                  <Label
                    htmlFor="facture-non"
                    className="flex items-center justify-center rounded-xl border-2 border-border bg-card p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                  >
                    <span className="text-xs md:text-sm font-medium">Non</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Upload zone - affichée uniquement si a_facture = 'oui' */}
            {formData.a_facture === "oui" && (
            <div className="space-y-6">
              {/* Facture N°1 */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">Facture N°1</p>
                <div
              className={`relative border-2 border-dashed rounded-2xl p-6 md:p-12 text-center transition-all duration-300 ${
                fileUploadState.error
                  ? "border-destructive bg-destructive/5"
                  : dragActive
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : fileUploadState.success
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-primary/50 hover:bg-muted/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {/* Upload in progress */}
              {fileUploadState.isUploading && (
                <div className="space-y-4">
                  <div className="size-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Loader2 className="size-8 text-primary animate-spin" />
                  </div>
                  <p className="font-medium text-lg">Traitement en cours...</p>
                  <Progress value={fileUploadState.progress} className="h-2 max-w-xs mx-auto" />
                  <p className="text-sm text-muted-foreground">{fileUploadState.progress}%</p>
                </div>
              )}

              {/* Upload error */}
              {!fileUploadState.isUploading && fileUploadState.error && (
                <div className="space-y-3">
                  <div className="size-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                    <AlertCircle className="size-8 text-destructive" />
                  </div>
                  <p className="font-medium text-destructive">{fileUploadState.error}</p>
                  <Button type="button" variant="outline" size="sm" onClick={removeFile}>
                    Réessayer
                  </Button>
                </div>
              )}

              {/* Upload success */}
              {!fileUploadState.isUploading && !fileUploadState.error && fileUploadState.success && formData.facture && (
                <div className="space-y-3">
                  <div className="size-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="size-8 text-primary" />
                  </div>
                  <p className="font-medium text-lg">{formData.facture.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(formData.facture.size / 1024).toFixed(0)} Ko - Fichier ajout�� avec succès
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); removeFile() }}
                    className="gap-1"
                  >
                    <X className="size-3" />
                    Supprimer le fichier
                  </Button>
                </div>
              )}

              {/* Default state */}
              {!fileUploadState.isUploading && !fileUploadState.error && !fileUploadState.success && (
                <div className="space-y-4">
                  {/* Main upload area */}
                  <div className="relative">
                    <input
                      type="file"
                      id="facture"
                      name="facture"
                      accept=".pdf,.jpg,.jpeg,.png,.webp,image/*"
                      capture="environment"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="space-y-3">
                      <div className="size-14 mx-auto rounded-full bg-muted flex items-center justify-center">
                        <Upload className="size-7 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-base">
                          <span className="hidden md:inline">Glissez votre facture ici</span>
                          <span className="md:hidden">Ajoutez votre facture</span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="hidden md:inline">ou cliquez pour sélectionner un fichier</span>
                          <span className="md:hidden">Prenez en photo ou sélectionnez un fichier</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cloud options toggle */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setShowCloudOptions(!showCloudOptions) }}
                      className="text-sm text-primary hover:underline flex items-center gap-1 mx-auto"
                    >
                      <Cloud className="size-4" />
                      {showCloudOptions ? "Masquer les options cloud" : "Importer depuis le cloud"}
                    </button>
                  </div>

                  {/* Cloud service buttons */}
                  {showCloudOptions && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); document.getElementById('facture')?.click() }}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all"
                      >
                        <Monitor className="size-6 text-muted-foreground" />
                        <span className="text-xs font-medium">Mon appareil</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); openGoogleDrive() }}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-[#4285F4] hover:bg-[#4285F4]/5 transition-all"
                      >
                        <svg className="size-6" viewBox="0 0 24 24" fill="none">
                          <path d="M4.5 15.5L8 21h12l3.5-5.5H4.5z" fill="#4285F4"/>
                          <path d="M16 3H8l-4.5 8h8L16 3z" fill="#0F9D58"/>
                          <path d="M16 3l4.5 8H12l-3.5-8H16z" fill="#FFCD40"/>
                          <path d="M8 3L3.5 11l4 7 4-7-3.5-8z" fill="#188038"/>
                          <path d="M16 3l3.5 8-4 7-4-7 4.5-8z" fill="#F4B400"/>
                          <path d="M7.5 18l-3-5.5 4-7 3.5 8-4.5 4.5z" fill="#0F9D58"/>
                        </svg>
                        <span className="text-xs font-medium">Google Drive</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); openDropbox() }}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-[#0061FF] hover:bg-[#0061FF]/5 transition-all"
                      >
                        <svg className="size-6" viewBox="0 0 24 24" fill="#0061FF">
                          <path d="M6 2l6 3.75L6 9.5 0 5.75 6 2zM18 2l6 3.75-6 3.75-6-3.75L18 2zM0 13.25L6 9.5l6 3.75-6 3.75-6-3.75zM18 9.5l6 3.75-6 3.75-6-3.75L18 9.5zM6 18.25l6-3.75 6 3.75-6 3.75-6-3.75z"/>
                        </svg>
                        <span className="text-xs font-medium">Dropbox</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); openOneDrive() }}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-[#0078D4] hover:bg-[#0078D4]/5 transition-all"
                      >
                        <svg className="size-6" viewBox="0 0 24 24" fill="none">
                          <path d="M14.5 6c-1.2 0-2.3.5-3.1 1.3-.5-.2-1-.3-1.6-.3-2.5 0-4.5 2-4.5 4.5 0 .4.1.8.2 1.2C3.3 13.4 2 15.1 2 17c0 2.2 1.8 4 4 4h13c2.2 0 4-1.8 4-4 0-1.9-1.3-3.5-3.1-3.9.1-.4.1-.7.1-1.1 0-3.3-2.7-6-6-6h.5z" fill="#0078D4"/>
                          <path d="M9.5 11.5l3 2-3 2v-4z" fill="white"/>
                        </svg>
                        <span className="text-xs font-medium">OneDrive</span>
                      </button>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    PDF, JPG, PNG ou WEBP (max. 10 Mo)
                  </p>
                </div>
              )}
            </div>
              </div>

              {/* Bouton ajouter 2e facture - affiché seulement si Facture N°1 uploadée */}
              {fileUploadState.success && formData.factureUrl && !showSecondInvoice && !formData.factureUrl2 && (
                <button
                  type="button"
                  onClick={() => setShowSecondInvoice(true)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
                >
                  + Ajouter une 2ème facture si besoin
                </button>
              )}

              {/* Facture N°2 - affichée seulement si showSecondInvoice = true */}
              {showSecondInvoice && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-muted-foreground">Facture N°2 (optionnel)</p>
                    {formData.factureUrl2 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFile2()
                        }}
                        className="text-xs text-destructive hover:underline"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-6 md:p-12 text-center transition-all duration-300 ${
                      fileUploadState2.error
                        ? "border-destructive/50 bg-destructive/5"
                        : fileUploadState2.success
                          ? "border-primary/50 bg-primary/5"
                          : "border-muted hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    {/* Upload in progress */}
                    {fileUploadState2.isUploading && (
                      <div className="space-y-4">
                        <div className="size-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                          <Loader2 className="size-8 text-primary animate-spin" />
                        </div>
                        <p className="font-medium text-lg">Traitement en cours...</p>
                        <Progress value={fileUploadState2.progress} className="h-2 max-w-xs mx-auto" />
                        <p className="text-sm text-muted-foreground">{fileUploadState2.progress}%</p>
                      </div>
                    )}

                    {/* Error state */}
                    {!fileUploadState2.isUploading && fileUploadState2.error && (
                      <div className="space-y-3">
                        <div className="size-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                          <AlertCircle className="size-8 text-destructive" />
                        </div>
                        <p className="font-medium text-destructive">{fileUploadState2.error}</p>
                      </div>
                    )}

                    {/* Default state for facture 2 */}
                    {!fileUploadState2.isUploading && !fileUploadState2.error && !fileUploadState2.success && (
                      <div className="space-y-4">
                        <div className="relative">
                          <input
                            type="file"
                            id="facture2"
                            name="facture2"
                            accept=".pdf,.jpg,.jpeg,.png,.webp,image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                processFile2(e.target.files[0])
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="space-y-3">
                            <div className="size-14 mx-auto rounded-full bg-muted flex items-center justify-center">
                              <Upload className="size-7 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium text-base">
                                <span className="hidden md:inline">Glissez votre facture ici</span>
                                <span className="md:hidden">Ajoutez votre facture</span>
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                <span className="hidden md:inline">ou cliquez pour sélectionner un fichier</span>
                                <span className="md:hidden">Prenez en photo ou sélectionnez un fichier</span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          PDF, JPG, PNG ou WEBP (max. 10 Mo)
                        </p>
                      </div>
                    )}

                    {/* Success for facture 2 */}
                    {!fileUploadState2.isUploading && !fileUploadState2.error && fileUploadState2.success && formData.factureUrl2 && (
                      <div className="space-y-3">
                        <div className="size-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                          <CheckCircle2 className="size-8 text-primary" />
                        </div>
                        <p className="font-medium text-lg">{formData.factureNom2}</p>
                        <p className="text-sm text-muted-foreground">Fichier ajouté avec succès</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            )}

            {/* Info box: Pourquoi ajouter votre facture ? - toujours affiché */}
            <div className="bg-accent/50 rounded-xl p-4 flex gap-3">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Pourquoi ajouter votre facture ?</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Votre facture nous permet de récupérer vos codes EAN et votre consommation exacte. Votre facture permet également une analyse plus précise de votre consommation et de votre compteur. Nos experts peuvent ainsi vous proposer les offres les plus adaptées à votre profil.
                </p>
              </div>
            </div>
          </div>
        )}

        {submissionError && currentStep < 5 && (
          <div role="alert" className="mt-4 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <div>
              <p className="font-medium">Votre demande n&apos;a pas pu être enregistrée.</p>
              <p className="mt-1">{submissionError} Vous pouvez réessayer sans ressaisir le formulaire.</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        {currentStep < 5 && (
          <div className="flex gap-3 mt-8">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="flex-1 h-12"
                disabled={isSubmitting}
              >
                <ArrowLeft className="size-4 mr-2" />
                Retour
              </Button>
            )}
            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex-1 h-12"
              >
                Continuer
                <ArrowRight className="size-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || fileUploadState.isUploading || fileUploadState2.isUploading}
                className="flex-1 h-12"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : fileUploadState.isUploading ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Traitement du fichier...
                  </>
                ) : (
                  <>
                    Envoyer ma demande
                    <ArrowRight className="size-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
