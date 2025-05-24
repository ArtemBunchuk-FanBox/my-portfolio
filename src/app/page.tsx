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
  
  // Restore URL fragment updating on scroll, but with a simpler approach
  useEffect(() => {
    // Function to get the currently visible section
    const getCurrentSection = () => {
      // Get all sections
      const sections = [
        { id: 'hero', element: document.getElementById('hero') },
        { id: 'experience', element: document.getElementById('experience') },
        { id: 'projects', element: document.getElementById('projects') },
        { id: 'skills', element: document.getElementById('skills') },
        { id: 'tech-stack', element: document.getElementById('tech-stack') },
        { id: 'contact', element: document.getElementById('contact') }
      ].filter(({ element }) => element !== null);
      
      // If at the very top, treat as home/hero
      if (window.scrollY < 100) {
        return 'hero';
      }
      
      // Find section most in view - much simpler approach
      let mostVisibleSection = null;
      let maxVisibleHeight = 0;
      
      sections.forEach(({ id, element }) => {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(window.innerHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          mostVisibleSection = id;
        }
      });
      
      return mostVisibleSection;
    };
    
    // Update URL without triggering scroll
    const updateUrl = (sectionId: string) => {
      if (!sectionId) return;
      
      const url = sectionId === 'hero' 
        ? window.location.pathname 
        : `${window.location.pathname}#${sectionId}`;
      
      history.replaceState(null, '', url);
    };
    
    // Handle scroll with significant debouncing to prevent performance issues
    let scrollTimeout: string | number | NodeJS.Timeout | null | undefined = null;
    let lastScrollTime = 0;
    const scrollDelay = 250; // ms
    
    const handleScroll = () => {
      const now = Date.now();
      
      // Clear any pending timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Only process if enough time has passed since the last scroll event
      if (now - lastScrollTime > scrollDelay) {
        const currentSection = getCurrentSection();
        if (currentSection) {
          updateUrl(currentSection);
        }
        lastScrollTime = now;
      } else {
        // Otherwise, set a timeout to check after the delay
        scrollTimeout = setTimeout(() => {
          const currentSection = getCurrentSection();
          if (currentSection) {
            updateUrl(currentSection);
          }
          lastScrollTime = Date.now();
          scrollTimeout = null;
        }, scrollDelay);
      }
    };
    
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
    
    // Set up event listeners
    window.addEventListener('scroll', handleScroll);
    handleInitialHash();
    
    // Set initial URL based on current position
    setTimeout(() => {
      const initialSection = getCurrentSection();
      if (initialSection) {
        updateUrl(initialSection);
      }
    }, 100);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);
  
  return (
    <main className="min-h-screen bg-transparent text-white relative">
      {/* Background with stars and clouds - now fixed position */}
      <Sky />
      
      {/* Wrap the entire content with JobTitleProvider so NavMenu can access it */}
      <JobTitleProvider>
        {/* Content with higher z-index to appear above sky */}
        <div className="relative z-10">
          {/* Responsive Navigation */}
          <ResponsiveWrapper 
            mobileComponent={<MobileNavMenu />}
            desktopComponent={<NavMenu />}
          />
          
          {/* Main Content - conditionally apply desktop styling */}
          <div className={`${!isMobile ? 'pt-24' : ''}`}>
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
        </div>
      </JobTitleProvider>
    </main>
  );
}