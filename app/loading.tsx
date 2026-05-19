export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--void)] text-[var(--silver)]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <span className="absolute inset-0 rounded-full border border-[var(--neural)]/20" />
          <span className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-[var(--neural)]" />
        </div>
        <p className="font-code text-[10px] tracking-[0.3em] text-[var(--silver)]/40">
          LOADING
        </p>
      </div>
    </main>
  )
}
