/**
 * Utility function to add timeout to async operations
 * @param promise - The promise to timeout
 * @param ms - Timeout in milliseconds
 * @returns Promise that rejects after timeout
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  ms: number = 10000
): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms)
  )
  return Promise.race([promise, timeout])
}

/**
 * Safe API response wrapper
 * Always returns 200 with structured response to avoid Vercel retry logic
 */
export function apiResponse(data: unknown, status: 'success' | 'error' = 'success') {
  return new Response(
    JSON.stringify({
      success: status === 'success',
      data: status === 'success' ? data : null,
      error: status === 'error' ? (typeof data === 'string' ? data : 'Unknown error') : null,
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}
