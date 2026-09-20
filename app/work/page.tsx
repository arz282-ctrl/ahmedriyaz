import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StickyMobileCta from '@/components/layout/StickyMobileCta'
import JsonLd from '@/components/seo/JsonLd'
import { caseStudies, STATUS_LABEL } from '@/lib/content/projects'
import { breadcrumb, graph, webPage } from '@/lib/schema'
import { abs, PAGE_UPDATED } from '@/lib/site'

const PATH = '/work'

export const metadata: Metadata = {
  title: 'Work — Case Studies',
  description:
    'Selected work by Ahmed Riyaz: AI gateways, Shopify Hydrogen storefronts, consultancy platforms and motion-led brand sites — with the problem, the system and what shipped.',
  alternates: { canonical: PATH },
}

export default function WorkPage() {
  return (
    <main className="bg-[var(--void)] text-[var(--silver)]">
      <Navbar />

      <JsonLd
        data={graph(
          webPage({
            path: PATH,
            name: 'Work — Case Studies',
            description: metadata.description as string,
            updated: PAGE_UPDATED[PATH],
          }),
          breadcrumb(PATH, [
            { name: 'Home', path: '/' },
            { name: 'Work', path: PATH },
          ]),
          {
            '@type': 'ItemList',
            '@id': `${abs(PATH)}#list`,
            itemListElement: caseStudies.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: abs(`/work/${c.slug}`),
              name: c.title,
            })),
          },
        )}
      />

      <div className="section pt-32 md:pt-40">
        <header className="max-w-3xl">
          <p className="eyebrow">// WORK</p>
          <h1 className="page-title mt-4">
            Selected work
          </h1>
          <p className="lede mt-5">
            Products I designed, built and shipped — each one written up as the problem it solved, the system
            behind it, and what actually went live.
          </p>
        </header>

        <div className="mb-28 mt-14 grid gap-6 md:mb-24 md:grid-cols-2">
          {caseStudies.map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="card group flex flex-col overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <Image
                  src={c.cover.src}
                  alt={c.cover.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-2xl italic leading-none text-[var(--silver)]">{c.title}</h2>
                  <span className="rounded-full border border-[rgba(125,211,252,0.25)] px-2 py-0.5 font-code text-[10px] tracking-[0.14em] text-[rgba(125,211,252,0.8)]">
                    {STATUS_LABEL[c.status]}
                  </span>
                </div>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[rgba(224,224,224,0.62)]">{c.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-[var(--card-border)] px-2 py-1 font-code text-[10px] tracking-[0.1em] text-[rgba(224,224,224,0.5)]"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 font-code text-xs tracking-[0.18em] text-[#4ade80]">
                  READ CASE STUDY <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
      <StickyMobileCta />
    </main>
  )
}
