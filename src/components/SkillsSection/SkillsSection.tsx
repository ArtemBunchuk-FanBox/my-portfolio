/* eslint-disable */
"use client";

import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { jobTitleToSkills, skillCategories } from '@/data/skills';
import { useJobTitle } from '@/context/JobTitleContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function SkillsSection() {
  // Add state for expanded skills view
  const [expandedSkills, setExpandedSkills] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
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

  // Function to toggle expanded skills view with scrolling
  const toggleExpandedSkills = () => {
    const wasExpanded = expandedSkills;
    setExpandedSkills(prev => !prev);
    
    // If we're collapsing the skills, scroll back to the top of the section
    if (wasExpanded) {
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

  // Determine how many skills to show per category
  const getVisibleSkills = (skills: string[], category: string) => {
    if (expandedSkills) {
      return skills; // Show all when expanded
    }
    
    // Customize number of visible skills based on category
    if (category === "Languages") return skills.slice(0, 4);
    if (category === "Frameworks") return skills.slice(0, 3);
    if (category === "Tools") return skills.slice(0, 3);
    return skills.slice(0, 4); // Default for other categories
  };

  // Check if any category has hidden skills
  const hasHiddenSkills = skillCategories.some(category => {
    if (category.category === "Languages") return category.skills.length > 4;
    if (category.category === "Frameworks") return category.skills.length > 3;
    if (category.category === "Tools") return category.skills.length > 3;
    return category.skills.length > 4;
  });

  return (
    <section className="py-8 overflow-visible select-none" ref={sectionRef}>
      <div className="container mx-auto px-4 max-w-5xl select-none">
        <div className="rounded-md border border-white overflow-visible">
          <h2 className="text-3xl font-bold py-4 px-6 border-b border-white text-white bg-gray-800/50 select-none">
            Skills
          </h2>
          
          <div className="p-6 relative overflow-visible">
            {/* Vertical line with overflow visible to extend beyond container */}
            <div 
              className="absolute w-0.5 bg-white" 
              style={{
                left: "36px",
                top: "-1px",
                bottom: "-65px", // Extended much further to reach Tech section
                zIndex: "1"
              }}
            ></div>
            
            {/* Shifted content to the right */}
            <div className="pl-20 select-none">
              {skillCategories.map((category, categoryIndex) => (
                <div key={category.category} className="mb-8 relative select-none">
                  {/* Horizontal line extension for each category - corrected position */}
                  <div 
                    className="absolute h-0.5 bg-white" 
                    style={{
                      left: "-66px", // Corrected starting position
                      width: "50px", // Shorter line that doesn't overshoot
                      top: "1.2em", // Adjusted to align with larger heading
                      zIndex: "2"
                    }}
                  ></div>
                
                  <h3 className={`text-3xl font-bold mb-4 ${category.textColor} select-none`}>
                    {category.category}
                  </h3>
                  
                  <div className="flex flex-wrap gap-3 select-none">
                    {getVisibleSkills(category.skills, category.category).map((skill) => (
                      <SkillBadge 
                        key={skill} 
                        skill={skill} 
                        gradientColor={category.color}
                        isHighlighted={shouldHighlight(skill)}
                        highlightIntensity={highlightIntensity}
                        titlePinned={titlePinned}
                      />
                    ))}
                    
                    {/* Show "+" indicator with count of hidden skills */}
                    {!expandedSkills && category.skills.length > 
                      (category.category === "Languages" ? 4 : 
                       category.category === "Frameworks" ? 3 : 
                       category.category === "Tools" ? 3 : 4) && (
                      <motion.div 
                        className="px-3 py-2 rounded-md bg-gray-700/80 text-white opacity-80 text-sm font-medium cursor-pointer hover:bg-gray-600/80 transition-colors"
                        onClick={toggleExpandedSkills}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        +{category.skills.length - 
                          (category.category === "Languages" ? 4 : 
                           category.category === "Frameworks" ? 3 : 
                           category.category === "Tools" ? 3 : 4)} more
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
                  className="flex justify-center mt-2 mb-4"
                >
                  <motion.button
                    onClick={toggleExpandedSkills}
                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all duration-300 select-none cursor-pointer"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="select-none">
                      {expandedSkills ? "Show Less" : "Show All Skills"}
                    </span>
                    <motion.div
                      animate={{ y: expandedSkills ? [0, -2, 0] : [0, 2, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      {expandedSkills ? (
                        <FaChevronUp className="text-sm" />
                      ) : (
                        <FaChevronDown className="text-sm" />
                      )}
                    </motion.div>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Updated skill badge component with pinned state support
function SkillBadge({ 
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
  const baseOpacity = 0.60; // Slightly dimmed for non-highlighted skills
  const highlightedOpacity = 1.0; // Full opacity for highlighted skills
  
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
      className={`relative px-4 py-2 rounded-md text-white font-medium text-base overflow-hidden bg-gradient-to-r ${gradientColor} select-none`}
      animate={{ 
        opacity: opacity,
        boxShadow: isHighlighted ? `0 0 12px 2px ${glowColor}` : 'none',
        transition: { duration: 0.5 }
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 0 15px 4px ${glowColor}`,
        transition: { duration: 0.2 },
      }}
      initial={{ opacity: 0.95 }}
    >
      {/* Shiny effect overlay - more visible on highlighted skills */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        style={{ backgroundSize: '200% 100%' }}
        whileHover={{
          opacity: isHighlighted ? 0.4 : 0.2, // More pronounced effect on highlighted skills
          backgroundPosition: ['100% 0%', '0% 0%'],
          transition: { 
            duration: 1,
            repeat: Infinity,
            repeatType: 'mirror' 
          }
        }}
      />
      <span className="relative z-10 select-none">{skill}</span>
    </motion.div>
  );
}