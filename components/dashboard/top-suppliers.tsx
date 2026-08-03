'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Loader2, AlertCircle } from 'lucide-react'

interface SupplierData {
  supplier_name: string
  interaction_count: number
}

interface TopSuppliersProps {
  userId: string
}

export function TopSuppliers({ userId }: TopSuppliersProps) {
  const [data, setData] = useState<SupplierData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/dashboard/suppliers?userId=${userId}`)

        if (!response.ok) {
          if (response.status === 401) {
            setError('Authentification requise')
          } else {
            setError('Erreur lors du chargement')
          }
          return
        }

        const suppliersData = await response.json()
        setData(suppliersData || [])
      } catch (err) {
        console.error('Fetch error:', err)
        setError('Erreur lors du chargement')
      } finally {
        setLoading(false)
      }
    }

    fetchSuppliers()
  }, [])

  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Fournisseurs Consultés</h3>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Fournisseurs Consultés</h3>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Fournisseurs Consultés</h3>
      
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-64 rounded-lg border border-dashed border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">Aucune donnée disponible</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="supplier_name" 
              stroke="var(--muted-foreground)"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="var(--muted-foreground)"
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
              }}
              formatter={(value) => [value, 'Consultations']}
            />
            <Bar
              dataKey="interaction_count"
              fill="hsl(217.2 91.2% 59.8%)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
