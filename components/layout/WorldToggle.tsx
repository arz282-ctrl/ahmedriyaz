'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useWorld } from '@/lib/WorldContext'

export default function WorldToggle() {
  const { world, setWorld } = useWorld()
  const [transitioning, setTransitioning] = useState(false)
  const next = useMemo(() => (world === 'architect' ? 'wanderer' : 'architect'), [world])

  const toggle = () => {
    setTransitioning(true)
    setWorld(next)
    setTimeout(() => setTransitioning(false), 850)
  }

  return (
    <>
      <button onClick={toggle} className="rounded-full border border-white/15 bg-black/30 p-1 text-xs font-code text-[var(--silver)]">
        <span className={`px-3 py-1 rounded-full ${world === 'architect' ? 'bg-[var(--neural)] text-black' : ''}`}>⬡ ARCHITECT</span>
        <span className={`px-3 py-1 rounded-full ${world === 'wanderer' ? 'bg-[var(--amber-light)] text-black' : ''}`}>☀ WANDERER</span>
      </button>
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200]"
            style={{
              background:
                world === 'architect'
                  ? 'linear-gradient(var(--golden-hour), var(--horizon-burn))'
                  : 'linear-gradient(var(--void), #0d1b2a)',
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
