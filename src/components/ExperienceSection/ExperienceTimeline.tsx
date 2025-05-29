import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Institution, workExperience } from '@/data/experience';
import ExperienceItem from './ExperienceItem';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface ExperienceTimelineProps {
  activeTab: 'work' | 'education';
  experiencesToShow: Institution[];
  isChangingTab: boolean;
  openInstitutionDetails: (institution: Institution, initialRoleIndex?: number) => void;
  showAllCurrent: boolean;
  handleSeeMoreClick: () => void;
  hiddenContent: { roles: number, orgs: number };
}

export default function ExperienceTimeline({
  activeTab,
  experiencesToShow,
  isChangingTab,
  openInstitutionDetails,
  showAllCurrent,
  handleSeeMoreClick,
  hiddenContent
}: ExperienceTimelineProps) {
  // Reference to the experience section for scrolling
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Format the "See More" button text to show count of hidden roles
  const getSeeMoreButtonText = () => {
    if (hiddenContent.roles === 0) return "See More Experience";
    
    return `Show ${hiddenContent.roles} More Role${hiddenContent.roles > 1 ? 's' : ''}`;
  };
  
  // Handle "Show Less" click with scroll animation - adjusted to scroll to a better position
  const handleShowLessClick = () => {
    // Find the experience section header for better scroll position
    const experienceHeader = document.querySelector('.rounded-md h2');
    
    if (experienceHeader) {
      // Smooth scroll to the section header with offset
      window.scrollTo({
        top: experienceHeader.getBoundingClientRect().top + window.scrollY - 100, // 100px offset from top
        behavior: 'smooth'
      });
      
      // After scrolling, collapse the content
      setTimeout(() => {
        handleSeeMoreClick(); // Toggle the expanded state
      }, 500);
    } else {
      // Fallback if header not found, try the timeline element
      if (timelineRef.current) {
        timelineRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
        setTimeout(() => handleSeeMoreClick(), 500);
      } else {
        // Last resort fallback
        handleSeeMoreClick();
      }
    }
  };

  // Get the next role for teaser (not next institution)
  const getNextRole = () => {
    if (activeTab !== 'work' || showAllCurrent) return null;
    
    // Use imported workExperience instead of require
    if (experiencesToShow.length === 1 && experiencesToShow[0].roles.length === 1) {
      const firstInstitution = workExperience[0];
      
      // Check if there's a next role in the same organization
      if (firstInstitution.roles.length > 1) {
        return {
          institution: firstInstitution,
          role: firstInstitution.roles[1] // Get the second role
        };
      }
    }
    
    return null;
  };
  
  const nextRole = getNextRole();

  return (
    <div className="relative pb-0 min-h-[300px]" ref={timelineRef}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`${isChangingTab ? 'pointer-events-none' : ''} relative z-5`}
        >
          {/* Experience items */}
          <div className="space-y-20 mb-8">
            {experiencesToShow.map((institution, index) => (
              <ExperienceItem
                key={`${institution.name}-${index}`}
                institution={institution}
                index={index}
                openInstitutionDetails={openInstitutionDetails}
              />
            ))}
          </div>
          
          {/* Teaser preview with purple-tinted gradient fade */}
          {activeTab === 'work' && !showAllCurrent && nextRole && (
            <div className="relative mb-12 mt-2 overflow-visible">
              {/* Create a wrapper with relative positioning and visible overflow */}
              <div style={{ position: 'relative', overflow: 'visible' }}>
                {/* Actual teaser content */}
                <div className="relative pl-12 overflow-visible">
                  <div className="opacity-50 pointer-events-none" style={{ maxHeight: '120px' }}>

                    {/* Role display with proper formatting */}
                    <div className="mb-2 pl-14 relative">
                      {/* Horizontal line for roles */}
                      <div 
                        className="absolute h-0.5 bg-white" 
                        style={{
                          left: "-76px",
                          width: "52px",
                          top: "0.8em",
                          zIndex: "2"
                        }}
                      ></div>
                      
                      {/* Period */}
                      <div className="text-gray-400 text-base mb-1">{nextRole.role.period}</div>
                      
                      {/* Title with gradient styling */}
                      <div 
                        className="text-2xl md:text-3xl font-bold mb-2"
                        style={{
                          background: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          color: 'transparent'
                        }}
                      >
                        {nextRole.role.title}
                      </div>
                      
                      {/* Summary */}
                      {nextRole.role.summary && (
                        <div className="text-base md:text-lg text-gray-300 mb-4">
                          {nextRole.role.summary}
                        </div>
                      )}
                      

                    </div>
                  </div>
                </div>
              
                {/* Full-page gradient overlay with visible overflow */}
                <div 
                  style={{
                    position: 'absolute',
                    background: 'linear-gradient(to bottom, rgba(88,28,135,0.1) 0%, rgba(88,28,135,0.6) 40%, rgba(88,28,135,0.95) 70%)',
                    left: '13px',
                    right: '-23px',
                    top: '-20px',
                    height: '200px', 
                    pointerEvents: 'none',
                    zIndex: 20
                  }}
                />
                
                {/* Button positioned over the gradient */}
                <div className="absolute left-0 right-0 top-10 flex justify-center" style={{ zIndex: 30 }}>
                  <motion.button
                    onClick={handleSeeMoreClick}
                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all duration-300 select-none cursor-pointer shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="select-none">{getSeeMoreButtonText()}</span>
                    <motion.div
                      animate={{ y: [0, 2, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <FaChevronDown className="text-sm" />
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </div>
          )}

          {/* See More button - Only show if no teaser is displayed */}
          {activeTab === 'work' && !showAllCurrent && !nextRole && hiddenContent.roles > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex justify-center mb-8"
            >
              <motion.button
                onClick={handleSeeMoreClick}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all duration-300 select-none cursor-pointer"
                whileTap={{ scale: 0.98 }}
              >
                <span className="select-none">{getSeeMoreButtonText()}</span>
                <motion.div
                  animate={{ y: [0, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <FaChevronDown className="text-sm" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
          
          {/* Show Less button - standalone when expanded */}
          {activeTab === 'work' && showAllCurrent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center mb-8"
            >
              <motion.button
                onClick={handleShowLessClick}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all duration-300 select-none cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="select-none">Show Less</span>
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <FaChevronUp className="text-sm" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
          
          <div className="h-3"></div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}