'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Heart, Bell, TrendingDown, FileText, ChevronDown, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

interface DashboardStats {
  totalFavorites: number
  activePriceAlerts: number
  totalComparisons: number
  totalInvoices: number
}

export function DashboardPopover({ userEmail }: { userEmail?: string }) {
  const [stats, setStats] = useState<DashboardStats>({
    totalFavorites: 0,
    activePriceAlerts: 0,
    totalComparisons: 0,
    totalInvoices: 0,
  })
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const supabase = createClient()

        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) return

        const userId = user.id

        // Fetch stats in parallel
        const [
          { count: favCount },
          { count: alertCount },
          { count: compCount },
          { count: invCount },
        ] = await Promise.all([
          supabase.from('user_favorites').select('id', { count: 'exact', head: true }).eq('user_id', userId),
          supabase.from('price_alerts').select('id', { count: 'exact', head: true }).eq('user_id', userId).eq('active', true),
          supabase.from('comparisons').select('id', { count: 'exact', head: true }).eq('user_id', userId),
          supabase.from('invoices').select('id', { count: 'exact', head: true }).eq('user_id', userId),
        ])

        setStats({
          totalFavorites: favCount || 0,
          activePriceAlerts: alertCount || 0,
          totalComparisons: compCount || 0,
          totalInvoices: invCount || 0,
        })
      } catch (error) {
        console.error('[v0] Error fetching dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statItems = [
    { icon: Heart, label: 'Favoris', value: stats.totalFavorites, color: 'text-red-600', bgColor: 'bg-red-50' },
    { icon: Bell, label: 'Alertes', value: stats.activePriceAlerts, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { icon: TrendingDown, label: 'Comparaisons', value: stats.totalComparisons, color: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: FileText, label: 'Factures', value: stats.totalInvoices, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  ]

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/50 transition text-sm min-w-0"
      >
        <div className="flex flex-col items-end min-w-0">
          <span className="text-xs text-muted-foreground truncate max-w-[120px]">{userEmail}</span>
          <span className="text-xs font-medium text-foreground">Dashboard</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 w-80 mt-2 rounded-2xl border border-border bg-card p-4 shadow-xl"
          >
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {statItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="rounded-lg border border-border p-3 hover:bg-accent/50 transition">
                        <div className={`${item.bgColor} rounded-lg p-2 mb-2 w-fit`}>
                          <Icon className={`h-4 w-4 ${item.color}`} />
                        </div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-lg font-bold text-foreground">{item.value}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="flex gap-2 border-t border-border pt-3">
                  <Button asChild size="sm" variant="outline" className="flex-1">
                    <a href="/dashboard">Voir plus</a>
                  </Button>
                  <Button asChild size="sm" variant="ghost" className="flex-1">
                    <a href="/auth/logout">Déconnexion</a>
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
