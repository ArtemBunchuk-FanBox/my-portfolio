/* eslint-disable */
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaThumbtack } from 'react-icons/fa';
import { JobTitleData } from '../types';

export default function MobileJobTitle() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [titlePinned, setTitlePinned] = useState(false);
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);
  const [highlightIntensity, setHighlightIntensity] = useState(1);
  const [showMenu, setShowMenu] = useState(false);

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
  }, []);
  
  // Apply the purple-blue-crimson gradient to job titles
  const titleGradient = {
    backgroundImage: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    textShadow: '0 0 8px rgba(166, 79, 249, 0.3)'
  };
  
  // Typing effect for job titles - simplified for mobile
  useEffect(() => {
    const currentTitle = jobTitles[titleIndex];
    
    if (isTyping) {
      if (displayedText.length < currentTitle.length) {
        const progress = displayedText.length / currentTitle.length;
        setHighlightIntensity(progress);
        
        if (displayedText.length === 0 && lastTitleUpdate.current !== currentTitle) {
          lastTitleUpdate.current = currentTitle;
          setHighlightedWords(jobSpecificHighlights[currentTitle] || []);
        }
        
        const timeout = setTimeout(() => {
          setDisplayedText(currentTitle.substring(0, displayedText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        setHighlightIntensity(1);
        
        const timeout = setTimeout(() => {
          // Only start erasing if not pinned
          if (!titlePinned) {
            setIsTyping(false);
          }
        }, 3000);
        
        return () => clearTimeout(timeout);
      }
    } else {
      // Don't erase if pinned
      if (titlePinned) {
        return;
      }
      
      if (displayedText.length > 0) {
        const progress = displayedText.length / currentTitle.length;
        setHighlightIntensity(progress);
        
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        setHighlightIntensity(0);
        setHighlightedWords([]);
        lastTitleUpdate.current = null;
        
        // Move to next title
        const nextIndex = (titleIndex + 1) % jobTitles.length;
        const nextTitle = jobTitles[nextIndex];
        
        // Start with the first character of the next title immediately
        setTitleIndex(nextIndex);
        setDisplayedText(nextTitle.charAt(0));
        setHighlightedWords(jobSpecificHighlights[nextTitle] || []);
        setHighlightIntensity(1/nextTitle.length); // Intensity based on first character
        lastTitleUpdate.current = nextTitle;
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, titleIndex, jobTitles, titlePinned]);
  
  // Handle title selection from menu
  const handleTitleSelect = (index: number) => {
    const newTitle = jobTitles[index];
    setTitleIndex(index);
    setDisplayedText(newTitle);
    setIsTyping(true);
    lastTitleUpdate.current = newTitle;
    
    setHighlightedWords(jobSpecificHighlights[newTitle] || []);
    setHighlightIntensity(1);
    setShowMenu(false);
  };

  // Toggle title pin/unpin
  const toggleTitlePin = () => {
    // If we're in the backspacing phase and not pinned yet, start typing the current word
    if (!titlePinned && !isTyping) {
      // Get the next title that would be shown
      const nextIndex = (titleIndex + 1) % jobTitles.length;
      const nextTitle = jobTitles[nextIndex];
      
      // If we're in the middle of erasing, switch to next title and start typing
      if (displayedText.length === 0) {
        // Start with first character of next title
        setTitleIndex(nextIndex);
        setDisplayedText(nextTitle.charAt(0));
        setHighlightedWords(jobSpecificHighlights[nextTitle] || []);
        lastTitleUpdate.current = nextTitle;
      }
      
      // Switch to typing mode
      setIsTyping(true);
    }
    
    // Toggle the pin state
    setTitlePinned(!titlePinned);
    setShowMenu(false);
  };

  // Dispatch event with highlighted words
  useEffect(() => {
    const jobTitleData: JobTitleData = {
      currentTitle: jobTitles[titleIndex],
      highlightedWords,
      highlightIntensity
    };
    
    window.dispatchEvent(new CustomEvent('jobTitleChange', { 
      detail: jobTitleData 
    }));
  }, [titleIndex, highlightedWords, highlightIntensity]);

  return (
    <div className="relative mb-4">
      {/* Main title display with fixed layout */}
      <div className="flex items-center relative">
        {/* Pin button - positioned above and slightly to the left */}
        <motion.button
          className="absolute right-8 top-0 transform -translate-y-5 bg-transparent border-none cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            toggleTitlePin();
          }}
          whileTap={{ scale: 0.9 }}
        >
          <FaThumbtack 
            size={16} 
            className={`transition-all duration-300 ${titlePinned ? "text-yellow-400 rotate-0" : "text-gray-500 rotate-45"}`}
          />
        </motion.button>
        
        {/* Title container with fixed width to prevent shifting */}
        <div className="font-bold text-3xl h-12 flex-1 text-center"
          onClick={() => setShowMenu(!showMenu)}>
          <span style={titleGradient}>
            {displayedText}
            {!titlePinned && (
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
      </div>
      
      {/* Dropdown menu - mobile optimized */}
      {showMenu && (
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-900/95 border border-gray-700 rounded-md shadow-xl z-30"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="py-1 px-1">
            {jobTitles.map((title, index) => (
              <motion.div 
                key={index}
                className={`px-3 py-2 rounded-md text-base cursor-pointer flex justify-between items-center ${
                  index === titleIndex ? 'bg-gray-700/60' : 'hover:bg-gray-800'
                }`}
                onClick={() => handleTitleSelect(index)}
                whileTap={{ scale: 0.98 }}
              >
                <span style={{
                  ...titleGradient,
                  opacity: index === titleIndex ? 1 : 0.8
                }}>
                  {title}
                </span>
                
                {index === titleIndex && (
                  <motion.div
                    className="ml-2 p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTitlePinned(!titlePinned);
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaThumbtack 
                      size={12} 
                      className={`transition-all duration-300 ${
                        titlePinned ? "text-yellow-400 rotate-0" : "text-gray-400 rotate-45"
                      }`}
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
