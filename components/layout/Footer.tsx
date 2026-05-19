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
            <p className="mb-4 font-code text-[10px] tracking-[0.3em] text-[#c8c8d2] uppercase">
              // Connect with me
            </p>
            <ClipPathLinks />
          </div>
        )}

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className={`font-code text-[10px] tracking-widest ${isBeyond ? 'text-[#8a8a94]' : 'text-[rgba(224,224,224,0.30)]'}`}>
            &copy; {year} RIJUYAN AHMED. ALL RIGHTS RESERVED.
          </p>
          <p className={`font-code text-[10px] tracking-widest ${isBeyond ? 'text-[#6a6a74]' : 'text-[rgba(224,224,224,0.20)]'}`}>
            {isBeyond ? 'THE WANDERER WORLD' : 'THE ARCHITECT WORLD'}
          </p>
        </div>
      </div>
    </footer>
  )
}
