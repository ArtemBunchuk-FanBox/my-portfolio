import React, { useCallback, useRef } from 'react';
import Image from 'next/image';
import { FaSuitcase, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  workExperience,
  jobTitleToResponsibilities,
  projectTags,
  Institution
} from '@/data/experience';

interface MobileExperienceTimelineProps {
  activeTab: 'work' | 'education';
  isChangingTab: boolean;
  openInstitutionDetails: (institution: Institution, initialRoleIndex?: number) => void;
  currentJobTitle: string;
  highlightIntensity: number;
  titlePinned: boolean;
  experiencesToShow: Institution[];
  showAllCurrent: boolean;
  handleSeeMoreClick: () => void;
  hiddenContent: { roles: number, orgs: number };
}

export default function MobileExperienceTimeline({
  activeTab,
  isChangingTab,
  openInstitutionDetails,
  currentJobTitle,
  highlightIntensity,
  titlePinned,
  experiencesToShow,
  showAllCurrent,
  handleSeeMoreClick,
  hiddenContent
}: MobileExperienceTimelineProps) {
  // Reference for scrolling
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Gather all the responsibility points that should be highlighted for this job title
  const highlightedPoints = React.useMemo(() => {
    const points: string[] = [];
    
    const jobMapping = jobTitleToResponsibilities[currentJobTitle] || {};
    
    // For each institution in the mapping
    Object.keys(jobMapping).forEach(instName => {
      const institutionMapping = jobMapping[instName];
      
      // For each role in this institution
      Object.keys(institutionMapping).forEach(roleTitle => {
        // Add all points that should be highlighted
        const rolePoints = institutionMapping[roleTitle] || [];
        points.push(...rolePoints);
      });
    });
    
    return points;
  }, [currentJobTitle]);

  // Function to check if a responsibility should be highlighted
  const shouldHighlight = useCallback((responsibility: {text: string, bold: string}) => {
    // Check if any highlighted point is contained in this responsibility text
    return highlightedPoints.some(point => 
      responsibility.text.toLowerCase().includes(point.toLowerCase()));
  }, [highlightedPoints]);

  // Get style for highlighted points
  const getHighlightStyle = useCallback((responsibility: {text: string, bold: string}) => {
    // Base text opacity values - increased contrast for mobile
    const baseOpacity = 0.6; // Slightly less dimmed for better readability on small screens
    const highlightedOpacity = 1.0; // Fully bright text (highlighted)
    
    // If this responsibility should be highlighted, make it brighter
    if (shouldHighlight(responsibility)) {
      // Use full intensity when pinned
      const effectiveIntensity = titlePinned ? 1 : highlightIntensity;
      
      // Interpolate opacity based on highlight intensity
      const opacity = baseOpacity + (highlightedOpacity - baseOpacity) * effectiveIntensity;
      
      return {
        opacity: opacity,
        transition: 'opacity 0.5s ease', // Slightly longer transition for smoother effect
        // Add subtle text shadow when pinned
        textShadow: titlePinned ? '0 0 1px rgba(255,255,255,0.1)' : 'none'
      };
    } 
    // Otherwise, dim it more significantly
    else {
      return {
        opacity: baseOpacity,
        transition: 'opacity 0.5s ease'
      };
    }
  }, [highlightIntensity, shouldHighlight, titlePinned]);

  // Format the "See More" button text to show count of hidden roles
  const getSeeMoreButtonText = () => {
    if (hiddenContent.roles === 0) return "See More Experience";
    
    return `Show ${hiddenContent.roles} More Role${hiddenContent.roles > 1 ? 's' : ''}`;
  };
  
  // Handle "Show Less" click - collapse first, then scroll
  const handleShowLessClick = () => {
    // First collapse the content
    handleSeeMoreClick();
    
    // Then wait for state update and re-render
    setTimeout(() => {
      // Find the experience section container after re-render
      const experienceSection = document.querySelector('.rounded-md.border.border-white');
      
      if (experienceSection) {
        // Get the bottom position
        const sectionRect = experienceSection.getBoundingClientRect();
        const targetPosition = window.scrollY + sectionRect.bottom - window.innerHeight + 20;
        
        // Scroll to position the bottom of the section near the bottom of viewport
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 100); // Short delay to allow for re-render
  };
  
  // Get the next role for teaser preview (specifically for mobile)
  const getNextRole = () => {
    if (activeTab !== 'work' || showAllCurrent) return null;
    
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
    <div className="pb-4 min-h-[200px]" ref={timelineRef}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`${isChangingTab ? 'pointer-events-none' : ''}`}
        >
          {/* Experience items with clearer layout */}
          <div className="space-y-10">
            {experiencesToShow.map((institution, index) => (
              <div key={`${institution.name}-${index}`} className="bg-gray-800/30 rounded-lg border border-purple-500/20 overflow-hidden">
                {/* Institution logo aligned to the left - now clickable */}
                <div 
                  className="flex justify-start pl-2 pt-4 pb-2"
                  onClick={() => openInstitutionDetails(institution)}
                >
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center border-2 border-white/70 bg-white/10 cursor-pointer hover:border-purple-500/70 transition-all duration-300">
                    {institution.logo ? (
                      <Image
                        src={institution.logo}
                        alt={institution.name}
                        width={60}
                        height={60}
                        style={{ objectFit: 'contain' }}
                      />
                    ) : (
                      <FaSuitcase className="w-8 h-8 text-white" />
                    )}
                  </div>
                </div>
                
                {/* Roles list */}
                <div className="px-4 pb-4">
                  {institution.roles.map((role, roleIndex) => {
                    return (
                      <div 
                        key={`${role.title}-${roleIndex}`} 
                        className={`mb-6 ${roleIndex > 0 ? 'pt-5 border-t border-white/10' : ''}`}
                      >
                        {/* Organization name without period */}
                        <div className="mb-3">
                          <div className="flex-1 min-w-0">
                            {/* Make company name clickable to open modal */}
                            <span 
                              className="text-white hover:text-white/80 transition-colors text-sm font-medium cursor-pointer inline-block"
                              onClick={() => roleIndex === 0 
                                ? openInstitutionDetails(institution) // First role - open modal without scrolling
                                : openInstitutionDetails(institution, roleIndex) // Other roles - scroll to specific role
                              }
                            >
                              {institution.name}
                              <FaExternalLinkAlt className="text-[10px] opacity-70 ml-1 inline-block align-baseline" />
                            </span>
                          </div>
                        </div>
                        
                        {/* Period above title - aligned to left */}
                        <div className="text-gray-300 text-sm mb-1">
                          {role.period}
                        </div>
                        
                        {/* Title with larger font size */}
                        <div className="mb-3">
                          <h3
                            className="text-xl font-bold break-words active:opacity-70 transition-opacity cursor-pointer leading-tight"
                            style={{
                              background: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                              color: 'transparent'
                            }}
                            onClick={() => openInstitutionDetails(institution, roleIndex)}
                          >
                            {role.title}
                            <FaExternalLinkAlt className="inline-block ml-1.5 text-[10px] opacity-50" />
                          </h3>
                        </div>
                        
                        {/* Add role summary */}
                        {role.summary && (
                          <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                            {role.summary}
                          </p>
                        )}
                        
                        {/* If no summary but has responsibilities, add less bottom margin */}
                        {!role.summary && role.responsibilities.length > 0 && (
                          <div className="mb-1"></div>
                        )}
                        
                        {/* Responsibilities - larger text for better readability */}
                        {role.responsibilities.length > 0 && (
                          <ul className="space-y-2 text-gray-200 text-sm">
                            {role.responsibilities.map((responsibility, respIndex) => (
                              <li 
                                key={`resp-${respIndex}`}
                                className="flex transition-all duration-300 mb-1.5"
                                style={getHighlightStyle(responsibility)}
                              >
                                <span className="inline-block flex-shrink-0 w-4 mr-1.5 text-center">•</span>
                                <span className="flex-1">
                                  {responsibility.bold ? (
                                    <>
                                      <span className="font-bold">{responsibility.bold}</span>
                                      {responsibility.text.substring(responsibility.bold.length)}
                                    </>
                                  ) : (
                                    responsibility.text
                                  )}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        {/* Project tags with improved styling */}
                        {role.title.includes('NFTVue') && (
                          <div className="mt-3 flex gap-2 flex-wrap">
                            {projectTags.map((tag) => (
                              <a
                                key={tag.name}
                                href={tag.url}
                                className="px-3 py-1 text-sm border border-purple-500/30 rounded-md text-white hover:bg-purple-500/20 transition-colors inline-flex items-center gap-1 bg-gray-800/30"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span className="mr-1">🔗</span> {tag.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Teaser preview with gradient fade - ONLY MODIFYING THE GRADIENT POSITION */}
          {activeTab === 'work' && !showAllCurrent && nextRole && (
            <div className="relative mt-2 mb-8 overflow-visible">
              <div className="relative overflow-visible">
                {/* Teaser content */}
                <div className="relative pl-4 overflow-visible">
                  <div className="opacity-50 pointer-events-none" style={{ maxHeight: '100px' }}>
                    {/* Role preview */}
                    <div className="mb-2 pl-2 relative">
                      {/* Period */}
                      <div className="text-gray-300 text-sm mb-1">{nextRole.role.period}</div>
                      
                      {/* Title with gradient styling */}
                      <h3
                        className="text-xl font-bold break-words leading-tight"
                        style={{
                          background: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          color: 'transparent'
                        }}
                      >
                        {nextRole.role.title}
                      </h3>
                      
                      {/* Summary preview */}
                      {nextRole.role.summary && (
                        <p className="text-gray-300 text-sm mt-2">
                          {nextRole.role.summary.substring(0, 80)}...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Modified gradient overlay to extend to the bottom border */}
                <div 
                  style={{
                    position: 'absolute',
                    background: 'linear-gradient(to bottom, rgba(88,28,135,0.1) 0%, rgba(88,28,135,0.7) 50%, rgba(88,28,135,0.95) 80%)',
                    left: '-16px',
                    right: '-16px',
                    top: '-10px',
                    bottom: '-47px', // Increased to extend beyond the container to the border
                    pointerEvents: 'none',
                    zIndex: 20
                  }}
                />
                
                {/* "See More" button positioned over the gradient */}
                <div className="absolute left-0 right-0 top-12 flex justify-center" style={{ zIndex: 30 }}>
                  <motion.button
                    onClick={handleSeeMoreClick}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all duration-300 shadow-lg text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{getSeeMoreButtonText()}</span>
                    <motion.div
                      animate={{ y: [0, 2, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <FaChevronDown className="text-xs" />
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </div>
          )}
          
          {/* NEW: Standard "See More" button when no teaser is shown */}
          {activeTab === 'work' && !showAllCurrent && !nextRole && hiddenContent.roles > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex justify-center my-6"
            >
              <motion.button
                onClick={handleSeeMoreClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all duration-300 text-sm"
                whileTap={{ scale: 0.95 }}
              >
                <span>{getSeeMoreButtonText()}</span>
                <motion.div
                  animate={{ y: [0, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <FaChevronDown className="text-xs" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
          
          {/* NEW: "Show Less" button when expanded */}
          {showAllCurrent && hiddenContent.roles > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center my-6"
            >
              <motion.button
                onClick={handleShowLessClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all duration-300 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Show Less</span>
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <FaChevronUp className="text-xs" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
