import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StickyMobileCta from '@/components/layout/StickyMobileCta'
import JsonLd from '@/components/seo/JsonLd'
import { caseStudies, caseStudySlugs, getCaseStudy, STATUS_LABEL } from '@/lib/content/projects'
import { services } from '@/lib/content/services'
import { breadcrumb, caseStudyNode, graph, webPage } from '@/lib/schema'

// Unknown slugs 404 statically instead of being rendered on demand.
export const dynamicParams = false

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const study = getCaseStudy(params.slug)
  if (!study) return {}
  return {
    title: `${study.title} — ${study.tagline}`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      type: 'article',
      title: `${study.title} — ${study.tagline}`,
      description: study.summary,
      images: [{ url: study.cover.src, alt: study.cover.alt }],
    },
  }
}

/** The service line this project evidences, for the CTA deep link. */
const serviceFor = (slug: string) => services.find((s) => s.evidence.includes(slug))?.slug ?? ''

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug)
  if (!study) notFound()

  const path = `/work/${study.slug}`
  const others = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 2)
  const startHref = serviceFor(study.slug) ? `/start?type=${serviceFor(study.slug)}` : '/start'

  return (
    <main className="bg-[var(--void)] text-[var(--silver)]">
      <Navbar />

      <JsonLd
        data={graph(
          webPage({
            path,
            name: `${study.title} — ${study.tagline}`,
            description: study.summary,
            updated: study.updated,
          }),
          breadcrumb(path, [
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/work' },
            { name: study.title, path },
          ]),
          caseStudyNode(study),
        )}
      />

      <article className="section pt-32 md:pt-40">
        {/* ── Header ── */}
        <header className="max-w-3xl">
          <Link href="/work" className="font-code text-xs tracking-[0.2em] text-[rgba(224,224,224,0.45)] hover:text-[#7dd3fc]">
            <span aria-hidden>←</span> ALL WORK
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[rgba(125,211,252,0.25)] px-3 py-1 font-code text-[10px] tracking-[0.18em] text-[rgba(125,211,252,0.8)]">
              {STATUS_LABEL[study.status]}
            </span>
            <span className="font-code text-[11px] tracking-[0.14em] text-[rgba(224,224,224,0.4)]">{study.year}</span>
          </div>
          <h1 className="page-title mt-5">
            {study.title}
          </h1>
          <p className="mt-4 font-sans text-lg leading-relaxed text-[rgba(224,224,224,0.72)]">{study.tagline}</p>

          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="font-code text-[10px] tracking-[0.2em] text-[rgba(224,224,224,0.35)]">ROLE</dt>
              <dd className="mt-1 font-sans text-sm text-[rgba(224,224,224,0.7)]">{study.role}</dd>
            </div>
            <div>
              <dt className="font-code text-[10px] tracking-[0.2em] text-[rgba(224,224,224,0.35)]">STACK</dt>
              <dd className="mt-1 font-sans text-sm text-[rgba(224,224,224,0.7)]">{study.stack.join(' · ')}</dd>
            </div>
            <div>
              <dt className="font-code text-[10px] tracking-[0.2em] text-[rgba(224,224,224,0.35)]">LIVE AT</dt>
              <dd className="mt-1 font-sans text-sm">
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7dd3fc] underline-offset-4 hover:underline"
                >
                  {new URL(study.url).hostname.replace(/^www\./, '')}
                </a>
              </dd>
            </div>
          </dl>
        </header>

        {/* ── Cover ── */}
        <figure className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--card-border)] bg-black/40">
          <Image
            src={study.cover.src}
            alt={study.cover.alt}
            fill
            priority
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover object-top"
          />
        </figure>

        {/* ── Narrative. Plain prose, never opacity-gated: this text is the
             whole point of the page for crawlers and AI answer engines. ── */}
        <div className="mt-16 max-w-3xl">
          <section>
            <h2 className="eyebrow">// THE PROBLEM</h2>
            {study.problem.map((p) => (
              <p key={p.slice(0, 40)} className="prose-body mt-4">
                {p}
              </p>
            ))}
          </section>

          <section className="mt-14">
            <h2 className="eyebrow">// THE SYSTEM</h2>
            {study.system.map((p) => (
              <p key={p.slice(0, 40)} className="prose-body mt-4">
                {p}
              </p>
            ))}
          </section>

          <section className="mt-14">
            <h2 className="eyebrow">// WHAT SHIPPED</h2>
            <ul className="mt-4 space-y-3">
              {study.outcome.map((o) => (
                <li key={o} className="flex gap-3 font-sans text-base leading-relaxed text-[rgba(224,224,224,0.72)]">
                  <span aria-hidden className="mt-[0.4em] h-1 w-1 shrink-0 rounded-full bg-[#4ade80]" />
                  {o}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ── Gallery ── */}
        {study.images.length > 1 && (
          <section className="mt-16 space-y-10">
            {study.images.slice(1).map((img) => (
              <figure key={img.src}>
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--card-border)] bg-black/40">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 1100px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                {img.caption && (
                  <figcaption className="mt-3 font-code text-[11px] tracking-[0.12em] text-[rgba(224,224,224,0.4)]">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </section>
        )}

        {/* ── CTA ── */}
        <section className="mt-20 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 md:p-10">
          <h2 className="section-title text-[var(--silver)]">Building something like this?</h2>
          <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-[rgba(224,224,224,0.62)]">
            Tell me the shape of the project and I&apos;ll come back with how I&apos;d approach it.
          </p>
          <Link
            href={startHref}
            className="mt-6 inline-flex items-center gap-3 rounded-full border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.06)] px-6 py-3 font-code text-xs tracking-[0.2em] text-[#4ade80] transition-all duration-500 hover:border-[rgba(74,222,128,0.6)] hover:bg-[rgba(74,222,128,0.15)]"
          >
            START A PROJECT <span aria-hidden>→</span>
          </Link>
        </section>

        {/* ── Next ── */}
        <nav className="mb-28 mt-16 md:mb-24" aria-label="More case studies">
          <h2 className="font-code text-xs tracking-[0.3em] text-[rgba(224,224,224,0.4)]">// MORE WORK</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((c) => (
              <Link key={c.slug} href={`/work/${c.slug}`} className="card rounded-xl p-5">
                <p className="font-display text-xl font-bold leading-tight tracking-[-0.018em] text-[var(--silver)]">{c.title}</p>
                <p className="mt-1 font-sans text-sm text-[rgba(224,224,224,0.55)]">{c.tagline}</p>
              </Link>
            ))}
          </div>
        </nav>
      </article>

      <Footer />
      <StickyMobileCta />
    </main>
  )
}
