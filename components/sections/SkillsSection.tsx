'use client'

import Image from 'next/image'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

/**
 * Execution Stack (#skills).
 *
 * Desktop: a sticky scroll-scrub. The right-hand 4:5 stage stays pinned while
 * scroll progress selects the active capability; the list is also keyboard
 * operable. Mobile: one accordion row open at a time, with the visual inside
 * the open row only. Agentic + Creative play looping video while the stage is
 * on screen; reduced motion never mounts a video.
 *
 * Text colours are solid values that clear WCAG AA on #030608 (the dimmest,
 * #9aa0a0, is about 7:1). Nothing here is set below 11px.
 */

const SCROLL_STEP_VH = 60

type Variant = 'mobile' | 'desktop'
type MotionMode = 'pending' | 'reduce' | 'ok'

type VideoAsset = {
  /** Short description appended to the accessible name. */
  label: string
  poster: Record<Variant, string>
  still: Record<Variant, string>
  webm: Record<Variant, string>
  mp4: Record<Variant, string>
}

type Capability = {
  id: string
  title: string
  description: string
  tags: string[]
  /** Object-position for the desktop crop. */
  position: string
  /** Mobile crop. Falls back to `position`. Agentic keeps the ARZ DEV header in frame. */
  mobilePosition?: string
  image?: string
  video?: VideoAsset
}

const CAPABILITIES: Capability[] = [
  {
    id: 'agentic',
    title: 'Agentic AI Systems',
    description:
      'Multi-agent pipelines with LangChain, LangGraph, CrewAI — intelligent automation for real business operations.',
    tags: ['LangChain', 'LangGraph', 'CrewAI', 'RAG', 'Vector DB'],
    position: '50% 40%',
    mobilePosition: '50% 34%',
    video: {
      label: 'agent workflow animation',
      poster: { mobile: '/stack/agentic-poster-750.webp', desktop: '/stack/agentic-poster-1200.webp' },
      still: { mobile: '/stack/agentic-still-750.webp', desktop: '/stack/agentic-still-1200.webp' },
      webm: { mobile: '/stack/agentic-750.webm', desktop: '/stack/agentic-1200.webm' },
      mp4: { mobile: '/stack/agentic-750.mp4', desktop: '/stack/agentic-1200.mp4' },
    },
  },
  {
    id: 'creative',
    title: 'AI Creative & Design',
    description: 'Generating ad creatives, product visuals, and brand systems with AI-native design tools.',
    tags: ['Figma', 'Midjourney', 'Canva AI', 'Framer', 'Webflow'],
    position: '50% 38%',
    video: {
      label: 'AI product visual generation animation',
      poster: { mobile: '/stack/creative-poster-750.webp', desktop: '/stack/creative-poster-1200.webp' },
      still: { mobile: '/stack/creative-still-750.webp', desktop: '/stack/creative-still-1200.webp' },
      webm: { mobile: '/stack/creative-750.webm', desktop: '/stack/creative-1200.webm' },
      mp4: { mobile: '/stack/creative-750.mp4', desktop: '/stack/creative-1200.mp4' },
    },
  },
  {
    id: 'automation',
    title: 'AI Automation',
    description:
      'End-to-end automation — booking agents, customer service bots, AI-powered workflows with n8n and Python.',
    tags: ['n8n', 'Claude API', 'Python', 'FastAPI', 'Webhooks'],
    position: '55% 40%',
    image: '/stack/automation.webp',
  },
  {
    id: 'web',
    title: 'Web Engineering',
    description: 'Fast, responsive, production-grade apps with Next.js, React & TypeScript deployed on Vercel.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Vercel'],
    position: '50% 30%',
    image: '/stack/web.webp',
  },
  {
    id: 'shopify',
    title: 'Shopify & E-Commerce',
    description: 'Custom Shopify stores with Liquid, Meta Pixel, local payments, and WhatsApp commerce flows.',
    tags: ['Shopify', 'Liquid', 'Dawn OS 2.0', 'bKash', 'Nagad'],
    position: '50% 35%',
    image: '/stack/shopify.webp',
  },
  {
    id: 'meta',
    title: 'Meta Ads & Lead Gen',
    description:
      'High-performing Facebook/Instagram campaigns with AI-powered creatives, copy & conversion optimization.',
    tags: ['Meta Ads', 'Meta Pixel', 'AI Studio', 'A/B Testing'],
    position: '55% 40%',
    image: '/stack/meta.webp',
  },
]

const COUNT = CAPABILITIES.length
const TOTAL = String(COUNT).padStart(2, '0')
const SIZES = '(min-width:768px) 44vw, calc(100vw - 40px)'

function num(index: number) {
  return String(index + 1).padStart(2, '0')
}

/** Document Y of an element. offsetTop stops at the nearest positioned ancestor. */
function documentTop(el: HTMLElement) {
  return el.getBoundingClientRect().top + window.scrollY
}

function useMatchMedia(query: string, serverSnapshot: boolean) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => serverSnapshot,
  )
}

function StackVideo({
  poster,
  webm,
  mp4,
  label,
  position,
  active,
}: {
  poster: string
  webm: string
  mp4: string
  label: string
  position: string
  active: boolean
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const onScreen = useRef(false)
  // Sources stay unmounted until the stage is actually on screen, so a
  // below-fold (or reduced-motion-swapped) player never fetches video bytes.
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting
        if (active && entry.isIntersecting) {
          setArmed(true)
          if (video.querySelector('source')) {
            video.preload = 'auto'
            video.muted = true
            void video.play().catch(() => {})
          }
        } else {
          video.pause()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(video)
    return () => {
      io.disconnect()
      video.pause()
    }
  }, [active])

  useEffect(() => {
    const video = ref.current
    if (!video || !armed || !active || !onScreen.current) return
    video.preload = 'auto'
    video.muted = true
    void video.play().catch(() => {})
  }, [armed, active])

  return (
    <video
      ref={ref}
      autoPlay={active && armed}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={label}
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: position }}
    >
      {armed ? (
        <>
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </>
      ) : null}
    </video>
  )
}

function StackVisual({
  cap,
  index,
  variant,
  active,
  motion,
  isDesktop,
}: {
  cap: Capability
  index: number
  variant: Variant
  active: boolean
  motion: MotionMode
  isDesktop: boolean
}) {
  const position = variant === 'mobile' ? (cap.mobilePosition ?? cap.position) : cap.position
  const onThisViewport = variant === 'desktop' ? isDesktop : !isDesktop
  const playVideo = Boolean(cap.video) && motion === 'ok' && onThisViewport

  if (cap.video && playVideo) {
    return (
      <StackVideo
        poster={cap.video.poster[variant]}
        webm={cap.video.webm[variant]}
        mp4={cap.video.mp4[variant]}
        label={`${cap.title}: ${cap.video.label}`}
        position={position}
        active={active}
      />
    )
  }

  const src = cap.video
    ? motion === 'reduce'
      ? cap.video.still[variant]
      : cap.video.poster[variant]
    : (cap.image as string)

  return (
    <Image
      src={src}
      alt={cap.title}
      fill
      sizes={SIZES}
      quality={80}
      // The first visual is the only one allowed to be eager. The other four
      // illustrations, and Creative, stay lazy. While Agentic is a video the
      // eager slot is its poster (and, under reduced motion, its still).
      priority={index === 0 && variant === 'mobile'}
      className="object-cover"
      style={{ objectPosition: position }}
    />
  )
}

function FadeLayer({
  shown,
  instant,
  children,
}: {
  shown: boolean
  instant?: boolean
  children: ReactNode
}) {
  const [opacity, setOpacity] = useState(instant ? 1 : 0)
  const skipEnter = useRef(Boolean(instant))

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!shown) {
      setOpacity(0)
      return
    }
    if (reduce || skipEnter.current) {
      skipEnter.current = false
      setOpacity(1)
      return
    }
    setOpacity(0)
    const id = requestAnimationFrame(() => setOpacity(1))
    return () => cancelAnimationFrame(id)
  }, [shown])

  return (
    <div
      aria-hidden={!shown}
      className="absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none"
      style={{ opacity }}
    >
      {children}
    </div>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const itemRefs = useRef<Array<HTMLLIElement | null>>([])
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const pending = useRef<number | null>(null)
  const seenRef = useRef<Set<number>>(new Set([0]))

  const [active, setActive] = useState(0)
  const [motionMode, setMotionMode] = useState<MotionMode>('pending')
  const [bar, setBar] = useState<{ top: number; height: number } | null>(null)
  const isDesktop = useMatchMedia('(min-width: 768px)', false)

  const activeRef = useRef(active)
  activeRef.current = active

  if (!seenRef.current.has(active)) seenRef.current.add(active)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setMotionMode(mq.matches ? 'reduce' : 'ok')
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const select = useCallback((index: number) => {
    setActive(index)
    if (!window.matchMedia('(min-width: 768px)').matches) return
    const section = sectionRef.current
    if (!section) return
    pending.current = index
    const scrollable = section.offsetHeight - window.innerHeight
    if (scrollable <= 0) return
    const top = documentTop(section) + ((index + 0.15) / COUNT) * scrollable
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
  }, [])

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)')
    let frame = 0

    const update = () => {
      if (!desktopQuery.matches) return
      const section = sectionRef.current
      if (!section) return
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const scrolled = window.scrollY - documentTop(section)
      const progress = Math.min(1, Math.max(0, scrolled / scrollable))
      const index = Math.min(COUNT - 1, Math.max(0, Math.floor(progress * COUNT + 1e-4)))
      if (pending.current !== null) {
        if (index === pending.current) pending.current = null
        else return
      }
      setActive((prev) => (prev === index ? prev : index))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    const release = () => {
      pending.current = null
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('wheel', release, { passive: true })
    window.addEventListener('touchmove', release, { passive: true })
    desktopQuery.addEventListener('change', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('wheel', release)
      window.removeEventListener('touchmove', release)
      desktopQuery.removeEventListener('change', onScroll)
    }
  }, [])

  useLayoutEffect(() => {
    const root = listRef.current
    if (!root) return
    const measure = () => {
      const el = itemRefs.current[active]
      if (!el) return
      setBar({ top: el.offsetTop + 22, height: Math.max(12, el.offsetHeight - 44) })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    return () => ro.disconnect()
  }, [active])

  const onItemKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next =
      event.key === 'ArrowDown' ? Math.min(COUNT - 1, index + 1)
      : event.key === 'ArrowUp' ? Math.max(0, index - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? COUNT - 1
      : null
    if (next === null || next === index) return
    event.preventDefault()
    select(next)
    buttonRefs.current[next]?.focus()
  }

  const current = CAPABILITIES[active] ?? CAPABILITIES[0]

  return (
    <section id="skills" ref={sectionRef} data-active={num(active)} className="relative scroll-mt-20 bg-[#030608]">
      <style>{`@media (min-width:768px){#skills{height:calc(100vh + ${COUNT} * ${SCROLL_STEP_VH}vh)}}`}</style>

      <div className="md:sticky md:top-0 md:flex md:h-screen md:items-start">
        <div className="mx-auto grid w-full max-w-[1200px] items-start gap-10 px-5 py-16 md:grid-cols-12 md:gap-14 md:px-8 md:pb-12 md:pt-24">
          <div className="md:col-span-5">
            <div className="stack-rise">
              <p className="font-code text-[12px] tracking-[0.18em] text-[#4ade80]">// CORE CAPABILITIES</p>
              <h2 className="mt-3 font-sans text-[40px] font-medium italic leading-none tracking-[-0.03em] text-[#e0e0e0] md:text-[56px]">
                Execution Stack
              </h2>
            </div>

            <p className="sr-only" aria-live="polite">
              {`Figure ${num(active)} of ${TOTAL}, ${current.title}`}
            </p>

            <ol ref={listRef} className="relative m-0 mt-10 list-none p-0 md:mt-12">
              {bar ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-6 hidden w-[2px] rounded-full bg-[#4ade80] md:block motion-safe:transition-[transform,height] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ height: bar.height, transform: `translateY(${bar.top}px)` }}
                />
              ) : null}

              {CAPABILITIES.map((cap, index) => {
                const open = index === active
                const detailId = `stack-detail-${cap.id}`
                const tabId = `stack-tab-${cap.id}`
                return (
                  <li
                    key={cap.id}
                    ref={(el) => {
                      itemRefs.current[index] = el
                    }}
                    className="relative border-t border-[rgba(224,224,224,0.08)] py-[18px] last:border-b md:py-[22px]"
                  >
                    <div className="flex items-start">
                      <span
                        aria-hidden
                        className={`w-9 shrink-0 pt-1 font-code text-[12px] md:w-11 md:pt-[11px] ${open ? 'text-[#4ade80]' : 'text-[#9aa0a0]'}`}
                      >
                        {num(index)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="m-0">
                          <button
                            id={tabId}
                            ref={(el) => {
                              buttonRefs.current[index] = el
                            }}
                            type="button"
                            aria-label={`${num(index)} ${cap.title}`}
                            aria-expanded={open}
                            aria-controls={detailId}
                            aria-current={open ? 'true' : undefined}
                            onClick={() => select(index)}
                            onFocus={() => {
                              if (activeRef.current !== index) select(index)
                            }}
                            onKeyDown={(event) => onItemKeyDown(event, index)}
                            className="flex w-full items-center justify-between gap-3 rounded-sm bg-transparent text-left"
                          >
                            <span
                              className={`font-sans text-[20px] font-medium leading-[1.15] tracking-[-0.02em] transition-colors duration-300 md:text-[30px] ${
                                open ? 'text-[#f2f2f2]' : 'text-[#9aa0a0] hover:text-[#dfe2e2]'
                              }`}
                            >
                              {cap.title}
                            </span>
                            <span
                              aria-hidden
                              className={`font-code text-[18px] leading-none md:hidden ${open ? 'text-[#4ade80]' : 'text-[#9aa0a0]'}`}
                            >
                              {open ? '−' : '+'}
                            </span>
                          </button>
                        </h3>

                        <div id={detailId} role="region" aria-labelledby={tabId} hidden={!open}>
                          <p className="mt-3 max-w-[440px] font-sans text-[15px] leading-relaxed text-[#c8cccc]">
                            {cap.description}
                          </p>
                          {open && !isDesktop ? (
                            <div className="relative mt-[18px] aspect-[4/3] overflow-hidden rounded-2xl border border-[rgba(224,224,224,0.08)] bg-[#030608] md:hidden">
                              <StackVisual
                                cap={cap}
                                index={index}
                                variant="mobile"
                                active
                                motion={motionMode}
                                isDesktop={isDesktop}
                              />
                            </div>
                          ) : null}
                          <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
                            {cap.tags.map((tag) => (
                              <li key={tag}>
                                <span className="inline-block rounded-full border border-[rgba(224,224,224,0.22)] px-[11px] py-[5px] font-code text-[11.5px] text-[#e0e0e0]">
                                  {tag}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="hidden md:col-span-7 md:block">
            <div
              className="relative ml-auto aspect-[4/5] w-[min(100%,calc((100vh-9rem)*0.8))] overflow-hidden rounded-[22px] border border-[rgba(224,224,224,0.08)] bg-[#030608]"
            >
              {isDesktop
                ? CAPABILITIES.map((cap, index) =>
                    seenRef.current.has(index) ? (
                      <FadeLayer key={cap.id} shown={index === active} instant={index === 0}>
                        <StackVisual
                          cap={cap}
                          index={index}
                          variant="desktop"
                          active={index === active}
                          motion={motionMode}
                          isDesktop={isDesktop}
                        />
                      </FadeLayer>
                    ) : null,
                  )
                : null}

              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[18%] bg-[linear-gradient(180deg,rgba(3,6,8,0.75),transparent)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[34%] bg-[linear-gradient(180deg,transparent,rgba(3,6,8,0.92)_70%)]"
              />

              <div className="absolute left-7 right-7 top-6 z-20 flex items-center justify-between gap-4 font-code text-[11px] tracking-[0.14em]">
                <span className="text-[#4ade80]">{`FIG. ${num(active)} — ${current.title.toUpperCase()}`}</span>
                <span className="shrink-0 text-[#b7bbbb]">SCROLL TO ADVANCE</span>
              </div>

              <div className="absolute bottom-7 left-7 right-7 z-20">
                <div className="flex gap-2" aria-hidden>
                  {CAPABILITIES.map((cap, index) => (
                    <span
                      key={cap.id}
                      className={`h-[3px] flex-1 rounded-full ${
                        index === active ? 'bg-[#4ade80]' : index < active ? 'bg-[#4ade80]/40' : 'bg-white/15'
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between gap-4 font-code text-[11px] tracking-[0.12em] text-[#b7bbbb]">
                  <span>ILLUSTRATIVE RENDER</span>
                  <span>{`${num(active)} / ${TOTAL}`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
