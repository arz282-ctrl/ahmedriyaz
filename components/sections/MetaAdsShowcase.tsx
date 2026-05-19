'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// ─── Animated Counter Hook ───
function useCountUp(end: number, duration: number = 2000, decimals: number = 0) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return
    let rafId: number
    const startTime = performance.now()
    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(2, -10 * progress)
      setCount(Number((eased * end).toFixed(decimals)))
      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [isInView, end, duration, decimals])

  return { count, ref }
}

// ─── Stacked Bar Segment ───
function BarSegment({
  name,
  value,
  total,
  color,
  roas,
  delay,
}: {
  name: string
  value: number
  total: number
  color: string
  roas: number
  delay: number
}) {
  const heightPercent = (value / total) * 100
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      whileInView={{ height: `${heightPercent}%`, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex w-full cursor-default flex-col justify-end overflow-hidden rounded-sm"
      style={{ backgroundColor: color }}
    >
      {/* Hover tooltip */}
      <div className="absolute inset-x-0 top-0 z-10 flex -translate-y-2 flex-col items-center opacity-0 transition-all duration-300 group-hover:translate-y-2 group-hover:opacity-100">
        <div className="rounded-lg border border-white/10 bg-[rgba(3,6,8,0.90)] px-3 py-2 backdrop-blur-md shadow-xl">
          <p className="whitespace-nowrap font-sans text-[10px] tracking-wider text-white">{name}</p>
          <p className="mt-0.5 text-center font-code text-[9px] text-white/60">
            ${(value / 1000).toFixed(1)}k spent · {roas}x ROAS
          </p>
        </div>
        <div className="h-2 w-2 rotate-45 border-r border-b border-white/10 bg-[rgba(3,6,8,0.90)]" />
      </div>

      {/* Percentage label inside bar (only if tall enough) */}
      {heightPercent > 12 && (
        <div className="absolute inset-x-0 top-2 flex flex-col items-center">
          <span className="font-sans text-[9px] tracking-wider text-white/85 drop-shadow-[0_0_6px_rgba(0,0,0,0.45)]">{name}</span>
          <span className="mt-0.5 font-code text-[8px] text-white/55">{roas}x</span>
        </div>
      )}

      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent"
          initial={{ y: '120%', opacity: 0 }}
          whileInView={{ y: ['120%', '-120%'], opacity: [0, 0.45, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: delay + 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        />
      )}
    </motion.div>
  )
}

// ─── KPI Mini Card ───
function KPINum({ label, value, prefix = '', suffix = '', decimals = 0, color }: {
  label: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  color?: string
}) {
  const { count, ref } = useCountUp(value, 2500, decimals)

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="font-code text-[9px] tracking-[0.15em] text-[rgba(224,224,224,0.30)] uppercase">{label}</p>
      <span ref={ref} className="mt-1 font-sans text-lg tracking-tight text-[var(--silver)]">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      {color && <div className="mt-1.5 h-0.5 w-6 rounded-full" style={{ backgroundColor: color }} />}
    </motion.div>
  )
}

// ─── Main Section ───
export default function MetaAdsShowcase() {
  const shouldReduceMotion = useReducedMotion()

  const campaigns = [
    { name: 'RareKits', spend: 4200, roas: 4.8, color: '#7dd3fc' },
    { name: 'ReadyPI', spend: 3800, roas: 3.2, color: '#a78bfa' },
    { name: 'LookX', spend: 2100, roas: 2.1, color: '#f5a623' },
    { name: 'Rareware', spend: 1500, roas: 1.8, color: '#34d399' },
    { name: 'Retarget', spend: 900, roas: 5.2, color: '#f87171' },
  ]

  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0)

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="meta-ads" className="section relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(125,211,252,0.04)_0%,transparent_50%)]" />

      <div className="relative">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="font-code text-xs tracking-[0.3em] text-[#7dd3fc]">// META ADS INTELLIGENCE</p>
        </motion.div>

        {/* Split layout */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: Content + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-soul text-[clamp(2.5rem,6vw,4.5rem)] italic leading-[0.95] text-[var(--silver)]">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Turn Ad Spend
              </motion.span>
              <motion.span
                className="block text-[#7dd3fc]"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                Into Revenue
              </motion.span>
            </h2>

            <motion.p
              className="mt-6 max-w-md font-code text-xs leading-relaxed text-[rgba(224,224,224,0.40)]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              AI-powered Meta Ads management — from creative generation to automated budget
              optimization. Every campaign tracked, every dollar accounted for, every insight
              actionable.
            </motion.p>

            {/* Mini stats row */}
            <div className="mt-8 grid grid-cols-2 gap-6 sm:flex sm:gap-8">
              <KPINum label="Total Spend" value={12.5} prefix="$" suffix="k" decimals={1} color="#7dd3fc" />
              <KPINum label="Avg ROAS" value={4.2} suffix="x" decimals={1} color="#34d399" />
              <KPINum label="Conversions" value={846} color="#f5a623" />
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <button
                onClick={scrollToContact}
                className="group relative overflow-hidden rounded-full border border-[rgba(125,211,252,0.30)] bg-[rgba(125,211,252,0.5)] px-7 py-3.5 transition-all duration-500 hover:border-[rgba(125,211,252,0.60)] hover:bg-[rgba(125,211,252,0.10)] hover:shadow-[0_0_30px_rgba(125,211,252,0.15)]"
              >
                {!shouldReduceMotion && (
                  <motion.span
                    className="pointer-events-none absolute inset-y-0 left-[-30%] w-[26%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    animate={{ x: ['0%', '460%'] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                  />
                )}
                <span className="relative z-10 font-code text-xs tracking-[0.15em] text-[#7dd3fc]">
                  GET YOUR ADS EXPERT
                </span>
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1877F2]/10">
                <svg className="h-3.5 w-3.5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E4405F]/10">
                <svg className="h-3.5 w-3.5 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
                </svg>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <p className="font-code text-[9px] tracking-wider text-[rgba(224,224,224,0.25)]">
                META ADS CERTIFIED
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Vertical Stacked Bar */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-[480px] items-end justify-center lg:h-[520px]"
          >
            {/* Glow behind the bar */}
            <div className="absolute bottom-0 left-1/2 h-full w-40 -translate-x-1/2 bg-gradient-to-t from-[rgba(125,211,252,0.)][0.03] to-transparent blur-2xl" />

            {/* Bar container */}
            <div className="relative flex h-full w-28 flex-col-reverse gap-[2px] rounded-xl border border-white/5 bg-white/[0.02] p-1.5 md:w-36">
              {campaigns.map((c, i) => (
                <BarSegment
                  key={c.name}
                  name={c.name}
                  value={c.spend}
                  total={totalSpend}
                  color={c.color}
                  roas={c.roas}
                  delay={0.3 + i * 0.15}
                />
              ))}

              {/* Total label at bottom */}
              <div className="absolute -bottom-8 inset-x-0 text-center">
                <p className="font-code text-[9px] tracking-wider text-[rgba(224,224,224,0.25)]">TOTAL AD SPEND</p>
                <p className="mt-0.5 font-sans text-sm text-[rgba(224,224,224,0.60)]">${(totalSpend / 1000).toFixed(1)}k</p>
              </div>
            </div>

            {/* RIGHT: Compact campaign legend */}
            <div className="ml-3 flex h-full flex-col justify-center gap-1.5 sm:ml-5 sm:gap-2">
              {campaigns.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  className="group flex items-center gap-2 px-1 py-1 sm:gap-2.5 sm:px-1.5"
                >
                  <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: c.color }} />
                  <div className="min-w-0">
                    <p className="font-sans text-[9px] tracking-wider text-[rgba(224,224,224,0.72)] transition-colors duration-300 group-hover:text-[rgba(224,224,224,0.95)]">{c.name}</p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="font-sans text-xs text-[var(--silver)]">{c.roas}x</span>
                      <span className="font-code text-[8px] text-[rgba(224,224,224,0.25)]">${(c.spend / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                  {/* Mini bar */}
                  <div className="ml-auto h-1 w-8 overflow-hidden rounded-full bg-white/[0.03]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(c.spend / totalSpend) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.7 + i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
