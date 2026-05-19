import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import ContactSection from '@/components/sections/ContactSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import HeroSection from '@/components/sections/HeroSection'
import MetaAdsShowcase from '@/components/sections/MetaAdsShowcase'
import ProjectsSection from '@/components/sections/ProjectsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import WandererTransition from '@/components/sections/WandererTransition'
import AnimatedShaderBackground from '@/components/ui/animated-shader-background-dynamic'
import { LogoCarousel } from '@/components/ui/logo-carousel'

export default function Page() {
  return (
    <main className="bg-[var(--void)] text-[var(--silver)]">
      <Navbar />
      <HeroSection />

      {/* Aurora shader background behind all post-hero content */}
      <div className="relative">
        <AnimatedShaderBackground className="fixed top-0 left-0 w-full h-full" opacity={0.34} />
        <div className="relative z-10">
          <LogoCarousel />

          <div
            aria-hidden
            className="pointer-events-none relative -mt-4 h-24 bg-[linear-gradient(180deg,rgba(3,6,8,0)_0%,rgba(3,6,8,0.6)_52%,rgba(3,6,8,0.82)_100%)]"
          />

          <SkillsSection />
          <ProjectsSection />
          <MetaAdsShowcase />
          <ExperienceSection />
          <WandererTransition />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </main>
  )
}
