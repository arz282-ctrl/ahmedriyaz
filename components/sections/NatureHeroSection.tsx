'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { prefersReducedMotion } from '@/lib/motion-utils'

const layers = [
  { src: '/beyond/sunset-hero.webp', depth: 12, filter: 'contrast(1.06) brightness(1.04) saturate(1.08) sepia(0.05)' },
  { src: '/beyond/sunset-hero.webp', depth: 24, filter: 'contrast(1.04) brightness(0.96) saturate(1.02) sepia(0.12)' },
  { src: '/beyond/sunset-hero.webp', depth: 36, filter: 'contrast(1.02) brightness(0.88) saturate(0.94) sepia(0.18)' },
]

export default function NatureHeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion()) return

    let pendingX = 0
    let pendingY = 0
    let rafId: number | null = null

    const apply = () => {
      rafId = null
      canvas.style.transform = `rotateX(${2 + pendingY / 4}deg) rotateY(${pendingX / 4}deg)`
      layerRefs.current.forEach((layer, index) => {
        if (!layer) return
        const moveX = pendingX * (index + 1) * 0.3
        const moveY = pendingY * (index + 1) * 0.3
        layer.style.transform = `translate(${moveX}px, ${moveY}px)`
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      pendingX = (window.innerWidth / 2 - e.pageX) / 30
      pendingY = (window.innerHeight / 2 - e.pageY) / 30
      if (rafId === null) rafId = requestAnimationFrame(apply)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section id="soul" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-[#f4f9ff]">
      <div className="pointer-events-none absolute inset-x-0 -top-12 z-[3] h-28 bg-[radial-gradient(100%_120%_at_50%_0%,rgba(255,245,214,0.7)_0%,rgba(255,228,165,0.24)_42%,transparent_84%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-12 z-[3] h-28 bg-[radial-gradient(100%_120%_at_50%_100%,rgba(245,166,35,0.18)_0%,rgba(245,166,35,0.06)_40%,transparent_82%)] blur-2xl" />
      {/* SVG Grain Filter */}
      <svg className="absolute h-0 w-0">
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{ filter: 'url(#grain-filter)' }} />

      {/* Sun radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,230,170,0.42)_0%,rgba(245,166,35,0.1)_46%,transparent_74%)]" />

      {/* 3D Parallax layers */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1200px' }}>
        <div ref={canvasRef} className="relative h-[70vh] w-[85vw] max-w-[900px]" style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          {layers.map((layer, i) => (
            <div
              key={i}
              ref={(el) => { layerRefs.current[i] = el }}
              className="absolute inset-0 overflow-hidden rounded-xl border border-[#dbe8ff]/55"
              style={{ transition: 'transform 0.5s ease', zIndex: i, transform: `translateZ(${-layer.depth}px)` }}
            >
              <Image
                src={layer.src}
                alt={`Nature layer ${i + 1}`}
                fill
                sizes="85vw"
                priority={i === 0}
                className="object-cover"
                style={{ filter: layer.filter }}
              />
            </div>
          ))}

          {/* Topo contour overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, rgba(245,166,35,0.04) 41px, transparent 42px)',
            zIndex: 10,
          }} />
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div style={{ y: parallaxY }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-code text-xs tracking-[0.3em] text-[#8a5a1e]/58"
          >
            WANDERER // NATURE LOVER
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-soul text-[clamp(3.5rem,10vw,9rem)] italic leading-[0.85] text-[#b86f1a]"
            style={{ textShadow: '0 0 24px rgba(245,166,35,0.16)' }}
          >
            A Soul<br />Unbound
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 max-w-md font-code text-xs leading-relaxed text-[#7b5b36]/62"
          >
            Chasing sunsets from mountain peaks. Listening to oceans hit the shore. Wind carrying the sound of a life fully lived.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
