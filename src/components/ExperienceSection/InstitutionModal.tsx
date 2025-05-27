import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaTimes, FaThumbtack, FaExternalLinkAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Institution } from '@/data/experience';
import { useJobTitle } from '@/context/JobTitleContext';
import { jobTitleToResponsibilities } from '@/data/experience';

interface InstitutionModalProps {
  activeInstitution: Institution | null;
  closeInstitutionDetails: () => void;
  activeTab: 'work' | 'education';
}

export default function InstitutionModal({
  activeInstitution,
  closeInstitutionDetails,
  activeTab
}: InstitutionModalProps) {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [textScale, setTextScale] = useState(1);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use the JobTitle context
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
  
  // Function to clear any pending close timeout
  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };
  
  // Dropdown handling functions
  const handleRoleDropdownEnter = () => {
    clearCloseTimeout();
    setRoleDropdownOpen(true);
  };
  
  const handleRoleDropdownLeave = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setRoleDropdownOpen(false);
    }, 150);
  };
  
  const handleDropdownEnter = () => {
    clearCloseTimeout();
  };
  
  const handleDropdownLeave = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setRoleDropdownOpen(false);
    }, 150);
  };
  
  // Role selection functions
  const selectRole = (index: number) => {
    handleTitleSelect(index);
    setRoleDropdownOpen(false);
  };

  const handleRolePinToggle = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    
    if (index !== titleIndex) {
      handleTitleSelect(index); 
      
      if (!titlePinned) {
        toggleTitlePin();
      }
    } else {
      toggleTitlePin();
    }
  };
  
  const handlePinButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTitlePin();
  };
  
  const handleTitleAreaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRoleDropdownOpen(!roleDropdownOpen);
  };
  
  // Determine if we should show the typing cursor
  const showCursor = isTyping && !titlePinned;
  
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
      
      // Calculate scale with fixed width constraints
      const availableWidth = containerWidth - 2;
      
      if (textWidth > availableWidth) {
        const newScale = availableWidth / textWidth;
        setTextScale(Math.max(newScale, 0.7));
      } else {
        setTextScale(1);
      }
    }
  }, [currentJobTitle, activeInstitution, displayedText]);
  
  // Cleanup timeouts when unmounting
  useEffect(() => {
    return () => clearCloseTimeout();
  }, []);
  
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
    const baseOpacity = 0.55;
    const highlightedOpacity = 1.0;
    
    if (shouldHighlight(responsibility)) {
      const effectiveIntensity = titlePinned ? 1 : highlightIntensity;
      const opacity = baseOpacity + (highlightedOpacity - baseOpacity) * effectiveIntensity;
      
      return {
        opacity: opacity,
        transition: 'opacity 0.5s ease',
        textShadow: titlePinned ? '0 0 1px rgba(255,255,255,0.1)' : 'none'
      };
    } else {
      return {
        opacity: baseOpacity,
        transition: 'opacity 0.5s ease'
      };
    }
  }, [highlightIntensity, shouldHighlight, titlePinned]);

  return (
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
                {/* Job Title Selector */}
                <div 
                  className="relative dropdown-container"
                  onClick={(e) => e.stopPropagation()}
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
                    {/* Text area */}
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
                  
                  {/* Role Dropdown */}
                  <AnimatePresence>
                    {roleDropdownOpen && (
                      <motion.div
                        id="role-dropdown-menu"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full right-0 mt-2 bg-gray-900/95 border border-purple-500/30 rounded-lg shadow-xl overflow-hidden z-10"
                        style={{ width: '223px' }}
                        onClick={(e) => e.stopPropagation()}
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
                                  e.stopPropagation();
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
                
                {/* Close button */}
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
                  {/* Banner image */}
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

                  {/* Institution content */}
                  <div className="px-6 py-6 relative z-10">
                    {/* Title section */}
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
                      
                      {/* External link if available */}
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

                    {/* Institution description */}
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
                            {/* Period and title */}
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
                            
                            {/* Role summary */}
                            {role.summary && (
                              <p className="text-gray-300 mb-4">
                                {role.summary}
                              </p>
                            )}
                            
                            {/* Responsibilities with highlighting */}
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
  );
}
