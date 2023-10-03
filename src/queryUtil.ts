import type { LocationQueryValue } from 'vue-router'

export function qsList(v: string): string[] {
  return v.split(',').map((v) => v.trim())
}

export function qsWeek(v: string): number {
  const n = parseInt(v)

  if (isNaN(n) || n < 1 || n > 52) throw new Error('Invalid week number')

  return n
}

export function parseQueryParam<T>(
  p: LocationQueryValue | LocationQueryValue[],
  verify: (v: string) => T
): T | undefined {
  if (Array.isArray(p)) p = p[0]
  if (p === undefined || p === null) return undefined
  try {
    return verify(p)
  } catch {
    return undefined
  }
}
