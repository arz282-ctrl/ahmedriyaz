'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useWorld } from '@/lib/WorldContext'

export default function WorldToggle() {
  const { setWorld } = useWorld()
  const pathname = usePathname()
  const router = useRouter()
  const [transitioning, setTransitioning] = useState(false)
  const [mounted, setMounted] = useState(false)
  const isBeyondPath = pathname.startsWith('/beyond')

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggle = () => {
    if (!mounted) return
    const nextWorld = isBeyondPath ? 'architect' : 'wanderer'
    const targetPath = isBeyondPath ? '/' : '/beyond'

    setTransitioning(true)
    setWorld(nextWorld)
    if (pathname !== targetPath) {
      setTimeout(() => router.push(targetPath), 120)
    }
    setTimeout(() => setTransitioning(false), 850)
  }

  // Both server and client render the same DOM structure:
  // <div> → <button> + <AnimatePresence>
  // Only the class names and aria attributes change after mount.
  const isArchitect = mounted ? !isBeyondPath : true
  const isWanderer = mounted ? isBeyondPath : false

  return (
    <div className="contents">
      <button
        onClick={toggle}
        aria-label="Switch world"
        suppressHydrationWarning
        className={`rounded-full p-0.5 text-[10px] font-code ${
          isBeyondPath
            ? 'border border-[rgba(245,166,35,0.35)] bg-white/70 text-[#1f2937] backdrop-blur-md shadow-[0_8px_26px_rgba(255,255,255,0.3)]'
            : 'border border-white/15 bg-black/30 text-[var(--silver)]'
        }`}
      >
        <span className={`px-2.5 py-0.5 rounded-full transition-colors duration-300 ${isArchitect ? 'bg-[#4ade80] text-black' : ''}`}>
          ARCHITECT
        </span>
        <span className={`px-2.5 py-0.5 rounded-full transition-colors duration-300 ${isWanderer ? 'bg-[var(--amber-light)] text-black' : ''}`}>
          WANDERER
        </span>
      </button>
      <AnimatePresence>
        {transitioning && (
          <motion.div
            key="curtain"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] origin-top"
            style={{
              background: isBeyondPath
                ? 'linear-gradient(180deg, #050608 0%, #0d1b2a 100%)'
                : 'linear-gradient(180deg, #fffdf8 0%, #ffe9bf 100%)',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
