'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type MouseEvent } from 'react'
import WorldToggle from './WorldToggle'

type NavItem = { label: string; href: string; accent?: boolean }

// hrefs are real paths. Hash targets are written as `/#id` so they work from
// any route: <Link> navigates home and Next scrolls to the fragment on arrival.
const NAV: NavItem[] = [
  { label: 'WORK', href: '/work' },
  { label: 'TOOLS', href: '/tools' },
  { label: 'SERVICES', href: '/services' },
  { label: 'ABOUT', href: '/about' },
  { label: 'SOUL', href: '/beyond', accent: true },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  /**
   * Smooth-scroll only when the fragment is on the page we're already on.
   * Otherwise fall through and let <Link> navigate — the old implementation
   * called preventDefault unconditionally, so every hash link was silently
   * swallowed on any route that wasn't `/`.
   */
  const onNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, hash] = href.split('#')
    setMenuOpen(false)
    if (!hash) return
    if (pathname !== (path || '/')) return
    e.preventDefault()
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
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

  const linkClass = (accent?: boolean) =>
    `font-code text-xs tracking-widest transition-colors ${
      accent
        ? 'text-[rgba(125,211,252,0.7)] hover:text-[#7dd3fc]'
        : 'text-[rgba(224,224,224,0.6)] hover:text-[#4ade80]'
    }`

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="fixed top-0 z-[100] w-full border-b border-white/5 bg-black/20 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="group shrink-0 font-logo text-xs tracking-[0.35em] sm:text-sm">
            <span className="text-[var(--silver)] transition-colors duration-300 group-hover:text-[#7dd3fc]">ARZ</span>
            <span className="text-[var(--silver)]">.DEV</span>
          </Link>

          {/* Normal flex row, not absolute centering — four route items plus the
              toggle and CTA overflow a centered block between 768 and 1024px. */}
          <div className="hidden items-center gap-5 lg:flex">
            {NAV.map((l) => (
              <Link key={l.label} href={l.href} onClick={(e) => onNavClick(e, l.href)} className={linkClass(l.accent)}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <WorldToggle />
            </div>
            <Link
              href="/start"
              className="hidden rounded-full border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.06)] px-4 py-2 font-code text-xs text-[#4ade80] transition-all duration-500 hover:border-[rgba(74,222,128,0.6)] hover:bg-[rgba(74,222,128,0.15)] hover:shadow-[0_0_20px_rgba(74,222,128,0.15)] sm:inline-flex"
            >
              START A PROJECT
            </Link>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-md border border-white/15 bg-black/30 px-3 py-2 font-code text-[10px] tracking-[0.18em] text-[rgba(224,224,224,0.8)] lg:hidden"
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
              className="overflow-hidden lg:hidden"
            >
              <div className="mt-3 space-y-2 rounded-xl border border-white/10 bg-[rgba(3,6,8,0.95)] p-4 backdrop-blur-xl">
                {NAV.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={(e) => onNavClick(e, l.href)}
                    className={`block rounded-md border border-transparent px-3 py-2 font-code text-xs tracking-[0.14em] transition-colors hover:border-white/10 hover:bg-white/[0.03] ${
                      l.accent ? 'text-[rgba(125,211,252,0.8)]' : 'text-[rgba(224,224,224,0.7)] hover:text-[#4ade80]'
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <WorldToggle />
                  <Link
                    href="/start"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.06)] px-3 py-2 font-code text-[10px] tracking-[0.14em] text-[#4ade80]"
                  >
                    START A PROJECT
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
