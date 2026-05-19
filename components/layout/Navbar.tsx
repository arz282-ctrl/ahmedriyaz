'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type MouseEvent } from 'react'
import WorldToggle from './WorldToggle'

const scrollLinks = [
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'XP', href: '#experience' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="fixed top-0 z-[100] w-full border-b border-white/5 bg-black/20 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6">
        <div className="relative flex items-center justify-between gap-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setMenuOpen(false)
            }}
            className="group font-logo text-xs tracking-[0.35em] sm:text-sm"
          >
            <span className="text-[var(--silver)] transition-colors duration-300 group-hover:text-[#7dd3fc]">ARZ</span><span className="text-[var(--silver)]">.DEV</span>
          </a>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 md:flex">
            {scrollLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                className="font-code text-xs tracking-widest text-[rgba(224,224,224,0.6)] transition-colors hover:text-[#4ade80]"
              >
                {l.label}
              </a>
            ))}
            <Link href="/beyond" className="font-code text-xs tracking-widest text-[rgba(125,211,252,0.7)] transition-colors hover:text-[#7dd3fc]">
              SOUL
            </Link>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
              className="font-code text-xs tracking-widest text-[rgba(224,224,224,0.6)] transition-colors hover:text-[#4ade80]"
            >
              CONTACT
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <WorldToggle />
            </div>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
              className="hidden rounded-full border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.06)] px-4 py-2 font-code text-xs text-[#4ade80] transition-all duration-500 hover:border-[rgba(74,222,128,0.6)] hover:bg-[rgba(74,222,128,0.15)] hover:shadow-[0_0_20px_rgba(74,222,128,0.15)] md:inline-flex"
            >
              HIRE ME
            </a>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-md border border-white/15 bg-black/30 px-3 py-2 font-code text-[10px] tracking-[0.18em] text-[rgba(224,224,224,0.8)] md:hidden"
            >
              {menuOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
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
              <div className="mt-3 space-y-2 rounded-xl border border-white/10 bg-[rgba(3,6,8,0.95)] p-4 backdrop-blur-xl">
                {scrollLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={(e) => scrollTo(e, l.href)}
                    className="block rounded-md border border-transparent px-3 py-2 font-code text-xs tracking-[0.14em] text-[rgba(224,224,224,0.7)] transition-colors hover:border-white/10 hover:bg-white/[0.03] hover:text-[#4ade80]"
                  >
                    {l.label}
                  </a>
                ))}
                <Link
                  href="/beyond"
                  className="block rounded-md px-3 py-2 font-code text-xs tracking-[0.14em] text-[rgba(125,211,252,0.8)]"
                >
                  SOUL
                </Link>
                <a
                  href="#contact"
                  onClick={(e) => scrollTo(e, '#contact')}
                  className="block rounded-md border border-transparent px-3 py-2 font-code text-xs tracking-[0.14em] text-[rgba(224,224,224,0.7)] transition-colors hover:border-white/10 hover:bg-white/[0.03] hover:text-[#4ade80]"
                >
                  CONTACT
                </a>
                <div className="flex items-center justify-between gap-3 pt-2">
                  <WorldToggle />
                  <a
                    href="#contact"
                    onClick={(e) => scrollTo(e, '#contact')}
                    className="rounded-full border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.06)] px-3 py-2 font-code text-[10px] tracking-[0.14em] text-[#4ade80]"
                  >
                    HIRE ME
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
