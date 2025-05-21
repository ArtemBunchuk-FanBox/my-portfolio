"use client";

import { Sky } from '@/components/Sky';
import { useResponsive } from '@/context/ResponsiveContext';
import ResponsiveWrapper from '@/components/ResponsiveWrapper';
import { NavMenu, MobileNavMenu } from '@/components/NavMenu/index';
import { DesktopHeroSection, MobileHeroSection } from '@/components/HeroSection';
import { DesktopExperienceSection, MobileExperienceSection } from '@/components/ExperienceSection';
import { DesktopSkillsSection, MobileSkillsSection } from '@/components/SkillsSection';
import { DesktopTechStackSection, MobileTechStackSection } from '@/components/TechStackSection';
import { DesktopRecentProjectsSection, MobileRecentProjectsSection } from '@/components/RecentProjectsSection';
import Footer from '@/components/Footer';

export default function Home() {
  const { isMobile } = useResponsive();
  
  return (
    <main className="min-h-screen bg-gray-900 text-white relative" id="top">
      {/* Background with stars and clouds */}
      <Sky />
      
      {/* Responsive Navigation */}
      <ResponsiveWrapper 
        mobileComponent={<MobileNavMenu />}
        desktopComponent={<NavMenu />}
      />
      
      {/* Main Content - conditionally apply desktop styling */}
      <div className={`relative z-10 ${!isMobile ? 'pt-24' : ''}`}>
        {/* Hero Section - use different versions for mobile/desktop */}
        <div id="hero">
          <ResponsiveWrapper
            mobileComponent={<MobileHeroSection />}
            desktopComponent={<DesktopHeroSection />}
          />
        </div>
        
        {/* Experience Section - now with mobile/desktop versions */}
        <div id="experience">
          <ResponsiveWrapper
            mobileComponent={<MobileExperienceSection />}
            desktopComponent={<DesktopExperienceSection />}
          />
        </div>
        
        {/* Recent Projects Section - moved up right after Experience */}
        <div id="projects">
          <ResponsiveWrapper
            mobileComponent={<MobileRecentProjectsSection />}
            desktopComponent={<DesktopRecentProjectsSection />}
          />
        </div>
        
        {/* Skills Section - now with mobile/desktop versions */}
        <div id="skills">
          <ResponsiveWrapper
            mobileComponent={<MobileSkillsSection />}
            desktopComponent={<DesktopSkillsSection />}
          />
        </div>
        
        {/* Tech Stack Section - now with mobile/desktop versions */}
        <div id="tech-stack">
          <ResponsiveWrapper
            mobileComponent={<MobileTechStackSection />}
            desktopComponent={<DesktopTechStackSection />}
          />
        </div>
        
        <div id="contact">
          <Footer />
        </div>
      </div>
    </main>
  );
}