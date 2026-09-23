'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { caseStudies, STATUS_LABEL } from '@/lib/content/projects'
import { FeatureCarousel, type CarouselStep } from '@/components/ui/animated-feature-carousel'
import { Marquee } from '@/components/ui/marquee'
import { useTilt3D } from '@/hooks/use-tilt-3d'
import { type CarouselApi } from '@/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'

/* ── Featured project carousel data ── */

const readyPISteps: CarouselStep[] = [
  {
    id: 'rpi-1',
    name: '// PLATFORM',
    title: 'One API. 150+ Models.',
    description:
      'Access GPT-4o, Claude, Gemini, Llama, DeepSeek and 150+ models through one standardized API. Pay in your local currency — always.',
    image: '/screenshots/readypi-desktop.webp',
  },
  {
    id: 'rpi-2',
    name: '// INTEGRATION',
    title: 'Drop-in OpenAI Compatibility',
    description:
      'Don\'t rewrite your code. ReadyPI uses the exact same API format as OpenAI. Just change your base URL and API key — instant access to the entire AI ecosystem.',
    image: '/screenshots/readypi-dashboard.webp',
  },
  {
    id: 'rpi-3',
    name: '// ANALYTICS',
    title: 'Real-time Usage Dashboard',
    description:
      'Track requests, tokens, latency and cost in real-time. Model distribution breakdown, usage graphs, and exportable request logs — all in one view.',
    image: '/screenshots/readypi-quickstart.webp',
  },
]

const rawFXSteps: CarouselStep[] = [
  {
    id: 'rfx-1',
    name: '// HERO',
    title: 'I Create Reality.',
    description:
      'Cinematic hero experience — immersive full-screen videography portfolio with scroll-triggered animations and showreel integration.',
    image: '/screenshots/rawfx-1.webp',
  },
  {
    id: 'rfx-2',
    name: '// PRODUCT',
    title: 'Luxury Product Shoots',
    description:
      'High-end product photography showcase with mood-based filtering, studio metadata overlays, and cinematic parallax transitions.',
    image: '/screenshots/rawfx-2.webp',
  },
  {
    id: 'rfx-3',
    name: '// MOTION',
    title: 'Motion Gallery',
    description:
      'Outdoor & action cinematography — golden hour compositions with Sony A6700, 35mm/50mm lens data, and S-LOG3 color science.',
    image: '/screenshots/rawfx-3.webp',
  },
]

/* ── Other projects (compact grid) ── */

type Project = {
  id: string
  title: string
  desc: string
  tags: string[]
  link: string
  status: string
  image: string
}

/**
 * Derived from lib/content/projects.ts rather than hardcoded, so a project
 * added there shows up here, on /work and in the sitemap without three edits.
 * ReadyPI and Raw FX are excluded — they get their own FeatureCarousel above.
 */
const FEATURED_ABOVE = ['readypi', 'raw-fx-studio']

const otherProjects: Project[] = caseStudies
  .filter((c) => !FEATURED_ABOVE.includes(c.slug))
  .map((c) => ({
    id: c.slug,
    title: c.title,
    desc: c.tagline,
    tags: [...c.stack],
    link: c.url,
    status: STATUS_LABEL[c.status],
    image: c.cover.src,
  }))

/* ── Browser mockup frame ── */

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_18px_56px_rgba(0,0,0,0.4)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(74,222,128,0.1),transparent_45%)]" />
      {/* Chrome bar */}
      <div className="relative flex items-center gap-2 border-b border-white/10 bg-[#111] px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 ml-3 px-3 py-1 rounded-md bg-white/[0.06] text-[10px] font-code text-white/30 truncate">
          {displayUrl}
        </div>
      </div>
      {/* Content */}
      {children}
    </div>
  )
}

/* ── Image with parallax scroll on hover ── */

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full overflow-hidden bg-[var(--void)] h-44 md:h-56">
      <Image
        src={src}
        alt={alt}
        width={1280}
        height={2816}
        sizes="(min-width: 768px) 33vw, 100vw"
        className="h-[220%] w-full object-cover object-top transition-[object-position,transform] duration-[6s] ease-in-out group-hover:object-bottom group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-70" />
    </div>
  )
}

/* ── Border trace glow SVG overlay ── */

function BorderTrace({ active }: { active: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      aria-hidden
    >
      {/* Top border trace */}
      <motion.div
        className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#4ade80] to-transparent"
        initial={{ width: 0, opacity: 0 }}
        animate={active ? { width: '100%', opacity: [0, 1, 0.8, 0] } : { width: 0, opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{ boxShadow: '0 0 8px rgba(74,222,128,0.8), 0 0 16px rgba(74,222,128,0.4)' }}
      />
      {/* Right border trace */}
      <motion.div
        className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#4ade80] to-transparent"
        initial={{ height: 0, opacity: 0 }}
        animate={active ? { height: '100%', opacity: [0, 1, 0.8, 0] } : { height: 0, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
        style={{ boxShadow: '0 0 8px rgba(74,222,128,0.8), 0 0 16px rgba(74,222,128,0.4)' }}
      />
      {/* Bottom border trace */}
      <motion.div
        className="absolute bottom-0 right-0 h-[1px] bg-gradient-to-l from-transparent via-[#4ade80] to-transparent"
        initial={{ width: 0, opacity: 0 }}
        animate={active ? { width: '100%', opacity: [0, 1, 0.8, 0] } : { width: 0, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: 'easeInOut' }}
        style={{ boxShadow: '0 0 8px rgba(74,222,128,0.8), 0 0 16px rgba(74,222,128,0.4)' }}
      />
      {/* Left border trace */}
      <motion.div
        className="absolute bottom-0 left-0 w-[1px] h-full bg-gradient-to-t from-transparent via-[#4ade80] to-transparent"
        initial={{ height: 0, opacity: 0 }}
        animate={active ? { height: '100%', opacity: [0, 1, 0.8, 0] } : { height: 0, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.9, ease: 'easeInOut' }}
        style={{ boxShadow: '0 0 8px rgba(74,222,128,0.8), 0 0 16px rgba(74,222,128,0.4)' }}
      />
      {/* Corner glow pulses */}
      {active && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-6 h-6 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(74,222,128,0.5) 0%, transparent 70%)',
              boxShadow: '0 0 20px rgba(74,222,128,0.6)',
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.8] }}
            transition={{ duration: 1.5, delay: 0.1 }}
          />
          <motion.div
            className="absolute top-0 right-0 w-6 h-6 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(74,222,128,0.5) 0%, transparent 70%)',
              boxShadow: '0 0 20px rgba(74,222,128,0.6)',
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.8] }}
            transition={{ duration: 1.5, delay: 0.4 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-6 h-6 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(74,222,128,0.5) 0%, transparent 70%)',
              boxShadow: '0 0 20px rgba(74,222,128,0.6)',
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.8] }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-6 h-6 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(74,222,128,0.5) 0%, transparent 70%)',
              boxShadow: '0 0 20px rgba(74,222,128,0.6)',
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.8] }}
            transition={{ duration: 1.5, delay: 1.0 }}
          />
        </>
      )}
    </motion.div>
  )
}

/* ── Compact project card (3D tilt + parallax + border trace) ── */

function CompactProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, tilt, isHovering, handleMouseMove, handleMouseEnter, handleMouseLeave } = useTilt3D(
    10, 12, 1.03
  )

  return (
    // No per-card whileInView: inside the Embla carousel, off-screen slides
    // only enter by transform, and on phones they could stay at opacity 0
    // (blank card). The wrapping section already animates in.
    <motion.article
      data-index={index}
      className="group"
      ref={ref as React.Ref<HTMLElement>}
      onMouseMove={handleMouseMove as unknown as React.MouseEventHandler<HTMLElement>}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '800px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3D tilt outer wrapper */}
      <motion.div
        className="relative"
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: tilt.scale,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card surface glow on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(74,222,128,0.1) 0%, transparent 62%)',
            opacity: isHovering ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
          aria-hidden
        />

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {/* Border trace effect */}
          <div className="relative">
            <BorderTrace active={isHovering} />
            <BrowserFrame url={project.link}>
              {/* Parallax image */}
              <div className="relative overflow-hidden">
                <ParallaxImage src={project.image} alt={project.title} />

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 z-20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovering ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
                  <motion.div
                    className="relative rounded-full border border-[rgba(74,222,128,0.55)] bg-[rgba(74,222,128,0.12)] px-5 py-2.5 backdrop-blur-sm"
                    animate={isHovering ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="font-code text-xs tracking-widest text-[#4ade80]">
                      VIEW LIVE SITE
                    </span>
                  </motion.div>
                </motion.div>

                {/* Parallax inner image shift */}
                <motion.div
                  className="absolute inset-0 z-10"
                  animate={{
                    x: isHovering ? tilt.rotateY * -1.5 : 0,
                    y: isHovering ? tilt.rotateX * 1.5 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  style={{ willChange: 'transform' }}
                />
              </div>
            </BrowserFrame>
          </div>
        </a>

        {/* Content — slightly lifts on hover */}
        <motion.div
          className="mt-4 px-1"
          animate={{ y: isHovering ? -4 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          <div className="flex items-center gap-3">
            <motion.h3
              className="font-sans text-base font-semibold tracking-tight md:text-lg"
              animate={{ color: isHovering ? 'rgba(224,224,224,0.95)' : 'rgba(224,224,224,0.85)' }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
            <span className="rounded-full border border-[rgba(74,222,128,0.30)] px-2 py-0.5 font-code text-[9px] tracking-wider text-[#4ade80]">
              {project.status}
            </span>
          </div>
          <p className="mt-1.5 font-sans text-xs leading-relaxed text-[rgba(224,224,224,0.50)] max-w-lg">
            {project.desc}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <motion.span
                key={t}
                className="rounded-full border border-[var(--card-border)] px-2.5 py-0.5 font-code text-[10px] text-[rgba(224,224,224,0.40)]"
                animate={{
                  borderColor: isHovering ? 'rgba(74,222,128,0.25)' : 'rgba(255,255,255,0.08)',
                  color: isHovering ? 'rgba(74,222,128,0.5)' : 'rgba(224,224,224,0.4)',
                }}
                transition={{ duration: 0.3 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.article>
  )
}

/* ── Auto-scrolling projects carousel ── */

function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0)
        api.scrollTo(0)
      } else {
        api.scrollNext()
        setCurrent(current + 1)
      }
    }, 3500)

    return () => clearTimeout(timer)
  }, [api, current])

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{ align: 'start', loop: true }}
        className="w-full"
      >
        <CarouselPrevious className="hidden md:flex left-0 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-white/10 bg-[var(--void)] text-white hover:bg-white/5" />
        <CarouselNext className="hidden md:flex right-0 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-white/10 bg-[var(--void)] text-white hover:bg-white/5" />

        <CarouselContent>
          {projects.map((p, i) => (
            <CarouselItem key={p.id} className="basis-full md:basis-1/3 pl-4">
              <CompactProjectCard project={p} index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center gap-2">
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => {
              setCurrent(i)
              api?.scrollTo(i)
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              current === i
                ? 'w-6 bg-[#4ade80]'
                : 'w-1.5 bg-white/20 hover:bg-white/30'
            }`}
            aria-label={`Go to ${p.title}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Main section ── */

export default function ProjectsSection() {
  return (
    <section id="projects" className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_70%_at_12%_12%,rgba(74,222,128,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_88%_86%,rgba(74,222,128,0.08),transparent_62%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <p className="font-code text-xs tracking-widest text-[#4ade80]">// WHAT I&apos;VE SHIPPED</p>
        <h2 className="mt-2 bg-gradient-to-r from-[var(--silver)] via-white to-[rgba(74,222,128,0.85)] bg-clip-text font-sans text-4xl font-medium italic tracking-tight text-transparent md:text-5xl">
          Key Projects
        </h2>
      </motion.div>

      {/* Featured project carousels */}
      <div className="relative z-10 mt-14 space-y-20">
        <FeatureCarousel
          steps={readyPISteps}
          projectTitle="ReadyPI"
          projectLink="https://readypi.online"
          tags={['Next.js', 'Node.js', 'REST APIs', 'TypeScript']}
          status="LIVE"
          interval={5000}
        />

        {/* ── Tech stack marquee divider ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="py-4 md:py-6"
        >
          <Marquee
            duration={40}
            pauseOnHover
            direction="left"
            fade
            fadeAmount={10}
          >
            {[
              'React', 'Next.js', 'Tailwind', 'TypeScript', 'Supabase',
              'Node.js', 'Python', 'Three.js', 'Framer Motion', 'GSAP',
              'PostgreSQL', 'Firebase', 'Vercel', 'LangChain', 'Docker',
            ].map((tech) => (
              <span
                key={tech}
                className="mx-8 text-2xl font-medium text-white/90 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </Marquee>
        </motion.div>

        <FeatureCarousel
          steps={rawFXSteps}
          projectTitle="Raw FX Studio"
          projectLink="https://raw-fx.vercel.app/"
          tags={['Next.js', 'GSAP', 'Framer Motion', 'Vercel']}
          status="LIVE"
          interval={5000}
        />
      </div>

      {/* Other projects - auto-scrolling carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 mt-20"
      >
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-3 md:p-6 shadow-[0_14px_44px_rgba(0,0,0,0.3)]">
          <p className="mb-6 md:mb-8 font-code text-[10px] tracking-[0.3em] text-[rgba(224,224,224,0.30)] pl-2 md:pl-0">// WEBS IN MOTION</p>
          <ProjectsCarousel projects={otherProjects} />
        </div>
      </motion.div>

      {/* Internal links into the case studies — the crawlable long-form
          versions of everything above. */}
      <div className="relative z-10 mt-12">
        <p className="font-code text-[10px] tracking-[0.3em] text-[rgba(224,224,224,0.3)]">// FULL WRITE-UPS</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {caseStudies.map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 font-code text-[11px] tracking-[0.14em] text-[rgba(224,224,224,0.6)] transition-colors hover:border-[rgba(74,222,128,0.4)] hover:text-[#4ade80]"
            >
              {c.title}
            </Link>
          ))}
          <Link
            href="/work"
            className="rounded-full border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.06)] px-4 py-2 font-code text-[11px] tracking-[0.14em] text-[#4ade80] transition-colors hover:bg-[rgba(74,222,128,0.14)]"
          >
            ALL CASE STUDIES <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}