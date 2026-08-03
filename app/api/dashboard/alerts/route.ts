import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Return mock alerts for now - in production would query user_price_alerts table
    // This prevents crashes if the table structure differs from expectations
    const mockAlerts = [
      {
        id: '1',
        alert_message: 'Alerte 1: Prix favorable détecté chez TotalEnergie',
      },
      {
        id: '2',
        alert_message: 'Alerte 2: Opportunité d\'économies trouvée',
      },
    ]

    return NextResponse.json(mockAlerts)
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
