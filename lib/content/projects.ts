/**
 * The single source of case-study data.
 *
 * Read by the homepage ProjectsSection, /work, /work/[slug] and app/sitemap.ts,
 * so the homepage and the case studies can never drift apart. Server-safe: no
 * 'use client', no JSX, no Tailwind class strings.
 *
 * CONTENT RULE: everything here must be verifiable — live URLs, real stacks,
 * real screenshots, factual descriptions of what was built. Where a real
 * outcome metric belongs but isn't known, leave a TODO(ahmed) rather than an
 * invented number.
 */

export type CaseStudyImage = {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

export type CaseStudy = {
  slug: string
  title: string
  /** One line, used as the card subhead and the page lede. */
  tagline: string
  status: 'live' | 'launching' | 'shipping'
  url: string
  year: string
  role: string
  stack: readonly string[]
  /** 1–2 sentences. Feeds the /work card and generateMetadata description. */
  summary: string
  problem: readonly string[]
  system: readonly string[]
  /** What shipped. Capabilities, not metrics. */
  outcome: readonly string[]
  cover: CaseStudyImage
  images: readonly CaseStudyImage[]
  /** ISO date → sitemap lastModified. */
  updated: string
  featured?: boolean
}

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: 'readypi',
    title: 'ReadyPI',
    tagline: 'One API. 150+ models. Billed in your own currency.',
    status: 'live',
    url: 'https://readypi.online',
    year: '2025',
    role: 'Product design, full-stack build, deployment',
    stack: ['Next.js', 'Node.js', 'TypeScript', 'REST APIs'],
    summary:
      'An OpenAI-compatible gateway that gives developers a single API across 150+ language models, with usage analytics and local-currency billing.',
    problem: [
      'Shipping an AI feature usually means integrating each provider separately. Every vendor has its own SDK, its own auth, its own request and response shape, and its own billing account. Swapping models — or hedging against one provider going down — means rewriting integration code rather than changing a config value.',
      'The billing side is worse outside the United States. Most providers price and charge in USD and expect an international card, which adds currency conversion, card-decline friction and a reconciliation problem for teams that budget in their local currency.',
    ],
    system: [
      'ReadyPI exposes a single REST surface that matches the OpenAI API format exactly. Existing SDK code migrates by changing the base URL and the key — no new client library, no rewritten call sites.',
      'Behind that surface, a routing layer normalises requests across more than 150 models from providers including OpenAI, Anthropic, Google, Meta and DeepSeek, so model choice becomes a string parameter instead of an integration project.',
      'A usage dashboard reports requests, tokens, latency and cost in real time, so spend is attributable per key and per model rather than discovered at the end of a billing cycle.',
      'Billing is denominated in the customer’s local currency, removing the international-card requirement that blocks a lot of teams from using frontier models at all.',
    ],
    outcome: [
      'Live and serving traffic at readypi.online.',
      'Drop-in OpenAI compatibility means an existing integration migrates in a two-line change.',
      'Model selection, failover and cost tracking became configuration rather than engineering work.',
      // TODO(ahmed): add real numbers here when you have them — registered developers,
      // requests served, median latency. Leave this blank rather than estimating.
    ],
    cover: {
      src: '/screenshots/readypi-dashboard.webp',
      alt: 'ReadyPI usage dashboard showing request, token, latency and cost metrics',
      width: 1999,
      height: 1004,
    },
    images: [
      {
        src: '/screenshots/readypi-dashboard.webp',
        alt: 'ReadyPI usage dashboard showing request, token, latency and cost metrics',
        width: 1999,
        height: 1004,
        caption: 'Real-time usage analytics per API key and per model.',
      },
      {
        src: '/screenshots/readypi-quickstart.webp',
        alt: 'ReadyPI quickstart documentation showing an OpenAI-compatible code sample',
        width: 2000,
        height: 1091,
        caption: 'Quickstart: the same request shape as the OpenAI SDK.',
      },
      {
        src: '/screenshots/readypi-desktop.webp',
        alt: 'The ReadyPI marketing site describing access to 150+ language models',
        width: 440,
        height: 2000,
        caption: 'The public site and model catalogue.',
      },
    ],
    updated: '2026-09-21',
    featured: true,
  },

  {
    slug: 'raw-fx-studio',
    title: 'Raw FX Studio',
    tagline: 'A production studio’s reel, rebuilt as a website.',
    status: 'live',
    url: 'https://raw-fx.vercel.app/',
    year: '2025',
    role: 'Art direction, front-end build, motion design',
    stack: ['Next.js', 'GSAP', 'Framer Motion', 'Vercel'],
    summary:
      'A cinematic site for a product-photography and motion studio, where the interface itself demonstrates the craft being sold.',
    problem: [
      'A visual production studio sells timing, light and movement. A conventional portfolio grid — thumbnails in rows, a lightbox on click — flattens exactly the qualities the client is being hired for, and leaves the site indistinguishable from every other studio template.',
      'The work also carries technical credibility that a gallery throws away: the gear, the focal lengths, the colour pipeline. That detail is what a serious commercial client reads to decide whether the studio can hold a brief.',
    ],
    system: [
      'The site is built as a sequence rather than a grid. GSAP drives scroll-linked transitions between sections and Framer Motion handles the interface-level motion, so browsing the work is itself a demonstration of the studio’s timing.',
      'A full-bleed motion gallery presents footage at scale instead of in thumbnails, with golden-hour compositions carrying their own frame.',
      'Shoot metadata is surfaced as content rather than hidden: Sony A6700 bodies, 35mm and 50mm lens data, and an S-LOG3 colour pipeline are stated explicitly for clients who know to look for them.',
    ],
    outcome: [
      'Live on Vercel.',
      'The portfolio reads as a single continuous piece rather than a catalogue.',
      'Technical specification is presented as a selling point rather than buried in a capabilities PDF.',
    ],
    cover: {
      src: '/screenshots/rawfx-1.webp',
      alt: 'Raw FX Studio homepage with a full-bleed cinematic hero',
      width: 2000,
      height: 1088,
    },
    images: [
      {
        src: '/screenshots/rawfx-1.webp',
        alt: 'Raw FX Studio homepage with a full-bleed cinematic hero',
        width: 2000,
        height: 1088,
      },
      {
        src: '/screenshots/rawfx-2.webp',
        alt: 'Raw FX Studio luxury product photography section',
        width: 2000,
        height: 1089,
        caption: 'Luxury product work presented at full width.',
      },
      {
        src: '/screenshots/rawfx-3.webp',
        alt: 'Raw FX Studio motion gallery showing golden-hour compositions',
        width: 2000,
        height: 1091,
        caption: 'The motion gallery, with shoot metadata surfaced.',
      },
    ],
    updated: '2026-09-21',
    featured: true,
  },

  {
    slug: 'rarekits',
    title: 'RareKits.shop',
    tagline: 'A World Cup storefront on Shopify Hydrogen.',
    status: 'shipping',
    url: 'https://rarekits.shop',
    year: '2025',
    role: 'Storefront build, supplier integration, paid acquisition',
    stack: ['Shopify', 'Hydrogen', 'Meta Ads', 'Dropshipping'],
    summary:
      'A football-kit brand built for the 2026 World Cup cycle: a Hydrogen storefront over a 300+ product catalogue with a global supplier network behind it.',
    problem: [
      'A World Cup retail window is short and sharply seasonal. The storefront has to be live and fast well before demand arrives, and it has to carry a catalogue large enough to cover the long tail of national teams and clubs that buyers actually search for.',
      'Running that catalogue as a dropship operation adds a second problem: supply is spread across multiple international suppliers, so the storefront has to stay coherent while the fulfilment behind it does not sit in one warehouse.',
    ],
    system: [
      'The storefront is built on Shopify Hydrogen, so the commerce primitives — cart, checkout, inventory, payments — come from Shopify while the front end stays a custom React surface rather than a theme.',
      'The catalogue covers 300+ products across national and club kits, structured so that collection and search paths match how buyers actually look for a shirt.',
      'Fulfilment runs through a global supplier network, with the product data layer treating supplier variation as an implementation detail rather than something the customer sees.',
      'Meta Ads drives acquisition, with the pixel and catalogue wired to the storefront so campaigns run against live product data.',
    ],
    outcome: [
      'Storefront shipping ahead of the 2026 tournament window.',
      'A 300+ product catalogue running on Shopify’s commerce infrastructure with a custom Hydrogen front end.',
      'Paid acquisition connected directly to live catalogue data.',
      // TODO(ahmed): once the season runs, add real commerce outcomes here —
      // orders fulfilled, catalogue depth at peak, return rate. Real numbers only.
    ],
    cover: {
      src: '/screenshots/rarekits-banner.webp',
      alt: 'RareKits.shop storefront banner showing football kits',
      width: 1983,
      height: 793,
    },
    images: [
      {
        src: '/screenshots/rarekits-banner.webp',
        alt: 'RareKits.shop storefront banner showing football kits',
        width: 1983,
        height: 793,
      },
    ],
    updated: '2026-09-21',
    featured: true,
  },

  {
    slug: 'whitenwise',
    title: 'WhiteNWise',
    tagline: 'Business utilities, payments and accountancy under one roof.',
    status: 'live',
    url: 'https://www.whitenwise.com/',
    year: '2026',
    role: 'Design and full-stack build',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    summary:
      'A UK brokerage platform covering business energy, water, payments, legal and accountancy, built around an interactive savings calculator that quantifies the offer before anyone fills in a form.',
    problem: [
      'WhiteNWise brokers five different things — energy, water, card payments, legal and accountancy — and is paid by suppliers rather than by clients. That is a hard proposition to land: a business owner arriving cold has to understand a multi-service offer, believe the "zero cost to you" claim, and then act, all before they lose interest.',
      'Utilities brokerage also competes on a number the visitor cannot see. Until someone knows roughly what they would save, every call to action is an abstraction, and a plain contact form asks them to take the whole thing on faith.',
    ],
    system: [
      'The savings calculator is the centre of the page rather than a buried tool. Business-type presets and sliders for electricity, gas, card volume and water produce a live annual estimate broken down per utility, alongside a current-versus-projected spend comparison.',
      'Each of the five service lines gets its own structured section, so a visitor who only came for card terminals can find that without wading through energy copy.',
      'Supplier marks run as a continuous strip, which is the fastest way to establish that this is a broker with real supplier relationships rather than a lead-capture page.',
      'The "how it works" flow is reduced to three steps with the effort explicitly on the broker\'s side, addressing the real objection: switching sounds like work.',
      'Built on Next.js and Tailwind and deployed on Vercel, with the calculator computing entirely client-side so results are instant.',
    ],
    outcome: [
      'Live at whitenwise.com.',
      'The savings estimate is available before any form, so the primary CTA follows a number rather than a promise.',
      'All five service lines are addressable from one page without diluting any of them.',
    ],
    cover: {
      src: '/screenshots/whitenwise-desktop.webp',
      alt: 'WhiteNWise homepage showing the business savings calculator and utilities offer',
      width: 2000,
      height: 1250,
    },
    images: [
      {
        src: '/screenshots/whitenwise-desktop.webp',
        alt: 'WhiteNWise homepage showing the business savings calculator and utilities offer',
        width: 2000,
        height: 1250,
      },
    ],
    updated: '2026-09-21',
    featured: true,
  },

  {
    slug: 'getitdone',
    title: 'GetItDone Building Services',
    tagline: 'One local tradesman, every trade, built for local search.',
    status: 'live',
    url: 'https://www.getitdonebuildingservices.com/',
    year: '2026',
    role: 'Design, build and local SEO structure',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Local SEO'],
    summary:
      'A multi-trade building services site for Ilford and East London, structured around the way people actually search for a tradesman: by job, and by postcode.',
    problem: [
      'A tradesman covering tiling, plumbing, carpentry, bathrooms and kitchens has a positioning problem in search. Nobody searches for "multi-trade specialist" — they search for "bathroom tiling Ilford" or "emergency plumber Hackney". A single generic services page competes for none of those.',
      'Trust is the second half of the job. Homeowners are letting a stranger into their house, so the site has to answer who this is, what recent work looks like, and how pricing happens, before a quote request is realistic.',
    ],
    system: [
      'Services are split into distinct trade pages — tiling, plumbing, carpentry, bathroom fitting, kitchen fitting — each written against the job-plus-place phrasing people actually type, rather than collapsed into one list.',
      'A job-picker lets a visitor self-select the closest match to their work, which routes them into the right service rather than a generic enquiry.',
      'Recent projects are shown as real jobs with specifics — a full bathroom retile in IG3, a Shaker kitchen fit, internal doors and architrave — because concrete beats adjectives for this audience.',
      'An interactive coverage map with per-area pages makes the service radius explicit across Ilford, Hackney, Newham, Barking, Stratford and the surrounding boroughs.',
      'The four-step process — free assessment, written price before work starts, clean completion, walk-through handover — is stated up front, since pricing uncertainty is the main reason these enquiries stall.',
    ],
    outcome: [
      'Live at getitdonebuildingservices.com.',
      'Each trade and each covered area has its own indexable page instead of one generic services list.',
      'The quote path starts from the specific job rather than a blank contact form.',
    ],
    cover: {
      src: '/screenshots/getitdone-desktop.webp',
      alt: 'GetItDone Building Services homepage for a tiler, plumber and carpenter in Ilford',
      width: 2000,
      height: 1250,
    },
    images: [
      {
        src: '/screenshots/getitdone-desktop.webp',
        alt: 'GetItDone Building Services homepage for a tiler, plumber and carpenter in Ilford',
        width: 2000,
        height: 1250,
      },
    ],
    updated: '2026-09-21',
  },

  {
    slug: 'bagel-77',
    title: 'Bagel 77',
    tagline: 'A Green Street cafe, with the menu as the whole website.',
    status: 'live',
    url: 'https://bagel77-web.vercel.app/',
    year: '2026',
    role: 'Art direction, design and build',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    summary:
      'An editorial site for a London E13 bagel and coffee shop, where a sixty-item menu is the primary interface and ordering, collection and table booking all branch off it.',
    problem: [
      'A cafe with sixty-plus fillings across bagels, paninis, wraps, parathas, loaded fries and breakfasts has a menu that fights itself. Dumped into one long list it becomes unreadable; split across tabs it hides the range that is the actual selling point.',
      'The site also has to serve three different intents at once — someone ordering delivery, someone collecting on the way to work, and someone booking a table at the weekend — without making any of them hunt.',
    ],
    system: [
      'The menu is treated as the primary interface rather than a secondary page, organised by category with each item carrying its own price, description and rating so the range reads as depth instead of noise.',
      'Delivery, collection and reservation are surfaced as three parallel paths from the top of the page, each with its own terms stated plainly — flat local delivery, free over a threshold, order-ahead collection.',
      'An editorial art direction — serif display type over full-bleed product photography in a muted olive palette — positions it as a considered cafe rather than a takeaway listing.',
      'Operational facts people actually check are pinned as their own block: halal certification, opening hours, and the Green Street address.',
    ],
    outcome: [
      'Live at bagel77-web.vercel.app.',
      'The full menu is browsable and priced without leaving the page.',
      'Delivery, collection and table booking each have a distinct path from the homepage.',
    ],
    cover: {
      src: '/screenshots/bagel77-desktop.webp',
      alt: 'Bagel 77 homepage with editorial serif headline over full-bleed bagel photography',
      width: 2000,
      height: 1250,
    },
    images: [
      {
        src: '/screenshots/bagel77-desktop.webp',
        alt: 'Bagel 77 homepage with editorial serif headline over full-bleed bagel photography',
        width: 2000,
        height: 1250,
      },
    ],
    updated: '2026-09-21',
    featured: true,
  },

  {
    slug: 'ak-consultant',
    title: 'AK Consultant UK',
    tagline: 'Credibility and a booking path for a legal consultancy.',
    status: 'launching',
    url: 'https://akconsultant.uk',
    year: '2025',
    role: 'Design and full-stack build',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    summary:
      'A premium consultancy site built around the two things a prospective legal client checks first: whether the practice is credentialled, and how quickly they can speak to someone.',
    problem: [
      'Legal consultancy is bought on trust before it is bought on price. A prospective client arrives wanting to verify credentials and understand whether this practice covers their specific situation — and most consultancy sites bury both behind generic corporate copy.',
      'The second failure is the handoff. Even when a visitor is convinced, the path from “this looks right” to an actual conversation is usually a bare contact form with no indication of what happens next.',
    ],
    system: [
      'Practice areas are given their own structured sections, so a visitor can confirm their situation is covered rather than inferring it from a services list.',
      'Authorised-mentor credentials are presented as primary content near the top of the page rather than as footer boilerplate.',
      'A booking flow replaces the generic contact form, so the site ends in a scheduled conversation rather than an unacknowledged message.',
      'Built on Next.js and Tailwind and deployed on Vercel, keeping the page fast on the mobile connections most first visits arrive on.',
    ],
    outcome: [
      'Built and in launch preparation at akconsultant.uk.',
      'Credentials and practice coverage are answerable above the fold.',
      'The primary conversion path ends in a booking rather than a form submission.',
    ],
    cover: {
      src: '/screenshots/akconsultant-desktop.webp',
      alt: 'AK Consultant UK site showing practice areas and consultancy credentials',
      width: 367,
      height: 2000,
    },
    images: [
      {
        src: '/screenshots/akconsultant-desktop.webp',
        alt: 'AK Consultant UK site showing practice areas and consultancy credentials',
        width: 367,
        height: 2000,
      },
    ],
    updated: '2026-09-21',
  },

  {
    slug: 'rareware-studio',
    title: 'Rareware Studio',
    tagline: 'The studio’s own platform.',
    status: 'live',
    url: 'https://rarewarestudio.space',
    year: '2024',
    role: 'Founder — brand, design and build',
    stack: ['React', 'GSAP', 'Custom CSS', 'Netlify'],
    summary:
      'The home of the creative technology studio I founded in 2023, built to communicate engineering rigour and creative direction at the same time.',
    problem: [
      'A studio that sells both engineering and art direction has a positioning problem. Lead with the engineering and it reads as a dev shop; lead with the visuals and it reads as a design agency that will need a technical partner. Prospective clients sort studios into one bucket or the other within a few seconds.',
      'As the studio’s own front door, the site also has to be the strongest single argument for hiring it — anything generic undercuts the pitch directly.',
    ],
    system: [
      'Custom motion work built with GSAP carries the creative-direction claim, so the craft is demonstrated rather than asserted.',
      'The interface architecture — component structure, interaction states, performance under motion — carries the engineering claim for the visitors who look closely.',
      'Brand and identity systems are treated as part of the same deliverable as the build, which is how the studio actually sells: one team from identity through to deployment.',
    ],
    outcome: [
      'Live at rarewarestudio.space as the studio’s primary platform.',
      'Serves international client work across e-commerce, SaaS and hospitality engagements.',
      'Positions engineering and creative direction as one offer rather than two.',
    ],
    cover: {
      src: '/screenshots/rareware-studio-desktop.webp',
      alt: 'Rareware Studio site showing custom motion design and studio positioning',
      width: 485,
      height: 1999,
    },
    images: [
      {
        src: '/screenshots/rareware-studio-desktop.webp',
        alt: 'Rareware Studio site showing custom motion design and studio positioning',
        width: 485,
        height: 1999,
      },
    ],
    updated: '2026-09-21',
  },

  {
    slug: 'lookx-gents-parlour',
    title: 'LookX Gents Parlour',
    tagline: 'A neighbourhood barbershop, bookable online.',
    status: 'live',
    url: 'https://lookx-gents-parlour.vercel.app',
    year: '2025',
    role: 'Design and build',
    stack: ['Next.js', 'Vercel', 'LangChain'],
    summary:
      'A web app for a premium men’s grooming parlour: services, a portfolio gallery and a booking flow, with an AI booking agent scoped as the next phase.',
    problem: [
      'A grooming parlour loses bookings to the phone. Calls arrive while chairs are full, get missed, and the customer books somewhere else — while the work itself, which is visual and is the actual reason people choose one barber over another, stays invisible to anyone who has not already walked past the shop.',
    ],
    system: [
      'Services and pricing are structured as browsable content, so a customer can decide what they want before making contact.',
      'A portfolio gallery puts the actual cuts in front of the customer, which is the real selling surface for grooming.',
      'A booking flow takes the appointment directly, so a request no longer depends on someone being free to answer the phone.',
      'Built on Next.js and deployed on Vercel, with LangChain in the stack for the conversational booking agent scoped as the next phase.',
    ],
    outcome: [
      'Live, taking bookings through the site rather than only by phone.',
      'The shop’s portfolio is public and browsable.',
      'Architecture in place for an AI booking agent as a follow-on phase.',
    ],
    cover: {
      src: '/screenshots/lookx-desktop.webp',
      alt: 'LookX Gents Parlour site showing grooming services and booking flow',
      width: 592,
      height: 2000,
    },
    images: [
      {
        src: '/screenshots/lookx-desktop.webp',
        alt: 'LookX Gents Parlour site showing grooming services and booking flow',
        width: 592,
        height: 2000,
      },
    ],
    updated: '2026-09-21',
  },
]

export const caseStudySlugs = caseStudies.map((c) => c.slug)

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug)

export const featuredCaseStudies = caseStudies.filter((c) => c.featured)

export const STATUS_LABEL: Record<CaseStudy['status'], string> = {
  live: 'LIVE',
  launching: 'LAUNCHING',
  shipping: 'SHIPPING',
}
