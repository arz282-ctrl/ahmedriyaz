'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import WorldToggle from './WorldToggle'

export default function BeyondNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="fixed top-0 z-[100] w-full border-b border-[rgba(245,166,35,0.20)] bg-[#fffdf8]/80 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6">
        <div className="relative flex items-center justify-between gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2 font-code text-[10px] tracking-[0.18em] text-[#7a4a00]/70 transition-colors hover:text-[#7a4a00] sm:text-xs"
          >
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            BACK
          </Link>

          <span className="absolute left-[calc(50%-4px)] top-1/2 -translate-x-1/2 -translate-y-1/2 font-code text-[11px] font-medium tracking-[0.25em] uppercase text-[#7a4a00]">
            Archives
          </span>

          <div className="hidden items-center gap-4 md:flex">
            <a href="#soul" className="font-code text-xs tracking-widest text-[#7a4a00]/55 transition-colors hover:text-[#7a4a00]">SOUL</a>
            <a href="#gallery" className="font-code text-xs tracking-widest text-[#7a4a00]/55 transition-colors hover:text-[#7a4a00]">FRAMES</a>
            <a href="#vision" className="font-code text-xs tracking-widest text-[#7a4a00]/55 transition-colors hover:text-[#7a4a00]">VISION</a>
            <Link href="/start" className="font-code text-xs tracking-widest text-[#7a4a00]/55 transition-colors hover:text-[#7a4a00]">CONNECT</Link>
            <WorldToggle />
          </div>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label="Toggle beyond navigation menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-md border border-[#7a4a00]/30 bg-[#fff3df] px-3 py-2 font-code text-[10px] tracking-[0.18em] text-[#7a4a00] md:hidden"
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div className="mt-3 space-y-2 rounded-xl border border-[rgba(245,166,35,0.20)] bg-[#fff8ec] p-4">
                <a href="#soul" onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-2 font-code text-xs tracking-[0.14em] text-[#7a4a00]/75">SOUL</a>
                <a href="#gallery" onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-2 font-code text-xs tracking-[0.14em] text-[#7a4a00]/75">FRAMES</a>
                <a href="#vision" onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-2 font-code text-xs tracking-[0.14em] text-[#7a4a00]/75">VISION</a>
                <Link href="/start" onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-2 font-code text-xs tracking-[0.14em] text-[#7a4a00]/75">CONNECT</Link>
                <div className="px-3 py-2">
                  <WorldToggle />
                </div>
                <Link href="/" onClick={() => setMenuOpen(false)} className="mt-2 block rounded-md border border-[#7a4a00]/25 px-3 py-2 text-center font-code text-xs tracking-[0.14em] text-[#7a4a00]">
                  BACK TO ARCHITECT
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
