'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import LightWaveEffect from '@/components/ui/light-wave-effect-dynamic'

export default function WandererTransition() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -30])

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 48%, rgba(245,166,35,0.09) 0%, transparent 60%),
            radial-gradient(ellipse 40% 35% at 50% 46%, rgba(245,166,35,0.05) 0%, transparent 50%),
            #030608
          `,
        }}
      />

      {/* CSS-only stars — no JS animation loops */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-pulse-glow"
            style={{
              top: `${(Math.sin(i * 7.3) * 0.5 + 0.5) * 100}%`,
              left: `${(Math.cos(i * 4.7) * 0.5 + 0.5) * 100}%`,
              width: i % 5 === 0 ? 2 : 1,
              height: i % 5 === 0 ? 2 : 1,
              opacity: 0.15 + (i % 4) * 0.08,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          />
        ))}
      </div>


      {/* Content — single transform layer */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex flex-col items-center gap-6 px-6 text-center will-change-transform"
      >
        {/* Heading with CSS glow — no filter:blur div */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="font-soul text-[clamp(2.5rem,6vw,5.5rem)] font-semibold italic leading-[1.05] tracking-[0.02em] text-white"
            style={{ textShadow: '0 0 40px rgba(245,166,35,0.2), 0 0 80px rgba(245,166,35,0.08)' }}
          >
            Beyond the Code
          </h2>
        </motion.div>

        {/* Supporting elements — simple opacity fades */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-code text-xs tracking-[0.4em] text-[rgba(255,255,255,0.65)]"
        >
          CROSSING WORLDS
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-code text-sm uppercase tracking-[0.2em] text-[rgba(255,255,255,0.50)]"
        >
          A life in motion. A soul chasing horizons.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2 inline-block"
        >
          <LightWaveEffect accentColor="245, 166, 35" className="group rounded-xl">
            <Link
              href="/beyond"
              className="relative flex items-center gap-3 rounded-xl border border-[rgba(245,166,35,0.15)] bg-[rgba(245,166,35,0.04)] px-6 py-3 backdrop-blur-md transition-all duration-500 hover:border-[rgba(245,166,35,0.30)] hover:shadow-[0_0_40px_rgba(245,166,35,0.08)]"
            >
              <div className="absolute inset-x-0 top-0 h-px rounded-t-xl bg-gradient-to-r from-transparent via-[rgba(245,166,35,0.25)] to-transparent" />

              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[rgba(245,166,35,0.20)] bg-[rgba(245,166,35,0.08)]">
                <svg
                  className="h-3.5 w-3.5 text-[var(--amber-light)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </div>

              <span className="font-code text-[11px] tracking-[0.15em] text-[rgba(245,166,35,0.80)] transition-colors duration-300 group-hover:text-[var(--amber-light)]">
                ENTER BEYOND
              </span>

              <svg
                className="h-3.5 w-3.5 text-[rgba(245,166,35,0.40)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--amber-light)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </LightWaveEffect>
        </motion.div>
      </motion.div>
    </section>
  )
}
