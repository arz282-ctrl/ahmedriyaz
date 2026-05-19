'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function BeyondCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0a0c10] py-32">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(245,166,35,0.14)_0%,rgba(245,166,35,0.05)_36%,transparent_68%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(32,18,10,0.2)_0%,rgba(15,12,17,0.68)_70%,rgba(8,8,11,0.92)_100%)]" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="font-code text-xs tracking-[0.3em] text-[rgba(245,166,35,0.40)]">
            // THERE IS MORE
          </p>

          <h2 className="mt-4 font-soul text-[clamp(2.5rem,7vw,5rem)] italic leading-[0.9] text-[var(--amber-light)]">
            Go Beyond<br />the Code
          </h2>

          <p className="mx-auto mt-6 max-w-md font-code text-xs leading-relaxed text-[rgba(245,166,35,0.30)]">
            Sunsets I chase. Mountains I climb. Oceans I dream about.
            The life I&apos;m building — one frame at a time.
          </p>

          <Link
            href="/beyond"
            className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full border border-[rgba(245,166,35,0.20)] bg-[rgba(245,166,35,0.)][0.04] px-8 py-4 backdrop-blur-sm transition-all duration-500 hover:border-[rgba(245,166,35,0.40)] hover:bg-[rgba(245,166,35,0.)][0.08] hover:shadow-[0_0_40px_rgba(245,166,35,0.12)]"
          >
            <span className="font-code text-sm tracking-[0.2em] text-[rgba(245,166,35,0.70)] transition-colors group-hover:text-[var(--amber-light)]">
              ENTER BEYOND
            </span>
            <svg
              className="h-4 w-4 text-[rgba(245,166,35,0.50)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--amber-light)]"
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
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 h-px w-48 bg-gradient-to-r from-transparent via-[rgba(245,166,35,0.15)] to-transparent"
        />
      </div>
    </section>
  )
}
