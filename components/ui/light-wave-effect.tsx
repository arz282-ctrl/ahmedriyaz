'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

/* ── Types ── */
interface Ripple {
  id: number
  x: number
  y: number
  scale: number
}

interface TrailPoint {
  id: number
  x: number
  y: number
  opacity: number
}

interface Pulse {
  id: number
  angle: number
  distance: number
}

interface CursorSpot {
  x: number
  y: number
}

interface MicroDot {
  id: number
  angle: number
}

/* ── Main LightWave component ── */
type Props = {
  className?: string
  accentColor?: string
  glowColor?: string
  children: React.ReactNode
}

export default function LightWaveEffect({
  className = '',
  accentColor = '125, 211, 252',
  glowColor = 'rgba(125,211,252,0.35)',
  children,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const trailIdRef = useRef(0)
  const pulseIdRef = useRef(0)

  const [mounted, setMounted] = useState(false)
  const [microDots, setMicroDots] = useState<MicroDot[]>([])
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [pulse, setPulse] = useState<Pulse | null>(null)
  const [cursorSpot, setCursorSpot] = useState<CursorSpot | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  const trailTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ── Generate micro dots only on client (hydration-safe) ── */
  useEffect(() => {
    setMicroDots(
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        angle: (i / 9) * Math.PI * 2,
      }))
    )
    setMounted(true)
  }, [])

  /* ── Ripple burst on card enter ── */
  const spawnRipples = useCallback((x: number, y: number) => {
    const newRipples: Ripple[] = Array.from({ length: 4 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      scale: 0.3 + i * 0.3,
    }))
    setRipples(newRipples)

    setTimeout(() => setRipples([]), 1800)
  }, [])

  /* ── Spawn pulse from nearest edge ── */
  const spawnPulse = useCallback((x: number, y: number) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.width / 2
    const cy = rect.height / 2
    const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI)

    setPulse({ id: Date.now(), angle, distance: 0 })
    setTimeout(() => setPulse(null), 1200)
  }, [])

  /* ── Mouse enter ── */
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setIsHovering(true)
      setCursorSpot({ x, y })

      spawnRipples(x, y)
      spawnPulse(x, y)

      setTrail([])
      trailIdRef.current = 0
    },
    [spawnRipples, spawnPulse]
  )

  /* ── Mouse move ── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setCursorSpot({ x, y })

      const id = ++trailIdRef.current
      setTrail((prev) => {
        const next = [...prev, { id, x, y, opacity: 1 }]
        return next.slice(-22)
      })

      if (trailTimeoutRef.current) clearTimeout(trailTimeoutRef.current)
      trailTimeoutRef.current = setTimeout(() => {
        setTrail((prev) =>
          prev.map((p) => ({ ...p, opacity: Math.max(0, p.opacity - 0.12) })).filter((p) => p.opacity > 0)
        )
      }, 40)
    },
    []
  )

  /* ── Mouse leave ── */
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setCursorSpot(null)
    setTrail([])
    setPulse(null)
  }, [])

  /* ── Pulse animation driver ── */
  useEffect(() => {
    if (!pulse) return
    let start: number | null = null
    const duration = 1100

    const animate = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setPulse((prev) => (prev ? { ...prev, distance: progress * 120 } : null))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [pulse?.id])

  /* ── Cursor spot follows with lag ── */
  const spotXRef = useRef(0)
  const spotYRef = useRef(0)
  const animRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isHovering || !cursorSpot) {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      return
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      spotXRef.current = lerp(spotXRef.current, cursorSpot.x, 0.18)
      spotYRef.current = lerp(spotYRef.current, cursorSpot.y, 0.18)
      setCursorSpot({ x: spotXRef.current, y: spotYRef.current })
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [isHovering, cursorSpot?.x, cursorSpot?.y])

  if (!mounted) {
    // Render static version on server to match client
    return <div className={`relative overflow-hidden ${className}`}>{children}</div>
  }

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Content layer ── */}
      {children}

      {/* ── Cursor spot ── */}
      {isHovering && cursorSpot && (
        <>
          <motion.div
            className="pointer-events-none absolute"
            style={{
              left: cursorSpot.x,
              top: cursorSpot.y,
              width: 280,
              height: 280,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, rgba(${accentColor},0.12) 0%, rgba(${accentColor},0.04) 40%, transparent 70%)`,
              filter: 'blur(16px)',
            }}
            animate={{ opacity: [0.6, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <motion.div
            className="pointer-events-none absolute"
            style={{
              left: cursorSpot.x,
              top: cursorSpot.y,
              width: 80,
              height: 80,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, rgba(${accentColor},0.18) 0%, transparent 70%)`,
              filter: 'blur(8px)',
            }}
            animate={{ opacity: [0.5, 1, 0.6], scale: [0.9, 1.1, 0.95] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Constellation micro-dots */}
          <div className="pointer-events-none absolute" style={{ left: cursorSpot.x, top: cursorSpot.y, transform: 'translate(-50%,-50%)' }}>
            {microDots.map((d) => (
              <motion.div
                key={d.id}
                className="pointer-events-none absolute rounded-full"
                style={{
                  width: 1.5,
                  height: 1.5,
                  backgroundColor: `rgba(${accentColor},0.7)`,
                  boxShadow: `0 0 4px rgba(${accentColor},0.9)`,
                }}
                animate={{
                  x: [
                    Math.cos(d.angle) * 18,
                    Math.cos(d.angle) * 38,
                    Math.cos(d.angle + 0.8) * 55,
                    Math.cos(d.angle + 1.6) * 38,
                    Math.cos(d.angle) * 18,
                  ],
                  y: [
                    Math.sin(d.angle) * 18,
                    Math.sin(d.angle) * 38,
                    Math.sin(d.angle + 0.8) * 55,
                    Math.sin(d.angle + 1.6) * 38,
                    Math.sin(d.angle) * 18,
                  ],
                  opacity: [0, 0.9, 0.5, 0.9, 0],
                  scale: [0.5, 1.2, 0.8, 1.2, 0.5],
                }}
                transition={{
                  duration: 3 + d.id * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* ── Ripple rings ── */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: r.x,
              top: r.y,
              width: 40,
              height: 40,
              transform: 'translate(-50%, -50%)',
              border: `1px solid rgba(${accentColor},0.5)`,
              boxShadow: `0 0 8px rgba(${accentColor},0.3), inset 0 0 6px rgba(${accentColor},0.15)`,
            }}
            initial={{ scale: 0.3, opacity: 1 }}
            animate={{ scale: 6 + r.scale * 4, opacity: [0.8, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </AnimatePresence>

      {/* ── Comet trail ── */}
      <AnimatePresence>
        {trail.map((t) => (
          <motion.div
            key={t.id}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: t.x,
              top: t.y,
              width: 4,
              height: 4,
              backgroundColor: `rgba(${accentColor},${t.opacity * 0.7})`,
              boxShadow: `0 0 10px rgba(${accentColor},${t.opacity * 0.9}), 0 0 20px rgba(${accentColor},${t.opacity * 0.4})`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: t.opacity, scale: 1 }}
            animate={{ opacity: 0, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* ── Neural pulse ── */}
      {isHovering && cursorSpot && pulse && (
        <motion.div
          className="pointer-events-none absolute origin-left"
          style={{
            left: cursorSpot.x,
            top: cursorSpot.y,
            transform: `translate(-100%, -50%) rotate(${pulse.angle}deg)`,
            width: pulse.distance,
            height: 1,
            background: `linear-gradient(90deg, transparent, rgba(${accentColor},0.6), rgba(${accentColor},0.9), rgba(${accentColor},0.3), transparent)`,
            boxShadow: `0 0 6px rgba(${accentColor},0.8)`,
          }}
          animate={{ opacity: [0.8, 0, 0.6, 0] }}
          transition={{ duration: 1.2 }}
        />
      )}

      {/* ── Hover border glow ── */}
      {isHovering && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            border: `1px solid rgba(${accentColor},0.35)`,
            boxShadow: `inset 0 0 30px rgba(${accentColor},0.04), 0 0 20px rgba(${accentColor},0.08)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* ── Holographic surface shimmer ── */}
      {isHovering && cursorSpot && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${cursorSpot.x}px ${cursorSpot.y}px, rgba(${accentColor},0.05) 0%, transparent 60%)`,
          }}
          animate={{ opacity: [0.5, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  )
}