import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--void)] px-6 text-center text-[var(--silver)]">
      <div className="max-w-md">
        <p className="font-code text-xs tracking-[0.3em] text-[var(--neural)]/60">
          // SIGNAL_LOST
        </p>
        <h1 className="mt-4 font-sans text-5xl font-light italic md:text-7xl">404</h1>
        <p className="mt-3 font-code text-xs leading-relaxed text-[var(--silver)]/50">
          This route doesn&apos;t exist. The wanderer must have taken a wrong turn.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-md border border-[var(--neural)] bg-[var(--neural)]/10 px-5 py-2.5 font-code text-xs tracking-widest text-[var(--neural)] transition-all hover:bg-[var(--neural)]/20"
          >
            ARCHITECT
          </Link>
          <Link
            href="/beyond"
            className="rounded-md border border-[var(--amber-light)]/40 px-5 py-2.5 font-code text-xs tracking-widest text-[var(--amber-light)]/80 transition-all hover:border-[var(--amber-light)]"
          >
            WANDERER
          </Link>
        </div>
      </div>
    </main>
  )
}
