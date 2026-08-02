"use client"

import { useState } from "react"
import { Lock, Loader2, ShieldCheck, Check, X, Phone } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { type SavingsEstimate, type LeadContact, formatEUR } from "@/lib/savings"

type GateResultModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  estimate: SavingsEstimate
  referralCode: string
  onUnlock: (contact: LeadContact) => void
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+]?[\d\s().-]{8,}$/
const POSTAL_RE = /^\d{4}$/

const EMPTY_FORM: LeadContact = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  streetNumber: "",
  postalCode: "",
  birthDate: "",
  currentSupplier: "",
  meterType: "",
  formula: "",
  exclusiveNightMeter: false,
}

const SUPPLIERS = ["Engie", "Electrabel", "Luminus", "Eneco", "TotalEnergies", "Mega", "Octa+", "Ecofix", "Frank Energy", "Bolt", "Autre"]

export function GateResultModal({ open, onOpenChange, estimate, referralCode, onUnlock }: GateResultModalProps) {
  const [form, setForm] = useState<LeadContact>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof LeadContact, string>>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function update<K extends keyof LeadContact>(key: K, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function validate(values: LeadContact): Partial<Record<keyof LeadContact, string>> {
    const next: Partial<Record<keyof LeadContact, string>> = {}
    if (!values.firstName.trim()) next.firstName = "Prénom requis."
    if (!values.lastName.trim()) next.lastName = "Nom requis."
    if (!EMAIL_RE.test(values.email.trim())) next.email = "E-mail invalide."
    if (!PHONE_RE.test(values.phone.trim())) next.phone = "Numéro de téléphone invalide."
    if (!values.street.trim()) next.street = "Rue requise."
    if (!values.streetNumber.trim()) next.streetNumber = "N° requis."
    if (!POSTAL_RE.test(values.postalCode.trim())) next.postalCode = "Code postal belge à 4 chiffres."
    if (!values.birthDate) {
      next.birthDate = "Date de naissance requise."
    } else {
      const d = new Date(values.birthDate)
      const now = new Date()
      const age = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
      if (Number.isNaN(d.getTime()) || age < 18 || age > 120) {
        next.birthDate = "Vous devez être majeur (18 ans ou plus)."
      }
    }
    if (!values.currentSupplier) next.currentSupplier = "Fournisseur requis."
    if (!values.meterType) next.meterType = "Type de compteur requis."
    if (!values.formula) next.formula = "Formule requise."
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const trimmed: LeadContact = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      street: form.street.trim(),
      streetNumber: form.streetNumber.trim(),
      postalCode: form.postalCode.trim(),
      birthDate: form.birthDate,
      currentSupplier: form.currentSupplier,
      meterType: form.meterType,
      formula: form.formula,
      exclusiveNightMeter: form.exclusiveNightMeter,
    }

    const validation = validate(trimmed)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setLoading(true)
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...trimmed,
          monthlyBill: estimate.monthlyBill,
          yearlySavings: estimate.yearlySavings,
          score: estimate.score,
          referralCode,
        }),
      })
    } catch {
      // On continue malgré une erreur réseau : l'enregistrement est best-effort.
    } finally {
      setLoading(false)
      setSubmitted(true)
      onUnlock(trimmed)
      
      // Fermer le modal après 1 minute
      setTimeout(() => {
        handleClose()
      }, 60000)
    }
  }

  function handleClose() {
    setSubmitted(false)
    setForm(EMPTY_FORM)
    setErrors({})
    onOpenChange(false)
  }

  function handleDialogOpenChange(newOpen: boolean) {
    if (!newOpen) {
      handleClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        {!submitted ? (
          <>
            <DialogHeader>
              <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-2xl bg-primary/10">
                <Lock className="size-6 text-primary" />
              </div>
              <DialogTitle className="text-center text-xl text-balance">Débloquez votre économie estimée</DialogTitle>
              <DialogDescription className="text-center">
                Complétez vos coordonnées pour révéler l{"'"}économie que vous réaliserez via nos services sur votre acompte
                mensuel.
              </DialogDescription>
            </DialogHeader>

            {/* Aperçu flouté + rappel de l'acompte mensuel (issu du curseur) */}
            <div className="relative my-2 overflow-hidden rounded-2xl border border-border bg-secondary/40 p-5 text-center">
              <div className="select-none blur-md" aria-hidden="true">
                <p className="text-sm text-muted-foreground">Économie annuelle estimée</p>
                <p className="text-3xl font-extrabold text-primary">{formatEUR(estimate.yearlySavings)}</p>
                <p className="mt-1 text-sm font-medium text-primary/80">Score {estimate.score}/100</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                  Résultat masqué
                </span>
              </div>
            </div>

            <div className="mb-1 flex items-center justify-between rounded-xl bg-secondary/40 px-4 py-2.5 text-sm">
              <span className="text-muted-foreground">Votre acompte mensuel</span>
              <span className="font-semibold text-foreground">{formatEUR(estimate.monthlyBill)}/mois</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Prénom / Nom */}
              <div className="grid grid-cols-2 gap-3">
                <Field
                  id="gate-firstName"
                  label="Prénom"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={(v) => update("firstName", v)}
                  error={errors.firstName}
                />
                <Field
                  id="gate-lastName"
                  label="Nom"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={(v) => update("lastName", v)}
                  error={errors.lastName}
                />
              </div>

              {/* Email / Téléphone */}
              <Field
                id="gate-email"
                label="E-mail"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="vous@exemple.be"
                value={form.email}
                onChange={(v) => update("email", v)}
                error={errors.email}
              />

              <Field
                id="gate-phone"
                label="Téléphone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+32 470 12 34 56"
                value={form.phone}
                onChange={(v) => update("phone", v)}
                error={errors.phone}
              />

              {/* Rue / N° */}
              <div className="grid grid-cols-[1fr_5rem] gap-3">
                <Field
                  id="gate-street"
                  label="Rue"
                  autoComplete="address-line1"
                  value={form.street}
                  onChange={(v) => update("street", v)}
                  error={errors.street}
                />
                <Field
                  id="gate-streetNumber"
                  label="N°"
                  autoComplete="address-line2"
                  value={form.streetNumber}
                  onChange={(v) => update("streetNumber", v)}
                  error={errors.streetNumber}
                />
              </div>

              {/* Code postal / Date de naissance */}
              <div className="grid grid-cols-2 gap-3">
                <Field
                  id="gate-postalCode"
                  label="Code postal"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="1000"
                  value={form.postalCode}
                  onChange={(v) => update("postalCode", v)}
                  error={errors.postalCode}
                />
                <Field
                  id="gate-birthDate"
                  label="Date de naissance"
                  type="date"
                  autoComplete="bday"
                  value={form.birthDate}
                  onChange={(v) => update("birthDate", v)}
                  error={errors.birthDate}
                />
              </div>

              {/* Fournisseur actuel */}
              <div className="space-y-1.5">
                <Label htmlFor="gate-supplier">Nom de l{"'"}actuel fournisseur</Label>
                <Select value={form.currentSupplier} onValueChange={(v) => update("currentSupplier", v)}>
                  <SelectTrigger id="gate-supplier" aria-invalid={!!errors.currentSupplier}>
                    <SelectValue placeholder="Sélectionnez votre fournisseur" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPLIERS.map((supplier) => (
                      <SelectItem key={supplier} value={supplier}>
                        {supplier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.currentSupplier && (
                  <p className="text-xs text-destructive">{errors.currentSupplier}</p>
                )}
              </div>

              {/* Type de compteur */}
              <div className="space-y-2">
                <Label>Type de compteur</Label>
                <RadioGroup value={form.meterType} onValueChange={(v) => update("meterType", v)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Digital" id="gate-meter-digital" />
                    <Label htmlFor="gate-meter-digital" className="cursor-pointer font-normal">
                      Digital
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Analogique" id="gate-meter-analog" />
                    <Label htmlFor="gate-meter-analog" className="cursor-pointer font-normal">
                      Analogique
                    </Label>
                  </div>
                </RadioGroup>
                {errors.meterType && (
                  <p className="text-xs text-destructive">{errors.meterType}</p>
                )}
              </div>

              {/* Formule (affichée que si un type de compteur est sélectionné) */}
              {form.meterType && (
                <div className="space-y-2">
                  <Label>Formule</Label>
                  <RadioGroup value={form.formula} onValueChange={(v) => update("formula", v)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Monohoraire" id="gate-formula-mono" />
                      <Label htmlFor="gate-formula-mono" className="cursor-pointer font-normal">
                        Monohoraire
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Bihoraire" id="gate-formula-bi" />
                      <Label htmlFor="gate-formula-bi" className="cursor-pointer font-normal">
                        Bihoraire
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.formula && (
                    <p className="text-xs text-destructive">{errors.formula}</p>
                  )}
                </div>
              )}

              {/* Case à cocher compteur exclusif nuit */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gate-exclusive-night"
                  checked={form.exclusiveNightMeter}
                  onCheckedChange={(v) => update("exclusiveNightMeter", v === true)}
                />
                <Label htmlFor="gate-exclusive-night" className="cursor-pointer font-normal">
                  J{"'"}ai un compteur exclusif nuit
                </Label>
              </div>

              <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
                {loading ? <Loader2 className="size-5 animate-spin" /> : null}
                {loading ? "Calcul en cours..." : "Révéler mon économie"}
              </Button>

              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5 shrink-0" />
                Vos données sont utilisées uniquement pour vous proposer la meilleure offre
              </p>
            </form>
          </>
        ) : (
          <div className="space-y-4 py-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
                <Check className="size-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Voici vos économies potentielles</h2>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Économie annuelle estimée</p>
              <p className="text-4xl font-extrabold text-primary">{formatEUR(estimate.yearlySavings)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {Math.round(estimate.yearlySavings / 12)} EUR/mois d{"'"}économies
              </p>
            </div>

            <div className="rounded-lg border-2 border-green-500 bg-green-50 p-6">
              <p className="text-center text-base leading-relaxed text-green-900 font-bold">
                ✓ Bravo, un conseiller vous contactera sous peu pour vous aider à réaliser cette économie avec le meilleur tarif
              </p>
            </div>

            <Button
              size="lg"
              className="w-full gap-2"
              onClick={() => {
                handleClose()
                window.location.hash = "#calculateur"
              }}
            >
              <Phone className="size-5" />
              Parler à un conseiller maintenant
            </Button>

            <Button variant="outline" size="sm" className="w-full" onClick={handleClose}>
              <X className="size-4 mr-2" />
              Fermer
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

type FieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: string
  inputMode?: "text" | "email" | "tel" | "numeric"
  autoComplete?: string
  placeholder?: string
}

function Field({ id, label, value, onChange, error, type = "text", inputMode, autoComplete, placeholder }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
