/* eslint-disable */
import { useCallback } from 'react';
import { useJobTitle } from '@/context/JobTitleContext';

export default function MobileProfileBlurb() {
  // Use the JobTitle context directly instead of events
  const { 
    highlightedWords,
    highlightIntensity,
    titlePinned
  } = useJobTitle();

  // Function to check if a phrase should be highlighted
  const shouldHighlight = useCallback((phrase: string) => {
    return highlightedWords.includes(phrase);
  }, [highlightedWords]);

  // Get style for highlighted words - using same approach as desktop
  const getHighlightStyle = useCallback((phrase: string, baseColor: string) => {
    // Base text color that non-highlighted words use
    const baseTextColor = "#d1d5db"; // gray-300
    
    if (!shouldHighlight(phrase)) {
      return { color: baseTextColor };
    }
    
    // When pinned, ensure highlights are fully visible
    const effectiveIntensity = titlePinned ? 1 : highlightIntensity;
    
    // Interpolate between the base text color and the highlight color based on intensity
    const r1 = parseInt(baseTextColor.slice(1, 3), 16);
    const g1 = parseInt(baseTextColor.slice(3, 5), 16);
    const b1 = parseInt(baseTextColor.slice(5, 7), 16);
    
    const r2 = parseInt(baseColor.slice(1, 3), 16);
    const g2 = parseInt(baseColor.slice(3, 5), 16);
    const b2 = parseInt(baseColor.slice(5, 7), 16);
    
    const r = Math.round(r1 + (r2 - r1) * effectiveIntensity);
    const g = Math.round(g1 + (g2 - g1) * effectiveIntensity);
    const b = Math.round(b1 + (b2 - b1) * effectiveIntensity);
    
    return {
      color: `rgb(${r}, ${g}, ${b})`,
      fontWeight: 600,
      textShadow: titlePinned ? '0 0 1px rgba(255,255,255,0.2)' : 'none' // Add subtle glow when pinned
    };
  }, [highlightIntensity, shouldHighlight, titlePinned]);

  return (
    <div style={{ marginTop: "-30px !important" }} className="px-2">
      {/* Complete blurb text - matching desktop version content */}
      <p className="text-sm text-gray-300 leading-relaxed">
        A dynamic leader with a strong background in {' '}
        <span 
          className="font-semibold transition-all duration-300" 
          style={getHighlightStyle('psychometric research', '#a855f7')}
        >
          psychometric research
        </span>{' '}
        and{' '}
        <span 
          className="font-semibold transition-all duration-300" 
          style={getHighlightStyle('organisational transformation', '#60a5fa')}
        >
          organisational transformation
        </span>. 
        As a{' '}
        <span
          className="font-semibold transition-all duration-300"
          style={getHighlightStyle('strategic thinker', '#ec4899')}
        >
          strategic thinker
        </span>, 
        I excel in{' '}
        <span
          className="font-semibold transition-all duration-300"
          style={getHighlightStyle('innovation', '#818cf8')}
        >
          innovation
        </span>{' '}
        and{' '}
        <span
          className="font-semibold transition-all duration-300"
          style={getHighlightStyle('data-driven decision-making', '#93c5fd')}
        >
          data-driven decision-making
        </span>. 
        Skilled in both{' '}
        <span
          className="font-semibold transition-all duration-300"
          style={getHighlightStyle('qualitative', '#4ade80')}
        >
          qualitative
        </span>{' '}
        and{' '}
        <span
          className="font-semibold transition-all duration-300"
          style={getHighlightStyle('quantitative research methods', '#86efac')}
        >
          quantitative research methods
        </span>, 
        I integrate{' '}
        <span
          className="font-semibold transition-all duration-300"
          style={getHighlightStyle('cutting-edge technologies', '#fbbf24')}
        >
          cutting-edge technologies
        </span>{' '}
        to solve complex challenges and tell{' '}
        <span
          className="font-semibold transition-all duration-300"
          style={getHighlightStyle('insight-driven stories', '#f87171')}
        >
          insight-driven stories
        </span>. 
        Committed to{' '}
        <span
          className="font-semibold transition-all duration-300"
          style={getHighlightStyle('revolutionising understanding of human behaviour', '#fb923c')}
        >
          revolutionising understanding of human behaviour
        </span>{' '}
        through a blend of{' '}
        <span
          className="font-semibold transition-all duration-300"
          style={getHighlightStyle('science', '#60a5fa')}
        >
          science
        </span>{' '}
        and{' '}
        <span
          className="font-semibold transition-all duration-300"
          style={getHighlightStyle('compassion', '#ec4899')}
        >
          compassion
        </span>.
      </p>
    </div>
  );
}
