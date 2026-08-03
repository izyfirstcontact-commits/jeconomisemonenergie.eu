'use client'

import { AnalyticsOverview } from './analytics-overview'
import { SavingsChart } from './savings-chart'
import { TopSuppliers } from './top-suppliers'
import { AlertsSection } from './alerts-section'

interface AnalyticsDashboardProps {
  userId: string
}

export function AnalyticsDashboard({ userId }: AnalyticsDashboardProps) {
  return (
    <div className="space-y-8">
      {/* Analytics Overview Cards */}
      <AnalyticsOverview userId={userId} />

      {/* Charts Row */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Savings Chart */}
        <SavingsChart userId={userId} />

        {/* Top Suppliers */}
        <TopSuppliers userId={userId} />
      </div>

      {/* Alerts Section */}
      <AlertsSection userId={userId} />
    </div>
  )
}
