// src/app/page.tsx
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import TechStackSection from '@/components/TechStackSection';
import NavMenu from '@/components/NavMenu';
import { Sky } from '@/components/Sky';

export default function Home() {
  return (
    <main className="relative">
      {/* Sky background - positioned absolutely to cover the page */}
      <div className="fixed inset-0 z-0">
        <Sky />
      </div>
      
      {/* Navigation menu */}
      <NavMenu />
      
      {/* Content sections with relative positioning and higher z-index */}
      <div className="relative z-10 pt-24">
        <section id="about">
          <HeroSection />
        </section>
        <section id="experience">
          <ExperienceSection />
        </section>
        <section id="skills">
          <SkillsSection />
        </section>
        <section id="tech-stack">
          <TechStackSection />
        </section>
        {/* More sections will be added here */}
      </div>
    </main>
  );
}