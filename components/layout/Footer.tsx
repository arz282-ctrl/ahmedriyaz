'use client'

import { usePathname } from 'next/navigation'
import { getCurrentYear } from '@/lib/hydration-utils'
import { ClipPathLinks } from '@/components/ui/clip-path-links'

export default function Footer() {
  const pathname = usePathname()
  const isBeyond = pathname.startsWith('/beyond')
  const year = getCurrentYear()

  return (
    <footer
      className={`px-6 py-5 md:py-6 ${
        isBeyond
          ? 'bg-[var(--void)]'
          : 'border-t-[0.5px] border-white/5 bg-[var(--void)]'
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {isBeyond && (
          <div className="mb-8 md:mb-10">
            <p className="mb-4 font-code text-[11px] tracking-[0.3em] text-[#c8c8d2] uppercase">
              // Connect with me
            </p>
            <ClipPathLinks />
          </div>
        )}

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className={`font-code text-[11px] tracking-widest ${isBeyond ? 'text-[#c8c8d2]' : 'text-[#c5c8c8]'}`}>
            &copy; {year} AHMED RIYAZ. ALL RIGHTS RESERVED.
          </p>
          <p className="font-code text-[11px] tracking-widest text-[#b7bbbb]">
            {isBeyond ? 'THE WANDERER WORLD' : 'THE ARCHITECT WORLD'}
          </p>
        </div>
      </div>
    </footer>
  )
}
