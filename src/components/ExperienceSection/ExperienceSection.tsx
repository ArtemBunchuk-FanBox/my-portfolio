/* eslint-disable */
"use client";

import { useState, useEffect, useCallback } from 'react';
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

export default function ExperienceSection() {
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

  // Function to open institution details modal with optional initial role index
  const openInstitutionDetails = (institution: Institution, initialRoleIndex?: number) => {
    setActiveInstitution(institution);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Dispatch custom event to hide navigation
    const event = new CustomEvent('modalStateChange', { 
      detail: { isOpen: true } 
    });
    window.dispatchEvent(event);

    // If an initial role index is provided, set focus to that role after modal opens
    if (initialRoleIndex !== undefined && initialRoleIndex >= 0) {
      setTimeout(() => {
        const roleElement = document.getElementById(`modal-role-${initialRoleIndex}`);
        if (roleElement) {
          roleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add a temporary highlight effect
          roleElement.classList.add('highlight-role');
          setTimeout(() => roleElement.classList.remove('highlight-role'), 1500);
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
    // Base text opacity values - increased contrast
    const baseOpacity = 0.55; // More dimmed text (non-highlighted)
    const highlightedOpacity = 1.0; // Fully bright text (highlighted)
    
    // If this responsibility should be highlighted, make it brighter
    if (shouldHighlight(responsibility)) {
      // Use full intensity when pinned
      const effectiveIntensity = titlePinned ? 1 : highlightIntensity;
      
      // Interpolate opacity based on highlight intensity
      const opacity = baseOpacity + (highlightedOpacity - baseOpacity) * effectiveIntensity;
      
      return {
        opacity: opacity,
        transition: 'opacity 0.5s ease',
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

  // Enhanced tab switching with animation - revised to keep vertical line always visible
  const handleTabChange = (tab: 'work' | 'education') => {
    if (tab === activeTab) return;
    
    // Store current scroll position
    const scrollPosition = window.scrollY;
    
    // Set changing tab state for other effects (not for the vertical line)
    setIsChangingTab(true);
    
    // Wait for content to animate out, then change tab
    setTimeout(() => {
      setActiveTab(tab);
      
      // Wait for the new content to fully appear, then restore interaction
      setTimeout(() => {
        setIsChangingTab(false);
        
        // Restore scroll position after everything is complete
        setTimeout(() => window.scrollTo(0, scrollPosition), 50);
      }, 400);
    }, 300);
  };

  return (
    <section className="py-8 overflow-visible">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="rounded-md border border-white overflow-visible">
          <h2 className="text-3xl font-bold py-4 px-6 border-b border-white text-white bg-gray-800/50 select-none">
            Experience
          </h2>
          
          {/* Tabs - now inside the border */}
          <div className="px-6 pt-6 relative overflow-visible">
            {/* Vertical line with overflow visible to extend beyond container - ALWAYS visible */}
            <div 
              className="absolute w-0.5 bg-white" 
              style={{
                left: "36px",
                top: "1px",
                bottom: "-65px", // Extremely long value to ensure it reaches
                zIndex: "0", // Decreased z-index
                pointerEvents: "none", // Ensure clicks pass through
                opacity: 1, // Always fully visible
                // No transitions
              }}
            ></div>
            
            {/* Changed width to max-w-md (448px) */}
            <div className="flex rounded-full mb-9 overflow-hidden bg-gray-800/50 max-w-md mx-auto p-1.5 border border-purple-500/30 select-none">
              <button
                className={`flex-1 py-3 px-6 font-medium text-center relative transition-all duration-300 text-white rounded-full select-none`}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange('work');
                }}
                style={{ 
                  background: activeTab === 'work' 
                    ? 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)' 
                    : 'transparent',
                  boxShadow: activeTab === 'work' ? '0 4px 12px rgba(166, 79, 249, 0.4)' : 'none',
                  cursor: 'pointer'
                }}
              >
                Work
              </button>
              <button
                className={`flex-1 py-3 px-6 font-medium text-center relative transition-all duration-300 text-white rounded-full select-none cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange('education');
                }}
                style={{ 
                  background: activeTab === 'education' 
                    ? 'linear-gradient(270deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)' // Changed to 270deg (right to left)
                    : 'transparent',
                  boxShadow: activeTab === 'education' ? '0 4px 12px rgba(166, 79, 249, 0.4)' : 'none',
                  cursor: 'pointer'
                }}
              >
                Education
              </button>
            </div>
            
            {/* Timeline content with improved transitions */}
            <div className="relative pb-0 min-h-[300px]"> {/* Added min-height to prevent layout shift */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`${isChangingTab ? 'pointer-events-none' : ''} relative z-5`} // Added z-index to ensure proper stacking order
                >
                  {/* Experience items with reduced bottom margin */}
                  <div className="space-y-16 mb-6">
                    {(activeTab === 'work' ? workExperience : educationExperience).map((institution, index) => (
                      <div key={`${institution.name}-${index}`} className="relative pl-22">
                        {/* Horizontal line extension from vertical timeline to logo - for all institutions */}
                        <div 
                          className="absolute w-4 h-0.5 bg-white" 
                          style={{
                            left: "0", // Start from the main vertical line
                            top: "37px", // Center of the logo
                            zIndex: "2"
                          }}
                        ></div>
                        
                        {/* Logo - now clickable to open modal and non-selectable */}
                        <div className="absolute left-0 z-10">
                          <div 
                            className="w-[75px] h-[75px] rounded-full overflow-hidden flex items-center justify-center border-2 border-white bg-transparent relative p-0 cursor-pointer hover:border-purple-500/70 transition-all duration-300 select-none logo-container-circle"
                            onClick={() => openInstitutionDetails(institution)}
                          >
                            <div className="absolute inset-0 rounded-full bg-black/90"></div> {/* Background circle */}
                            
                            {institution.logo ? (
                              <div className="relative z-10 w-[75px] h-[75px] logo-image-container">
                                <Image
                                  src={institution.logo}
                                  alt={institution.name}
                                  width={75}
                                  height={75}
                                  style={{ objectFit: 'contain', width: '75px', height: '75px' }}
                                  className="select-none"
                                />
                              </div>
                            ) : (
                              <FaSuitcase className="w-8 h-8 text-gray-800" />
                            )}
                          </div>
                        </div>
                        
                        {/* Content with updated font sizes */}
                        <div>
                          <div className="text-gray-400 text-base mb-1">{institution.period}</div>
                          {/* Company name now clickable to open modal - made selectable */}
                          <span 
                            className="text-xl md:text-2xl font-bold text-white hover:text-purple-400 transition-colors flex items-center gap-1 cursor-pointer"
                            onClick={() => openInstitutionDetails(institution)}
                          >
                            {institution.name}
                            <FaExternalLinkAlt className="text-xs opacity-70" />
                          </span>
                          
                          {/* List all roles for this institution */}
                          <div className="mt-2 space-y-6">
                            {institution.roles.map((role, roleIndex) => {
                              // Check if this role has highlighted points for the current job title
                              const hasHighlightedPoints = jobTitleToResponsibilities[currentJobTitle]?.[institution.name]?.[role.title]?.length > 0;
                              
                              return (
                                <div key={`${role.title}-${roleIndex}`} className="relative">
                                  {/* Horizontal line for ALL roles, including the first one */}
                                  <div 
                                    className="absolute h-0.5 bg-white" 
                                    style={{
                                      left: "-76px",
                                      width: "52px",
                                      top: "0.8em",
                                      zIndex: "2"
                                    }}
                                  ></div>
                                  
                                  {/* Period moved above title */}
                                  <div className="text-gray-400 text-base mb-1">{role.period}</div>
                                  
                                  {/* Title now comes after period - made selectable and clickable with improved hover transitions */}
                                  <span
                                    className={`text-2xl md:text-3xl font-bold cursor-pointer inline-block role-title-hover`}
                                    onClick={() => openInstitutionDetails(institution, roleIndex)}
                                    style={{
                                      background: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
                                      WebkitBackgroundClip: 'text',
                                      WebkitTextFillColor: 'transparent',
                                      backgroundClip: 'text',
                                      color: 'transparent',
                                      position: 'relative',
                                      transition: 'text-shadow 0.5s ease'
                                    }}
                                  >
                                    {role.title}
                                    <FaExternalLinkAlt 
                                      className="inline-block ml-2 text-xs opacity-0 transition-opacity duration-500" 
                                      style={{
                                        verticalAlign: 'super',
                                        fontSize: '0.6em'
                                      }}
                                    />
                                  </span>
                                  
                                  {/* Add summary before the bullet points - NEW ADDITION */}
                                  {role.summary && (
                                    <p className="mt-3 text-base md:text-lg text-gray-300 mb-4">
                                      {role.summary}
                                    </p>
                                  )}
                                  
                                  {/* Modified bullet points with proper text alignment for all lines - improved for mobile */}
                                  <ul className="mt-3 text-base md:text-lg text-gray-300">
                                    {role.responsibilities.map((responsibility, respIndex) => (
                                      <li 
                                        key={`resp-${respIndex}`}
                                        className="flex transition-all duration-300 mb-2"
                                        style={getHighlightStyle(responsibility)}
                                      >
                                        <span className="inline-block flex-shrink-0 w-4 md:w-5 mr-1.5 md:mr-2 text-center">•</span>
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
                                  
                                  {/* Project tags */}
                                  {role.title.includes('NFTVue') && (
                                    <div className="mt-3 flex gap-2">
                                      {projectTags.map((tag) => (
                                        <a
                                          key={tag.name}
                                          href={tag.url}
                                          className="px- py-1 text-sm border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition-colors inline-flex items-center gap-1"
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
                      </div>
                    ))}
                  </div>
                  
                  {/* Smaller empty space at bottom */}
                  <div className="h-3"></div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Institution details modal - similar to project modal */}
      <AnimatePresence>
        {activeInstitution && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
            onClick={closeInstitutionDetails}
          >
            <div className="min-h-screen w-full overflow-y-auto bg-black/95 flex items-center justify-center pt-12 pb-10">
              <div className="relative max-w-4xl w-full mx-4">
                {/* Close button - positioned outside and to the right of the modal */}
                <button
                  className="absolute -right-16 top-4 z-[110] w-12 h-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white shadow-lg border border-white/20 active:scale-95 transition-all hover:bg-black/70 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeInstitutionDetails();
                  }}
                  style={{ cursor: 'pointer' }}
                  aria-label="Close modal"
                >
                  <div className="p-3 w-full h-full flex items-center justify-center">
                    <FaTimes size={20} />
                  </div>
                </button>
              
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  className="bg-gradient-to-b from-gray-900 to-black w-full rounded-lg overflow-hidden"
                  style={{ maxHeight: 'calc(100vh - 80px)' }}
                  onClick={e => e.stopPropagation()}
                >
                  {/* Scrollable content container */}
                  <div className="max-h-[calc(100vh-80px)] overflow-y-auto">
                    {/* Company banner image */}
                    <div className="h-64 relative w-full overflow-hidden">
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
                            <div className="w-32 h-32 relative">
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

                    {/* Company content with improved layout */}
                    <div className="px-6 py-6 relative z-10">
                      {/* Title section with proper background and styling */}
                      <div className="mb-6 border-b border-gray-800 flex items-end justify-between pb-6">
                        <div>
                          <h2
                            className="text-4xl font-bold"
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
                        </div>
                        
                        {/* External link button if available */}
                        {activeInstitution.link && (
                          <a
                            href={activeInstitution.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-800/80 text-white hover:bg-gray-700 transition-all duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Website</span>
                            <FaExternalLinkAlt size={12} />
                          </a>
                        )}
                      </div>

                      {/* Company overview - made selectable */}
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
                              key={`modal-role-${roleIndex}`} 
                              id={`modal-role-${roleIndex}`}
                              className="bg-gray-800/30 border-l-2 border-purple-500/40 pl-4 py-3 pr-3 rounded-r-sm transition-all duration-500"
                            >
                              {/* Period and title - made selectable */}
                              <div className="mb-3">
                                <div className="text-gray-400 text-sm mb-1">{role.period}</div>
                                <h4
                                  className="text-xl font-bold"
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
                              
                              {/* Add summary in modal - NEW ADDITION */}
                              {role.summary && (
                                <p className="text-gray-300 mb-4">
                                  {role.summary}
                                </p>
                              )}
                              
                              {/* Responsibilities with highlighting applied - with fixed text alignment */}
                              <ul className="text-gray-300">
                                {role.responsibilities.map((responsibility, respIndex) => (
                                  <li 
                                    key={`modal-resp-${roleIndex}-${respIndex}`}
                                    className="flex transition-all duration-300 mb-2"
                                    style={getHighlightStyle(responsibility)}
                                  >
                                    <span className="inline-block flex-shrink-0 w-4 md:w-5 mr-1.5 md:mr-2 text-center">•</span>
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Enhanced style tag with transition effects */}
      <style jsx global>{`
        .highlight-role {
          box-shadow: 0 0 0 2px rgba(166, 79, 249, 0.5);
          background-color: rgba(130, 38, 227, 0.15) !important;
          transition: all 0.5s ease-in-out;
        }
        
        /* Gradual hover effect for role titles */
        .role-title-hover {
          text-shadow: 0 0 0px rgba(166, 79, 249, 0);
          transition: text-shadow 0.5s ease-in-out;
        }
        
        .role-title-hover:hover {
          text-shadow: 0 0 10px rgba(166, 79, 249, 0.5);
        }
        
        .role-title-hover:hover .inline-block {
          opacity: 0.7;
        }
        
        @keyframes roleGlow {
          0% { text-shadow: 0 0 5px rgba(166, 79, 249, 0); }
          50% { text-shadow: 0 0 10px rgba(166, 79, 249, 0.5); }
          100% { text-shadow: 0 0 5px rgba(166, 79, 249, 0); }
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

        /* Prevent logo from appearing behind vertical line during animations */
        .logo-container-circle {
          z-index: 50 !important; /* Significantly increased z-index to ensure it's always above everything */
          position: relative;
          background: black; /* Ensure opaque background */
        }

        /* Ensure elements are properly layered during transitions */
        .experience-item {
          position: relative;
          z-index: 5; /* Lower than the line but higher than default */
        }

        /* Ensure horizontal lines appear above the content but below the vertical line */
        .horizontal-line {
          z-index: 8 !important;
        }

        /* Remove the ::before pseudo-element that was causing issues */
        .logo-container-circle::before {
          content: none;
        }

        /* Ensure logo image is always on top */
        .logo-container-circle img {
          position: relative;
          z-index: 60 !important; /* Significantly increased to ensure it's always visible */
        }

        /* Add specific style for the logo container */
        .logo-image-container {
          z-index: 55 !important; /* Also increased */
          position: relative;
        }
      `}</style>
    </section>
  );
}