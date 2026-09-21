'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Fragment, useRef, type CSSProperties } from 'react'

interface WordsPullUpProps {
  text: string
  className?: string
  showAsterisk?: boolean
  style?: CSSProperties
}

export const WordsPullUp = ({ text, className = '', showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        return (
          <Fragment key={`${word}-${i}`}>
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative inline-block"
              style={{ marginRight: isLast ? 0 : '0.25em' }}
            >
              {word}
              {showAsterisk && isLast && (
                <span className="absolute -right-[0.3em] top-[0.65em] text-[0.31em]">*</span>
              )}
            </motion.span>
            {/* A real space character. Word spacing is done with marginRight for
                layout, which leaves textContent as one run-on word — so an <h1>
                built from this read "BeyondtheBuild" to crawlers and screen
                readers. The flex container doesn't render this node, so it
                costs nothing visually. */}
            {!isLast && ' '}
          </Fragment>
        )
      })}
    </div>
  )
}

interface Segment {
  text: string
  className?: string
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[]
  className?: string
  style?: CSSProperties
}

export const WordsPullUpMultiStyle = ({ segments, className = '', style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const words: { word: string; className?: string }[] = []
  segments.forEach((seg) => {
    seg.text.split(' ').forEach((w) => {
      if (w) words.push({ word: w, className: seg.className })
    })
  })

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={`${w.word}-${i}`}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ''}`}
          style={{ marginRight: '0.25em' }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  )
}

const navItems = [
  { label: 'Soul', href: '#soul' },
  { label: 'Frames', href: '#gallery' },
  { label: 'Vision', href: '#vision' },
  // Was '#contact', which doesn't exist on this route — ContactSection is
  // never mounted here, so the link was a dead click.
  { label: 'Connect', href: '/start' },
]

const PrismaHero = () => {
  return (
    <section id="soul" className="h-screen w-full px-3 pt-20 sm:px-4 sm:pt-24">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        {/* Self-hosted. This was previously hotlinked from a third party's
            CloudFront bucket, which could disappear without warning. */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/beyond/arz-dreams/dream-4-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/beyond/arz-dreams/dream-4.webm" type="video/webm" />
          <source src="/beyond/arz-dreams/dream-4.mp4" type="video/mp4" />
        </video>

        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[10px] transition-colors sm:text-xs md:text-sm"
                style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#E1E0CC'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)'
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-2 sm:px-6 md:px-10">
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-soul text-balance font-semibold italic leading-[0.9] tracking-[-0.03em]"
                style={{ color: '#E1E0CC' }}
              >
                <span className="block text-[12.5vw] sm:text-[10.8vw] md:text-[8.2vw] lg:text-[6.5vw] xl:text-[6.2vw] 2xl:text-[5.8vw]">
                  <WordsPullUp text="Beyond the Build" />
                </span>
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-6 lg:col-span-4 lg:pb-10">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base"
                style={{ lineHeight: 1.2, color: 'rgba(225, 224, 204, 0.72)' }}
              >
                Away from the screen I&apos;m chasing light — sunsets, mountains, coastlines. This is the other
                half of the record: the places I&apos;m working toward, and the frames I bring back from them.
              </motion.p>

              <motion.a
                href="#gallery"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group inline-flex items-center self-start rounded-full py-1 pl-5 pr-1 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
                style={{ backgroundColor: '#E1E0CC' }}
              >
                See the frames
                <span className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4" style={{ color: '#E1E0CC' }} />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='80' cy='30' r='1'/%3E%3Ccircle cx='40' cy='90' r='1'/%3E%3Ccircle cx='130' cy='60' r='1'/%3E%3Ccircle cx='120' cy='130' r='1'/%3E%3C/g%3E%3C/svg%3E");
          background-size: 160px 160px;
          animation: prisma-noise 0.35s steps(2) infinite;
        }

        @keyframes prisma-noise {
          0% { transform: translate3d(0, 0, 0); }
          25% { transform: translate3d(-1%, 1%, 0); }
          50% { transform: translate3d(1%, -1%, 0); }
          75% { transform: translate3d(0.5%, 0.5%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </section>
  )
}

export { PrismaHero }
