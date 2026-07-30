import { cacheService } from '@/lib/services/cache-service'

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number // in milliseconds
}

export const RATE_LIMITS = {
  API: { maxRequests: 100, windowMs: 60 * 1000 }, // 100 req/min
  AUTH: { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 req/15min
  UPLOAD: { maxRequests: 10, windowMs: 60 * 60 * 1000 }, // 10 req/hour
  WEBHOOK: { maxRequests: 1000, windowMs: 60 * 1000 }, // 1000 req/min (webhooks can be high volume)
} as const

/**
 * Check if a request exceeds rate limit
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetTime: number } {
  const key = `ratelimit:${identifier}`
  
  let count = cacheService.get<number>(key) || 0

  if (count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: config.windowMs,
    }
  }

  count++
  cacheService.set(key, count, Math.ceil(config.windowMs / 1000))

  return {
    allowed: true,
    remaining: config.maxRequests - count,
    resetTime: 0,
  }
}

/**
 * Add rate limit headers to response
 */
export function addRateLimitHeaders(
  response: Response,
  identifier: string,
  config: RateLimitConfig
): Response {
  const limit = checkRateLimit(identifier, config)

  response.headers.set('X-RateLimit-Limit', config.maxRequests.toString())
  response.headers.set('X-RateLimit-Remaining', limit.remaining.toString())
  response.headers.set('X-RateLimit-Reset', (Date.now() + limit.resetTime).toString())

  return response
}
