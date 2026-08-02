'use client'

import { AnalyticsOverview } from './analytics-overview'
import { SavingsChart } from './savings-chart'
import { TopSuppliers } from './top-suppliers'
import { AlertsSection } from './alerts-section'

export function AnalyticsDashboard() {
  return (
    <div className="space-y-8">
      {/* Analytics Overview Cards */}
      <AnalyticsOverview />

      {/* Charts Row */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Savings Chart */}
        <SavingsChart />

        {/* Top Suppliers */}
        <TopSuppliers />
      </div>

      {/* Alerts Section */}
      <AlertsSection />
    </div>
  )
}
