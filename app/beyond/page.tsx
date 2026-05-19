import type { Metadata } from 'next'
import BeyondNavbar from '@/components/layout/BeyondNavbar'
import { PrismaHero } from '@/components/ui/prisma-hero'
import SunsetGallerySection from '@/components/sections/SunsetGallerySection'
import LifeVisionSection from '@/components/sections/LifeVisionSection'
import EveryFrameSection from '@/components/sections/EveryFrameSection'
import Footer from '@/components/layout/Footer'
import { ParallaxComponent } from '@/components/ui/parallax-scrolling'

export const metadata: Metadata = {
  title: 'Beyond — ARZ.dev | The Wanderer',
  description: 'Beyond the code. Nature, sunsets, mountains, oceans — the life Rijuyan Ahmed is building towards.',
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
