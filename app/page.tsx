import Navbar from '@/components/layout/Navbar'
import ContactSection from '@/components/sections/ContactSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import HeroSection from '@/components/sections/HeroSection'
import LifeVisionSection from '@/components/sections/LifeVisionSection'
import NatureHeroSection from '@/components/sections/NatureHeroSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import SunsetGallerySection from '@/components/sections/SunsetGallerySection'
import WandererTransition from '@/components/sections/WandererTransition'

export default function Page() {
  return (
    <main className="bg-[var(--void)] text-[var(--silver)]">
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <WandererTransition />
      <NatureHeroSection />
      <SunsetGallerySection />
      <LifeVisionSection />
      <ContactSection />
    </main>
  )
}
