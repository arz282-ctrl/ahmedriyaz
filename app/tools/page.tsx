import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StickyMobileCta from '@/components/layout/StickyMobileCta'
import JsonLd from '@/components/seo/JsonLd'
import { devTools } from '@/lib/content/tools'
import { breadcrumb, graph, ID, softwareAppNode, webPage } from '@/lib/schema'
import { abs, DISPLAY_NAME, PAGE_UPDATED } from '@/lib/site'

const PATH = '/tools'
const TITLE = 'Dev Tools by a Dev'
const DESCRIPTION =
  'Dev tools by a dev: developer tools and API integrations built by Ahmed Riyaz (Arz), including ReadyPI — one OpenAI-compatible API across 150+ LLMs.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: `${TITLE} · ${DISPLAY_NAME}`, description: DESCRIPTION, url: PATH },
}

export default function ToolsPage() {
  return (
    <main className="bg-[var(--void)] text-[var(--silver)]">
      <Navbar />

      <JsonLd
        data={graph(
          webPage({ path: PATH, name: `${TITLE} — ${DISPLAY_NAME}`, description: DESCRIPTION, updated: PAGE_UPDATED[PATH] }),
          breadcrumb(PATH, [
            { name: 'Home', path: '/' },
            { name: 'Tools', path: PATH },
          ]),
          {
            '@type': 'ItemList',
            '@id': `${abs(PATH)}#list`,
            name: 'Developer tools by Ahmed Riyaz (Arz)',
            itemListElement: devTools.map((t, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: { '@id': ID.tool(t.slug) },
            })),
          },
          ...devTools.map(softwareAppNode),
        )}
      />

      <div className="section pt-32 md:pt-40">
        <header className="max-w-3xl">
          <p className="eyebrow">// TOOLS</p>
          <h1 className="page-title mt-4">Dev tools, by a dev</h1>
          <p className="lede mt-5">
            {DISPLAY_NAME} builds developer tools and API integrations for other developers — the infrastructure he
            wanted and couldn&rsquo;t find, shipped as products you can use today.
          </p>
        </header>

        <div className="mb-28 mt-14 grid gap-6 md:mb-24">
          {devTools.map((t) => (
            <article key={t.slug} id={t.slug} className="card rounded-2xl p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-[var(--silver)]">
                  {t.name}
                </h2>
                <span className="rounded-full border border-[rgba(125,211,252,0.25)] px-2 py-0.5 font-code text-[10px] tracking-[0.14em] text-[rgba(125,211,252,0.8)]">
                  {t.os.toUpperCase()}
                </span>
              </div>
              <p className="mt-2 font-code text-xs tracking-[0.14em] text-[rgba(74,222,128,0.9)]">{t.tagline}</p>
              <p className="prose-body mt-4 max-w-3xl">{t.summary}</p>
              <ul className="mt-5 grid gap-2 md:grid-cols-2">
                {t.features.map((f) => (
                  <li key={f} className="font-sans text-sm leading-relaxed text-[rgba(224,224,224,0.7)]">
                    <span aria-hidden className="mr-2 text-[#7dd3fc]">→</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-4 font-code text-xs tracking-[0.16em]">
                <a href={t.url} target="_blank" rel="noopener" className="text-[#7dd3fc] hover:underline">
                  OPEN {t.name.toUpperCase()} ↗
                </a>
                {t.caseStudy && (
                  <Link href={`/work/${t.caseStudy}`} className="text-[rgba(224,224,224,0.6)] hover:text-[#7dd3fc]">
                    READ THE CASE STUDY →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <Footer />
      <StickyMobileCta />
    </main>
  )
}
