/* eslint-disable */
import { useState, useEffect, useCallback } from 'react';
import { JobTitleData } from './types';

export default function ProfileBlurb() {
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);
  const [highlightIntensity, setHighlightIntensity] = useState(1);

  // Listen for job title changes
  useEffect(() => {
    const handleTitleChange = (event: Event) => {
      const customEvent = event as CustomEvent<JobTitleData>;
      const { highlightedWords, highlightIntensity } = customEvent.detail;
      setHighlightedWords(highlightedWords);
      setHighlightIntensity(highlightIntensity);
    };

    window.addEventListener('jobTitleChange', handleTitleChange as EventListener);
    
    return () => {
      window.removeEventListener('jobTitleChange', handleTitleChange as EventListener);
    };
  }, []);

  // Function to check if a phrase should be highlighted - wrapped in useCallback
  const shouldHighlight = useCallback((phrase: string) => {
    return highlightedWords.includes(phrase);
  }, [highlightedWords]);

  // Get style for highlighted words with opacity-based color interpolation
  const getHighlightStyle = useCallback((phrase: string, baseColor: string) => {
    // Base text color that non-highlighted words use
    const baseTextColor = "#d1d5db"; // gray-300 (to match the paragraph text)
    
    if (!shouldHighlight(phrase)) {
      return { color: baseTextColor };
    }
    
    // Interpolate between the base text color and the highlight color based on intensity
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

  return (
    <div className="relative pl-20">
      {/* Modified vertical line that connects with above section */}
      <div 
        className="absolute w-0.5 bg-white" 
        style={{
          left: "36px",
          top: "-12px", // Start slightly above to ensure clean connection
          bottom: "0",
          zIndex: "1"
        }}
      ></div>
      
      {/* Blurb text with highlighted phrases */}
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
  );
}
