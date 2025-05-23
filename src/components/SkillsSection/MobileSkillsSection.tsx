"use client";
/* eslint-disable */
import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { jobTitleToSkills, skillCategories } from '@/data/skills';
import { useJobTitle } from '@/context/JobTitleContext';

export default function MobileSkillsSection() {
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
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="rounded-md border border-white overflow-hidden">
          <h2 className="text-2xl font-bold py-3 px-4 border-b border-white text-white bg-gray-800/50">
            Skills
          </h2>
          
          <div className="p-4">
            {skillCategories.map((category) => (
              <div key={category.category} className="mb-6">
                {/* Category header - aligned with first skill by removing left padding */}
                <div className={`mb-3 py-2 font-bold text-xl ${category.textColor}`}>
                  {category.category}
                </div>
                
                {/* Skills as badges - more compact for mobile */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <MobileSkillBadge 
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
    </section>
  );
}

// Mobile-optimized skill badge with pinned state support
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
      className={`px-3 py-1.5 rounded-md text-white text-sm font-medium bg-gradient-to-r ${gradientColor}`}
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
