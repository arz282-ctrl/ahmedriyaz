import { faq, roles } from '@/lib/content/about'
import { abs, BIO_ANSWER, BIO_LONG, DISPLAY_NAME, PERSON, SAME_AS } from '@/lib/site'

export const dynamic = 'force-static'

export function GET() {
  const body = `# ${DISPLAY_NAME}

${PERSON.jobTitle} · ${PERSON.locality}, ${PERSON.countryName} · Remote-first

Also known as ${PERSON.aliases.join(', ')}.

${BIO_ANSWER}

${BIO_LONG}

## Experience

${roles
  .map(
    (r) =>
      `### ${r.title} — ${r.org}\n${r.period} · ${r.location}\n\n${r.points.map((p) => `- ${p}`).join('\n')}`,
  )
  .join('\n\n')}

## Frequently asked

${faq.map(({ q, a }) => `**${q}**\n\n${a}`).join('\n\n')}

## Contact

- Email: ${PERSON.email}
- WhatsApp: ${PERSON.whatsapp}
- Start a project: ${abs('/start')}

## Elsewhere

${SAME_AS.map((u) => `- ${u}`).join('\n')}
`

  return new Response(body, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}
