/**
 * JSON-LD builders.
 *
 * @id discipline: Person, WebSite and ProfessionalService are emitted exactly
 * once — by the root layout — so they appear on every page, which is what
 * entity lock needs. Every per-page node REFERENCES them by @id and never
 * re-inlines them. Page-scoped ids are namespaced by the page's own absolute
 * URL, so two pages can never collide either.
 *
 * Deliberately absent: Review and AggregateRating. Marking up reviews that
 * aren't verified is a direct trigger for a Google manual spam action, which
 * would defeat the ranking goal this file exists to serve.
 */

import { abs, BIO_LONG, PERSON, SAME_AS, SITE_NAME, SITE_URL } from './site'
import type { CaseStudy } from './content/projects'

export const ID = {
  website: `${SITE_URL}/#website`,
  person: `${SITE_URL}/#person`,
  org: `${SITE_URL}/#organization`,
  webPage: (path: string) => `${abs(path)}#webpage`,
  breadcrumb: (path: string) => `${abs(path)}#breadcrumb`,
  faq: (path: string) => `${abs(path)}#faq`,
  work: (slug: string) => `${abs(`/work/${slug}`)}#creativework`,
}

/** The site-wide graph. Rendered once, in app/layout.tsx. */
export const siteGraph = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': ID.person,
      name: PERSON.name,
      alternateName: PERSON.alternateName,
      jobTitle: PERSON.jobTitle,
      description: BIO_LONG.split('\n\n')[0],
      url: SITE_URL,
      image: abs(PERSON.image),
      email: `mailto:${PERSON.email}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: PERSON.locality,
        addressRegion: PERSON.region,
        addressCountry: PERSON.country,
      },
      worksFor: { '@id': ID.org },
      knowsAbout: [
        'Full-stack web development',
        'Next.js',
        'React',
        'TypeScript',
        'AI agents and LLM workflows',
        'Shopify and e-commerce engineering',
        'Product design',
      ],
      sameAs: [...SAME_AS],
    },
    {
      '@type': 'ProfessionalService',
      '@id': ID.org,
      name: PERSON.worksFor,
      url: PERSON.worksForUrl,
      description:
        'Creative technology studio delivering full-stack product design, brand systems and AI-native digital experiences.',
      founder: { '@id': ID.person },
      email: `mailto:${PERSON.email}`,
      areaServed: 'Worldwide',
      address: {
        '@type': 'PostalAddress',
        addressLocality: PERSON.locality,
        addressCountry: PERSON.country,
      },
    },
    {
      '@type': 'WebSite',
      '@id': ID.website,
      url: SITE_URL,
      name: SITE_NAME,
      description: BIO_LONG.split('\n\n')[0],
      publisher: { '@id': ID.person },
      inLanguage: 'en',
    },
  ],
})

type Crumb = { name: string; path: string }

export const webPage = (opts: {
  path: string
  name: string
  description: string
  updated?: string
}) => ({
  '@type': 'WebPage',
  '@id': ID.webPage(opts.path),
  url: abs(opts.path),
  name: opts.name,
  description: opts.description,
  isPartOf: { '@id': ID.website },
  about: { '@id': ID.person },
  inLanguage: 'en',
  ...(opts.updated ? { dateModified: opts.updated } : {}),
})

export const breadcrumb = (path: string, trail: Crumb[]) => ({
  '@type': 'BreadcrumbList',
  '@id': ID.breadcrumb(path),
  itemListElement: trail.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: abs(c.path),
  })),
})

export const faqPage = (path: string, qa: readonly { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  '@id': ID.faq(path),
  mainEntity: qa.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
})

export const caseStudyNode = (c: CaseStudy) => ({
  '@type': 'CreativeWork',
  '@id': ID.work(c.slug),
  name: c.title,
  headline: c.tagline,
  description: c.summary,
  url: abs(`/work/${c.slug}`),
  sameAs: c.url,
  image: abs(c.cover.src),
  dateModified: c.updated,
  creator: { '@id': ID.person },
  author: { '@id': ID.person },
  keywords: [...c.stack].join(', '),
})

export const serviceNode = (s: {
  slug: string
  title: string
  summary: string
}) => ({
  '@type': 'Service',
  name: s.title,
  description: s.summary,
  provider: { '@id': ID.org },
  areaServed: 'Worldwide',
  url: abs(`/start?type=${s.slug}`),
})

/** Wraps page-level nodes into a single graph document. */
export const graph = (...nodes: object[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
})
