import { createClient } from '@/lib/supabase/server'

export async function checkAdminAccess() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { isAdmin: false, user: null }
  }

  // Check if user is admin
  const { data: adminUser, error } = await supabase
    .from('admin_users')
    .select('id, role')
    .eq('id', user.id)
    .single()

  if (error || !adminUser) {
    return { isAdmin: false, user }
  }

  return {
    isAdmin: true,
    user,
    role: adminUser.role,
  }
}

export async function checkProductionAccess() {
  const access = await checkAdminAccess()
  const allowedRoles = new Set(['super_admin', 'manager', 'commercial', 'moderator'])
  return {
    ...access,
    isProductionUser: access.isAdmin && allowedRoles.has(access.role ?? ''),
  }
}

export async function logAdminAction(
  action: string,
  tableName: string,
  recordId: string,
  changes: Record<string, any>
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { error } = await supabase.from('audit_logs').insert({
    admin_id: user.id,
    action,
    table_name: tableName,
    record_id: recordId,
    changes,
    timestamp: new Date().toISOString(),
  })

  if (error) console.error('[v0] Failed to log admin action:', error)
}
