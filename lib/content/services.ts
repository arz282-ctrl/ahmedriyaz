/**
 * Service lines. Shared by /services and the /start intake wizard, so the
 * chips in the wizard can never drift from the offers on the page and
 * /start?type=<slug> deep links always resolve.
 *
 * No prices. TODO(ahmed): add real ranges here if you want them public —
 * leaving them out means every enquiry starts with a conversation.
 */

export type Service = {
  slug: string
  title: string
  /** Shown on the card and used as the Service schema description. */
  summary: string
  /** What's actually included. Capability statements, no metrics. */
  includes: readonly string[]
  /** Case study slugs that evidence this line. */
  evidence: readonly string[]
}

export const services: readonly Service[] = [
  {
    slug: 'ai',
    title: 'AI products & agents',
    summary:
      'LLM-backed products and internal agents: model gateways, retrieval pipelines, and conversational flows wired into systems you already run.',
    includes: [
      'Model routing and provider abstraction',
      'Retrieval and vector search over your own data',
      'Agent workflows with tool use',
      'Usage, latency and cost instrumentation',
    ],
    evidence: ['readypi'],
  },
  {
    slug: 'web',
    title: 'Web & product engineering',
    summary:
      'Production web platforms built on Next.js and TypeScript — designed, built and deployed by one person who stays through launch.',
    includes: [
      'Next.js App Router architecture',
      'Design systems and component libraries',
      'Performance and Core Web Vitals work',
      'Deployment, analytics and handover',
    ],
    evidence: ['whitenwise', 'getitdone', 'ak-consultant', 'lookx-gents-parlour'],
  },
  {
    slug: 'shopify',
    title: 'Shopify & e-commerce',
    summary:
      'Custom storefronts on Shopify Hydrogen, with catalogue architecture and supplier integration behind them.',
    includes: [
      'Hydrogen storefronts with custom front ends',
      'Catalogue and collection architecture',
      'Supplier and fulfilment integration',
      'Pixel, catalogue feed and campaign wiring',
    ],
    evidence: ['rarekits'],
  },
  {
    slug: 'creative',
    title: 'Creative & motion',
    summary:
      'Brand systems and motion-led interfaces — identity through to a shipped, animated front end, as one engagement.',
    includes: [
      'Identity and brand systems',
      'GSAP and Framer Motion interface work',
      'Art direction for product and campaign',
      'Cinematic landing pages',
    ],
    evidence: ['raw-fx-studio', 'bagel-77', 'rareware-studio'],
  },
]

export const serviceSlugs = services.map((s) => s.slug)

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug)
