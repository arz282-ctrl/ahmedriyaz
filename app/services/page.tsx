import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StickyMobileCta from '@/components/layout/StickyMobileCta'
import JsonLd from '@/components/seo/JsonLd'
import Faq from '@/components/ui/faq'
import { getCaseStudy } from '@/lib/content/projects'
import { services } from '@/lib/content/services'
import { breadcrumb, faqPage, graph, serviceNode, webPage } from '@/lib/schema'
import { PAGE_UPDATED, PERSON } from '@/lib/site'

const PATH = '/services'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'What Ahmed Riyaz builds: AI products and agents, Next.js web platforms, Shopify Hydrogen storefronts, and motion-led brand work. Design through deployment.',
  alternates: { canonical: PATH },
}

const faq = [
  {
    q: 'How do engagements usually start?',
    a: 'With a written brief and a conversation. Send your project type, budget range and timeline through the intake form and I will come back with how I would approach it, what I would need from you, and a realistic schedule before any commitment.',
  },
  {
    q: 'Do you work with clients outside Bangladesh?',
    a: 'Yes. I work remote-first with clients across Europe, the UK and North America, using structured async workflows so timezone gaps do not slow delivery.',
  },
  {
    q: 'Do you hand off to a separate developer?',
    a: 'No. Design, engineering and deployment are one engagement. The person who designs the interface is the person who builds and ships it, which removes the usual handoff losses between a design agency and a development team.',
  },
  {
    q: 'What does a project cost?',
    a: 'It depends on scope, and I would rather quote honestly against a real brief than publish a number that turns out to be wrong for your project. Send the intake form with a budget range and I will tell you straight away whether it is a fit.',
  },
] as const

export default function ServicesPage() {
  return (
    <main className="bg-[var(--void)] text-[var(--silver)]">
      <Navbar />

      <JsonLd
        data={graph(
          webPage({
            path: PATH,
            name: 'Services',
            description: metadata.description as string,
            updated: PAGE_UPDATED[PATH],
          }),
          breadcrumb(PATH, [
            { name: 'Home', path: '/' },
            { name: 'Services', path: PATH },
          ]),
          faqPage(PATH, faq),
          ...services.map((s) => serviceNode(s)),
        )}
      />

      <div className="section pt-32 md:pt-40">
        <header className="max-w-3xl">
          <p className="eyebrow">// SERVICES</p>
          <h1 className="page-title mt-4">
            What I build
          </h1>
          <p className="lede mt-5">
            Four lines of work, all delivered the same way: design, engineering and deployment as one engagement,
            by the person who stays on it through launch.
          </p>
        </header>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <section key={s.slug} className="card flex flex-col rounded-2xl p-7">
              <h2 className="font-display text-[1.6rem] font-normal leading-tight tracking-[-0.02em] text-[var(--silver)]">{s.title}</h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[rgba(224,224,224,0.66)]">{s.summary}</p>

              <ul className="mt-5 space-y-2">
                {s.includes.map((i) => (
                  <li key={i} className="flex gap-3 font-sans text-sm text-[rgba(224,224,224,0.58)]">
                    <span aria-hidden className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-[#4ade80]" />
                    {i}
                  </li>
                ))}
              </ul>

              {s.evidence.length > 0 && (
                <p className="mt-5 font-code text-[11px] tracking-[0.12em] text-[rgba(224,224,224,0.4)]">
                  SEE:{' '}
                  {s.evidence.map((slug, i) => {
                    const study = getCaseStudy(slug)
                    if (!study) return null
                    return (
                      <span key={slug}>
                        {i > 0 && ' · '}
                        <Link href={`/work/${slug}`} className="text-[rgba(125,211,252,0.8)] hover:text-[#7dd3fc]">
                          {study.title}
                        </Link>
                      </span>
                    )
                  })}
                </p>
              )}

              <Link
                href={`/start?type=${s.slug}`}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.06)] px-5 py-2.5 font-code text-[11px] tracking-[0.18em] text-[#4ade80] transition-all duration-500 hover:border-[rgba(74,222,128,0.6)] hover:bg-[rgba(74,222,128,0.15)]"
              >
                START HERE <span aria-hidden>→</span>
              </Link>
            </section>
          ))}
        </div>

        <section className="mt-20">
          <h2 className="font-code text-xs tracking-[0.3em] text-[rgba(224,224,224,0.4)]">// HOW IT WORKS</h2>
          <div className="mt-6">
            <Faq items={faq} />
          </div>
        </section>

        <section className="mb-28 mt-16 md:mb-24">
          <p className="font-sans text-sm text-[rgba(224,224,224,0.55)]">
            Prefer to skip the form?{' '}
            <a href={`mailto:${PERSON.email}`} className="text-[#7dd3fc] underline-offset-4 hover:underline">
              {PERSON.email}
            </a>
          </p>
        </section>
      </div>

      <Footer />
      <StickyMobileCta />
    </main>
  )
}
