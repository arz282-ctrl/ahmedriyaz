/**
 * Hydration-safe utilities to prevent server/client mismatches
 */

/** Get static current year to avoid hydration mismatch */
export const getCurrentYear = () => 2026 // Static for consistency

/** Seeded random number generator for deterministic results */
export class SeededRandom {
  private seed: number

  constructor(seed: number = 12345) {
    this.seed = seed
  }

  next(): number {
    const x = Math.sin(this.seed++) * 10000
    return x - Math.floor(x)
  }
}

/** Initialize seeded random for Three.js scenes */
export const initializeSeededRandom = (baseSeed: number = 42): SeededRandom => {
  return new SeededRandom(baseSeed)
}
