'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--void)] px-6 text-center text-[var(--silver)]">
      <div className="max-w-md">
        <p className="font-code text-xs tracking-[0.3em] text-[var(--neural)]/60">
          // SYSTEM_FAULT
        </p>
        <h1 className="mt-4 font-sans text-3xl font-light italic md:text-4xl">
          Something glitched.
        </h1>
        <p className="mt-3 font-code text-xs leading-relaxed text-[var(--silver)]/50">
          The page hit an unexpected exception. If it keeps happening, drop me a line.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-[var(--neural)] bg-[var(--neural)]/10 px-5 py-2.5 font-code text-xs tracking-widest text-[var(--neural)] transition-all hover:bg-[var(--neural)]/20"
          >
            TRY AGAIN
          </button>
          <a
            href="/"
            className="rounded-md border border-[var(--card-border)] px-5 py-2.5 font-code text-xs tracking-widest text-[var(--silver)]/70 transition-all hover:border-[var(--silver)]/30"
          >
            GO HOME
          </a>
        </div>
      </div>
    </main>
  )
}
