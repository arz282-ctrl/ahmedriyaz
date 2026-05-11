import './globals.css'
import { Playfair_Display, Space_Mono, Syncopate } from 'next/font/google'
import { WorldProvider } from '@/lib/WorldContext'

const syncopate = Syncopate({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-display' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-code' })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700', '900'], style: ['normal', 'italic'], variable: '--font-soul' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${syncopate.variable} ${spaceMono.variable} ${playfair.variable}`}>
        <WorldProvider>{children}</WorldProvider>
      </body>
    </html>
  )
}
