// Simple in-memory cache with TTL support
interface CacheEntry<T> {
  value: T
  expiresAt: number
}

class CacheService {
  private cache: Map<string, CacheEntry<any>> = new Map()

  /**
   * Get a value from cache
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    
    if (!entry) return null
    
    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      return null
    }
    
    return entry.value as T
  }

  /**
   * Set a value in cache with TTL (in seconds)
   */
  set<T>(key: string, value: T, ttlSeconds: number = 3600): void {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    })
  }

  /**
   * Delete a value from cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size
  }

  /**
   * Get or fetch value (with fallback function)
   */
  async getOrFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlSeconds: number = 3600
  ): Promise<T> {
    const cached = this.get<T>(key)
    
    if (cached !== null) {
      console.log(`[v0] Cache hit for key: ${key}`)
      return cached
    }

    console.log(`[v0] Cache miss for key: ${key}, fetching...`)
    const value = await fetcher()
    this.set(key, value, ttlSeconds)
    
    return value
  }
}

// Export singleton instance
export const cacheService = new CacheService()

/**
 * Cache keys for different data types
 */
export const CACHE_KEYS = {
  OFFERS: (supplierId: string) => `offers:${supplierId}`,
  USER_STATS: (userId: string) => `user-stats:${userId}`,
  PRICE_ALERTS: (userId: string) => `price-alerts:${userId}`,
  INVOICES: (userId: string) => `invoices:${userId}`,
  SYSTEM_STATS: 'system-stats',
  SUPPLIERS: 'suppliers:all',
} as const

export const CACHE_TTL = {
  SHORT: 300, // 5 minutes
  MEDIUM: 1800, // 30 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400, // 24 hours
} as const
