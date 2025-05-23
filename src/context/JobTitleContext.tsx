"use client";

import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { jobTitles, jobSpecificHighlights } from '../data/jobTitleData';
import { JobTitleData } from '../components/HeroSection/types';

// Define the context type
interface JobTitleContextType {
  titleIndex: number;
  displayedText: string;
  isTyping: boolean;
  titleHovered: boolean;
  titlePinned: boolean;
  highlightedWords: string[];
  highlightIntensity: number;
  jobTitles: string[];
  handleTitleSelect: (index: number) => void;
  toggleTitlePin: () => void;
  setTitleHovered: (value: boolean) => void;
  hoveredItemIndex: number | null;
  setHoveredItemIndex: (value: number | null) => void;
}

// Create the context with default values
const JobTitleContext = createContext<JobTitleContextType | undefined>(undefined);

// Provider component
export const JobTitleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [titleHovered, setTitleHovered] = useState(false);
  const [titlePinned, setTitlePinned] = useState(false);
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);
  const [highlightIntensity, setHighlightIntensity] = useState(1);
  
  // Animation state ref
  const animationRef = useRef({
    timeoutId: null as NodeJS.Timeout | null,
    lastTitle: null as string | null
  });
  
  // Initialize highlighted words for the first job title
  useEffect(() => {
    const currentTitle = jobTitles[0];
    setHighlightedWords(jobSpecificHighlights[currentTitle] || []);
    setDisplayedText(currentTitle);
  }, []);
  
  // Clear any animation timeout
  const clearAnimationTimeout = () => {
    if (animationRef.current.timeoutId) {
      clearTimeout(animationRef.current.timeoutId);
      animationRef.current.timeoutId = null;
    }
  };

  // Effect for handling pinned state specifically
  useEffect(() => {
    // When title is pinned, we need to immediately:
    // 1. Cancel any ongoing animation
    // 2. Set the full title
    // 3. Fix the highlights to match the current title
    if (titlePinned) {
      clearAnimationTimeout();
      
      // Force complete state for the current title
      const currentTitle = jobTitles[titleIndex];
      setDisplayedText(currentTitle);
      setIsTyping(true); // Keep in typing state to prevent erasing
      
      // Lock in the highlighted words for this title
      const highlights = jobSpecificHighlights[currentTitle] || [];
      setHighlightedWords(highlights);
      setHighlightIntensity(1); // Full intensity
      
      // Store the current title to prevent cycling
      animationRef.current.lastTitle = currentTitle;
    }
  }, [titlePinned, titleIndex]);
  
  // COMPLETELY SEPARATED animation cycle effect
  useEffect(() => {
    // Do nothing if pinned - exit early!
    if (titlePinned) {
      return;
    }
    
    const currentTitle = jobTitles[titleIndex];
    
    // When title is hovered, finish typing the current word
    if (titleHovered) {
      if (displayedText.length < currentTitle.length) {
        const progress = displayedText.length / currentTitle.length;
        setHighlightIntensity(progress);
        
        clearAnimationTimeout();
        animationRef.current.timeoutId = setTimeout(() => {
          setDisplayedText(currentTitle.substring(0, displayedText.length + 1));
          
          if (displayedText.length === 0) {
            setHighlightedWords(jobSpecificHighlights[currentTitle] || []);
          }
        }, 40);
        
        return () => clearAnimationTimeout();
      }
      return;
    }
    
    // Normal animation flow
    if (isTyping) {
      // Typing animation
      if (displayedText.length < currentTitle.length) {
        const progress = displayedText.length / currentTitle.length;
        setHighlightIntensity(progress);
        
        if (displayedText.length === 0 && animationRef.current.lastTitle !== currentTitle) {
          animationRef.current.lastTitle = currentTitle;
          setHighlightedWords(jobSpecificHighlights[currentTitle] || []);
        }
        
        clearAnimationTimeout();
        animationRef.current.timeoutId = setTimeout(() => {
          setDisplayedText(currentTitle.substring(0, displayedText.length + 1));
        }, 80);
        
        return () => clearAnimationTimeout();
      } else {
        // Typing complete, pause before erasing
        setHighlightIntensity(1);
        
        clearAnimationTimeout();
        animationRef.current.timeoutId = setTimeout(() => {
          if (!titlePinned) { // double-check not pinned
            setIsTyping(false);
          }
        }, 3500);
        
        return () => clearAnimationTimeout();
      }
    } else {
      // Erasing animation
      if (displayedText.length > 0) {
        const progress = displayedText.length / currentTitle.length;
        setHighlightIntensity(progress);
        
        clearAnimationTimeout();
        animationRef.current.timeoutId = setTimeout(() => {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        }, 40);
        
        return () => clearAnimationTimeout();
      } else {
        // Erased completely, move to next title
        setHighlightIntensity(0);
        setHighlightedWords([]);
        animationRef.current.lastTitle = null;
        
        clearAnimationTimeout(); 
        animationRef.current.timeoutId = setTimeout(() => {
          setTitleIndex((prevIndex) => (prevIndex + 1) % jobTitles.length);
          setIsTyping(true);
        }, 100);
        
        return () => clearAnimationTimeout();
      }
    }
  }, [displayedText, isTyping, titleIndex, titleHovered, titlePinned]);
  
  // Handle title selection from dropdown
  const handleTitleSelect = (index: number) => {
    const newTitle = jobTitles[index];
    
    // Cancel any ongoing animation
    clearAnimationTimeout();
    
    // Update state
    setTitleIndex(index);
    setDisplayedText(newTitle);
    setIsTyping(true);
    
    // Set highlights immediately
    setHighlightedWords(jobSpecificHighlights[newTitle] || []);
    setHighlightIntensity(1);
    
    // Store the title to prevent cycling
    animationRef.current.lastTitle = newTitle;
  };

  // CRITICAL FIX: Modified toggleTitlePin to use a callback for state updates
  const toggleTitlePin = () => {
    // Toggle pin state using a callback to ensure we get the latest state
    setTitlePinned(currentPinned => {
      const newPinned = !currentPinned;
      
      // If we're pinning (going from unpinned to pinned)
      if (newPinned) {
        // Force all state updates to happen immediately
        const currentTitle = jobTitles[titleIndex];
        setDisplayedText(currentTitle);
        setHighlightedWords(jobSpecificHighlights[currentTitle] || []);
        setHighlightIntensity(1);
        setIsTyping(true);
        
        // Clear any animation in progress
        clearAnimationTimeout();
      }
      
      return newPinned;
    });
  };

  // Dispatch event with highlighted words data
  useEffect(() => {
    // Don't dispatch events during state setup
    if (!displayedText) return;
    
    const jobTitleData: JobTitleData = {
      currentTitle: jobTitles[titleIndex],
      highlightedWords,
      highlightIntensity
    };
    
    window.dispatchEvent(new CustomEvent('jobTitleChange', { 
      detail: jobTitleData 
      
    }));
  }, [titleIndex, highlightedWords, highlightIntensity, displayedText]);

  const value = {
    titleIndex,
    displayedText,
    isTyping,
    titleHovered,
    titlePinned,
    highlightedWords,
    highlightIntensity,
    jobTitles,
    handleTitleSelect,
    toggleTitlePin,
    setTitleHovered,
    hoveredItemIndex,
    setHoveredItemIndex
  };

  return (
    <JobTitleContext.Provider value={value}>
      {children}
    </JobTitleContext.Provider>
  );
};

// Custom hook for using the job title context
export const useJobTitle = () => {
  const context = useContext(JobTitleContext);
  if (context === undefined) {
    throw new Error('useJobTitle must be used within a JobTitleProvider');
  }
  return context;
};