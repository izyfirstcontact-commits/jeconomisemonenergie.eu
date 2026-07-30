export interface PaginationParams {
  page?: number
  limit?: number
  offset?: number
  cursor?: string | null
}

export interface PaginationResult<T> {
  data: T[]
  pagination: {
    page?: number
    limit: number
    total?: number
    hasMore: boolean
    nextCursor?: string
    prevCursor?: string
  }
}

export interface CursorPaginationResult<T> {
  data: T[]
  pagination: {
    cursor: string
    limit: number
    hasMore: boolean
    nextCursor?: string
  }
}

const DEFAULT_LIMIT = 20
const MAX_LIMIT = 100

/**
 * Validate and normalize pagination parameters
 */
export function normalizePaginationParams(
  params: PaginationParams
): { limit: number; offset: number } {
  const limit = Math.min(params.limit || DEFAULT_LIMIT, MAX_LIMIT)
  const offset = params.offset || (params.page ? (params.page - 1) * limit : 0)

  return { limit, offset }
}

/**
 * Build pagination result for offset-based pagination
 */
export function buildPaginationResult<T>(
  data: T[],
  total: number,
  params: { limit: number; offset: number }
): PaginationResult<T> {
  const page = Math.floor(params.offset / params.limit) + 1

  return {
    data,
    pagination: {
      page,
      limit: params.limit,
      total,
      hasMore: params.offset + params.limit < total,
    },
  }
}

/**
 * Build pagination result for cursor-based pagination
 */
export function buildCursorPaginationResult<T>(
  data: T[],
  limit: number,
  cursorField: string = 'id'
): CursorPaginationResult<T> {
  const hasMore = data.length > limit
  const displayData = hasMore ? data.slice(0, limit) : data

  let nextCursor: string | undefined
  if (hasMore && displayData.length > 0) {
    const lastItem = displayData[displayData.length - 1] as any
    nextCursor = Buffer.from(lastItem[cursorField]).toString('base64')
  }

  return {
    data: displayData,
    pagination: {
      cursor: Buffer.from('0').toString('base64'),
      limit,
      hasMore,
      nextCursor,
    },
  }
}

/**
 * Decode cursor for pagination
 */
export function decodeCursor(cursor: string | null): string | null {
  if (!cursor) return null
  try {
    return Buffer.from(cursor, 'base64').toString('utf-8')
  } catch {
    return null
  }
}
