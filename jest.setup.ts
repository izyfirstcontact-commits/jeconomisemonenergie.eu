import '@testing-library/jest-dom'

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'
process.env.RESEND_API_KEY = 'test-resend-key'
process.env.WEBHOOK_SECRET = 'test-webhook-secret'
process.env.CRON_SECRET = 'test-cron-secret'
