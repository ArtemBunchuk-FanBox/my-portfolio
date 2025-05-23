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
import { JobTitleProvider } from '@/context/JobTitleContext';
import { useEffect } from 'react';

export default function Home() {
  const { isMobile } = useResponsive();
  
  // Super simple scroll detection without side effects
  useEffect(() => {
    // Handle hash navigation on page load
    const handleInitialHash = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          setTimeout(() => {
            const offsetTop = targetElement.offsetTop;
            window.scrollTo({
              top: offsetTop - 100, // Adjust offset as needed
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    };
    
    // Run once on mount
    handleInitialHash();
    
    // No scroll event listener to avoid any side effects
    
  }, []);
  
  return (
    <main className="min-h-screen bg-gray-900 text-white relative">
      {/* Background with stars and clouds */}
      <Sky />
      
      {/* Wrap the entire content with JobTitleProvider so NavMenu can access it */}
      <JobTitleProvider>
        {/* Responsive Navigation */}
        <ResponsiveWrapper 
          mobileComponent={<MobileNavMenu />}
          desktopComponent={<NavMenu />}
        />
        
        {/* Main Content - conditionally apply desktop styling */}
        <div className={`relative z-10 ${!isMobile ? 'pt-24' : ''}`}>
          {/* Hero Section */}
          <div id="hero">
            <ResponsiveWrapper
              mobileComponent={<MobileHeroSection />}
              desktopComponent={<DesktopHeroSection />}
            />
          </div>
          
          {/* Experience Section */}
          <div id="experience">
            <ResponsiveWrapper
              mobileComponent={<MobileExperienceSection />}
              desktopComponent={<DesktopExperienceSection />}
            />
          </div>
          
          {/* Recent Projects Section */}
          <div id="projects">
            <ResponsiveWrapper
              mobileComponent={<MobileRecentProjectsSection />}
              desktopComponent={<DesktopRecentProjectsSection />}
            />
          </div>
          
          {/* Skills Section */}
          <div id="skills">
            <ResponsiveWrapper
              mobileComponent={<MobileSkillsSection />}
              desktopComponent={<DesktopSkillsSection />}
            />
          </div>
          
          {/* Tech Stack Section */}
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
      </JobTitleProvider>
    </main>
  );
}