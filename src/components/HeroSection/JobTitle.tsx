/* eslint-disable */
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaThumbtack } from 'react-icons/fa';
import { JobTitleData } from './types';

export default function JobTitle() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [titleHovered, setTitleHovered] = useState(false);
  const [titlePinned, setTitlePinned] = useState(false);
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);
  const [highlightIntensity, setHighlightIntensity] = useState(1);
  
  // Add a ref to track the last title update to prevent loops
  const lastTitleUpdate = useRef<string | null>(null);
  
  const jobTitles = [
    "Strategy Director", 'VP of Product', "Innovation Lead", 
    'Head of Research', 'VP of Marketing', 'Insights Director', 'Game Master'
  ];
  
  // Define job-specific highlighted words
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
        // Calculate intensity based on typing progress
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
        }, 3500); // Pause time after typing
        
        return () => clearTimeout(timeout);
      }
    } else {
      // Erasing animation
      if (displayedText.length > 0) {
        // Calculate fading intensity based on erasing progress
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
  };

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

  // Pass highlighted words and intensity to parent component
  useEffect(() => {
    // This is where we would pass data up to parent if needed
    const jobTitleData: JobTitleData = {
      currentTitle: jobTitles[titleIndex],
      highlightedWords,
      highlightIntensity
    };
    
    // Dispatch an event with the selected job title data
    window.dispatchEvent(new CustomEvent('jobTitleChange', { 
      detail: jobTitleData 
    }));
    
  }, [titleIndex, highlightedWords, highlightIntensity]);

  return (
    <div className="mb-4 h-12 relative">
      <div className="font-bold text-3xl md:text-5xl relative">
        {/* Hover area */}
        <div 
          className="absolute top-0 bottom-0 left-0 flex items-center"
          style={{ 
            width: "calc(65% )",
            zIndex: 10 
          }}
          onMouseEnter={handleTitleHover}
        >
          {/* Invisible area for text only with no events */}
          <div className="w-full h-full"></div>
        </div>
        
        {/* Pin button */}
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
      
        {/* Create an overlay area */}
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
        
        {/* Reference ID for interaction detection */}
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
              onMouseEnter={() => setTitleHovered(true)}
            >
              <div className="py-1 px-1">
                {jobTitles.map((title, index) => (
                  <motion.div 
                    key={index}
                    className={`px-3 py-2 rounded-md text-base md:text-lg cursor-pointer flex justify-between items-center ${
                      index === titleIndex ? 'bg-gray-700/10' : 'hover:bg-gray-800'
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
                        className="ml-2 p-1 hover:bg-gray-600"
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
  );
}
