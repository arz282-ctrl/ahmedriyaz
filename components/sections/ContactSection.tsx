'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import CosmicAmbient from '@/components/ui/cosmic-ambient-dynamic'
import VaporizeTextCycle, { Tag } from '@/components/ui/vapour-text-effect'
import Floating, { FloatingElement } from '@/components/ui/parallax-floating'
import LightWaveEffect from '@/components/ui/light-wave-effect-dynamic'
import { LINKS, PERSON } from '@/lib/site'

const links = [
  {
    label: 'Email',
    href: `mailto:${PERSON.email}`,
    icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
  },
  {
    label: 'GitHub',
    href: LINKS.github,
    icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
  },
  {
    label: 'LinkedIn',
    href: LINKS.linkedin,
    icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
  },
  {
    label: 'WhatsApp',
    href: PERSON.whatsapp,
    icon: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
  },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const linkVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function ContactSection() {
  // The vapour text renders to a canvas at a fixed pixel size; at 84px
  // "Above Standard" is ~560px wide and gets clipped on phones.
  const [vaporFontSize, setVaporFontSize] = useState('84px')
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const apply = () => setVaporFontSize(mq.matches ? '40px' : '84px')
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const pathname = usePathname()
  const isBeyond = pathname.startsWith('/beyond')

  const description = isBeyond
    ? 'Whether it\'s a product idea, a collaboration, or just a conversation about tech and travel — I\'m always open to connecting with like-minded creators.'
    : 'From AI-native systems to premium digital products, I partner with ambitious teams to ship work that looks elite, converts harder, and scales cleanly.'

  return (
    <section
      id="contact"
      className={`relative overflow-hidden px-6 py-28 md:py-32 ${
        isBeyond
          ? 'bg-[var(--deep-ocean)]'
          : 'bg-[var(--void)]'
      }`}
    >
      {/* Base deep void for main page */}
      {!isBeyond && <div className="absolute inset-0 bg-[#030608]" />}

      {/* Cosmic ambient — stars + galaxy + drifting dots */}
      {!isBeyond && <CosmicAmbient tone="neural" starCount={50} dotCount={5} galaxyOpacity={0.06} />}

      <div
        className={`absolute inset-0 ${
          isBeyond
            ? 'bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,166,35,0.08)_0%,transparent_50%)]'
            : 'bg-[radial-gradient(ellipse 80% 60% at 50% 0%,rgba(125,211,252,0.07)_0%,transparent_55%)]'
        }`}
      />
      <div
        className={`absolute inset-0 ${
          isBeyond
            ? 'bg-[radial-gradient(ellipse_at_50%_100%,rgba(100,200,180,0.05)_0%,transparent_40%)]'
            : 'bg-[radial-gradient(ellipse 60% 40% at 50% 100%,rgba(125,211,252,0.04)_0%,transparent_45%)]'
        }`
        }
      />

      {/* ===== Rising floor glow from below (main page) ===== */}
      {!isBeyond && (
        <>
          {/* Main floor glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-52"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0.08, 0.55, 0.3, 0.65, 0.15] }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 4.5, ease: 'easeInOut' }}
          >
            <div className="absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(ellipse 120% 200% at 50% 100%,rgba(125,211,252,0.3)_0%,rgba(125,211,252,0.14)_30%,rgba(125,211,252,0.05)_58%,transparent_85%)]" />
          </motion.div>

          {/* Shimmer columns */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              aria-hidden
              className="pointer-events-none absolute z-[3] w-[1px] rounded-full bg-gradient-to-t from-[rgba(125,211,252,0.6)] via-[rgba(125,211,252,0.2)] to-transparent blur-[0.5px]"
              style={{ left: `${12 + i * 18}%`, bottom: 0 }}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: [0, 60 + i * 8, 40, 80, 0],
                opacity: [0, 0.9, 0.5, 0.7, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                delay: i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Micro particles rising */}
          {[...Array(4)].map((_, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="pointer-events-none absolute z-[3] rounded-full"
              style={{
                left: `${18 + i * 20}%`,
                bottom: 16,
                width: 2,
                height: 2,
                backgroundColor: 'rgba(125,211,252,0.8)',
                boxShadow: '0 0 8px rgba(125,211,252,0.9), 0 0 20px rgba(125,211,252,0.4)',
              }}
              animate={{
                y: [0, -50 - i * 12, -20, -80, -110],
                opacity: [0, 0.95, 0.5, 0.7, 0],
              }}
              transition={{
                duration: 5 + i * 0.7,
                delay: i * 1.0,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Scan-line pulse */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-1 bg-gradient-to-t from-[rgba(125,211,252,0.6)] to-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 0.7, 0.2, 0.5, 0] }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </>
      )}

      {/* Parallax floating images */}
      {!isBeyond && (
        <Floating sensitivity={-0.5} className="pointer-events-none z-[1] hidden md:block">
          <FloatingElement depth={0.5} className="top-[8%] left-[2%]">
            <motion.img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80&auto=format"
              alt=""
              className="h-36 w-52 rounded-2xl object-cover shadow-[0_8px_40px_rgba(0,0,0,0.5)] opacity-40 -rotate-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            />
          </FloatingElement>
          <FloatingElement depth={1.5} className="top-[4%] right-[3%]">
            <motion.img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80&auto=format"
              alt=""
              className="h-44 w-60 rounded-2xl object-cover shadow-[0_8px_40px_rgba(0,0,0,0.5)] opacity-35 rotate-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.35 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            />
          </FloatingElement>
          <FloatingElement depth={2} className="bottom-[10%] left-[3%]">
            <motion.img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80&auto=format"
              alt=""
              className="h-48 w-48 rounded-2xl object-cover shadow-[0_8px_40px_rgba(0,0,0,0.5)] opacity-35 rotate-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.35 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
            />
          </FloatingElement>
          <FloatingElement depth={1} className="bottom-[12%] right-[2%]">
            <motion.img
              src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80&auto=format"
              alt=""
              className="h-40 w-56 rounded-2xl object-cover shadow-[0_8px_40px_rgba(0,0,0,0.5)] opacity-40 -rotate-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1 }}
            />
          </FloatingElement>
          <FloatingElement depth={3} className="top-[40%] left-[12%]">
            <motion.img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80&auto=format"
              alt=""
              className="h-32 w-44 rounded-2xl object-cover shadow-[0_8px_40px_rgba(0,0,0,0.5)] opacity-30 -rotate-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3 }}
            />
          </FloatingElement>
          <FloatingElement depth={2.5} className="top-[35%] right-[8%]">
            <motion.img
              src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&q=80&auto=format"
              alt=""
              className="h-36 w-52 rounded-2xl object-cover shadow-[0_8px_40px_rgba(0,0,0,0.5)] opacity-30 rotate-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
            />
          </FloatingElement>
        </Floating>
      )}

      <div className="relative mx-auto max-w-3xl text-center">

        {/* Header */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`font-code text-xs tracking-[0.3em] ${isBeyond ? 'text-[rgba(245,166,35,0.50)]' : 'text-[rgba(125,211,252,0.60)]'}`}
        >
          // GET IN TOUCH
        </motion.p>

        {isBeyond ? (
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-soul italic text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-[var(--amber-light)]"
          >
            Let&apos;s Create<br />Something with Soul
          </motion.h2>
        ) : (
          <div className="mt-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[clamp(1.8rem,4.5vw,3.8rem)] font-light tracking-[-0.02em] leading-[0.9] text-[var(--silver)]"
            >
              Let&apos;s Build Something
            </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-4 h-[120px] w-full max-w-[900px] mx-auto"
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(125,211,252,0.25) 0%, rgba(125,211,252,0.08) 40%, transparent 70%)',
                filter: 'blur(25px)',
              }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative z-10 h-full w-full drop-shadow-[0_0_40px_rgba(125,211,252,0.25)]">
              <VaporizeTextCycle
                texts={["Above Standard", "That Converts", "Worth Shipping", "Elite-Grade"]}
                font={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: vaporFontSize,
                  fontWeight: 600,
                }}
                color="rgb(125, 211, 252)"
                spread={1.5}
                density={2}
                animation={{
                  vaporizeDuration: 3,
                  fadeInDuration: 1.2,
                  waitDuration: 1.5,
                }}
                direction="left-to-right"
                alignment="center"
                tag={Tag.H2}
              />
            </div>
          </motion.div>
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={`mt-6 font-code text-xs leading-relaxed ${isBeyond ? 'text-[rgba(245,166,35,0.40)]' : 'text-[rgba(224,224,224,0.50)]'}`}
        >
          {description}
        </motion.p>

        {/* ======= MAIN CTA — Book a Consultation (LightWave) ======= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-10 inline-block"
        >
          <LightWaveEffect accentColor="125, 211, 252" className="group rounded-xl">
            <a
              href="mailto:ahmed@rarewarestudio.space?subject=Project%20Inquiry"
              className="relative flex items-center gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-2.5 backdrop-blur-md transition-all duration-500 hover:border-[rgba(125,211,252,0.25)] hover:shadow-[0_0_40px_rgba(125,211,252,0.06)]"
            >
              <div className="absolute inset-x-0 top-0 h-px rounded-t-xl bg-gradient-to-r from-transparent via-[rgba(125,211,252,0.30)] to-transparent" />

              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[rgba(125,211,252,0.20)] bg-[rgba(125,211,252,0.08)]">
                <svg className="h-3.5 w-3.5 text-[#7dd3fc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                </svg>
              </div>

              <span className="font-code text-[11px] tracking-[0.1em] text-[var(--silver)]">
                Book a Consultation
              </span>

              <svg
                className="h-3.5 w-3.5 text-[rgba(125,211,252,0.50)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#7dd3fc]"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </LightWaveEffect>
        </motion.div>

        {/* ======= Divider ======= */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-10 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.08]" />
          <span className="font-code text-[10px] tracking-[0.4em] text-white/25">
            OR REACH OUT VIA
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.08]" />
        </motion.div>

        {/* ======= Social Links — 4 square boxes in a row ======= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 mt-8 mx-auto grid grid-cols-2 gap-3 max-w-xs sm:grid-cols-4"
        >
          {links.map((link) => (
            <motion.div
              key={link.label}
              variants={linkVariants}
              whileHover={{ scale: 1.12, y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <LightWaveEffect accentColor="125, 211, 252" className="rounded-xl">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md transition-all duration-500 hover:border-[rgba(125,211,252,0.25)] hover:shadow-[0_0_40px_rgba(125,211,252,0.06)]"
                >
                  <div className="absolute inset-x-0 top-0 h-px rounded-t-xl bg-gradient-to-r from-transparent via-[rgba(125,211,252,0.20)] to-transparent" />
                  <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(125,211,252,0.15)] bg-[rgba(125,211,252,0.06)] transition-all duration-300 group-hover:bg-[rgba(125,211,252,0.12)] group-hover:shadow-[0_0_14px_rgba(125,211,252,0.2)]">
                    <svg
                      className="h-4 w-4 text-[rgba(125,211,252,0.60)] transition-colors duration-300 group-hover:text-[#7dd3fc]"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d={link.icon} />
                    </svg>
                  </div>
                  <span className="relative z-10 font-code text-[8px] tracking-wide text-white/40 transition-colors duration-300 group-hover:text-white/80">
                    {link.label}
                  </span>
                </a>
              </LightWaveEffect>
            </motion.div>
          ))}
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="mt-20"
        >
          <div
            className={`mx-auto h-px w-16 bg-gradient-to-r from-transparent ${
              isBeyond
                ? 'via-[rgba(245,166,35,0.20)]'
                : 'via-[rgba(125,211,252,0.30)]'
            } to-transparent`}
          />
          <p className={`mt-8 font-soul text-xl italic ${isBeyond ? 'text-[rgba(245,166,35,0.30)]' : 'text-white'}`}>ARZ</p>
          <p className={`mt-1 font-code text-[10px] tracking-[0.3em] ${isBeyond ? 'text-[rgba(245,166,35,0.15)]' : 'text-[rgba(255,255,255,0.60)]'}`}>ARCHITECT & WANDERER</p>
        </motion.div>
      </div>
    </section>
  )
}