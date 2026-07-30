export type AdminUser = {
  id: string
  role: 'super_admin' | 'moderator'
  created_at: string
}

export type UserModeration = {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string
  total_alerts: number
  total_invoices: number
  status: 'active' | 'suspended'
  reason?: string
}

export type WebhookLog = {
  id: string
  source: string
  supplier: string
  offer_id: string
  old_price: number
  new_price: number
  alerts_triggered: number
  payload: Record<string, any>
  created_at: string
}

export type AuditLog = {
  id: string
  admin_id: string
  action: string
  table_name: string
  record_id: string
  changes: Record<string, any>
  timestamp: string
}

export type SystemStats = {
  total_users: number
  total_alerts: number
  total_invoices: number
  total_comparisons: number
  active_sessions: number
  webhook_events_today: number
}
