import '@/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Lato, Playfair_Display, Space_Mono, Syncopate } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { WorldProvider } from '@/lib/WorldContext'
import JsonLd from '@/components/seo/JsonLd'
import { siteGraph } from '@/lib/schema'
import { BIO_SHORT, PERSON, SITE_NAME, SITE_URL } from '@/lib/site'

// Preloaded: body, labels, wordmark and the display serif — all four appear
// above the fold. Playfair is /beyond-only, so it loads without a
// render-blocking preload rather than sitting in every route's critical path.
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'], variable: '--font-sans' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-code' })
const syncopate = Syncopate({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-logo' })
// Headings. Lato is the closest widely-available humanist sans to Gill Sans —
// same classical roman skeleton and understated proportions. Gill Sans itself
// is Monotype-licensed and not deliverable as a webfont, and a local-only
// stack would render differently on macOS than everywhere else.
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-display' })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700', '900'], style: ['normal', 'italic'], variable: '--font-soul', preload: false })

const TITLE = 'Ahmed Riyaz (Arz) — Dev Tools by a Dev | ARZ.dev'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    // Puts the entity name in every sub-page title.
    template: '%s · Ahmed Riyaz',
  },
  description: BIO_SHORT,
  applicationName: SITE_NAME,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  publisher: PERSON.name,
  keywords: [
    'Ahmed Riyaz',
    'Ahmed Riyaz (Arz)',
    'Arz developer',
    'ARZ.dev',
    'dev tools by dev',
    'developer tools',
    'API integrations',
    'Ahmed Riyaz developer',
    'Ahmed Riyaz Next.js',
    'Rareware Studio',
    'ReadyPI',
    'Full-stack developer',
    'AI agents',
    'Next.js',
    'Shopify Hydrogen',
    'Sylhet',
    'Bangladesh',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: TITLE,
    description: BIO_SHORT,
    url: SITE_URL,
    locale: 'en_US',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: BIO_SHORT,
    creator: PERSON.twitterHandle,
  },
  robots: { index: true, follow: true },
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#030608' },
    { media: '(prefers-color-scheme: light)', color: '#030608' },
  ],
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${lato.variable} ${spaceMono.variable} ${syncopate.variable} ${playfair.variable} noise`} suppressHydrationWarning>
        <JsonLd data={siteGraph()} />
        <WorldProvider>{children}</WorldProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
