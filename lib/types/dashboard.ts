export type Favorite = {
  id: string
  userId: string
  supplierId: string
  supplierName: string
  offerType: 'electricity' | 'gas' | 'both'
  createdAt: string
}

export type PriceAlert = {
  id: string
  userId: string
  alertName: string
  offerType: 'electricity' | 'gas' | 'both'
  maxPrice?: number
  minPrice?: number
  regions: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
  lastTriggeredAt?: string
}

export type SavedComparison = {
  id: string
  userId: string
  title: string
  monthlyConsumption: number
  consumerType: 'residential' | 'business'
  selectedSuppliers: string[]
  estimatedSavings: number
  createdAt: string
  expiresAt: string
}

export type Invoice = {
  id: string
  userId: string
  fileName: string
  fileUrl: string
  fileSize: number
  supplier: string
  monthlyConsumption: number
  invoiceAmount: number
  invoiceDate: string
  uploadedAt: string
  expiresAt: string
}

export type DashboardStats = {
  totalFavorites: number
  activeAlerts: number
  savedComparisons: number
  potentialMonthlySavings: number
  totalInvoices: number
}
