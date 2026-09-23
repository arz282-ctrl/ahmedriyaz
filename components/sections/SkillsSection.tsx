'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect, useCallback } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import OrbitingSkills from '@/components/ui/orbiting-skills'

const skills = [
  {
    id: 'item-1',
    title: 'Agentic AI Systems',
    count: 6,
    image: '/skills/agentic-ai.webp',
    description: 'Multi-agent pipelines with LangChain, LangGraph, CrewAI — intelligent automation for real business operations.',
    tags: ['LangChain', 'LangGraph', 'CrewAI', 'RAG', 'Vector DB'],
  },
  {
    id: 'item-2',
    title: 'AI Automation',
    count: 8,
    image: '/skills/ai-automation.webp',
    description: 'End-to-end automation — booking agents, customer service bots, AI-powered workflows with n8n and Python.',
    tags: ['n8n', 'Claude API', 'Python', 'FastAPI', 'Webhooks'],
  },
  {
    id: 'item-3',
    title: 'Web Engineering',
    count: 12,
    image: '/skills/web-engineering.webp',
    description: 'Fast, responsive, production-grade apps with Next.js, React & TypeScript deployed on Vercel.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Vercel'],
  },
  {
    id: 'item-4',
    title: 'Shopify & E-Commerce',
    count: 5,
    image: '/skills/shopify-ecommerce.webp',
    description: 'Custom Shopify stores with Liquid, Meta Pixel, local payments, and WhatsApp commerce flows.',
    tags: ['Shopify', 'Liquid', 'Dawn OS 2.0', 'bKash', 'Nagad'],
  },
  {
    id: 'item-5',
    title: 'Meta Ads & Lead Gen',
    count: 10,
    image: '/skills/meta-ads.webp',
    description: 'High-performing Facebook/Instagram campaigns with AI-powered creatives, copy & conversion optimization.',
    tags: ['Meta Ads', 'Meta Pixel', 'AI Studio', 'A/B Testing'],
  },
  {
    id: 'item-6',
    title: 'AI Creative & Design',
    count: 7,
    image: '/skills/ai-creative.webp',
    description: 'Generating ad creatives, product visuals, and brand systems with AI-native design tools.',
    tags: ['Figma', 'Midjourney', 'Canva AI', 'Framer', 'Webflow'],
  },
]

export default function SkillsSection() {
  const visualRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.12),
        y: lerp(prev.y, mousePosition.y, 0.12),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [mousePosition])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index)
    setIsVisible(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null)
    setIsVisible(false)
  }, [])

  return (
    <section id="skills" ref={containerRef} onMouseMove={handleMouseMove} className="section relative overflow-hidden bg-[rgba(3,6,8,0.46)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_72%_at_14%_8%,rgba(74,222,128,0.1),transparent_56%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(72%_58%_at_86%_88%,rgba(50,180,100,0.1),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,6,8,0.18),rgba(3,6,8,0.68)_62%,rgba(3,6,8,0.9))]" />

      {/* Cursor-following image preview (desktop only) */}
      <div
        className="pointer-events-none fixed z-50 hidden overflow-hidden rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(74,222,128,0.1)] lg:block"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${smoothPosition.x + 24}px, ${smoothPosition.y - 110}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.85,
          transition: 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), scale 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="relative h-[200px] w-[300px] overflow-hidden rounded-2xl border border-[rgba(74,222,128,0.2)] bg-[#04090c]">
          {skills.map((skill, index) => (
            <Image
              key={skill.id}
              src={skill.image}
              alt={skill.title}
              width={300}
              height={200}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale: hoveredIndex === index ? 1 : 1.1,
                filter: hoveredIndex === index ? 'none' : 'blur(10px)',
              }}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(3,6,8,0.4)] via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]" />
        </div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <p className="font-code text-xs tracking-widest text-[#4ade80]">// CORE CAPABILITIES</p>
        <h2 className="mt-2 bg-gradient-to-r from-[var(--silver)] via-white to-[rgba(74,222,128,0.9)] bg-clip-text font-sans text-4xl font-medium italic tracking-tight text-transparent drop-shadow-[0_0_20px_rgba(74,222,128,0.12)] md:text-5xl">
          Execution Stack
        </h2>
      </motion.div>

      {/* Desktop/Tablet: Side by side | Mobile: Stacked */}
      <div className="relative z-10 mt-14 flex flex-col lg:flex-row lg:items-center lg:gap-8">
        {/* Left: Feature Accordion */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full lg:w-[62%]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(3,6,8,0.85)] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.5)] backdrop-blur-sm md:p-5">
            <Accordion type="multiple" defaultValue={[skills[0].id]} className="relative z-10 w-full">
              {skills.map((skill, index) => (
                <AccordionItem
                  key={skill.id}
                  value={skill.id}
                  className="overflow-hidden border-b border-[rgba(74,222,128,0.16)]/60 last:border-b-0"
                >
                  <AccordionTrigger
                    className="group flex items-center gap-4 rounded-xl px-2 py-4 text-left hover:no-underline data-[state=open]:bg-[rgba(74,222,128,0.08)]"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {
                      setTimeout(() => {
                        visualRefs.current[skill.id]?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'nearest',
                        })
                      }, 220)
                    }}
                  >
                    <Image
                      src={skill.image}
                      alt={skill.title}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-lg border border-white/10 object-cover shadow-[0_0_16px_rgba(74,222,128,0.12)]"
                    />
                    <span className="flex-1 font-sans text-base font-normal tracking-wide text-[rgba(224,224,224,0.92)] transition-colors group-hover:text-[#4ade80]">
                      {skill.title}
                    </span>
                    <span className="rounded-full border border-[rgba(74,222,128,0.35)] bg-[rgba(74,222,128,0.1)] px-2.5 py-0.5 font-code text-[10px] font-semibold text-[rgba(74,222,128,0.95)]">
                      ({skill.count})
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="px-2 pb-5 pt-2">
                    <div className="grid gap-4 md:grid-cols-[1.05fr_1fr] md:items-start">
                      <div className="relative overflow-hidden rounded-xl border border-[rgba(74,222,128,0.25)] bg-[#04090c]">
                        <Image
                          src={skill.image}
                          alt={skill.title}
                          width={500}
                          height={300}
                          className="h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                      </div>

                      <div
                        ref={(el) => {
                          visualRefs.current[skill.id] = el
                        }}
                        className="space-y-3"
                      >
                        <p className="text-sm font-sans font-medium leading-relaxed text-[rgba(224,224,224,0.76)]">
                          {skill.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {skill.tags.map((t) => (
                            <span key={t} className="rounded-full border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.08)] px-2.5 py-0.5 font-code text-[10px] text-[rgba(74,222,128,0.95)]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>

        {/* Right: Orbiting Skills (hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:flex w-full lg:w-[38%] items-center justify-center mt-12 lg:mt-0"
        >
          <div className="relative w-full">
            <OrbitingSkills />
          </div>
        </motion.div>

        {/* Mobile: Horizontal scroll of skill cards */}
        <div className="mt-8 md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="w-[78vw] max-w-[320px] min-w-[240px] snap-center flex-shrink-0 rounded-2xl border border-[rgba(74,222,128,0.18)] bg-[linear-gradient(180deg,rgba(3,6,8,0.9),rgba(3,6,8,0.72))] p-4 shadow-[0_12px_36px_rgba(0,0,0,0.44)]"
              >
                <Image
                  src={skill.image}
                  alt={skill.title}
                  width={260}
                  height={140}
                  className="h-[140px] w-full rounded-xl border border-[rgba(74,222,128,0.2)] object-cover"
                />
                <div className="mt-3 flex items-center justify-between gap-2">
                  <h4 className="font-sans text-sm font-medium text-[rgba(224,224,224,0.92)]">{skill.title}</h4>
                  <span className="rounded-full border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.08)] px-2 py-0.5 font-code text-[9px] text-[rgba(74,222,128,0.9)]">({skill.count})</span>
                </div>
                <p className="mt-1 font-sans text-[10px] leading-relaxed text-[rgba(224,224,224,0.62)]">{skill.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {skill.tags.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full border border-[rgba(74,222,128,0.25)] bg-[rgba(74,222,128,0.07)] px-2 py-0.5 font-code text-[9px] text-[rgba(74,222,128,0.88)]">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
