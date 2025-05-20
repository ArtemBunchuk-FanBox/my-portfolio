"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaUtensils, FaDownload, FaThumbtack } from 'react-icons/fa';

export default function HeroSection() {
  const [showThugLifeGlasses, setShowThugLifeGlasses] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [resumeHovered, setResumeHovered] = useState(false);
  const [profileHovered, setProfileHovered] = useState(false);
  const [titleHovered, setTitleHovered] = useState(false);
  const [titlePinned, setTitlePinned] = useState(false);
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
  // Add state for highlighted words based on job title
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);
  // Add a state for tracking highlight intensity (0-1)
  const [highlightIntensity, setHighlightIntensity] = useState(1);
  
  // Add a ref to track the last title update to prevent loops
  const lastTitleUpdate = useRef<string | null>(null);
  
  const jobTitles = 
 ["Strategy Director", 'VP of Product', "Innovation Lead", 'Head of Research', 'VP of Marketing', 'Insights Director', 'Game Master' ]
  ;
  
  // Define job-specific highlighted words with proper type
  const jobSpecificHighlights: Record<string, string[]> = {
    "Strategy Director": ["strategic thinker", "organisational transformation", "data-driven decision-making", "insight-driven stories"],
    "VP of Product": ["innovation", "data-driven decision-making", "cutting-edge technologies", "revolutionising understanding of human behaviour"],
    "Innovation Lead": ["innovation", "cutting-edge technologies", "strategic thinker", "science"],
    "Head of Research": ["psychometric research", "qualitative", "quantitative research methods", "science", "data-driven decision-making"],
    "VP of Marketing": ["strategic thinker", "insight-driven stories", "compassion", "innovation"],
    "Game Master": ["innovation", "strategic thinker", "cutting-edge technologies", "compassion"],
    "Insights Director": ["insight-driven stories", "data-driven decision-making", "strategic thinker", "revolutionising understanding of human behaviour", "quantitative research methods"]
  };
  
  // Initialize highlighted words for the first job title
  useEffect(() => {
    const currentTitle = jobTitles[0];
    setHighlightedWords(jobSpecificHighlights[currentTitle] || []);
  }, []); // Empty dependency array means this runs only once on component mount
  
  // Apply the purple-blue-crimson gradient to job titles
  const titleGradient = {
    backgroundImage: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    textShadow: '0 0 8px rgba(166, 79, 249, 0.3)'
  };
  
  // Typing effect for job titles
  useEffect(() => {
    // When title is hovered or pinned, finish typing the current word
    if (titleHovered || titlePinned) {
      const currentTitle = jobTitles[titleIndex];
      if (displayedText.length < currentTitle.length) {
        // Calculate and update intensity based on typing progress
        const progress = displayedText.length / currentTitle.length;
        setHighlightIntensity(progress);
        
        const timeout = setTimeout(() => {
          setDisplayedText(currentTitle.substring(0, displayedText.length + 1));
          
          // Ensure highlighted words are set when we start typing
          if (displayedText.length === 0) {
            setHighlightedWords(jobSpecificHighlights[currentTitle] || []);
          }
        }, 40); // Type faster when hovering
        return () => clearTimeout(timeout);
      }
      return; // Once typing is complete, just stay there
    }
    
    const currentTitle = jobTitles[titleIndex];
    
    if (isTyping) {
      // Typing animation
      if (displayedText.length < currentTitle.length) {
        // Calculate intensity based on typing progress - this makes the words
        // fade in at exactly the same pace as the typing
        const progress = displayedText.length / currentTitle.length;
        setHighlightIntensity(progress);
        
        // Only set highlighted words when we start typing a new title
        if (displayedText.length === 0 && lastTitleUpdate.current !== currentTitle) {
          lastTitleUpdate.current = currentTitle;
          setHighlightedWords(jobSpecificHighlights[currentTitle] || []);
        }
        
        const timeout = setTimeout(() => {
          setDisplayedText(currentTitle.substring(0, displayedText.length + 1));
        }, 80); // Adjust for typing speed
        return () => clearTimeout(timeout);
      } else {
        // Once typing is complete, ensure full highlight
        setHighlightIntensity(1);
        
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1500); // Pause time after typing
        
        return () => clearTimeout(timeout);
      }
    } else {
      // Erasing animation
      if (displayedText.length > 0) {
        // Calculate fading intensity based on erasing progress - this makes the words
        // fade out at exactly the same pace as the backspacing
        const progress = displayedText.length / currentTitle.length;
        setHighlightIntensity(progress);
        
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        }, 40); // Adjust for erasing speed (faster than typing)
        return () => clearTimeout(timeout);
      } else {
        // Once erasing is complete, reset highlights and prepare for next title
        setHighlightIntensity(0);
        setHighlightedWords([]);
        lastTitleUpdate.current = null;
        
        // Move to next title
        setTitleIndex((prevIndex) => (prevIndex + 1) % jobTitles.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, titleIndex, jobTitles, titlePinned, titleHovered]);
  
  // Handle title selection from dropdown
  const handleTitleSelect = (index: number) => {
    const newTitle = jobTitles[index];
    setTitleIndex(index);
    setDisplayedText(newTitle);
    setIsTyping(true);
    lastTitleUpdate.current = newTitle;
    
    // Update highlighted words with full intensity for manual selection
    setHighlightedWords(jobSpecificHighlights[newTitle] || []);
    setHighlightIntensity(1); // Full intensity immediately
  };

  // Handle title pin/unpin
  const toggleTitlePin = () => {
    setTitlePinned(!titlePinned);
    // No need to modify displayedText on unpinning since
    // the typing effect will handle that now
  };

  // Function to check if a phrase should be highlighted
  const shouldHighlight = (phrase: string) => {
    return highlightedWords.includes(phrase);
  };

  // Get style for highlighted words with opacity-based color interpolation
  const getHighlightStyle = useCallback((phrase: string, baseColor: string) => {
    // Base text color that non-highlighted words use
    const baseTextColor = "#d1d5db"; // gray-300 (to match the paragraph text)
    
    if (!shouldHighlight(phrase)) {
      return { color: baseTextColor };
    }
    
    // Interpolate between the base text color and the highlight color based on intensity
    // This creates a smoother color transition rather than just changing opacity
    const r1 = parseInt(baseTextColor.slice(1, 3), 16);
    const g1 = parseInt(baseTextColor.slice(3, 5), 16);
    const b1 = parseInt(baseTextColor.slice(5, 7), 16);
    
    const r2 = parseInt(baseColor.slice(1, 3), 16);
    const g2 = parseInt(baseColor.slice(3, 5), 16);
    const b2 = parseInt(baseColor.slice(5, 7), 16);
    
    const r = Math.round(r1 + (r2 - r1) * highlightIntensity);
    const g = Math.round(g1 + (g2 - g1) * highlightIntensity);
    const b = Math.round(b1 + (b2 - b1) * highlightIntensity);
    
    return {
      color: `rgb(${r}, ${g}, ${b})`,
      fontWeight: 600 // Keep this consistent
    };
  }, [highlightIntensity, shouldHighlight]);

  // Handle title hover
  const handleTitleHover = () => {
    setTitleHovered(true);
    
    // If currently in erasing animation, handle it smoothly
    if (!isTyping && !titlePinned) {
      // Get the next title index that would be used
      const nextIndex = (titleIndex + 1) % jobTitles.length;
      const nextTitle = jobTitles[nextIndex];
      const currentTitle = jobTitles[titleIndex];
      
      // If we're in the middle of erasing, keep what's left and start typing the new word
      // This avoids completely empty state
      if (displayedText.length > 0) {
        // Keep current text as is, just switch to typing mode
        setIsTyping(true);
        
        // Update word highlights with current title - we'll finish typing this first
        setHighlightedWords(jobSpecificHighlights[currentTitle] || []);
        setHighlightIntensity(displayedText.length / currentTitle.length);
      } else {
        // If already empty, start with the first letter of next title
        const firstChar = nextTitle.charAt(0);
        setTitleIndex(nextIndex);
        setDisplayedText(firstChar);
        setIsTyping(true);
        
        // Update highlighted words for new title
        setHighlightedWords(jobSpecificHighlights[nextTitle] || []);
        setHighlightIntensity(1/nextTitle.length); // Proportional to first character
        lastTitleUpdate.current = nextTitle;
      }
    }
  };

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
          
          {/* Profile Image - Same position */}
          <div className="relative w-40 h-40 md:w-56 md:h-56 z-10">
            <motion.div 
              className="w-full h-full rounded-full overflow-hidden relative"
              style={{ 
                borderWidth: "3px",
                borderStyle: "solid",
                borderColor: profileHovered ? undefined : "#ffffff"
              }}
              animate={
                profileHovered 
                  ? { 
                      // Now both border and boxShadow use extracted colors
                      borderColor: [
                        "#ffffff", "#ffffff", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3", "#ffffff"
                      ],
                      boxShadow: [
                        "0 0 25px 8px rgba(255,255,255,0.3)", 
                        "0 0 25px 8px rgba(255,255,255,0.3)", 
                        "0 0 25px 8px rgba(255,127,0,0.6)",  // Match border color with higher opacity
                        "0 0 25px 8px rgba(255,255,0,0.6)",
                        "0 0 25px 8px rgba(0,255,0,0.6)",
                        "0 0 25px 8px rgba(0,0,255,0.6)",
                        "0 0 25px 8px rgba(75,0,130,0.6)",
                        "0 0 25px 8px rgba(148,0,211,0.6)",
                        "0 0 25px 8px rgba(255,255,255,0.3)"
                      ],
                      transition: {
                        // Ensure both properties use identical timing
                        borderColor: {
                          repeat: Infinity,
                          duration: 3,
                          ease: "linear",
                          times: [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.85, 1],
                        },
                        boxShadow: {
                          repeat: Infinity,
                          duration: 3,
                          ease: "linear",
                          times: [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.85, 1],
                        }
                      }
                    }
                  : { 
                      borderColor: "#ffffff", // White border when not hovered
                      boxShadow: [
                        "0 0 25px 8px rgba(255,255,255,0.3)",
                        "0 0 25px 8px rgba(255,255,255,0)"
                      ],
                      transition: {
                        borderColor: { duration: 0.5 },
                        boxShadow: { duration: 1 }
                      }
                    }
              }
              onMouseEnter={() => {
                setShowThugLifeGlasses(true);
                setProfileHovered(true);
              }}
              onMouseLeave={() => {
                setShowThugLifeGlasses(false);
                setProfileHovered(false);
              }}
            >
              {/* Base profile image */}
              <Image 
                src="/images/profile.jpg" 
                alt="Artem Bunchuk" 
                fill 
                className="object-cover" 
              />
              
              {/* Thug Life glasses overlay - always slide from top and roll off down on hide */}
              <AnimatePresence>
                {showThugLifeGlasses && (
                  <motion.div 
                    className="absolute"
                    style={{
                      width: '65%',
                      height: 'auto',
                      top: '18%',
                      left: '11%',
                      zIndex: 10,
                    }}
                    initial={{ 
                      y: -50, 
                      opacity: 0,
                      rotate: -20
                    }}
                    animate={{ 
                      y: 0, 
                      opacity: 1,
                      rotate: 0,
                      transition: { 
                        duration: 1,
                        ease: "easeOut"
                      }
                    }}
                    exit={{
                      y: 100, // Always slide down to bottom
                      opacity: 0,
                      rotate: 45,
                      transition: {
                        y: { duration: 0.8, ease: "easeIn" },
                        rotate: { duration: 0.8, ease: "easeIn" },
                        opacity: { duration: 0.8, delay: 0.2 }
                      }
                    }}
                  >
                    <Image 
                      src="/images/thug-life-glasses.png" 
                      alt="Thug Life" 
                      width={100}
                      height={30}
                      className="w-full h-auto" 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* "THUG LIFE" text section removed */}
            </motion.div>
          </div>
          
          {/* Info Section - Restructured layout */}
          <div className="text-center md:text-left md:flex-1">
            {/* Reduced name size */}
            <h1 className="text-3xl md:text-4xl font-bold mb-1 text-white">Artem Bunchuk</h1>
            
            {/* Subtitle with "Meet your next" */}
            <div className="flex items-center justify-center md:justify-start text-xl md:text-2xl text-gray-300 mb-1">
              <span className="font-semibold">Meet your next:</span>
            </div>
            
            {/* Job title on its own line with larger text */}
            <div className="mb-4 h-12 relative">
              <div 
                className="font-bold text-3xl md:text-5xl relative"
              >
                {/* Properly sized hover area that extends only to the pin button, but with a cutout for the pin */}
                <div 
                  className="absolute top-0 bottom-0 left-0 flex items-center"
                  style={{ 
                    width: "calc(65% )", // Stop short of the pin
                    zIndex: 10 
                  }}
                  onMouseEnter={handleTitleHover}
                >
                  {/* Invisible area for text only with no events to avoid flickering */}
                  <div className="w-full h-full"></div>
                </div>
                
                {/* Pin button - with higher z-index */}
                <motion.button
                  className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer z-30"
                  style={{ right: "18rem" }}
                  onClick={toggleTitlePin}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  title={titlePinned ? "Unpin title" : "Pin this title"}
                  onMouseEnter={handleTitleHover}
                >
                  <FaThumbtack 
                    size={16} 
                    className={`transition-all duration-300 ${titlePinned ? "text-yellow-400 rotate-0" : "text-gray-500 rotate-45"}`}
                  />
                </motion.button>
                
                {/* Title text */}
                <span style={titleGradient}>
                  {displayedText}
                  {!titleHovered && !titlePinned && (
                    <motion.span 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block"
                    >
                      |
                    </motion.span>
                  )}
                </span>
              
                {/* Create an overlay area that includes both menu and title hover area */}
                {titleHovered && (
                  <div 
                    className="fixed inset-0 z-20"
                    onMouseMove={(e) => {
                      // Only hide menu when cursor is far from title area and menu
                      const menu = document.getElementById('job-title-menu');
                      const title = document.getElementById('job-title-area');
                      
                      if (menu && title) {
                        const menuRect = menu.getBoundingClientRect();
                        const titleRect = title.getBoundingClientRect();
                        
                        // Check if cursor is inside menu or title area with some margin
                        const isNearMenu = 
                          e.clientX >= menuRect.left - 20 && 
                          e.clientX <= menuRect.right + 20 && 
                          e.clientY >= menuRect.top - 20 && 
                          e.clientY <= menuRect.bottom + 20;
                          
                        const isNearTitle = 
                          e.clientX >= titleRect.left - 20 && 
                          e.clientX <= titleRect.right + 20 && 
                          e.clientY >= titleRect.top - 20 && 
                          e.clientY <= titleRect.bottom + 20;
                        
                        // Only close if cursor is far from both menu and title
                        if (!isNearMenu && !isNearTitle) {
                          setTitleHovered(false);
                        }
                      }
                    }}
                    onClick={(e) => {
                      // Close menu when clicking anywhere else on the page
                      const menu = document.getElementById('job-title-menu');
                      if (menu && !menu.contains(e.target as Node)) {
                        setTitleHovered(false);
                      }
                    }}
                  />
                )}
                
                {/* Add a reference ID to the title area for interaction detection */}
                <div 
                  id="job-title-area" 
                  className="absolute inset-0"
                  style={{ pointerEvents: 'none' }}
                />
                
                {/* Dropdown menu for job titles */}
                <AnimatePresence>
                  {titleHovered && (
                    <motion.div 
                      id="job-title-menu"
                      className="absolute left-0 mt-2 w-72 bg-gray-900/95 border border-gray-700 rounded-md shadow-xl z-30"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      // Make menu handle its own mouse events
                      onMouseEnter={() => setTitleHovered(true)}
                    >
                      <div className="py-1 px-1">
                        {jobTitles.map((title, index) => (
                          <motion.div 
                            key={index}
                            className={`px-3 py-2 rounded-md text-base md:text-lg cursor-pointer flex justify-between items-center ${
                              index === titleIndex ? 'bg-gray-700/80' : 'hover:bg-gray-800'
                            }`}
                            onClick={() => {
                              handleTitleSelect(index);
                            }}
                            onMouseEnter={() => setHoveredItemIndex(index)}
                            onMouseLeave={() => setHoveredItemIndex(null)}
                            whileHover={{ 
                              x: 5,
                              transition: { duration: 0.2 }
                            }}
                          >
                            <span style={{
                              ...titleGradient,
                              opacity: index === titleIndex ? 1 : 0.8
                            }}>
                              {title}
                            </span>
                            
                            {/* Show pin icon only when this is the current title or the item is hovered */}
                            {(index === titleIndex || hoveredItemIndex === index) && (
                              <motion.div
                                className="ml-2 p-1 rounded-full hover:bg-gray-600"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent triggering parent click
                                  if (index === titleIndex) {
                                    // Toggle pin state if this is the current title
                                    setTitlePinned(!titlePinned);
                                  } else {
                                    // Select and pin if this is a different title
                                    handleTitleSelect(index);
                                    setTitlePinned(true);
                                  }
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                title={index === titleIndex && titlePinned ? "Unpin this title" : "Pin this title"}
                              >
                                <FaThumbtack 
                                  size={12} 
                                  className={`transition-all duration-300 ${
                                    index === titleIndex && titlePinned 
                                      ? "text-yellow-400 rotate-0" 
                                      : "text-gray-400 rotate-45"
                                  }`}
                                />
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
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
          
            {/* Buttons with enhanced hover effects - larger size */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {/* Resume button - larger size */}
              <div className="relative">
                <motion.a 
                  href="/your-resume.pdf" 
                  className="bg-gray-800/70 text-gray-300 px-5 py-2.5 text-lg rounded-md flex items-center gap-2 overflow-hidden relative"
                  onMouseEnter={() => {
                    setActiveTooltip('resume');
                    setResumeHovered(true);
                  }}
                  onMouseLeave={() => {
                    setActiveTooltip(null);
                    setResumeHovered(false);
                  }}
                  whileHover={{
                    boxShadow: "0 0 8px 2px rgba(37, 99, 235, 0.7)",
                  }}
                >
                  {/* Background fill on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 hover:opacity-100 bg-blue-600 rounded-md"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ 
                      scale: 1, 
                      opacity: 1 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Icon with color change on hover */}
                  <div className="relative z-10 transition-colors duration-300" 
                    style={{ color: resumeHovered ? "#2563eb" : "white" }}
                  >
                    <FaDownload size={20} />
                  </div>
                  
                  {/* Text with color change on hover */}
                  <span className="relative z-10 transition-colors duration-300" 
                    style={{ color: resumeHovered ? "#5a8cfb" : "white" }}
                  >
                    Resume
                  </span>
                </motion.a>
                
                {/* Tooltip */}
                {activeTooltip === 'resume' && (
                  <motion.div 
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-xs rounded whitespace-nowrap"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    style={{ 
                      color: "#5a8cfb", // blue-600
                      border: "1px solid #5a8cfb",
                      boxShadow: "0 0 8px 1px rgba(37, 99, 235, 0.3)"
                    }}
                  >
                    Download Resume
                  </motion.div>
                )}
              </div>
              
              {/* LinkedIn with brand color */}
              <SocialIconButton 
                icon={<FaLinkedin size={24} />} 
                href="https://linkedin.com/in/yourprofile" 
                tooltip="LinkedIn Profile"
                tooltipId="linkedin"
                activeTooltip={activeTooltip}
                setActiveTooltip={setActiveTooltip}
                brandColor="#04a6fa"
              />
              
              {/* GitHub with brand color */}
              <SocialIconButton 
                icon={<FaGithub size={24} />} 
                href="https://github.com/yourusername" 
                tooltip="GitHub Projects"
                tooltipId="github"
                activeTooltip={activeTooltip}
                setActiveTooltip={setActiveTooltip}
                brandColor="#aa92cd"
              />
              
              {/* Email with brand color */}
              <SocialIconButton 
                icon={<FaEnvelope size={24} />} 
                href="mailto:your.email@example.com" 
                tooltip="Contact Me"
                tooltipId="email"
                activeTooltip={activeTooltip}
                setActiveTooltip={setActiveTooltip}
                brandColor="#EA4335"
              />
              
              {/* Food blog with brand color */}
              <SocialIconButton 
                icon={<FaUtensils size={24} />} 
                href="https://your-cooking-blog.com" 
                tooltip="Artichoks - My Cooking Blog"
                tooltipId="food"
                activeTooltip={activeTooltip}
                setActiveTooltip={setActiveTooltip}
                brandColor="#FF9800"
              />
            </div>
          </div>
        </div>
        
        {/* Blurb section - Modify to connect with above line */}
        <div className="relative pl-20">
          {/* Modified vertical line that starts higher but invisible at top to avoid visual overlap */}
          <div 
            className="absolute w-0.5 bg-white" 
            style={{
              left: "36px",
              top: "-12px", // Start slightly above to ensure clean connection
              bottom: "0",
              zIndex: "1"
            }}
          ></div>
          
          {/* Update the blurb section to use the getHighlightStyle function for all phrases */}
          <p className="max-w-4xl text-base md:text-lg text-gray-300 leading-relaxed text-left">
            A dynamic leader with a strong background in {' '}
            <span 
              className="font-semibold transition-all duration-300" 
              style={getHighlightStyle('psychometric research', '#a855f7')} // purple-400
            >
              psychometric research
            </span>{' '}
            and{' '}
            <span 
              className="font-semibold transition-all duration-300" 
              style={getHighlightStyle('organisational transformation', '#60a5fa')} // blue-400
            >
              organisational transformation
            </span>. 
            As a{' '}
            <span
              className="font-semibold transition-all duration-300"
              style={getHighlightStyle('strategic thinker', '#ec4899')} // pink-400
            >
              strategic thinker
            </span>, 
            I excel in{' '}
            <span
              className="font-semibold transition-all duration-300"
              style={getHighlightStyle('innovation', '#818cf8')} // indigo-400
            >
              innovation
            </span>{' '}
            and{' '}
            <span
              className="font-semibold transition-all duration-300"
              style={getHighlightStyle('data-driven decision-making', '#93c5fd')} // blue-300
            >
              data-driven decision-making
            </span>. 
            Skilled in both{' '}
            <span
              className="font-semibold transition-all duration-300"
              style={getHighlightStyle('qualitative', '#4ade80')} // green-400
            >
              qualitative
            </span>{' '}
            and{' '}
            <span
              className="font-semibold transition-all duration-300"
              style={getHighlightStyle('quantitative research methods', '#86efac')} // green-300
            >
              quantitative research methods
            </span>, 
            I integrate{' '}
            <span
              className="font-semibold transition-all duration-300"
              style={getHighlightStyle('cutting-edge technologies', '#fbbf24')} // yellow-400
            >
              cutting-edge technologies
            </span>{' '}
            to solve complex challenges and tell{' '}
            <span
              className="font-semibold transition-all duration-300"
              style={getHighlightStyle('insight-driven stories', '#f87171')} // red-400
            >
              insight-driven stories
            </span>. 
            Committed to{' '}
            <span
              className="font-semibold transition-all duration-300"
              style={getHighlightStyle('revolutionising understanding of human behaviour', '#fb923c')} // orange-400
            >
              revolutionising understanding of human behaviour
            </span>{' '}
            through a blend of{' '}
            <span
              className="font-semibold transition-all duration-300"
              style={getHighlightStyle('science', '#60a5fa')} // blue-400
            >
              science
            </span>{' '}
            and{' '}
            <span
              className="font-semibold transition-all duration-300"
              style={getHighlightStyle('compassion', '#ec4899')} // pink-400
            >
              compassion
            </span>.
          </p>
        </div>
      </div>
    </section>
  );
}

// Enhanced social button component with pulsating effect
function SocialIconButton({ 
  icon, 
  href, 
  tooltip, 
  tooltipId,
  activeTooltip,
  setActiveTooltip,
  brandColor
}: { 
  icon: React.ReactNode, 
  href: string,
  tooltip: string,
  tooltipId: string,
  activeTooltip: string | null,
  setActiveTooltip: React.Dispatch<React.SetStateAction<string | null>>,
  brandColor: string
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <motion.a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-800/70 text-gray-300 p-3.5 rounded-md flex items-center justify-center relative overflow-hidden"
        style={{ width: '48px', height: '48px' }}
        onMouseEnter={() => {
          setActiveTooltip(tooltipId);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setActiveTooltip(null);
          setIsHovered(false);
        }}
        whileHover={{
          boxShadow: `0 0 12px 3px ${brandColor}`,
        }}
      >
        {/* Animated background fill */}
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100"
          style={{ backgroundColor: brandColor }}
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ 
            scale: 1, 
            opacity: 1 
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Pulsating outline */}
        <motion.div
          className="absolute inset-0 rounded-md"
          animate={{ 
            boxShadow: activeTooltip === tooltipId ? `0 0 12px 3px ${brandColor}` : "none" 
          }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 1 
          }}
        />
        
        {/* Icon - now with color change on hover */}
        <div 
          className="relative z-10 transition-colors duration-300" 
          style={{ color: isHovered ? brandColor : 'currentColor' }}
        >
          {icon}
        </div>
      </motion.a>
      
      {/* Tooltip - now with brand color styling */}
      {activeTooltip === tooltipId && (
        <motion.div 
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-xs rounded whitespace-nowrap"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          style={{ 
            color: brandColor,
            border: `1px solid ${brandColor}`,
            boxShadow: `0 0 8px 1px ${brandColor}50`
          }}
        >
          {tooltip}
        </motion.div>
      )}
    </div>
  );
}