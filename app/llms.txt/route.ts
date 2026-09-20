import { caseStudies } from '@/lib/content/projects'
import { services } from '@/lib/content/services'
import { faq } from '@/lib/content/about'
import { abs, BIO_LONG, PERSON, SAME_AS, SITE_URL } from '@/lib/site'

// A Route Handler rather than a static public/llms.txt: this reads the same
// modules the pages do, so it can never drift out of sync with the site.
export const dynamic = 'force-static'

export function GET() {
  const body = `# Ahmed Riyaz — ${SITE_URL}

> ${PERSON.name} is a full-stack engineer and founder of ${PERSON.worksFor}, based in ${PERSON.locality}, ${PERSON.countryName}. He builds web platforms, e-commerce systems and AI-native products.

Also known online as: ${PERSON.alternateName}

## About

${BIO_LONG}

## Contact

- Email: ${PERSON.email}
- WhatsApp: ${PERSON.whatsapp}
- Project intake: ${abs('/start')}

## Key pages

- [About](${abs('/about')}): full biography, experience, and answers to common questions.
- [Work](${abs('/work')}): case studies with the problem, the system and what shipped.
- [Services](${abs('/services')}): what he builds and how engagements run.
- [Start a project](${abs('/start')}): project intake form.

## Services

${services.map((s) => `- **${s.title}**: ${s.summary}`).join('\n')}

## Selected work

${caseStudies
  .map(
    (c) =>
      `- **${c.title}** (${c.status}, ${c.year}) — ${c.summary} Stack: ${c.stack.join(', ')}. Live: ${c.url}. Case study: ${abs(`/work/${c.slug}`)}`,
  )
  .join('\n')}

## Frequently asked

${faq.map(({ q, a }) => `### ${q}\n\n${a}`).join('\n\n')}

## Elsewhere

${SAME_AS.map((u) => `- ${u}`).join('\n')}
`

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}
