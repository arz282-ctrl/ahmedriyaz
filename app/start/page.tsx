import type { Metadata } from 'next'
import { Suspense } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/seo/JsonLd'
import IntakeWizard from '@/components/start/IntakeWizard'
import { breadcrumb, graph, webPage } from '@/lib/schema'
import { PAGE_UPDATED, PERSON } from '@/lib/site'

const PATH = '/start'

export const metadata: Metadata = {
  title: 'Start a project',
  description:
    'Project intake for Ahmed Riyaz. Tell me the project type, budget and timeline, and it goes straight to WhatsApp or email. Usually a reply within one business day.',
  alternates: { canonical: PATH },
}

export default function StartPage() {
  return (
    <main className="bg-[var(--void)] text-[var(--silver)]">
      <Navbar />

      <JsonLd
        data={graph(
          webPage({
            path: PATH,
            name: 'Start a project with Ahmed Riyaz',
            description: metadata.description as string,
            updated: PAGE_UPDATED[PATH],
          }),
          breadcrumb(PATH, [
            { name: 'Home', path: '/' },
            { name: 'Start a project', path: PATH },
          ]),
        )}
      />

      <div className="section pt-32 md:pt-40">
        <header className="max-w-3xl">
          {/* Labelled as a form, on purpose. This is never a simulated chat
              speaking as Ahmed. */}
          <p className="eyebrow">// PROJECT INTAKE</p>
          <h1 className="page-title mt-4">
            Start a project
          </h1>
          <p className="lede mt-5">
            Four short steps. At the end you&apos;ll get a written brief you can send to me on WhatsApp or by
            email — nothing is submitted to this site and nothing is stored here.
          </p>
          <p className="mt-3 font-sans text-sm text-[rgba(224,224,224,0.45)]">
            In a hurry? Email{' '}
            <a href={`mailto:${PERSON.email}`} className="text-[#7dd3fc] underline-offset-4 hover:underline">
              {PERSON.email}
            </a>{' '}
            directly. I usually reply within one business day.
          </p>
        </header>

        <div className="mb-28 mt-12 max-w-3xl md:mb-24">
          {/* useSearchParams() in the wizard needs a Suspense boundary, or the
              build fails with missing-suspense-with-csr-bailout. */}
          <Suspense
            fallback={
              <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-9">
                <p className="font-code text-[11px] tracking-[0.2em] text-[rgba(224,224,224,0.4)]">LOADING FORM…</p>
              </div>
            }
          >
            <IntakeWizard />
          </Suspense>
        </div>
      </div>

      <Footer />
    </main>
  )
}
