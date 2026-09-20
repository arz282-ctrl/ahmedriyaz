'use client'

import Link from 'next/link'

/**
 * Mobile-only bottom bar. Desktop already carries the nav CTA, so this is
 * hidden from `md` up. Respects the iOS home-indicator inset.
 */
export default function StickyMobileCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[120] border-t border-white/10 bg-[rgba(3,6,8,0.92)] px-4 py-3 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <Link
        href="/start"
        className="flex w-full items-center justify-center gap-2 rounded-full border border-[rgba(74,222,128,0.35)] bg-[rgba(74,222,128,0.1)] px-5 py-3 font-code text-xs tracking-[0.18em] text-[#4ade80]"
      >
        TALK TO AHMED
        <span aria-hidden>→</span>
      </Link>
    </div>
  )
}
