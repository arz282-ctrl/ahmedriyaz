import type { Metadata } from 'next'
import BeyondNavbar from '@/components/layout/BeyondNavbar'
import { PrismaHero } from '@/components/ui/prisma-hero'
import SunsetGallerySection from '@/components/sections/SunsetGallerySection'
import LifeVisionSection from '@/components/sections/LifeVisionSection'
import EveryFrameSection from '@/components/sections/EveryFrameSection'
import Footer from '@/components/layout/Footer'
import { ParallaxComponent } from '@/components/ui/parallax-scrolling'

export const metadata: Metadata = {
  // The root layout's '%s · Ahmed Riyaz' template supplies the suffix.
  title: 'Beyond — The Wanderer',
  description:
    'Beyond the code. Nature, sunsets, mountains and oceans — the life Ahmed Riyaz is building towards.',
  // Without this, the page inherits the layout's canonical: '/' and
  // canonicalizes itself away into the homepage.
  alternates: { canonical: '/beyond' },
}

export default function BeyondPage() {
  return (
    <main className="bg-[#fffdf8] text-[#2a2a2a]">
      <BeyondNavbar />
      <PrismaHero />
      <SunsetGallerySection />
      <LifeVisionSection />
      <ParallaxComponent />
      <EveryFrameSection />
      <Footer />
    </main>
  )
}
