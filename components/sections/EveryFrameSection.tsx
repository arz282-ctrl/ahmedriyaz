'use client'

import { motion } from 'framer-motion'
import { ParticleTextEffect } from '@/components/ui/particle-text-effect'
import CosmicAmbient from '@/components/ui/cosmic-ambient-dynamic'

const FRAME_WORDS = [
  "EVERY FRAME",
  "TELLS A STORY",
  "CINEMATIC",
  "IMMERSIVE",
  "ARZ",
]

export default function EveryFrameSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--void)] pt-16 md:pt-20 pb-10">
      <CosmicAmbient tone="neural" starCount={60} dotCount={4} galaxyOpacity={0.05} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(74,222,128,0.06)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_80%_80%,rgba(74,222,128,0.03)_0%,transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_20%_60%,rgba(168,130,255,0.03)_0%,transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 md:mb-10"
        >
          <p className="font-code text-[10px] tracking-[0.3em] text-[#4ade80] mb-4">
            // VISUAL STORYTELLING
          </p>
          <h2 className="font-soul italic text-[clamp(2rem,6vw,4.5rem)] leading-tight text-[var(--silver)]">
            Every Frame Tells a Story
          </h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg tracking-wide text-[#8a8a94]">
            Where visuals become experiences.
          </p>
        </motion.div>

        <ParticleTextEffect words={FRAME_WORDS} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 md:mt-10 font-code text-xs md:text-sm leading-relaxed text-[#7a7a84] max-w-xl mx-auto text-center"
        >
          Bring your every frame to life through Cinematic Motion, Emotion, and Immersive Storytelling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 md:mt-12 flex justify-center"
        >
          <a
            href="mailto:ahmed@rarewarestudio.space?subject=Project%20Inquiry"
            className="group relative inline-flex items-center"
          >
            {/* Neon glow ring */}
            <div className="pointer-events-none absolute -inset-[1px] rounded-full bg-gradient-to-r from-[#4ade80] via-[#a888ff] to-[#4ade80] opacity-0 blur-[2px] transition-opacity duration-700 group-hover:opacity-40 group-active:opacity-80 group-active:blur-[6px] group-active:-inset-[3px]" />
            <div className="pointer-events-none absolute -inset-3 rounded-full bg-[#4ade80] opacity-0 blur-xl transition-all duration-200 group-active:opacity-20" />

            {/* Button body */}
            <div className="relative z-10 flex items-center gap-3 rounded-full border border-white/[0.08] bg-[#0a0d12] px-6 py-3 md:px-8 md:py-3.5 transition-all duration-500 group-hover:border-white/[0.15] group-active:border-[rgba(74,222,128,0.4)] group-active:bg-[#0c1018]">
              {/* Shimmer sweep */}
              <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-full">
                <div className="absolute -left-full top-0 h-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-all duration-700 group-hover:left-[130%]" />
              </div>
              {/* Top edge highlight */}
              <div className="pointer-events-none absolute inset-x-4 -top-px h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <span className="font-code text-[10px] md:text-[11px] tracking-[0.25em] text-[#c8c8d2] transition-all duration-500 group-hover:text-white group-active:text-[#4ade80] group-active:drop-shadow-[0_0_6px_rgba(74,222,128,0.5)]">
                LET&apos;S COLLABORATE
              </span>

              {/* Arrow pill */}
              <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#4ade80] to-[#38b865] shadow-[0_0_12px_rgba(74,222,128,0.25)] transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] group-hover:scale-110 group-active:shadow-[0_0_28px_rgba(74,222,128,0.6)] group-active:scale-95">
                <svg className="h-3 w-3 text-[#030608] transition-transform duration-500 group-hover:translate-x-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="mt-16 md:mt-20 pb-12 md:pb-16 text-center"
        >
          <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-[rgba(74,222,128,0.2)] to-transparent" />
          <p className="mt-6 md:mt-8 font-soul text-xl italic text-[#8a8a94]">ARZ</p>
          <p className="mt-1 font-code text-[10px] tracking-[0.3em] text-[#6a6a74]">ARCHITECT &amp; WANDERER</p>
        </motion.div>
      </div>
    </section>
  )
}
