'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const visions = [
  {
    title: 'Travel the World',
    desc: 'Every continent. Every culture. Building from anywhere — cafes in Lisbon, co-working spaces in Bali, mountain lodges in Nepal.',
    img: '/beyond/vision/travel-world.png',
  },
  {
    title: 'Chase Every Sunset',
    desc: 'From mountain peaks above the clouds to beaches where the ocean meets the sky. Golden hour is sacred time.',
    img: '/beyond/vision/chase-sunset.webp',
  },
  {
    title: 'Mountain to Ocean',
    desc: 'Watching waves crash against rocky shores from a cliff edge. Wind in the air. The raw power of nature as a daily companion.',
    img: '/beyond/vision/mountain-ocean.webp',
  },
  {
    title: 'Build From Anywhere',
    desc: 'Location-independent. Creating world-class digital products while living a life of freedom and exploration.',
    img: '/beyond/vision/build-anywhere.webp',
  },
]

/* The final vision — rendered as a breakout element */
const islandVision = {
  title: 'Lost into the Horizon',
  desc: 'Someday — a base on an island. Simple. Peaceful. Where the sound of the ocean is the only notification that matters.',
  img: '/beyond/vision/island-living.png',
}

export default function LifeVisionSection() {
  return (
    <section id="vision" className="relative overflow-visible bg-[#f7efe0] px-6 pt-32 pb-0 text-[#3b2710]">
      {/* Continue the warm peach tone from the gallery so both sections read as one wall */}
      <div className="pointer-events-none absolute inset-x-0 -top-1 z-[2] h-40 bg-[linear-gradient(180deg,rgba(156,102,42,0.28)_0%,rgba(230,198,151,0.32)_45%,rgba(247,236,215,0.18)_80%,transparent_100%)]" />
      {/* Soft amber wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(245,166,35,0.18)_0%,transparent_55%)]" />
      {/* Body gradient settles into cream and slightly deeper warmth at the bottom */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(230,198,151,0.32)_0%,rgba(247,236,215,0.22)_28%,rgba(255,253,246,0.0)_60%,rgba(156,102,42,0.16)_100%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="font-code text-xs tracking-[0.3em] text-[#8a5a1e]/60">// LIFE AMBITIONS</p>
          <h2 className="mt-2 font-soul text-5xl italic text-[#7a4a00] md:text-6xl">
            More To <span className="text-[#b86f1a]">Chase</span>
          </h2>
          <p className="mt-4 max-w-xl font-code text-xs leading-relaxed tracking-[0.06em] text-[#7a5a34]/75">
            Code is the craft. But life is the canvas. These are the experiences I&apos;m building towards — one project, one flight, one sunset at a time.
          </p>
        </motion.div>

        {/* First 4 visions — normal alternating layout */}
        <div className="mt-16 space-y-20">
          {visions.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col gap-8 md:flex-row md:items-center ${i % 2 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Image */}
              <div className="group relative w-full overflow-hidden rounded-xl border border-white/30 shadow-[0_18px_42px_rgba(122,74,0,0.18)] md:w-1/2">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#7a4a00]/40 via-transparent to-transparent opacity-70" />
                <Image
                  src={v.img}
                  alt={v.title}
                  width={600}
                  height={400}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-80"
                  style={{ filter: 'sepia(0.16) contrast(1.04) brightness(0.96) saturate(1.05)' }}
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 z-20 font-code text-[10px] tracking-widest text-[#fdf3df]/85">
                  {String(i + 1).padStart(2, '0')} / {String(visions.length + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2">
                <h3 className="font-soul text-3xl italic text-[#7a4a00] md:text-4xl">{v.title}</h3>
                <p className="mt-4 font-code text-xs leading-relaxed tracking-[0.04em] text-[#5b3f1a]/80">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Lost into the Horizon — breakout editorial block ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 text-center"
        >
          <p className="font-code text-[10px] tracking-widest text-[#8a5a1e]/50">
            05 / 05
          </p>
          <h3 className="mt-3 font-soul text-4xl italic text-[#7a4a00] md:text-5xl">
            {islandVision.title}
          </h3>
          <p className="mx-auto mt-4 max-w-md font-code text-xs leading-relaxed tracking-[0.04em] text-[#5b3f1a]/80">
            {islandVision.desc}
          </p>
        </motion.div>
      </div>

      {/* ── Breakout image — bleeds past section & page edges ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 mt-16"
        style={{ marginBottom: '-14rem' }}
      >
        {/* Full-viewport-width wrapper that breaks out of the container */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <div className="relative overflow-hidden">
            <Image
              src={islandVision.img}
              alt={islandVision.title}
              width={1920}
              height={600}
              sizes="100vw"
              quality={100}
              className="h-[28rem] w-full object-cover md:h-[36rem]"
              priority={false}
              loading="lazy"
            />

            {/* Bottom gradient — dissolves warm photo into dark parallax below */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-t from-[#030608] via-[#030608]/70 to-transparent" />

            {/* Subtle overlay text */}
            <div className="absolute inset-0 z-20 flex items-end justify-center pb-12">
              <p className="font-code text-[10px] tracking-[0.4em] text-white/40 drop-shadow-lg">
                THE ONLY NOTIFICATION THAT MATTERS
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
