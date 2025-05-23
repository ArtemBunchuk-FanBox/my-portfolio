/* eslint-disable */
"use client";

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { jobTitleToSkills, skillCategories } from '@/data/skills';
import { useJobTitle } from '@/context/JobTitleContext';

export default function SkillsSection() {
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

  return (
    <section className="py-8 overflow-visible select-none">
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
                    {category.skills.map((skill) => (
                      <SkillBadge 
                        key={skill} 
                        skill={skill} 
                        gradientColor={category.color}
                        isHighlighted={shouldHighlight(skill)}
                        highlightIntensity={highlightIntensity}
                        titlePinned={titlePinned}
                      />
                    ))}
                  </div>
                </div>
              ))}
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