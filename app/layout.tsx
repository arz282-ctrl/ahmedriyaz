import '@/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Instrument_Serif, Playfair_Display, Space_Mono, Syncopate } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { WorldProvider } from '@/lib/WorldContext'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'], variable: '--font-sans' })
const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: ['400'], style: ['normal', 'italic'], variable: '--font-display' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-code' })
const syncopate = Syncopate({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-logo' })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700', '900'], style: ['normal', 'italic'], variable: '--font-soul' })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arz.dev'
const SITE_NAME = 'ARZ.dev'
const TITLE = 'ARZ.dev — Rijuyan Ahmed | Creative Technologist'
const DESCRIPTION =
  'Portfolio of Rijuyan Ahmed — Architect of digital products, Wanderer of the natural world. Founder of Rareware Studio.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s · ARZ.dev',
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Rijuyan Ahmed' }],
  creator: 'Rijuyan Ahmed',
  keywords: [
    'Rijuyan Ahmed',
    'ARZ',
    'Rareware Studio',
    'Next.js',
    'AI agents',
    'Web design',
    'Creative technologist',
    'Portfolio',
    'Bangladesh',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
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
      <body className={`${jakarta.variable} ${instrumentSerif.variable} ${spaceMono.variable} ${syncopate.variable} ${playfair.variable} noise`} suppressHydrationWarning>
        <WorldProvider>{children}</WorldProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
