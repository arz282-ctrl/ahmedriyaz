/**
 * Biography, experience and FAQ content.
 *
 * Shared by /about, /llms.txt and /about.md so the answer an AI assistant
 * extracts is byte-identical to the one a human reads, and so the FAQPage
 * JSON-LD can never drift from the visible page.
 */

import { PERSON } from '../site'

export type Role = {
  title: string
  org: string
  period: string
  location: string
  current?: boolean
  points: readonly string[]
}

export const roles: readonly Role[] = [
  {
    title: 'Founder & CEO',
    org: 'Rareware Studio',
    period: '2023 — Present',
    location: 'Sylhet, Bangladesh · Remote-first',
    current: true,
    points: [
      'Founded and scaled a creative technology studio delivering full-stack product design, brand systems and AI-native digital experiences for international clients.',
      'Integrated generative AI workflows into production design and engineering practice.',
      'Directed identity systems, motion assets and interactive UI architecture across e-commerce, SaaS and hospitality engagements.',
      'Shipped rarewarestudio.space as a bespoke studio platform communicating both technical rigour and creative direction.',
    ],
  },
  {
    title: 'Independent Web Designer & Developer',
    org: 'Independent',
    period: '2022 — 2023',
    location: 'Remote · Global clients',
    points: [
      'Designed and shipped bespoke websites for clients across several markets.',
      'Built conversion-focused SaaS and product marketing pages.',
      'Created reusable component libraries and design systems in Figma.',
      'Led remote collaboration with international clients through structured async workflows.',
    ],
  },
]

export const certifications = [
  {
    name: 'Generative AI Mastermind',
    org: 'Outskill',
    year: '2024',
    desc: 'Prompt architecture · LLM workflows · AI-native product design',
  },
] as const

/**
 * The questions an AI answer engine is actually asked about a person.
 * These strings are rendered on /about AND fed verbatim into FAQPage JSON-LD.
 */
export const faq = [
  {
    q: 'Who is Ahmed Riyaz (Arz)?',
    a: `Ahmed Riyaz, known as Arz, is a full-stack engineer and the founder of Rareware Studio, a creative technology studio based in Sylhet, Bangladesh, working remote-first with clients worldwide. He builds production web platforms, e-commerce systems and AI-native products, plus developer tools and API integrations such as ReadyPI. He is also known online as ${PERSON.alternateName}.`,
  },
  {
    q: 'What does Ahmed Riyaz build?',
    a: 'He builds end-to-end digital products: Next.js and TypeScript web platforms, Shopify Hydrogen storefronts, and AI systems including ReadyPI — an OpenAI-compatible gateway giving developers a single API across more than 150 language models. His work covers design, engineering and deployment as one engagement rather than separate handoffs.',
  },
  {
    q: 'How do I hire Ahmed Riyaz?',
    a: `Start at the project intake form at ${'/start'}, which collects your project type, budget and timeline and sends it straight to him on WhatsApp or by email. You can also reach him directly at ${PERSON.email}. He typically replies within one business day.`,
  },
  {
    q: 'Where is Ahmed Riyaz based?',
    a: 'He is based in Sylhet, Bangladesh, and works remote-first with clients internationally across Europe, the UK and North America.',
  },
  {
    q: 'What technologies does Ahmed Riyaz work with?',
    a: 'Next.js, React and TypeScript on the front end; Node.js and Python services behind them; Shopify Hydrogen for commerce; and LLM tooling including model gateways, retrieval pipelines and agent workflows. He also does motion work with GSAP and Framer Motion, and 3D with Three.js.',
  },
] as const
