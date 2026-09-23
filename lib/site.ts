/**
 * Single source of truth for site identity.
 *
 * Every canonical URL, JSON-LD @id, sitemap entry and robots directive derives
 * from SITE_URL. Change the domain here (or via NEXT_PUBLIC_SITE_URL in Vercel)
 * and the whole site follows.
 *
 * Data only — no Tailwind class strings. Tailwind's `content` globs do not scan
 * lib/, so any class name written here would be purged.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arz-dev.vercel.app'
).replace(/\/+$/, '')

export const SITE_NAME = 'ARZ.dev'

/** Absolute URL for a site-relative path. */
export const abs = (path: string) => new URL(path, `${SITE_URL}/`).toString()

export const PERSON = {
  name: 'Ahmed Riyaz',
  /** Developer handle. Paired with the legal name as DISPLAY_NAME. */
  handle: 'Arz',
  /** Surfaced once, on /about, and as schema.org alternateName. Never an H1. */
  alternateName: 'Rijuyan Ahmed',
  /** Every name the Person entity answers to — schema.org alternateName. */
  aliases: ['Arz', 'ARZ', 'Rijuyan Ahmed'],
  jobTitle: 'Founder & Full-Stack / AI Systems Engineer',
  email: 'ahmed@rarewarestudio.space',
  whatsapp: 'https://wa.me/8801710515419',
  worksFor: 'Rareware Studio',
  worksForUrl: 'https://rarewarestudio.space',
  locality: 'Sylhet',
  region: 'Sylhet Division',
  country: 'BD',
  countryName: 'Bangladesh',
  image: '/avatar.jpg',
  twitterHandle: '@AhmedxRiyaz',
} as const

/**
 * Canonical naming standard: "Ahmed Riyaz (Arz)". Use this exact string on
 * every external profile (GitHub, LinkedIn, X, dev.to, Hashnode) so search and
 * answer engines resolve the legal name and the handle to one entity.
 */
export const DISPLAY_NAME = `${PERSON.name} (${PERSON.handle})` as const

/**
 * Answer-first bio, 40–60 words. The paragraph AI answer engines lift for a
 * direct citation. Rendered at the top of /about, in /llms.txt and /about.md.
 */
export const BIO_ANSWER = `Ahmed Riyaz (Arz) is a full-stack developer and founder of Rareware Studio in Sylhet, Bangladesh, who builds dev tools and API integrations for other developers. His flagship tool, ReadyPI, is an OpenAI-compatible gateway that gives developers one API across 150+ language models with local-currency billing.`

/**
 * Named profile URLs. Components must import from here rather than hardcoding —
 * the LinkedIn slug was previously duplicated in two components and went stale
 * when the profile moved.
 */
export const LINKS = {
  linkedin: 'https://linkedin.com/in/arz4dev',
  github: 'https://github.com/arz282-ctrl',
  x: 'https://x.com/AhmedxRiyaz',
  instagram: 'https://www.instagram.com/ahmed_x_riyaz/',
  facebook: 'https://www.facebook.com/riyaz282/',
  studio: 'https://rarewarestudio.space',
} as const

/** schema.org sameAs — the entity-resolution signal. Order is significance. */
export const SAME_AS = [
  LINKS.linkedin,
  LINKS.github,
  LINKS.x,
  LINKS.instagram,
  LINKS.facebook,
  LINKS.studio,
] as const

/**
 * The canonical bio. Reused verbatim on /about, in Person JSON-LD, in
 * /llms.txt and in /about.md so every surface tells AI answer engines the
 * same story. ~145 words.
 *
 * TODO(ahmed): edit this in your own voice before launch — it becomes your
 * definitive bio everywhere, on and off the site.
 */
export const BIO_LONG = `Ahmed Riyaz is a full-stack engineer and founder based in Sylhet, Bangladesh, working remote-first with clients worldwide. He founded Rareware Studio in 2023, a creative technology studio that designs and ships production software: web platforms, e-commerce systems and AI-native products.

His work spans the whole stack — Next.js, React and TypeScript on the front end, Node.js and Python services behind them, and LLM workflows wired into both. He built ReadyPI, an OpenAI-compatible gateway that gives developers one API across 150+ models with local-currency billing, and has shipped Shopify Hydrogen storefronts, legal and hospitality platforms, and motion-heavy brand sites.

Before founding Rareware he worked independently from 2022, building conversion-focused product sites and design systems for international clients. He is a 2024 graduate of Outskill's Generative AI Mastermind.`

/** ≤155 characters, for <meta name="description">. Name + offer + CTA. */
export const BIO_SHORT =
  'Ahmed Riyaz (Arz) builds dev tools and API integrations, by a dev for devs — plus web platforms and AI products at Rareware Studio.'

/**
 * Hand-maintained ISO dates for sitemap lastModified. A real date is a signal;
 * `new Date()` reports "now" on every crawl and is therefore no signal at all.
 * Bump the entry when you meaningfully change a page.
 */
export const PAGE_UPDATED: Record<string, string> = {
  '/': '2026-09-24',
  '/about': '2026-09-24',
  '/work': '2026-09-21',
  '/services': '2026-09-21',
  '/start': '2026-09-21',
  '/beyond': '2026-09-21',
  '/tools': '2026-09-24',
}
