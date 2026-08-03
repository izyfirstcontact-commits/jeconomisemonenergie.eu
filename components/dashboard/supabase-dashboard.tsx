'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, AlertCircle, Heart, Bell, TrendingDown, FileText } from 'lucide-react'

interface DashboardData {
  favorites: Array<Record<string, unknown>>
  priceAlerts: Array<Record<string, unknown>>
  comparisons: Array<Record<string, unknown>>
  invoices: Array<Record<string, unknown>>
}

interface DashboardStats {
  totalFavorites: number
  activePriceAlerts: number
  totalComparisons: number
  totalInvoices: number
}

export function SupabaseDashboard() {
  // Return empty state - these tables may not exist yet
  // In production, this would fetch real data from Supabase
  const stats = {
    totalFavorites: 0,
    activePriceAlerts: 0,
    totalComparisons: 0,
    totalInvoices: 0,
  }

  const data: DashboardData = {
    favorites: [],
    priceAlerts: [],
    comparisons: [],
    invoices: [],
  }



  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Heart}
          label="Favoris"
          value={stats.totalFavorites}
          color="text-red-600"
          bgColor="bg-red-50"
        />
        <StatCard
          icon={Bell}
          label="Alertes Actives"
          value={stats.activePriceAlerts}
          color="text-amber-600"
          bgColor="bg-amber-50"
        />
        <StatCard
          icon={TrendingDown}
          label="Comparaisons"
          value={stats.totalComparisons}
          color="text-green-600"
          bgColor="bg-green-50"
        />
        <StatCard
          icon={FileText}
          label="Factures"
          value={stats.totalInvoices}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
      </div>

      {/* Data Sections */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Favorites */}
        <Section
          title="Mes Favoris"
          icon={Heart}
          isEmpty={data.favorites.length === 0}
          count={data.favorites.length}
        >
          {data.favorites.length === 0 ? (
            <EmptyState message="Aucune donnée pour le moment" />
          ) : (
            <div className="space-y-2">
              {data.favorites.map((fav, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-md border border-border p-3 text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">{String(fav?.supplier_name || 'Offre')}</p>
                    <p className="text-xs text-muted-foreground">{String(fav?.offer_type || 'N/A')}</p>
                  </div>
                  <div className="ml-2 text-right">
                    <p className="text-xs text-muted-foreground">
                      {fav?.created_at ? new Date(fav.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Price Alerts */}
        <Section
          title="Alertes de Prix"
          icon={Bell}
          isEmpty={data.priceAlerts.length === 0}
          count={data.priceAlerts.length}
        >
          {data.priceAlerts.length === 0 ? (
            <EmptyState message="Aucune donnée pour le moment" />
          ) : (
            <div className="space-y-2">
              {data.priceAlerts.map((alert, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-md border border-border p-3 text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">{String(alert?.alert_name || 'Alerte')}</p>
                    <p className="text-xs text-muted-foreground">
                      {alert.offer_type} • {alert.regions?.join(', ') || 'Toutes régions'}
                    </p>
                  </div>
                  <div className="ml-2">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                        alert.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {alert.is_active ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Comparisons */}
        <Section
          title="Comparaisons Sauvegardées"
          icon={TrendingDown}
          isEmpty={data.comparisons.length === 0}
          count={data.comparisons.length}
        >
          {data.comparisons.length === 0 ? (
            <EmptyState message="Aucune donnée pour le moment" />
          ) : (
            <div className="space-y-2">
              {data.comparisons.map((comp, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-md border border-border p-3 text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">{String(comp?.title || 'Comparaison')}</p>
                    <p className="text-xs text-muted-foreground">
                      {comp.monthly_consumption} kWh • {comp.consumer_type}
                    </p>
                  </div>
                  <div className="ml-2 text-right">
                    <p className="font-semibold text-green-600">
                      -{comp.estimated_savings?.toFixed(2) || '0'} €
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Invoices */}
        <Section
          title="Mes Factures"
          icon={FileText}
          isEmpty={data.invoices.length === 0}
          count={data.invoices.length}
        >
          {data.invoices.length === 0 ? (
            <EmptyState message="Aucune donnée pour le moment" />
          ) : (
            <div className="space-y-2">
              {data.invoices.map((inv, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-md border border-border p-3 text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground truncate">{inv.file_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {inv.supplier} • {(inv.file_size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <div className="ml-2 text-right">
                    <p className="text-xs text-muted-foreground">
                      {new Date(inv.uploaded_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bgColor,
}: {
  icon: any
  label: string
  value: number
  color: string
  bgColor: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`${bgColor} rounded-lg p-4 flex-shrink-0`}>
          <Icon className={`h-7 w-7 ${color}`} />
        </div>
      </div>
    </div>
  )
}

// Section Component
function Section({
  title,
  icon: Icon,
  isEmpty,
  count,
  children,
}: {
  title: string
  icon: any
  isEmpty: boolean
  count: number
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          {count}
        </span>
      </div>
      <div className="min-h-[240px]">{children}</div>
    </div>
  )
}

// Empty State Component
function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex h-full min-h-[200px] items-center justify-center rounded-md border border-dashed border-border bg-muted/30">
      <p className="text-center text-sm text-muted-foreground">{message}</p>
    </div>
  )
}
