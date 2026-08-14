'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Download, FilePlus2, Filter, Pencil, Search, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
type Product = { product: string; productName: string; ean: string; previousProvider: string }
type Contract = {
  id: string; clientType: string; language: string; firstName: string; lastName: string; birthDate: string; housing: string
  email: string; mobile: string; landline: string; iban: string; date: string; source: string; agent: string; employee: string
  contractNumber: string; callId: string; status: string; monthly: string; consumption: string; contractType: string
  dayConsumption: string; nightConsumption: string; gasConsumption: string; solarPanels: string; address: string; number: string
  box: string; postalCode: string; city: string; products: Product[]; notes: string; createdAt: string
}
const emptyProduct: Product = { product: '', productName: '', ean: '', previousProvider: '' }
const emptyForm: Omit<Contract, 'id' | 'createdAt'> = {
  clientType: '', language: '', firstName: '', lastName: '', birthDate: '', housing: '', email: '', mobile: '', landline: '', iban: '', date: '', source: 'Site web', agent: '', employee: 'Énergie', contractNumber: '', callId: '', status: 'Encodé', monthly: '', consumption: '', contractType: '', dayConsumption: '', nightConsumption: '', gasConsumption: '', solarPanels: '', address: '', number: '', box: '', postalCode: '', city: '', products: [{ ...emptyProduct }], notes: ''
}
const statuses = ['Encodé', 'En attente', 'Invalide', 'En attente welcome call', 'En attente audio']
const SelectField = ({ label, value, onChange, options, required }: { label: string; value: string; onChange: (value: string) => void; options: string[]; required?: boolean }) => <div className="space-y-2"><Label>{label}{required && ' *'}</Label><select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={value} onChange={(e) => onChange(e.target.value)} required={required}><option value="">-- Sélectionner --</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>
const TextField = ({ label, value, onChange, required, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string }) => <div className="space-y-2"><Label>{label}{required && ' *'}</Label><Input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} /></div>

function fromRow(row: any): Contract {
  const energy = row.energy_contract_energy?.[0] || {}
  return { id: row.id, clientType: row.client_type || '', language: row.language || '', firstName: row.first_name || '', lastName: row.last_name || '', birthDate: row.birth_date || '', housing: row.housing_type || '', email: row.email || '', mobile: row.mobile_phone || '', landline: row.landline_phone || '', iban: row.iban || '', date: row.contract_date || '', source: row.source || '', agent: row.agent || '', employee: row.employee || '', contractNumber: row.contract_number || '', callId: row.call_id || '', status: row.status || '', monthly: energy.announced_monthly_amount?.toString() || '', consumption: energy.consumption || '', contractType: energy.contract_type || '', dayConsumption: energy.electricity_day_kwh?.toString() || '', nightConsumption: energy.electricity_night_kwh?.toString() || '', gasConsumption: energy.gas_kwh?.toString() || '', solarPanels: energy.solar_panels || '', address: row.address || '', number: row.house_number || '', box: row.box || '', postalCode: row.postal_code || '', city: row.city || '', products: (row.energy_contract_products || []).map((p: any) => ({ product: p.product || '', productName: p.product_name || '', ean: p.ean || '', previousProvider: p.previous_supplier || '' })), notes: row.notes || '', createdAt: row.created_at }
}

const numberOrNull = (value: string) => value === '' ? null : Number(value)

export function ContractEncodingDashboard() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    let active = true
    async function loadContracts() {
      setLoading(true)
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) { if (active) setLoading(false); return }
      const { data, error: queryError } = await supabase.from('energy_contracts').select('*, energy_contract_energy(*), energy_contract_products(*)').eq('user_id', user.id).order('created_at', { ascending: false })
      if (queryError) { if (active) setError(queryError.message) } else if (active) setContracts((data || []).map(fromRow))
      if (active) setLoading(false)
    }
    loadContracts()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) router.replace('/auth/login?redirectTo=%2Fdashboard%2Fencodage')
    })
    return () => { active = false; subscription.unsubscribe() }
  }, [router])
  const filtered = useMemo(() => contracts.filter((item) => `${item.firstName} ${item.lastName} ${item.email} ${item.products.map((p) => p.ean).join(' ')} ${item.city}`.toLowerCase().includes(query.toLowerCase()) && (statusFilter === 'all' || item.status === statusFilter)), [contracts, query, statusFilter])
  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => setForm((current) => ({ ...current, [key]: value }))
  const updateProduct = (index: number, key: keyof Product, value: string) => setForm((current) => ({ ...current, products: current.products.map((product, i) => i === index ? { ...product, [key]: value } : product) }))
  const reset = () => { setForm(emptyForm); setEditingId(null); setShowForm(false) }
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError(null)
    if (!form.firstName || !form.lastName || !form.email || !form.clientType || !form.products[0]?.productName) return
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSaving(false); router.replace('/auth/login?redirectTo=%2Fdashboard%2Fencodage'); return }
    const contractRow = { user_id: user.id, client_type: form.clientType, language: form.language || null, first_name: form.firstName, last_name: form.lastName, birth_date: form.birthDate || null, housing_type: form.housing || null, email: form.email, mobile_phone: form.mobile || null, landline_phone: form.landline || null, iban: form.iban || null, source: form.source || null, agent: form.agent || null, employee: form.employee || null, contract_number: form.contractNumber || null, call_id: form.callId || null, status: form.status, notes: form.notes || null, address: form.address || null, house_number: form.number || null, box: form.box || null, postal_code: form.postalCode || null, city: form.city || null, updated_at: new Date().toISOString() }
    const result = editingId ? await supabase.from('energy_contracts').update(contractRow).eq('id', editingId).eq('user_id', user.id).select().single() : await supabase.from('energy_contracts').insert(contractRow).select().single()
    if (result.error || !result.data) { setError(result.error?.message || 'Impossible d’enregistrer le contrat.'); setSaving(false); return }
    const id = result.data.id
    const energyRow = { contract_id: id, announced_monthly_amount: numberOrNull(form.monthly), consumption: form.consumption || null, contract_type: form.contractType || null, electricity_day_kwh: numberOrNull(form.dayConsumption), electricity_night_kwh: numberOrNull(form.nightConsumption), gas_kwh: numberOrNull(form.gasConsumption), solar_panels: form.solarPanels || null, updated_at: new Date().toISOString() }
    const energyResult = editingId ? await supabase.from('energy_contract_energy').upsert(energyRow, { onConflict: 'contract_id' }) : await supabase.from('energy_contract_energy').insert(energyRow)
    if (editingId) await supabase.from('energy_contract_products').delete().eq('contract_id', id)
    const productsResult = await supabase.from('energy_contract_products').insert(form.products.filter((p) => p.productName || p.ean || p.previousProvider).map((p) => ({ contract_id: id, product: p.product || null, product_name: p.productName, ean: p.ean, previous_supplier: p.previousProvider || '' })))
    if (energyResult.error || productsResult.error) { setError(energyResult.error?.message || productsResult.error?.message || 'Erreur lors de l’enregistrement des détails.'); setSaving(false); return }
    const saved = fromRow({ ...result.data, energy_contract_energy: [energyRow], energy_contract_products: form.products.map((p) => ({ product: p.product, product_name: p.productName, ean: p.ean, previous_supplier: p.previousProvider })) })
    setContracts((items) => editingId ? items.map((item) => item.id === id ? saved : item) : [saved, ...items]); setSaving(false); reset()
  }
  const edit = (item: Contract) => { const { id, createdAt, ...values } = item; setForm({ ...emptyForm, ...values, products: values.products?.length ? values.products : [{ ...emptyProduct }] }); setEditingId(id); setShowForm(true) }
  const remove = async (id: string) => { setError(null); const { error: deleteError } = await supabase.from('energy_contracts').delete().eq('id', id); if (deleteError) setError(deleteError.message); else setContracts((items) => items.filter((item) => item.id !== id)) }
  const exportCsv = () => { const rows = filtered.map((item) => [item.firstName + ' ' + item.lastName, item.email, item.city, item.products[0]?.ean || '', item.status]); const csv = [['Client', 'Email', 'Ville', 'EAN', 'Statut'], ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(';')).join('\n'); const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); const link = document.createElement('a'); link.href = url; link.download = 'encodages-energie.csv'; link.click(); URL.revokeObjectURL(url) }
  const stat = (status?: string) => contracts.filter((item) => !status || item.status === status).length
  return <div className="space-y-6">
    {error && <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
    {loading && <div className="rounded-md border bg-card px-4 py-3 text-sm text-muted-foreground">Chargement des contrats depuis Supabase…</div>}
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-5 md:flex-row md:items-center md:justify-between"><div><p className="text-sm text-muted-foreground">Production énergie</p><h1 className="text-2xl font-bold">Encodage des contrats</h1></div><Button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true) }}><FilePlus2 className="mr-2 size-4" />Nouvel encodage</Button></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Total', contracts.length], ['Encodés', stat('Encodé')], ['En attente', stat('En attente')], ['Invalides', stat('Invalide')]].map(([label, value]) => <Card key={String(label)}><CardContent className="p-5"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></CardContent></Card>)}</div>
    {showForm && <Card><CardHeader className="flex flex-row items-center justify-between"><CardTitle>{editingId ? 'Modifier le contrat' : 'Quality Control — nouvel encodage'}</CardTitle><Button variant="ghost" size="icon" onClick={reset} aria-label="Fermer"><X className="size-4" /></Button></CardHeader><CardContent><form onSubmit={submit} className="space-y-8">
      <section className="space-y-4"><h2 className="border-b pb-2 text-lg font-semibold">Informations client</h2><div className="grid gap-4 md:grid-cols-3"><SelectField label="Type de client" value={form.clientType} onChange={(v) => update('clientType', v)} options={['Particulier', 'Professionnel']} required /><SelectField label="Langue" value={form.language} onChange={(v) => update('language', v)} options={['Français', 'Néerlandais', 'Anglais']} required /><TextField label="Prénom" value={form.firstName} onChange={(v) => update('firstName', v)} required /><TextField label="Nom de famille" value={form.lastName} onChange={(v) => update('lastName', v)} required /><TextField label="Date de naissance" type="date" value={form.birthDate} onChange={(v) => update('birthDate', v)} /><SelectField label="Logement" value={form.housing} onChange={(v) => update('housing', v)} options={['Propriétaire', 'Locataire']} /><TextField label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} required /><TextField label="Téléphone portable" value={form.mobile} onChange={(v) => update('mobile', v)} required /><TextField label="Téléphone fixe" value={form.landline} onChange={(v) => update('landline', v)} /><TextField label="IBAN" value={form.iban} onChange={(v) => update('iban', v)} /><TextField label="Date" type="datetime-local" value={form.date} onChange={(v) => update('date', v)} /><SelectField label="Agent" value={form.agent} onChange={(v) => update('agent', v)} options={['Agent principal', 'Agent secondaire']} /></div></section>
      <section className="space-y-4"><h2 className="border-b pb-2 text-lg font-semibold">Informations énergétiques</h2><div className="grid gap-4 md:grid-cols-3"><TextField label="Mensualité annoncée (€ / mois)" type="number" value={form.monthly} onChange={(v) => update('monthly', v)} /><SelectField label="Consommation" value={form.consumption} onChange={(v) => update('consumption', v)} options={['Faible', 'Moyenne', 'Élevée']} /><SelectField label="Type de contrat" value={form.contractType} onChange={(v) => update('contractType', v)} options={['Fixe', 'Variable', 'Dynamique']} /><TextField label="Consommation élec jour (kWh)" type="number" value={form.dayConsumption} onChange={(v) => update('dayConsumption', v)} /><TextField label="Consommation élec nuit (kWh)" type="number" value={form.nightConsumption} onChange={(v) => update('nightConsumption', v)} /><TextField label="Consommation gaz (kWh)" type="number" value={form.gasConsumption} onChange={(v) => update('gasConsumption', v)} /><SelectField label="Panneaux solaires" value={form.solarPanels} onChange={(v) => update('solarPanels', v)} options={['Oui', 'Non']} /></div></section>
      <section className="space-y-4"><h2 className="border-b pb-2 text-lg font-semibold">Informations de localisation</h2><div className="grid gap-4 md:grid-cols-5"><TextField label="Adresse" value={form.address} onChange={(v) => update('address', v)} required /><TextField label="N°" value={form.number} onChange={(v) => update('number', v)} required /><TextField label="Bte" value={form.box} onChange={(v) => update('box', v)} /><TextField label="Code postal" value={form.postalCode} onChange={(v) => update('postalCode', v)} required /><TextField label="Ville" value={form.city} onChange={(v) => update('city', v)} required /></div><p className="text-xs text-muted-foreground">Conseil : saisissez l’adresse complète pour retrouver rapidement les informations de localisation.</p></section>
      <section className="space-y-4"><div className="flex items-center justify-between border-b pb-2"><h2 className="text-lg font-semibold">Produits — adresse principale</h2><Button type="button" variant="outline" onClick={() => update('products', [...form.products, { ...emptyProduct }])}>Ajouter un produit</Button></div>{form.products.map((product, index) => <div key={index} className="grid gap-4 rounded-lg border bg-muted/30 p-4 md:grid-cols-4"><SelectField label="Produit" value={product.product} onChange={(v) => updateProduct(index, 'product', v)} options={['Électricité', 'Gaz', 'Électricité + gaz']} /><TextField label="Nom de produit" value={product.productName} onChange={(v) => updateProduct(index, 'productName', v)} required={index === 0} /><TextField label="Numéro EAN" value={product.ean} onChange={(v) => updateProduct(index, 'ean', v)} required={index === 0} /><TextField label="Ancien fournisseur" value={product.previousProvider} onChange={(v) => updateProduct(index, 'previousProvider', v)} /><Button type="button" variant="ghost" className="md:col-start-4" onClick={() => update('products', form.products.filter((_, i) => i !== index))} disabled={form.products.length === 1}>Supprimer ce produit</Button></div>)}</section>
      <section className="space-y-4"><h2 className="border-b pb-2 text-lg font-semibold">Contrat, statut et notes</h2><div className="grid gap-4 md:grid-cols-3"><TextField label="Numéro de contrat" value={form.contractNumber} onChange={(v) => update('contractNumber', v)} /><TextField label="Call ID" value={form.callId} onChange={(v) => update('callId', v)} /><SelectField label="Source" value={form.source} onChange={(v) => update('source', v)} options={['Site web', 'Allo Allo', 'Partenaire']} /><TextField label="Employé" value={form.employee} onChange={(v) => update('employee', v)} /><SelectField label="Statut" value={form.status} onChange={(v) => update('status', v)} options={statuses} /><div className="space-y-2 md:col-span-2"><Label>Commentaires / notes</Label><textarea className="min-h-24 w-full rounded-md border border-input bg-background p-3 text-sm" value={form.notes} onChange={(e) => update('notes', e.target.value)} /></div></div></section>
      <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={reset}>Annuler</Button><Button type="submit" disabled={saving}>{saving ? 'Enregistrement…' : editingId ? 'Enregistrer les modifications' : 'Enregistrer le contrat'}</Button></div>
    </form></CardContent></Card>}
    <Card><CardHeader><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><CardTitle>Quality Control List</CardTitle><div className="flex gap-2"><Button variant="outline" onClick={exportCsv}><Download className="mr-2 size-4" />Exporter CSV</Button><Button variant="outline" onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true) }}><FilePlus2 className="mr-2 size-4" />Ajouter</Button></div></div></CardHeader><CardContent className="space-y-4"><div className="flex flex-col gap-3 md:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input className="pl-9" placeholder="Rechercher client, EAN, ville..." value={query} onChange={(e) => setQuery(e.target.value)} /></div><SelectField label="Filtrer par statut" value={statusFilter} onChange={setStatusFilter} options={['all', ...statuses]} /></div><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-muted-foreground"><th className="p-3">Client</th><th className="p-3">Localisation</th><th className="p-3">Produit / EAN</th><th className="p-3">Date</th><th className="p-3">Statut</th><th className="p-3 text-right">Actions</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id} className="border-b last:border-0"><td className="p-3"><div className="font-medium">{item.firstName} {item.lastName}</div><div className="text-xs text-muted-foreground">{item.email}</div></td><td className="p-3">{item.postalCode} {item.city}</td><td className="p-3">{item.products[0]?.productName || '—'}<div className="text-xs text-muted-foreground">{item.products[0]?.ean || 'EAN non renseigné'}</div></td><td className="p-3">{new Date(item.createdAt).toLocaleDateString('fr-BE')}</td><td className="p-3"><Badge>{item.status}</Badge></td><td className="p-3 text-right"><Button variant="ghost" size="icon" onClick={() => edit(item)} aria-label="Modifier"><Pencil className="size-4" /></Button><Button variant="ghost" size="icon" onClick={() => remove(item.id)} aria-label="Supprimer"><Trash2 className="size-4" /></Button></td></tr>)}</tbody></table>{filtered.length === 0 && <p className="py-10 text-center text-muted-foreground">Aucun encodage trouvé.</p>}</div></CardContent></Card>
  </div>
}

export default ContractEncodingDashboard
