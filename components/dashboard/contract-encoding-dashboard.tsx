'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Download, FilePlus2, Filter, Pencil, Search, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

const STORAGE_KEY = 'energy-contract-encodings'
type Contract = { id: string; clientType: string; firstName: string; lastName: string; email: string; phone: string; address: string; postalCode: string; city: string; product: string; provider: string; ean: string; contractNumber: string; source: string; employee: string; agent: string; status: string; createdAt: string; notes: string }
const emptyForm: Omit<Contract, 'id' | 'createdAt'> = { clientType: '', firstName: '', lastName: '', email: '', phone: '', address: '', postalCode: '', city: '', product: '', provider: '', ean: '', contractNumber: '', source: 'Site web', employee: 'Énergie', agent: '', status: 'Encodé', notes: '' }

export function ContractEncodingDashboard() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => { try { setContracts(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')) } catch { setContracts([]) } }, [])
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(contracts)) }, [contracts])

  const filtered = useMemo(() => contracts.filter((item) => {
    const text = `${item.firstName} ${item.lastName} ${item.email} ${item.ean} ${item.provider}`.toLowerCase()
    return text.includes(query.toLowerCase()) && (statusFilter === 'all' || item.status === statusFilter)
  }), [contracts, query, statusFilter])

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }))
  const reset = () => { setForm(emptyForm); setEditingId(null); setShowForm(false) }
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!form.firstName || !form.lastName || !form.email || !form.clientType || !form.product) return
    if (editingId) setContracts((items) => items.map((item) => item.id === editingId ? { ...item, ...form } : item))
    else setContracts((items) => [{ ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...items])
    reset()
  }
  const edit = (item: Contract) => { const { id, createdAt, ...values } = item; setForm(values); setEditingId(id); setShowForm(true) }
  const remove = (id: string) => setContracts((items) => items.filter((item) => item.id !== id))
  const exportCsv = () => {
    const headers = ['Date', 'Client', 'Email', 'Produit', 'Fournisseur', 'EAN', 'Statut']
    const rows = filtered.map((item) => [new Date(item.createdAt).toLocaleDateString('fr-BE'), `${item.firstName} ${item.lastName}`, item.email, item.product, item.provider, item.ean, item.status])
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(';')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); const link = document.createElement('a'); link.href = url; link.download = 'encodages-energie.csv'; link.click(); URL.revokeObjectURL(url)
  }
  const stat = (status?: string) => contracts.filter((item) => !status || item.status === status).length

  return <div className="space-y-6">
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-5 md:flex-row md:items-center md:justify-between">
      <div><p className="text-sm text-muted-foreground">Production énergie</p><h1 className="text-2xl font-bold">Encodage des contrats</h1></div>
      <Button onClick={() => { setEditingId(null); setForm(emptyForm); setShowForm(true) }}><FilePlus2 className="mr-2 size-4" />Nouvel encodage</Button>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Total', contracts.length], ['Encodés', stat('Encodé')], ['En attente', stat('En attente')], ['Invalides', stat('Invalide')]].map(([label, value]) => <Card key={String(label)}><CardContent className="p-5"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></CardContent></Card>)}</div>
    {showForm && <Card><CardHeader className="flex flex-row items-center justify-between"><CardTitle>{editingId ? 'Modifier le contrat' : 'Quality Control — nouvel encodage'}</CardTitle><Button variant="ghost" size="icon" onClick={reset} aria-label="Fermer"><X className="size-4" /></Button></CardHeader><CardContent><form onSubmit={submit} className="space-y-6">
      <section className="space-y-4"><h2 className="border-b pb-2 text-lg font-semibold">Informations client</h2><div className="grid gap-4 md:grid-cols-3">{[['clientType','Type de client'],['firstName','Prénom'],['lastName','Nom de famille'],['email','Email'],['phone','Téléphone portable'],['agent','Agent']].map(([key,label]) => <div key={key} className="space-y-2"><Label htmlFor={key}>{label}{['clientType','firstName','lastName','email'].includes(key) && ' *'}</Label>{key === 'clientType' || key === 'agent' ? <Select value={form[key as keyof typeof form]} onValueChange={(v) => update(key as keyof typeof form, v)}><SelectTrigger id={key}><SelectValue placeholder="Sélectionner" /></SelectTrigger><SelectContent><SelectItem value="Particulier">Particulier</SelectItem><SelectItem value="Professionnel">Professionnel</SelectItem><SelectItem value="Équipe énergie">Équipe énergie</SelectItem></SelectContent></Select> : <Input id={key} value={form[key as keyof typeof form]} onChange={(e) => update(key as keyof typeof form, e.target.value)} required={['firstName','lastName','email'].includes(key)} />}</div>)}</div></section>
      <section className="space-y-4"><h2 className="border-b pb-2 text-lg font-semibold">Localisation et contrat</h2><div className="grid gap-4 md:grid-cols-3">{[['address','Adresse'],['postalCode','Code postal'],['city','Ville'],['product','Produit'],['provider','Fournisseur actuel'],['ean','Numéro EAN'],['contractNumber','Numéro de contrat'],['source','Source'],['employee','Employé']].map(([key,label]) => <div key={key} className="space-y-2"><Label htmlFor={key}>{label}</Label><Input id={key} value={form[key as keyof typeof form]} onChange={(e) => update(key as keyof typeof form, e.target.value)} required={key === 'product'} /></div>)}</div></section>
      <section className="space-y-4"><h2 className="border-b pb-2 text-lg font-semibold">Statut et notes</h2><div className="grid gap-4 md:grid-cols-3"><div className="space-y-2"><Label>Statut</Label><Select value={form.status} onValueChange={(v) => update('status', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{['Encodé','En attente','Invalide','En attente welcome call','En attente audio'].map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select></div><div className="space-y-2 md:col-span-2"><Label htmlFor="notes">Commentaires / notes</Label><Input id="notes" value={form.notes} onChange={(e) => update('notes', e.target.value)} /></div></div></section>
      <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={reset}>Annuler</Button><Button type="submit">{editingId ? 'Enregistrer les modifications' : 'Enregistrer le contrat'}</Button></div>
    </form></CardContent></Card>}
    <Card><CardHeader><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><CardTitle>Quality Control List</CardTitle><div className="flex gap-2"><Button variant="outline" onClick={exportCsv}><Download className="mr-2 size-4" />Exporter CSV</Button><Button variant="outline" onClick={() => setShowForm(true)}><FilePlus2 className="mr-2 size-4" />Ajouter</Button></div></div></CardHeader><CardContent className="space-y-4"><div className="flex flex-col gap-3 md:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input className="pl-9" placeholder="Rechercher client, EAN, fournisseur..." value={query} onChange={(e) => setQuery(e.target.value)} /></div><div className="flex items-center gap-2"><Filter className="size-4 text-muted-foreground" /><Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-48"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Tous les statuts</SelectItem>{['Encodé','En attente','Invalide','En attente welcome call','En attente audio'].map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select></div></div><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-muted-foreground"><th className="p-3">Client</th><th className="p-3">Produit</th><th className="p-3">Fournisseur</th><th className="p-3">Date</th><th className="p-3">Statut</th><th className="p-3 text-right">Actions</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id} className="border-b last:border-0"><td className="p-3"><div className="font-medium">{item.firstName} {item.lastName}</div><div className="text-xs text-muted-foreground">{item.email}</div></td><td className="p-3">{item.product}<div className="text-xs text-muted-foreground">{item.ean || 'EAN non renseigné'}</div></td><td className="p-3">{item.provider || '—'}</td><td className="p-3">{new Date(item.createdAt).toLocaleDateString('fr-BE')}</td><td className="p-3"><Badge variant={item.status === 'Invalide' ? 'destructive' : 'secondary'}>{item.status}</Badge></td><td className="p-3 text-right"><Button variant="ghost" size="icon" onClick={() => edit(item)} aria-label="Modifier"><Pencil className="size-4" /></Button><Button variant="ghost" size="icon" onClick={() => remove(item.id)} aria-label="Supprimer"><Trash2 className="size-4" /></Button></td></tr>)}{filtered.length === 0 && <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">Aucun encodage trouvé.</td></tr>}</tbody></table></div></CardContent></Card>
  </div>
}

export default ContractEncodingDashboard
