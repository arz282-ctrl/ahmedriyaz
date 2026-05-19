'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  starCount?: number
  dotCount?: number
  tone?: 'neural' | 'amber' | 'mixed'
  galaxyOpacity?: number
  className?: string
}

type Star = { id: number; top: number; left: number; size: number; delay: number; duration: number; baseOpacity: number }
type Dot = { id: number; top: number; left: number; delay: number; duration: number; drift: number; color: string }

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default function CosmicAmbient({
  starCount = 70,
  dotCount = 6,
  tone = 'mixed',
  galaxyOpacity = 0.08,
  className = '',
}: Props) {
  const [stars, setStars] = useState<Star[]>([])
  const [dots, setDots] = useState<Dot[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const newStars: Star[] = []
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        top: seededRandom(i * 7 + 1) * 100,
        left: seededRandom(i * 13 + 3) * 100,
        size: seededRandom(i * 5 + 2) < 0.85 ? 1 : seededRandom(i * 11 + 4) < 0.95 ? 1.5 : 2,
        delay: seededRandom(i * 17 + 5) * 6,
        duration: 3 + seededRandom(i * 23 + 7) * 5,
        baseOpacity: 0.15 + seededRandom(i * 29 + 9) * 0.35,
      })
    }
    setStars(newStars)

    const newDots: Dot[] = []
    for (let i = 0; i < dotCount; i++) {
      newDots.push({
        id: i,
        top: 20 + seededRandom(i * 31 + 11) * 60,
        left: 10 + seededRandom(i * 37 + 13) * 80,
        delay: seededRandom(i * 41 + 15) * 4,
        duration: 8 + seededRandom(i * 43 + 17) * 8,
        drift: 12 + seededRandom(i * 47 + 19) * 22,
        color:
          tone === 'amber'
            ? 'rgba(245,166,35,0.55)'
            : tone === 'neural'
              ? 'rgba(125,211,252,0.55)'
              : i % 2 === 0
                ? 'rgba(125,211,252,0.5)'
                : 'rgba(245,166,35,0.45)',
      })
    }
    setDots(newDots)
    setReady(true)
  }, [starCount, dotCount, tone])

  const galaxyGradient =
    tone === 'amber'
      ? `radial-gradient(60% 38% at 50% 60%, rgba(245,166,35,${galaxyOpacity}) 0%, rgba(245,166,35,${galaxyOpacity * 0.4}) 38%, transparent 72%)`
      : tone === 'neural'
        ? `radial-gradient(60% 38% at 50% 60%, rgba(125,211,252,${galaxyOpacity}) 0%, rgba(125,211,252,${galaxyOpacity * 0.4}) 38%, transparent 72%)`
        : `radial-gradient(58% 36% at 50% 58%, rgba(125,211,252,${galaxyOpacity * 0.9}) 0%, rgba(125,211,252,${galaxyOpacity * 0.35}) 36%, transparent 70%), radial-gradient(38% 28% at 62% 44%, rgba(245,166,35,${galaxyOpacity * 0.7}) 0%, rgba(245,166,35,${galaxyOpacity * 0.25}) 40%, transparent 76%)`

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* Faint galaxy haze */}
      <motion.div
        className="absolute inset-0"
        style={{ background: galaxyGradient, filter: 'blur(40px)' }}
        animate={ready ? { opacity: [0.6, 1, 0.85, 1] } : { opacity: 0 }}
        transition={ready ? { duration: 18, repeat: Infinity, ease: 'easeInOut' } : {}}
      />

      {/* Twinkling stars */}
      {ready && (
        <div className="absolute inset-0">
          {stars.map((s) => (
            <motion.span
              key={s.id}
              className="absolute rounded-full bg-white"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: s.size,
                height: s.size,
                boxShadow: s.size > 1 ? '0 0 6px rgba(255,255,255,0.55)' : undefined,
              }}
              animate={{ opacity: [s.baseOpacity * 0.4, s.baseOpacity, s.baseOpacity * 0.5] }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Drifting glow dots */}
      {ready && (
        <div className="absolute inset-0">
          {dots.map((d) => (
            <motion.span
              key={d.id}
              className="absolute rounded-full"
              style={{
                top: `${d.top}%`,
                left: `${d.left}%`,
                width: 4,
                height: 4,
                background: d.color,
                boxShadow: `0 0 18px ${d.color}, 0 0 38px ${d.color}`,
                filter: 'blur(0.3px)',
              }}
              animate={{
                opacity: [0, 0.85, 0.5, 0.9, 0],
                y: [0, -d.drift, -d.drift * 0.6, -d.drift * 1.4, -d.drift * 1.8],
              }}
              transition={{
                duration: d.duration,
                delay: d.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}