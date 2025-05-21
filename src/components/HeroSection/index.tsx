"use client";

import { useState } from 'react';
import ProfileImage from './ProfileImage';
import JobTitle from './JobTitle';
import SocialButtons from './SocialButtons';
import ProfileBlurb from './ProfileBlurb';

export default function HeroSection() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [profileHovered, setProfileHovered] = useState(false);
  
  return (
    <section className="py-8 pt-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Hero section with profile and info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 relative">
          {/* Vertical line connecting profile to blurb - positioned absolutely */}
          <div 
            className="absolute w-0.5 bg-white hidden md:block" 
            style={{
              left: "36px",
              top: "56px", // Center of profile image
              bottom: "-259px", // Extend below the hero section to connect with blurb
              zIndex: "0"
            }}
          ></div>
          
          {/* Profile Image */}
          <ProfileImage 
            profileHovered={profileHovered}
            setProfileHovered={setProfileHovered} 
          />
          
          {/* Info Section */}
          <div className="text-center md:text-left md:flex-1">
            {/* Reduced name size */}
            <h1 className="text-3xl md:text-4xl font-bold mb-1 text-white">Artem Bunchuk</h1>
            
            {/* Subtitle with "Meet your next" */}
            <div className="flex items-center justify-center md:justify-start text-xl md:text-2xl text-gray-300 mb-1">
              <span className="font-semibold">Meet your next:</span>
            </div>
            
            {/* Job title component */}
            <JobTitle />
            
            <div className="flex items-center justify-center md:justify-start text-gray-400 mb-5">
              <svg 
                className="w-5 h-5 mr-2" 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  fillRule="evenodd" 
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="text-base md:text-lg">London, UK</span>
            </div>
          
            {/* Social buttons component */}
            <SocialButtons 
              activeTooltip={activeTooltip}
              setActiveTooltip={setActiveTooltip}
            />
          </div>
        </div>
        
        {/* Blurb section */}
        <ProfileBlurb />
      </div>
    </section>
  );
}

export { default as DesktopHeroSection } from '../HeroSection';
export { default as MobileHeroSection } from './MobileHeroSection';
