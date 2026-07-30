'use client'

import { Invoice } from '@/lib/types/dashboard'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Trash2, Upload, Download } from 'lucide-react'

export function InvoicesSection() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/invoices')
      
      if (!response.ok) {
        throw new Error('Failed to fetch invoices')
      }

      const data = await response.json()
      setInvoices(data.invoices || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      setError(null)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('supplier', 'Engie') // TODO: Add supplier selection
      formData.append('monthlyConsumption', '150') // TODO: Add consumption input
      formData.append('invoiceAmount', '150') // TODO: Add amount input
      formData.append('invoiceDate', new Date().toISOString().split('T')[0])

      const response = await fetch('/api/invoices', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload invoice')
      }

      await fetchInvoices()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (e.target) e.target.value = ''
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette facture?')) {
      return
    }

    try {
      setError(null)
      const response = await fetch(`/api/invoices/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete invoice')
      }

      setInvoices(invoices.filter(inv => inv.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deletion failed')
    }
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Mes factures</h3>
        <div className="text-center text-muted-foreground">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Mes factures</h3>
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
          <Button
            size="sm"
            variant="outline"
            disabled={uploading}
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement
              input.click()
            }}
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Upload...' : 'Ajouter'}
          </Button>
        </label>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      {invoices.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p className="mb-2">Aucune facture uploadée</p>
          <p className="text-sm">Les factures sont conservées 1 an</p>
        </div>
      ) : (
        <div className="space-y-2">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-3 border border-border rounded hover:bg-accent/50 transition"
            >
              <div className="flex-1">
                <p className="font-medium text-sm">{invoice.fileName}</p>
                <p className="text-xs text-muted-foreground">
                  {invoice.supplier} • {(invoice.fileSize / 1024).toFixed(1)}KB • 
                  {new Date(invoice.uploadedAt).toLocaleDateString('fr-BE')}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => window.open(invoice.fileUrl, '_blank')}
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(invoice.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-xs text-muted-foreground">
        {invoices.length} facture{invoices.length !== 1 ? 's' : ''} uploadée{invoices.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
