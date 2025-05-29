"use client";
/* eslint-disable */
import { useState, useCallback, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { jobTitleToSkills, skillCategories } from '@/data/skills';
import { useJobTitle } from '@/context/JobTitleContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function MobileSkillsSection() {
  // Add state for expanded skills view
  const [expandedSkills, setExpandedSkills] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  // Add refs for skill containers to measure how many fit in one line
  const skillContainersRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Add state to track visible skills count for each category
  const [visibleSkillsCount, setVisibleSkillsCount] = useState<Record<string, number>>({});

  // Use JobTitleContext directly instead of event listeners
  const {
    titleIndex,
    jobTitles,
    highlightIntensity,
    titlePinned
  } = useJobTitle();
  
  // Get the current job title
  const currentJobTitle = jobTitles[titleIndex];
  
  // Get skills to highlight for the current job title
  const highlightedSkills = jobTitleToSkills[currentJobTitle] || [];

  // Function to check if a skill should be highlighted
  const shouldHighlight = useCallback((skill: string) => {
    return highlightedSkills.includes(skill);
  }, [highlightedSkills]);

  // Function to toggle expanded skills view with scrolling to specific category
  const toggleExpandedSkills = (categoryElement?: HTMLElement) => {
    setExpandedSkills(prev => !prev);
    
    // If we're expanding and have a category element, scroll to it
    if (!expandedSkills && categoryElement) {
      setTimeout(() => {
        // Calculate position to scroll the element to the middle of the viewport
        const rect = categoryElement.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const offset = window.innerHeight / 2 - rect.height / 2;
        
        window.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth'
        });
      }, 100);
    }
    
    // If we're collapsing, scroll back to the top of the section
    if (expandedSkills) {
      setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  };

  // Calculate how many skills fit on exactly two lines including the "more" button
  useLayoutEffect(() => {
    const calculateTwoLineSkills = () => {
      const newVisibleCounts: Record<string, number> = {};
      
      skillCategories.forEach((category, index) => {
        const container = skillContainersRefs.current[index];
        if (!container) return;
        
        const containerWidth = container.clientWidth;
        
        // Create temp elements for measurement
        const tempDiv = document.createElement('div');
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.position = 'absolute';
        tempDiv.style.width = `${containerWidth}px`;
        tempDiv.style.display = 'flex';
        tempDiv.style.flexWrap = 'wrap';
        tempDiv.style.gap = '8px';
        document.body.appendChild(tempDiv);
        
        // Create and measure "more" button
        const moreBtn = document.createElement('div');
        moreBtn.className = 'px-3 py-1.5 rounded-md';
        moreBtn.textContent = '+10 more'; // Use reasonable text length
        tempDiv.appendChild(moreBtn);
        const moreWidth = moreBtn.offsetWidth;
        const buttonHeight = moreBtn.offsetHeight;
        tempDiv.removeChild(moreBtn);
        
        // Add skills to determine how many fit in two lines
        let lineCount = 1;
        let currentLineWidth = 0;
        let skillsCount = 0;
        
        for (let i = 0; i < category.skills.length; i++) {
          // Create and measure each skill
          const skillElem = document.createElement('div');
          skillElem.className = 'px-3 py-1.5 rounded-md';
          skillElem.textContent = category.skills[i];
          tempDiv.appendChild(skillElem);
          
          const skillWidth = skillElem.offsetWidth + 8; // width + gap
          
          // Check if adding this skill starts a new line
          if (currentLineWidth + skillWidth > containerWidth) {
            lineCount++;
            currentLineWidth = skillWidth;
          } else {
            currentLineWidth += skillWidth;
          }
          
          // Stop when we exceed 2 lines
          if (lineCount > 2) {
            tempDiv.removeChild(skillElem);
            break;
          }
          
          skillsCount++;
          tempDiv.removeChild(skillElem);
        }
        
        // Make sure we have space for the "more" button on the second line
        // Only necessary if there are more skills than fit in two lines
        if (skillsCount < category.skills.length) {
          // Check if more button would fit on second line
          if (lineCount === 2) {
            // Check if there's space on second line for more button
            if (currentLineWidth + moreWidth > containerWidth) {
              // No space, need to remove the last skill
              skillsCount--;
            }
          } else if (lineCount === 1) {
            // Only one line used so far, make sure more button fits on line 2
            // This is fine, no adjustment needed
          }
        }
        
        // Clean up
        document.body.removeChild(tempDiv);
        
        // Store the count
        newVisibleCounts[category.category] = skillsCount;
      });
      
      setVisibleSkillsCount(newVisibleCounts);
    };

    // Calculate after a short delay to ensure DOM is ready
    setTimeout(calculateTwoLineSkills, 100);
    
    // Recalculate on resize
    window.addEventListener('resize', calculateTwoLineSkills);
    return () => window.removeEventListener('resize', calculateTwoLineSkills);
  }, []);

  // Updated function to get visible skills based on calculated counts
  const getVisibleSkills = (skills: string[], category: string) => {
    if (expandedSkills) {
      return skills; // Show all when expanded
    }
    
    // Use the dynamically calculated count without arbitrary limits
    const count = visibleSkillsCount[category] || 1;
    return skills.slice(0, count);
  };

  // Check if any category has hidden skills based on dynamic calculation
  const hasHiddenSkills = skillCategories.some(category => {
    const count = visibleSkillsCount[category.category] || 3;
    return category.skills.length > count;
  });

  return (
    <section className="py-6" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="rounded-md border border-white overflow-hidden">
          <h2 className="text-2xl font-bold py-3 px-4 border-b border-white text-white bg-gray-800/50">
            Skills
          </h2>
          
          <div className="p-4">
            {skillCategories.map((category, index) => (
              <div key={category.category} className="mb-4" data-category={category.category}>
                {/* Category header with reduced bottom margin */}
                <div className={`mb-2 py-1 font-bold text-xl ${category.textColor}`}>
                  {category.category}
                </div>
                
                {/* Container with ref for measurement */}
                <div 
                  className="flex flex-wrap gap-2"
                  ref={el => { skillContainersRefs.current[index] = el; }}
                >
                  {getVisibleSkills(category.skills, category.category).map((skill) => (
                    <MobileSkillBadge 
                      key={skill} 
                      skill={skill} 
                      gradientColor={category.color}
                      isHighlighted={shouldHighlight(skill)}
                      highlightIntensity={highlightIntensity}
                      titlePinned={titlePinned}
                    />
                  ))}
                  
                  {/* "+" indicator with count of hidden skills - updated with specific category scrolling */}
                  {!expandedSkills && category.skills.length > (visibleSkillsCount[category.category] || 1) && (
                    <motion.div 
                      className="px-3 py-1.5 rounded-md bg-gray-700/80 text-white text-sm opacity-80 font-medium cursor-pointer hover:bg-gray-600/80 transition-colors"
                      onClick={(e) => {
                        // Get the parent category element for scrolling
                        const categoryElement = (e.currentTarget as HTMLElement).closest('[data-category]') as HTMLElement;
                        toggleExpandedSkills(categoryElement);
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      +{category.skills.length - (visibleSkillsCount[category.category] || 1)} more
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
            
            {/* See More/Less Button - Only shown if there are skills to hide/show */}
            {hasHiddenSkills && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center mt-2 mb-2"
              >
                <motion.button
                  onClick={() => toggleExpandedSkills()}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm hover:opacity-90 transition-all duration-300 cursor-pointer"
                  whileTap={{ scale: 0.95 }}
                >
                  <span>
                    {expandedSkills ? "Show Less" : "Show All Skills"}
                  </span>
                  <motion.div
                    animate={{ y: expandedSkills ? [0, -2, 0] : [0, 2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    {expandedSkills ? (
                      <FaChevronUp className="text-xs" />
                    ) : (
                      <FaChevronDown className="text-xs" />
                    )}
                  </motion.div>
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Updated MobileSkillBadge to add the skill-badge class
function MobileSkillBadge({ 
  skill, 
  gradientColor, 
  isHighlighted,
  highlightIntensity,
  titlePinned
}: { 
  skill: string; 
  gradientColor: string; 
  isHighlighted: boolean;
  highlightIntensity: number;
  titlePinned: boolean;
}) {
  // Base and highlight opacity values
  const baseOpacity = 0.65; // Slightly higher base opacity for better mobile readability
  const highlightedOpacity = 1.0;
  
  // Calculate the current opacity based on highlight status and intensity
  // If pinned, use full intensity for highlighted items
  const effectiveIntensity = titlePinned ? 1 : highlightIntensity;
  const opacity = isHighlighted 
    ? baseOpacity + (highlightedOpacity - baseOpacity) * effectiveIntensity
    : baseOpacity;
  
  // Extract the main color from the gradient for the glow effect
  const glowColor = gradientColor.includes('blue') ? 'rgba(37, 99, 235, 0.5)' : 
                    gradientColor.includes('teal') ? 'rgba(20, 184, 166, 0.5)' :
                    gradientColor.includes('amber') ? 'rgba(245, 158, 11, 0.5)' :
                    'rgba(244, 63, 94, 0.5)'; // pink default
  
  return (
    <motion.div
      className={`px-3 py-1.5 rounded-md text-white text-sm font-medium bg-gradient-to-r ${gradientColor} skill-badge`}
      animate={{ 
        opacity: opacity,
        boxShadow: isHighlighted ? `0 0 8px 2px ${glowColor}` : 'none', // Smaller glow for mobile
        transition: { duration: 0.5 }
      }}
      initial={{ opacity: 0.95 }}
      whileTap={{ scale: 0.95 }} // Simple tap effect instead of hover
    >
      <span>{skill}</span>
    </motion.div>
  );
}
