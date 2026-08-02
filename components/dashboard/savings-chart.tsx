'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Loader2 as Loader2Icon, AlertCircle as AlertCircleIcon } from 'lucide-react'

interface DailySaving {
  recorded_date: string
  savings_amount: number
}

export function SavingsChart() {
  const [data, setData] = useState<DailySaving[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSavingsData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/dashboard/savings')

        if (!response.ok) {
          if (response.status === 401) {
            setError('Authentification requise')
          } else {
            setError('Erreur lors du chargement des données')
          }
          return
        }

        const savingsData = await response.json()
        setData(savingsData || [])
      } catch (err) {
        console.error('Fetch error:', err)
        setError('Erreur lors du chargement')
      } finally {
        setLoading(false)
      }
    }

    fetchSavingsData()
  }, [])

  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Économies (30 derniers jours)</h3>
        <div className="flex items-center justify-center h-64">
          <Loader2Icon className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Économies (30 derniers jours)</h3>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-3">
            <AlertCircleIcon className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Économies (30 derniers jours)</h3>
      
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-64 rounded-lg border border-dashed border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">Aucune donnée disponible</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="recorded_date" 
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
              formatter={(value) => [`${Number(value).toFixed(2)}€`, 'Économies']}
            />
            <Line
              type="monotone"
              dataKey="savings_amount"
              stroke="hsl(142.1 76.2% 36.3%)"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
