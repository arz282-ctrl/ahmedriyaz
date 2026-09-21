import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StickyMobileCta from '@/components/layout/StickyMobileCta'
import JsonLd from '@/components/seo/JsonLd'
import Faq from '@/components/ui/faq'
import { certifications, faq, roles } from '@/lib/content/about'
import { breadcrumb, faqPage, graph, webPage } from '@/lib/schema'
import { BIO_LONG, PAGE_UPDATED, PERSON, SAME_AS } from '@/lib/site'

const PATH = '/about'

export const metadata: Metadata = {
  title: 'About Ahmed Riyaz',
  description:
    'Ahmed Riyaz is a full-stack engineer and founder of Rareware Studio in Sylhet, Bangladesh, building web platforms, e-commerce systems and AI-native products.',
  alternates: { canonical: PATH },
}

const SOCIAL_LABEL: Record<string, string> = {
  'linkedin.com': 'LinkedIn',
  'github.com': 'GitHub',
  'x.com': 'X',
  'www.instagram.com': 'Instagram',
  'www.facebook.com': 'Facebook',
  'rarewarestudio.space': 'Rareware Studio',
}

const labelFor = (url: string) => {
  const host = new URL(url).hostname
  return SOCIAL_LABEL[host] ?? host.replace(/^www\./, '')
}

export default function AboutPage() {
  const paragraphs = BIO_LONG.split('\n\n')

  return (
    <main className="bg-[var(--void)] text-[var(--silver)]">
      <Navbar />

      <JsonLd
        data={graph(
          webPage({
            path: PATH,
            name: 'About Ahmed Riyaz',
            description: metadata.description as string,
            updated: PAGE_UPDATED[PATH],
          }),
          breadcrumb(PATH, [
            { name: 'Home', path: '/' },
            { name: 'About', path: PATH },
          ]),
          faqPage(PATH, faq),
        )}
      />

      <div className="section pt-32 md:pt-40">
        {/* ── Identity ── */}
        <header className="grid gap-10 md:grid-cols-[200px_1fr] md:gap-14">
          <Image
            src={PERSON.image}
            alt="Ahmed Riyaz"
            width={400}
            height={400}
            priority
            className="h-32 w-32 rounded-2xl border border-[var(--card-border)] object-cover md:h-full md:max-h-[200px] md:w-full"
          />

          <div>
            <p className="eyebrow">// ABOUT</p>
            <h1 className="page-title mt-4">
              Ahmed Riyaz
            </h1>
            <p className="mt-3 font-code text-xs tracking-[0.18em] text-[rgba(74,222,128,0.9)]">
              {PERSON.jobTitle.toUpperCase()}
            </p>
            {/* The single permitted aka reference on the whole site. */}
            <p className="mt-4 font-sans text-sm text-[rgba(224,224,224,0.45)]">
              Also known online as {PERSON.alternateName}.
            </p>
          </div>
        </header>

        {/* ── Bio ── */}
        <section className="mt-14 max-w-3xl">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="prose-body mb-5">
              {p}
            </p>
          ))}
        </section>

        {/* ── Links ── */}
        <section className="mt-10">
          <h2 className="font-code text-xs tracking-[0.3em] text-[rgba(224,224,224,0.4)]">// ELSEWHERE</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {SAME_AS.map((url) => (
              <li key={url}>
                <a
                  href={url}
                  rel="me noopener noreferrer"
                  target="_blank"
                  className="inline-flex rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-2 font-code text-xs tracking-[0.14em] text-[rgba(224,224,224,0.7)] transition-colors hover:border-[rgba(125,211,252,0.4)] hover:text-[#7dd3fc]"
                >
                  {labelFor(url)}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${PERSON.email}`}
                className="inline-flex rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-2 font-code text-xs tracking-[0.14em] text-[rgba(224,224,224,0.7)] transition-colors hover:border-[rgba(74,222,128,0.4)] hover:text-[#4ade80]"
              >
                {PERSON.email}
              </a>
            </li>
          </ul>
        </section>

        {/* ── Experience ── */}
        <section className="mt-20">
          <h2 className="font-code text-xs tracking-[0.3em] text-[rgba(224,224,224,0.4)]">// EXPERIENCE</h2>
          <div className="mt-6 space-y-10">
            {roles.map((role) => (
              <article key={`${role.org}-${role.period}`} className="border-l border-[var(--card-border)] pl-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-xl font-normal leading-tight tracking-[-0.018em] text-[var(--silver)]">{role.title}</h3>
                  <span className="font-code text-xs text-[rgba(125,211,252,0.8)]">{role.org}</span>
                  {role.current && (
                    <span className="rounded-full border border-[rgba(74,222,128,0.3)] px-2 py-0.5 font-code text-[10px] tracking-[0.14em] text-[#4ade80]">
                      CURRENT
                    </span>
                  )}
                </div>
                <p className="mt-1 font-code text-[11px] tracking-[0.14em] text-[rgba(224,224,224,0.4)]">
                  {role.period} · {role.location}
                </p>
                <ul className="mt-4 space-y-2">
                  {role.points.map((p) => (
                    <li key={p} className="font-sans text-sm leading-relaxed text-[rgba(224,224,224,0.62)]">
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ── Certification ── */}
        <section className="mt-16">
          <h2 className="font-code text-xs tracking-[0.3em] text-[rgba(224,224,224,0.4)]">// CERTIFICATION</h2>
          <div className="mt-6 space-y-4">
            {certifications.map((c) => (
              <div key={c.name} className="card rounded-xl p-5">
                <p className="font-sans text-base font-medium text-[var(--silver)]">{c.name}</p>
                <p className="mt-1 font-code text-[11px] tracking-[0.14em] text-[rgba(125,211,252,0.7)]">
                  {c.org} · {c.year}
                </p>
                <p className="mt-2 font-sans text-sm text-[rgba(224,224,224,0.55)]">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-20">
          <h2 className="font-code text-xs tracking-[0.3em] text-[rgba(224,224,224,0.4)]">// FREQUENTLY ASKED</h2>
          <div className="mt-6">
            <Faq items={faq} />
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mb-28 mt-16 md:mb-24">
          <Link
            href="/start"
            className="inline-flex items-center gap-3 rounded-full border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.06)] px-6 py-3 font-code text-xs tracking-[0.2em] text-[#4ade80] transition-all duration-500 hover:border-[rgba(74,222,128,0.6)] hover:bg-[rgba(74,222,128,0.15)]"
          >
            START A PROJECT <span aria-hidden>→</span>
          </Link>
        </section>
      </div>

      <Footer />
      <StickyMobileCta />
    </main>
  )
}
