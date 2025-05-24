"use client";
/* eslint-disable */
import { useState, useCallback } from 'react';
import Image from 'next/image';
import { FaSuitcase, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  workExperience, 
  educationExperience, 
  jobTitleToResponsibilities, 
  projectTags,
  Institution 
} from '@/data/experience';
import { useJobTitle } from '@/context/JobTitleContext';
import React from 'react';

export default function MobileExperienceSection() {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');
  const [activeInstitution, setActiveInstitution] = useState<Institution | null>(null);
  const [isChangingTab, setIsChangingTab] = useState(false);
  
  // Use the JobTitle context directly instead of events
  const {
    titleIndex,
    jobTitles,
    highlightIntensity,
    titlePinned
  } = useJobTitle();
  
  // Get the current job title
  const currentJobTitle = jobTitles[titleIndex];

  // Function to open institution details modal
  const openInstitutionDetails = (institution: Institution, initialRoleIndex?: number) => {
    setActiveInstitution(institution);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Dispatch custom event to hide navigation
    const event = new CustomEvent('modalStateChange', { 
      detail: { isOpen: true } 
    });
    window.dispatchEvent(event);
    
    // For backward compatibility with mobile navigation
    const navElement = document.getElementById('mobile-nav');
    if (navElement) navElement.style.display = 'none';

    // If an initial role index is provided, set focus to that role after modal opens
    if (initialRoleIndex !== undefined && initialRoleIndex >= 0) {
      setTimeout(() => {
        const roleElement = document.getElementById(`mobile-modal-role-${initialRoleIndex}`);
        if (roleElement) {
          roleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add a temporary highlight effect
          roleElement.classList.add('highlight-role-mobile');
          setTimeout(() => roleElement.classList.remove('highlight-role-mobile'), 1500);
        }
      }, 400);
    }
  };

  // Function to close institution details modal
  const closeInstitutionDetails = () => {
    setActiveInstitution(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
    
    // Dispatch custom event to show navigation again
    const event = new CustomEvent('modalStateChange', { 
      detail: { isOpen: false } 
    });
    window.dispatchEvent(event);
    
    // For backward compatibility with mobile navigation
    const navElement = document.getElementById('mobile-nav');
    if (navElement) navElement.style.display = '';
  };

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

  // Get style for highlighted points - making relevant points much brighter and others dimmer
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

  // Enhanced tab switching with animation
  const handleTabChange = (tab: 'work' | 'education') => {
    if (tab === activeTab) return;
    
    // Store current scroll position
    const scrollPosition = window.scrollY;
    
    // Set transitioning state
    setIsChangingTab(true);
    
    // Delay the actual tab change for the animation
    setTimeout(() => {
      setActiveTab(tab);
      setIsChangingTab(false);
      
      // Restore scroll position after a slight delay to ensure render is complete
      setTimeout(() => window.scrollTo(0, scrollPosition), 50);
    }, 300);
  };

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="rounded-md border border-white overflow-visible">
          <h2 className="text-2xl font-bold py-3 px-4 border-b border-white text-white bg-gray-800/50">
            Experience
          </h2>
          
          {/* Tabs - mobile optimized and repositioned */}
          <div className="px-4 pt-4 relative">
            {/* Simplified tab design - more prominent */}
            <div className="flex rounded-lg mb-8 overflow-hidden bg-gray-800/80 max-w-xs mx-auto border border-purple-500/60">
              <button
                className={`flex-1 py-3 px-4 font-semibold text-center relative transition-all duration-300 text-white text-base`}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange('work');
                }}
                style={{ 
                  background: activeTab === 'work' 
                    ? 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)' 
                    : 'transparent',
                  boxShadow: activeTab === 'work' ? '0 4px 12px rgba(166, 79, 249, 0.4)' : 'none'
                }}
              >
                Work
              </button>
              <button
                className={`flex-1 py-3 px-4 font-semibold text-center relative transition-all duration-300 text-white text-base`}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange('education');
                }}
                style={{ 
                  background: activeTab === 'education' 
                    ? 'linear-gradient(270deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)' // Changed to 270deg (right to left)
                    : 'transparent',
                  boxShadow: activeTab === 'education' ? '0 4px 12px rgba(166, 79, 249, 0.4)' : 'none'
                }}
              >
                Education
              </button>
            </div>
            
            {/* Completely redesigned timeline content with improved transitions */}
            <div className="pb-4 min-h-[200px]"> {/* Added min-height to prevent layout shift */}
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
                    {(activeTab === 'work' ? workExperience : educationExperience).map((institution, index) => (
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
                        
                        {/* List all roles with improved spacing and readability */}
                        <div className="px-4 pb-4">
                          {institution.roles.map((role, roleIndex) => {
                            // Check if this role has highlighted points for the current job title
                            const hasHighlightedPoints = jobTitleToResponsibilities[currentJobTitle]?.[institution.name]?.[role.title]?.length > 0;
                            
                            return (
                              <div 
                                key={`${role.title}-${roleIndex}`} 
                                className={`mb-6 ${roleIndex > 0 ? 'pt-5 border-t border-white/10' : ''}`}
                              >
                                {/* Organization name and period - correctly fixed to keep date in place */}
                                <div className="flex justify-between items-center mb-3">
                                  <div className="flex-1 min-w-0 pr-2">
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
                                  <span className="text-gray-300 text-sm whitespace-nowrap flex-shrink-0">{role.period}</span>
                                </div>
                                
                                {/* Title with larger font size and proper wrapping - now clickable */}
                                <h3
                                  className={`text-xl font-bold mb-2 break-words active:opacity-70 transition-opacity cursor-pointer`}
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
                                
                                {/* Add role summary - NEW ADDITION */}
                                {role.summary && (
                                  <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                                    {role.summary}
                                  </p>
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
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Institution details modal - similar to project modal but optimized for mobile */}
      <AnimatePresence>
        {activeInstitution && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] overflow-y-auto bg-black/95"
            onClick={closeInstitutionDetails}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="relative bg-gradient-to-b from-gray-900 to-black min-h-screen w-full overflow-hidden border-0"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button with better styling and positioning */}
              <button
                className="fixed top-4 right-4 z-[10000] w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white shadow-lg border border-white/20 active:scale-95 transition-all hover:bg-black/70"
                onClick={closeInstitutionDetails}
                aria-label="Close modal"
              >
                <FaTimes size={20} />
              </button>
              
              {/* Scrollable content container with improved layout */}
              <div className="overflow-y-auto h-full pb-12 pt-0"> {/* Changed pt-4 to pt-0 */}
                {/* Hero image section - removed any borders */}
                <div className="h-48 relative w-full overflow-hidden border-0">
                  {activeInstitution.bannerImage ? (
                    <Image
                      src={activeInstitution.bannerImage}
                      alt={activeInstitution.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      quality={95}
                      priority
                      className="brightness-90"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-purple-900 to-indigo-900 flex items-center justify-center">
                      {activeInstitution.logo && (
                        <div className="w-24 h-24 relative">
                          <Image
                            src={activeInstitution.logo}
                            alt={activeInstitution.name}
                            fill
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
                </div>
                
                {/* Company content with mobile-optimized layout */}
                <div className="px-5 py-6 relative z-10">
                  {/* Title section with proper background and styling */}
                  <div className="mb-6 pb-6 border-b border-gray-800 flex flex-col">
                    <h2
                      className="text-3xl font-bold mb-3"
                      style={{
                        background: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent'
                      }}
                    >
                      {activeInstitution.name}
                    </h2>
                    
                    {/* External link button if available */}
                    {activeInstitution.link && (
                      <a
                        href={activeInstitution.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-800/80 text-white hover:bg-gray-700 transition-all duration-300 self-start"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Website</span>
                        <FaExternalLinkAlt size={12} />
                      </a>
                    )}
                  </div>

                  {/* Company overview */}
                  {activeInstitution.description && (
                    <div className="mb-6 pb-6 border-b border-gray-800">
                      <h3 className="text-base uppercase text-gray-200 font-medium mb-3">SUMMARY</h3>
                      <div className="bg-gray-800/30 border-l-2 border-purple-500/40 pl-4 py-3 pr-3 rounded-r-sm">
                        <p className="text-gray-300 leading-relaxed">
                          {activeInstitution.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Roles section */}
                  <div className="mb-6">
                    <h3 className="text-base uppercase text-gray-200 font-medium mb-3">ROLES & ACHIEVEMENTS</h3>
                    
                    <div className="space-y-8">
                      {activeInstitution.roles.map((role, roleIndex) => (
                        <div 
                          key={`mobile-modal-role-${roleIndex}`} 
                          id={`mobile-modal-role-${roleIndex}`}
                          className="bg-gray-800/30 border-l-2 border-purple-500/40 pl-4 py-3 pr-3 rounded-r-sm transition-all duration-500"
                        >
                          {/* Period and title - fixed layout for consistent positioning */}
                          <div className="mb-3 flex justify-between items-start">
                            <div className="flex-1 min-w-0 pr-2">
                              <h4
                                className="text-xl font-bold break-words"
                                style={{
                                  background: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  backgroundClip: 'text',
                                  color: 'transparent'
                                }}
                              >
                                {role.title}
                              </h4>
                            </div>
                            <div className="text-gray-400 text-sm whitespace-nowrap flex-shrink-0">{role.period}</div>
                          </div>
                          
                          {/* Add role summary in modal - NEW ADDITION */}
                          {role.summary && (
                            <p className="text-gray-300 mb-3 text-sm">
                              {role.summary}
                            </p>
                          )}
                          
                          {/* Responsibilities with highlighting applied */}
                          <ul className="space-y-1 text-gray-300">
                            {role.responsibilities.map((responsibility, respIndex) => (
                              <li 
                                key={`modal-resp-${roleIndex}-${respIndex}`}
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
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced style tag with transition effects */}
      <style jsx global>{`
        .highlight-role-mobile {
          box-shadow: 0 0 0 2px rgba(166, 79, 249, 0.5);
          background-color: rgba(130, 38, 227, 0.15) !important;
          transition: all 0.5s ease-in-out;
        }
        
        /* Add smooth transition for tab content */
        .tab-transition-enter {
          opacity: 0;
          transform: translateY(10px);
        }
        .tab-transition-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 300ms, transform 300ms;
        }
        .tab-transition-exit {
          opacity: 1;
        }
        .tab-transition-exit-active {
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 300ms, transform 300ms;
        }
      `}</style>
    </section>
  );
}
