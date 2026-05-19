/**
 * Motion-related browser utilities.
 *
 * - prefersReducedMotion(): SSR-safe check
 * - debounce(): minimal debounce that supports cancel()
 */

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait: number,
): T & { cancel: () => void } {
  let t: ReturnType<typeof setTimeout> | null = null
  const wrapped = ((...args: Parameters<T>) => {
    if (t) clearTimeout(t)
    t = setTimeout(() => {
      t = null
      fn(...args)
    }, wait)
  }) as T & { cancel: () => void }
  wrapped.cancel = () => {
    if (t) {
      clearTimeout(t)
      t = null
    }
  }
  return wrapped
}
