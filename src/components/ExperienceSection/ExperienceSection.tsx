/* eslint-disable */
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { FaSuitcase, FaExternalLinkAlt, FaTimes, FaThumbtack } from 'react-icons/fa';
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
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [textScale, setTextScale] = useState(1);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  
  // Use the JobTitle context directly instead of events
  const {
    titleIndex,
    jobTitles,
    highlightIntensity,
    titlePinned,
    toggleTitlePin,
    handleTitleSelect,
    isTyping,
    displayedText
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

  // Calculate text scale based on title length for modal job title
  useEffect(() => {
    if (titleContainerRef.current && activeInstitution) {
      const container = titleContainerRef.current;
      const containerWidth = container.clientWidth;
      
      // Create a temporary span to measure text width
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'nowrap';
      tempSpan.style.fontSize = '14px';
      tempSpan.style.fontWeight = '500';
      tempSpan.innerText = currentJobTitle;
      
      document.body.appendChild(tempSpan);
      const textWidth = tempSpan.getBoundingClientRect().width;
      document.body.removeChild(tempSpan);
      
      // Calculate scale with fixed width constraints - adjusted for wider container
      const availableWidth = containerWidth - 2; // Increased padding for better text display
      
      if (textWidth > availableWidth) {
        const newScale = availableWidth / textWidth;
        setTextScale(Math.max(newScale, 0.7)); // Minimum scale of 0.7
      } else {
        setTextScale(1);
      }
    }
  }, [currentJobTitle, activeInstitution, displayedText]);
  
  // Remove state for hover tracking
  const [isHoveringOnDropdownArea, setIsHoveringOnDropdownArea] = useState(false);
  // Add timeout ref like in NavMenu
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to clear any pending close timeout
  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };
  
  // Modified to open dropdown on hover regardless of pin state
  const handleRoleDropdownEnter = () => {
    clearCloseTimeout();
    // Always open dropdown on hover, even if pinned
    setRoleDropdownOpen(true);
  };
  
  const handleRoleDropdownLeave = () => {
    // Set a delayed timeout to close the menu
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setRoleDropdownOpen(false);
    }, 150);
  };
  
  // Same pattern for dropdown
  const handleDropdownEnter = () => {
    clearCloseTimeout();
  };
  
  const handleDropdownLeave = () => {
    // Set a delayed timeout to close the menu
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setRoleDropdownOpen(false);
    }, 150);
  };
  
  // Cleanup timeouts when unmounting
  useEffect(() => {
    return () => clearCloseTimeout();
  }, []);
  
  // Handle role selection from dropdown
  const selectRole = (index: number) => {
    handleTitleSelect(index);
    setRoleDropdownOpen(false);
  };

  // Handle separate pin/unpin toggling for any role
  const handleRolePinToggle = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); // Prevent modal close
    
    // If we're selecting a different role
    if (index !== titleIndex) {
      // First switch to this role
      handleTitleSelect(index); 
      
      // If not already pinned, pin it immediately
      if (!titlePinned) {
        toggleTitlePin();
      }
    } else {
      // For the same role, just toggle the pin
      toggleTitlePin();
    }
  };
  
  // Handle pin button click in the main button (separate from dropdown)
  const handlePinButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal close
    toggleTitlePin();
  };
  
  // Toggle dropdown when title area is clicked - allows opening when pinned
  const handleTitleAreaClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal close
    setRoleDropdownOpen(!roleDropdownOpen); // Toggle dropdown regardless of pin state
  };
  
  // Determine if we should show the typing cursor
  const showCursor = isTyping && !titlePinned;

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
                {/* Modal header with close button and job title selector */}
                <div className="absolute -right-4 sm:-right-16 top-4 z-[110] flex items-center gap-3">
                  {/* Job Title Selector - with improved hover behavior */}
                  <div 
                    className="relative dropdown-container"
                    onClick={(e) => e.stopPropagation()} // Prevent modal close
                  >
                    <div 
                      ref={titleContainerRef}
                      className={`job-title-button h-12 w-[223px] rounded-full cursor-pointer flex items-center transition-all duration-300 ${
                        titlePinned 
                          ? 'bg-black/60 backdrop-blur-md border border-amber-400/50 shadow-[0_0_6px_rgba(251,191,36,0.3)]' 
                          : roleDropdownOpen
                            ? 'bg-black/60 backdrop-blur-md border border-purple-500/40 shadow-[0_0_6px_rgba(139,92,246,0.3)] bg-gradient-to-r from-purple-900/30 to-pink-900/30' 
                            : 'bg-black/60 backdrop-blur-md border border-white/20 hover:border-purple-500/30 hover:bg-gradient-to-r hover:from-purple-900/20 hover:to-pink-900/20'
                      }`}
                      onMouseEnter={handleRoleDropdownEnter}
                      onMouseLeave={handleRoleDropdownLeave}
                    >
                      {/* Text area - now clickable to toggle dropdown regardless of pin state */}
                      <div 
                        className="flex-1 pl-6 pr-2 flex items-center overflow-hidden cursor-pointer"
                        onClick={handleTitleAreaClick}
                      >
                        <span 
                          className="truncate text-white text-base"
                          style={{
                            transform: `scale(${textScale})`,
                            transformOrigin: 'left center',
                          }}
                        >
                          {displayedText}
                          {showCursor && (
                            <motion.span 
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ repeat: Infinity, duration: 0.8 }}
                              className="inline-block"
                            >
                              |
                            </motion.span>
                          )}
                        </span>
                      </div>
                      <motion.div 
                        className="flex items-center justify-center h-12 w-12 rounded-full transition-colors duration-300 flex-shrink-0"
                        whileHover={{ 
                          scale: 1.08, 
                          opacity: titlePinned ? 1 : 0.9,
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePinButtonClick}
                      >
                        <FaThumbtack 
                          size={12} 
                          className={`transition-all duration-300 ${
                            titlePinned 
                              ? "text-amber-300 rotate-0" 
                              : "text-gray-400 rotate-45 hover:text-gray-200"
                          }`}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Role Dropdown - now with improved hover handling and matching width */}
                    <AnimatePresence>
                      {roleDropdownOpen && (
                        <motion.div
                          id="role-dropdown-menu"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full right-0 mt-2 bg-gray-900/95 border border-purple-500/30 rounded-lg shadow-xl overflow-hidden z-10"
                          style={{ width: '223px' }}
                          onClick={(e) => e.stopPropagation()} // Prevent modal close
                          onMouseEnter={handleDropdownEnter}
                          onMouseLeave={handleDropdownLeave}
                        >
                          {jobTitles.map((role, index) => (
                            <div
                              key={role}
                              className="hover:bg-purple-900/30 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center justify-between w-full px-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent modal close
                                    selectRole(index);
                                  }}
                                  className="flex-1 text-left px-4 py-3 text-base text-white hover:text-purple-300 cursor-pointer"
                                >
                                  {role}
                                </button>
                                <motion.button
                                  onClick={(e) => handleRolePinToggle(e, index)}
                                  className="p-2 transition-colors"
                                  whileHover={{ 
                                    scale: 1.15, 
                                    opacity: index === titleIndex && titlePinned ? 1 : 0.9,
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <FaThumbtack 
                                    size={12} 
                                    className={`transition-all duration-300 ${
                                      index === titleIndex && titlePinned 
                                        ? "text-yellow-400 rotate-0" 
                                        : "text-gray-400 rotate-45 hover:text-gray-200"
                                    }`}
                                  />
                                </motion.button>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Close button - Now with consistent dimensions matching nav menu */}
                  <button
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white shadow-lg border border-white/20 active:scale-95 transition-all hover:bg-black/70 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeInstitutionDetails();
                    }}
                    style={{ cursor: 'pointer' }}
                    aria-label="Close modal"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
              
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
                          <h3 className="text-base uppercase text-gray-200 font-medium mb-3">BACKGROUND</h3>
                          <div className="bg-gray-800/30 border-l-2 border-purple-500/40 pl-4 py-3 pr-3 rounded-r-sm">
                            <p className="text-gray-300 leading-relaxed">
                              {activeInstitution.description}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Roles section */}
                      <div className="mb-6">
                        <h3 className="text-base uppercase text-gray-200 font-medium mb-3">
                          {activeTab === 'work' ? 'ROLES & ACHIEVEMENTS' : 'QUALIFICATIONS & RESEARCH'}
                        </h3>
                        
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
      
      {/* Enhanced style tag - removed box hover styles */}
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

        /* Add styles for dropdown behavior - removed box-like hover effects */
        .dropdown-container {
          position: relative;
        }

        /* Create an invisible overlap area between button and dropdown */
        .job-title-button::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          right: 0;
          height: 15px;
          z-index: 8;
          pointer-events: none;
        }

        #role-dropdown-menu::before {
          content: '';
          position: absolute;
          top: -15px;
          left: 0;
          right: 0;
          height: 15px;
          z-index: 8;
          pointer-events: auto;
        }
      `}</style>
    </section>
  );
}