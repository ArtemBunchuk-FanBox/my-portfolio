"use client";
/* eslint-disable */
import { useState } from 'react';
import MobileProfileImage from './mobile/MobileProfileImage';
import MobileJobTitle from './mobile/MobileJobTitle';
import MobileSocialButtons from './mobile/MobileSocialButtons';
import MobileProfileBlurb from './mobile/MobileProfileBlurb';

// Add a prop for location which defaults to empty string
export default function MobileHeroSection({ location = "" }) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [profileHovered, setProfileHovered] = useState(false);
  
  return (
    <section className="pt-20 pb-6">
      <div className="container mx-auto px-4">
        {/* Hero section with mobile optimized components */}
        <div className="flex flex-col items-center text-center">
          {/* Mobile Profile Image */}
          <MobileProfileImage 
            profileHovered={profileHovered}
            setProfileHovered={setProfileHovered} 
          />
          
          {/* Info Section */}
          <div className="w-full">
            {/* Name */}
            <h1 className="text-2xl font-bold mb-1 text-white">Artem Bunchuk</h1>
            
            {/* Subtitle */}
            <div className="text-lg text-gray-300 mb-1">
              <span className="font-semibold">Meet your next:</span>
            </div>
            
            {/* Mobile Job title component */}
            <MobileJobTitle />
            
            {/* Location indicator - only show if location is provided */}
            {location && (
              <div className="flex items-center justify-center text-gray-400 mb-5">
                <div className="w-4 h-4 flex items-center justify-center mr-1">
                  <svg 
                    className="w-4 h-4" 
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
                </div>
                <span className="text-base">{location}</span>
              </div>
            )}
          
            {/* Mobile Social buttons component */}
            <MobileSocialButtons 
              activeTooltip={activeTooltip}
              setActiveTooltip={setActiveTooltip}
            />
          </div>
        </div>
        
        {/* Mobile Blurb section */}
        <MobileProfileBlurb />
      </div>
    </section>
  );
}
