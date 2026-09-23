/**
 * Developer tools built by Ahmed Riyaz (Arz). Feeds /tools, the
 * SoftwareApplication JSON-LD and /llms.txt.
 *
 * A tool entry points at its case study (caseStudy slug) for the long-form
 * write-up, so the two pages never duplicate each other's content.
 *
 * CONTENT RULE: same as projects.ts — verifiable facts only. No invented
 * prices, ratings or user counts. Leave TODO(ahmed) where a real value belongs.
 */

export type DevTool = {
  slug: string
  name: string
  tagline: string
  /** 1–2 sentences, answer-first. */
  summary: string
  url: string
  /** schema.org applicationCategory */
  category: 'DeveloperApplication'
  /** schema.org operatingSystem */
  os: string
  features: readonly string[]
  /** Case-study slug under /work for the full write-up. */
  caseStudy?: string
  /**
   * schema.org Offer. Only fill with the real, published pricing model.
   * TODO(ahmed): add ReadyPI's actual pricing (free tier? pay-as-you-go in BDT?)
   * — Google needs `offers` for SoftwareApplication rich results.
   */
  offers?: { price: string; priceCurrency: string; description?: string }
  updated: string
}

export const devTools: readonly DevTool[] = [
  {
    slug: 'readypi',
    name: 'ReadyPI',
    tagline: 'One API. 150+ models. Billed in your own currency.',
    summary:
      'ReadyPI is an OpenAI-compatible API gateway that gives developers a single endpoint across 150+ language models from OpenAI, Anthropic, Google, Meta and DeepSeek, with real-time usage analytics and local-currency billing.',
    url: 'https://readypi.online',
    category: 'DeveloperApplication',
    os: 'Web, any OS (REST API)',
    features: [
      'Drop-in OpenAI API compatibility — migrate by changing the base URL and key',
      'One endpoint routed across 150+ models; model choice is a string parameter',
      'Real-time dashboard: requests, tokens, latency and cost per key and per model',
      'Billing in local currency — no international card required',
    ],
    caseStudy: 'readypi',
    updated: '2026-09-24',
  },
]
