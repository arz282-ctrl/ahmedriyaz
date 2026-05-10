'use client'
import { motion } from 'framer-motion'
import WorldToggle from './WorldToggle'

const links = ['WORK', 'SKILLS', 'PROJECTS', 'XP', 'SOUL', 'CONTACT']

export default function Navbar() {
  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }} className="fixed top-0 z-[100] w-full border-b border-white/5 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <span className="font-display text-sm tracking-[0.3em] text-[var(--silver)]">ARZ.dev</span>
        <div className="hidden gap-4 md:flex">{links.map((l) => <a key={l} href="#" className="font-code text-xs tracking-widest text-[var(--silver)] hover:text-[var(--neural)]">{l}</a>)}</div>
        <div className="flex items-center gap-3"><WorldToggle /><button className="rounded-md border border-[var(--neural)] px-3 py-2 font-code text-xs text-[var(--neural)]">HIRE ME →</button></div>
      </div>
    </motion.nav>
  )
}
