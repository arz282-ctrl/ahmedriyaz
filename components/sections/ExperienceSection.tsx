'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { CpuArchitecture } from '@/components/ui/cpu-architecture'
import { LayeredText } from '@/components/ui/layered-text'
import LightWaveEffect from '@/components/ui/light-wave-effect-dynamic'
import { VerticalMarquee } from '@/components/ui/3d-testimonials'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

/* ── Data ── */

const experiences = [
  {
    role: 'Founder & CEO',
    company: 'Rareware Studio',
    location: 'Sylhet, Bangladesh · Remote-first',
    period: '2023 — Present',
    isCurrent: true,
    points: [
      'Founded and scaled a creative technology studio delivering full-stack product design, brand systems, and AI-native digital experiences for international clients.',
      'Integrated Generative AI workflows (Claude, ChatGPT, Midjourney) into production, reducing design iteration cycles by 60%.',
      'Directed identity systems, motion assets, and interactive UI architecture across e-commerce, SaaS, and hospitality engagements.',
      'Shipped rarewarestudio.space as a bespoke studio platform that communicates both technical rigor and creative direction.',
    ],
  },
  {
    role: 'Independent Web Designer & Developer',
    company: 'Independent',
    location: 'Remote · Global Clients',
    period: '2022 — 2023',
    isCurrent: false,
    points: [
      'Designed and shipped bespoke websites and landing systems with HTML/CSS, JavaScript, and React.',
      'Built conversion-focused SaaS and product marketing pages with strong UX and content hierarchy.',
      'Created reusable component libraries and design systems in Figma to accelerate delivery and handoff quality.',
      'Led remote collaboration with international clients through structured async workflows.',
    ],
  },
]

const certifications = [
  {
    name: 'Generative AI Mastermind',
    org: 'Outskill',
    year: '2024',
    desc: 'Prompt Architecture · LLM Workflows · AI-Native Product Design',
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, NovaBright',
    avatar: '',
    initials: 'SC',
    body: 'ARZ delivered a website that exceeded every expectation. The attention to detail and creative direction was world-class.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Founder, Horizon Labs',
    avatar: '',
    initials: 'MJ',
    body: 'Working with ARZ was a game-changer. The AI-integrated workflows cut our iteration time in half.',
  },
  {
    name: 'Priya Sharma',
    role: 'CTO, CloudScale',
    avatar: '',
    initials: 'PS',
    body: 'Exceptional full-stack capabilities. From design systems to production code — delivered flawlessly.',
  },
  {
    name: 'James Walker',
    role: 'Director, PixelForge',
    avatar: '',
    initials: 'JW',
    body: 'The motion design and interactive elements brought our brand to life in ways we never imagined.',
  },
  {
    name: 'Anika Patel',
    role: 'PM, DataStream',
    avatar: '',
    initials: 'AP',
    body: 'Rare combination of technical depth and design sensibility. Our conversion rates jumped 40% after the redesign.',
  },
  {
    name: 'David Kim',
    role: 'Co-founder, Zenith AI',
    avatar: '',
    initials: 'DK',
    body: 'ARZ understood our vision instantly. The final product felt like it was crafted by someone who truly cares about the craft.',
  },
  {
    name: 'Elena Rossi',
    role: 'Head of Design, Lumen',
    avatar: '',
    initials: 'ER',
    body: 'Incredible eye for detail. Every interaction, every transition — purposeful and polished.',
  },
  {
    name: 'Tom Anderson',
    role: 'Founder, ByteShift',
    avatar: '',
    initials: 'TA',
    body: 'Fast, communicative, and the code quality was production-ready from day one. Will definitely work together again.',
  },
]

function ReviewCard({ name, role, initials, body }: { name: string; role: string; initials: string; body: string }) {
  return (
    <figure className="relative w-[10.5rem] shrink-0 sm:w-56 md:w-64 rounded-2xl border border-[rgba(74,222,128,0.12)] bg-[rgba(8,12,16,0.95)] p-4 md:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
      <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-[rgba(74,222,128,0.25)] to-transparent" />
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-[rgba(74,222,128,0.10)] text-[10px] font-bold text-[#4ade80]">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <figcaption className="text-sm font-semibold text-[var(--silver)]">{name}</figcaption>
          <p className="font-code text-[10px] text-[rgba(74,222,128,0.60)]">{role}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-[13px] leading-relaxed text-[rgba(224,224,224,0.50)]">
        &ldquo;{body}&rdquo;
      </blockquote>
    </figure>
  )
}

/* ── Timeline node (glowing dot on the central line) ── */

function TimelineNode({ isCurrent, index }: { isCurrent: boolean; index: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15, type: 'spring', stiffness: 300, damping: 20 }}
      className="absolute left-1/2 top-10 z-10 -translate-x-1/2 md:top-10"
    >
      {/* Outer glow ring */}
      {isCurrent && (
        <div className="absolute inset-0 -m-2 animate-pulse-glow rounded-full bg-[rgba(74,222,128,0.20)] blur-md" />
      )}
      {/* Node */}
      <div
        className={`relative h-4 w-4 rounded-full border-2 ${
          isCurrent
            ? 'border-[#4ade80] bg-[rgba(74,222,128,0.30)] shadow-[0_0_12px_rgba(74,222,128,0.5)]'
            : 'border-[rgba(224,224,224,0.30)] bg-[var(--void)]'
        }`}
      >
        {isCurrent && (
          <div className="absolute inset-[3px] rounded-full bg-[#4ade80]" />
        )}
      </div>
    </motion.div>
  )
}

/* ── Experience card ── */

function ExperienceCard({
  exp,
  index,
  side,
}: {
  exp: (typeof experiences)[0]
  index: number
  side: 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === 'left' ? -60 : 60, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full md:w-[calc(50%-2rem)] ${
        side === 'left' ? 'md:mr-auto md:pr-4' : 'md:ml-auto md:pl-4'
      }`}
    >
      <LightWaveEffect
        accentColor="74, 222, 128"
        className="group"
      >
        <div className="relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 md:p-8 backdrop-blur-md transition-all duration-500 hover:border-[rgba(74,222,128,0.25)] hover:shadow-[0_0_40px_rgba(74,222,128,0.06)]">
          {/* Accent gradient top edge */}
          <div
            className={`absolute inset-x-0 top-0 h-px ${
              exp.isCurrent
                ? 'bg-gradient-to-r from-transparent via-[rgba(74,222,128,0.8)] to-transparent'
                : 'bg-gradient-to-r from-transparent via-[rgba(224,224,224,0.20)] to-transparent'
            }`}
          />

          {/* Period badge */}
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 font-code text-[10px] tracking-wider ${
                exp.isCurrent
                  ? 'border border-[rgba(74,222,128,0.30)] bg-[rgba(74,222,128,0.05)] text-[#4ade80]'
                  : 'border border-[rgba(224,224,224,0.10)] bg-white/[0.03] text-[rgba(224,224,224,0.40)]'
              }`}
            >
              {exp.period}
            </span>
            {exp.isCurrent && (
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]" />
                </span>
                <span className="font-code text-[9px] tracking-wider text-[#4ade80]">ACTIVE</span>
              </span>
            )}
          </div>

          {/* Role & company */}
          <div className="mt-4">
            <h3 className="font-sans text-xl font-bold tracking-tight text-[var(--silver)] md:text-2xl">
              {exp.role}
            </h3>
            <p className="mt-1 font-code text-xs text-[rgba(74,222,128,0.80)]">
              {exp.company}
            </p>
            <p className="mt-0.5 font-code text-[10px] text-[rgba(224,224,224,0.30)]">
              {exp.location}
            </p>
          </div>

          {/* Bullet points */}
          <ul className="mt-5 space-y-3">
            {exp.points.map((point, j) => (
              <motion.li
                key={j}
                initial={{ opacity: 0, x: -15 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + j * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-3 text-[13px] leading-relaxed text-[rgba(224,224,224,0.50)]"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[rgba(74,222,128,0.40)]" />
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>

          {/* Hover connector line to timeline (desktop) */}
          <div
            className={`absolute top-12 hidden h-px w-8 md:block ${
              exp.isCurrent ? 'bg-[rgba(74,222,128,0.30)]' : 'bg-[rgba(224,224,224,0.10)]'
            } ${side === 'left' ? '-right-8' : '-left-8'}`}
          />
        </div>
      </LightWaveEffect>
    </motion.div>
  )
}

/* ── Certification card ── */

function CertCard({ cert, index }: { cert: (typeof certifications)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 backdrop-blur-md transition-all duration-500 hover:border-[rgba(74,222,128,0.25)] hover:shadow-[0_0_20px_rgba(74,222,128,0.06)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(74,222,128,0.40)] to-transparent" />

      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[rgba(74,222,128,0.20)] bg-[rgba(74,222,128,0.08)]">
          <svg className="h-4 w-4 text-[#4ade80]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
          </svg>
        </div>
        <div className="min-w-0">
          <h4 className="font-sans text-sm font-semibold tracking-tight text-[var(--silver)]">
            {cert.name}
          </h4>
          <p className="font-code text-[10px] text-[rgba(74,222,128,0.80)]">
            {cert.org} &middot; {cert.year}
          </p>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {cert.desc.split(' · ').map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-[rgba(74,222,128,0.15)] bg-[rgba(74,222,128,0.06)] px-2 py-px font-code text-[9px] text-[rgba(74,222,128,0.60)]"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

/* ── Main section ── */

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%'])

  return (
    <section ref={sectionRef} id="experience" className="section">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-code text-xs tracking-widest text-[#4ade80]">// SELECTED EXPERIENCE</p>
        <h2 className="mt-2 font-sans text-4xl md:text-5xl tracking-tighter font-medium italic">
          Experience
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative mt-10">
        {/* Central line (desktop) */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block">
          {/* Background track */}
          <div className="h-full w-full bg-gradient-to-b from-[rgba(74,222,128,0.10)] via-[rgba(74,222,128,0.5)] to-transparent" />
          {/* Animated fill */}
          <motion.div
            className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-[rgba(74,222,128,0.40)] via-[rgba(74,222,128,0.20)] to-transparent"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Mobile line (left edge) */}
        <div className="absolute left-4 top-0 h-full w-px md:hidden">
          <div className="h-full w-full bg-gradient-to-b from-[rgba(74,222,128,0.10)] via-[rgba(74,222,128,0.5)] to-transparent" />
          <motion.div
            className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-[rgba(74,222,128,0.40)] via-[rgba(74,222,128,0.20)] to-transparent"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Experience entries */}
        <div className="space-y-8 md:space-y-10">
          {experiences.map((exp, i) => (
            <div key={i} className="relative pl-10 md:pl-0">
              {/* Mobile node */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15, type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute left-4 top-8 z-10 -translate-x-1/2 md:hidden"
              >
                <div
                  className={`h-3 w-3 rounded-full border-2 ${
                    exp.isCurrent
                      ? 'border-[#4ade80] bg-[rgba(74,222,128,0.30)] shadow-[0_0_10px_rgba(74,222,128,0.4)]'
                      : 'border-[rgba(224,224,224,0.30)] bg-[var(--void)]'
                  }`}
                >
                  {exp.isCurrent && (
                    <div className="absolute inset-[2px] rounded-full bg-[#4ade80]" />
                  )}
                </div>
              </motion.div>

              {/* Desktop node */}
              <TimelineNode isCurrent={exp.isCurrent} index={i} />

              {/* Card */}
              <ExperienceCard exp={exp} index={i} side={i % 2 === 0 ? 'left' : 'right'} />


              {/* Standalone text animation in the left-side gap (desktop only) */}
              {i === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-full mt-4 hidden w-[calc(50%-2rem)] md:block md:pr-4"
                >
                  <div className="relative flex min-h-[320px] items-center justify-center">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.08),transparent_65%)]" />
                    <LayeredText
                      lines={[
                        { top: '\u00A0', bottom: 'DISCIPLINE' },
                        { top: 'DISCIPLINE', bottom: 'SYSTEMS' },
                        { top: 'SYSTEMS', bottom: 'CRAFT' },
                        { top: 'CRAFT', bottom: 'CALIBRATED' },
                        { top: 'CALIBRATED', bottom: '\u00A0' },
                      ]}
                      fontSize="46px"
                      fontSizeMd="28px"
                      lineHeight={46}
                      lineHeightMd={30}
                      className="py-0 font-black tracking-[-1.8px] uppercase text-white"
                    />
                  </div>
                </motion.div>
              )}

              {/* CPU Architecture visual — right side of first entry (desktop only) */}
              {i === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-4 hidden w-[calc(50%-2.5rem)] items-center justify-center md:flex"
                >
                  <div className="relative w-full rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-md">
                    <CpuArchitecture
                      text="ARZ"
                      className="text-[rgba(224,224,224,0.20)]"
                    />
                    {/* Label beneath */}
                    <p className="mt-3 text-center font-code text-[9px] tracking-[0.2em] text-[rgba(224,224,224,0.20)]">
                      SYSTEM ARCHITECTURE
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3D Testimonials Marquee */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group mt-24 md:mt-32"
      >
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className="relative -top-[50px] hidden w-[332px] shrink-0 md:block">
            <CertCard cert={certifications[0]} index={0} />
          </div>
          <div className="text-right">
            <p className="mb-2 font-code text-xs tracking-widest text-[#4ade80]">// WHAT THEY SAY</p>
            <h3 className="font-sans text-2xl font-medium italic tracking-tight text-[var(--silver)] md:text-3xl">
              Client Voices
            </h3>
          </div>
        </div>

        <div className="relative h-[520px] w-full overflow-hidden">
          {/* Edge fades — combined into fewer layers */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background: `
                linear-gradient(to bottom, var(--void) 0%, transparent 20%),
                linear-gradient(to top, var(--void) 0%, transparent 20%),
                linear-gradient(to right, var(--void) 0%, transparent 12%),
                linear-gradient(to left, var(--void) 0%, transparent 12%)
              `,
            }}
          />

          {/* Angled marquee columns — rotated 30deg */}
          <div className="flex h-full items-center justify-center">
            <div
              // Rotated marquee only from md up — at phone width the 30deg
              // tilt pushes cards off both edges and makes quotes unreadable.
              className="flex gap-4 will-change-transform md:[transform:rotate(30deg)_scale(1.15)_translateZ(0)]"
              style={{ transformOrigin: 'center center' }}
            >
              <VerticalMarquee className="h-[600px]" duration="25s" pauseOnHover>
                <ReviewCard {...testimonials[0]} />
                <ReviewCard {...testimonials[4]} />
              </VerticalMarquee>

              <VerticalMarquee className="h-[600px]" duration="20s" reverse pauseOnHover>
                <ReviewCard {...testimonials[1]} />
                <ReviewCard {...testimonials[5]} />
              </VerticalMarquee>

              <VerticalMarquee className="h-[600px] hidden md:flex" duration="23s" pauseOnHover>
                <ReviewCard {...testimonials[2]} />
                <ReviewCard {...testimonials[6]} />
              </VerticalMarquee>

              <VerticalMarquee className="h-[600px] hidden lg:flex" duration="18s" reverse pauseOnHover>
                <ReviewCard {...testimonials[3]} />
                <ReviewCard {...testimonials[7]} />
              </VerticalMarquee>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
