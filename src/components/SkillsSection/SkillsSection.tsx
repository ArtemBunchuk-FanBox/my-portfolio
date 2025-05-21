/* eslint-disable */
"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

type SkillCategory = {
  category: string;
  color: string;
  skills: string[];
};

// Define mapping of job titles to relevant skills
interface JobTitleSkillMap {
  [jobTitle: string]: string[];
}

export default function SkillsSection() {
  const [currentJobTitle, setCurrentJobTitle] = useState<string>('');
  const [highlightIntensity, setHighlightIntensity] = useState<number>(1);
  const [highlightedSkills, setHighlightedSkills] = useState<string[]>([]);

  // Map of job titles to relevant skills
  const jobTitleToSkills: JobTitleSkillMap = {
    "Strategy Director": [
      "Project & Roadmap Management",
      "Risk Assessment",
      "Budget Planning",
      "Wargaming",
      "Crisis Management",
      "Statistical Analysis",
      "Data Visualization"
    ],
    "VP of Product": [
      "Project & Roadmap Management",
      "Client Management",
      "Team Building",
      "Programming: C#, Python, R, SQL, Rust",
      "Data: Cloud Computing",
      "Machine Learning",
      "Testing & Optimization: A/B Testing",
      "Game Design: Unity, Phaser"
    ],
    "Innovation Lead": [
      "Project & Roadmap Management",
      "Team Building",
      "Programming: C#, Python, R, SQL, Rust",
      "Machine Learning",
      "Research Methods: Neuromapping",
      "Experimental Design",
      "Game Design: Unity, Phaser"
    ],
    "Head of Research": [
      "Risk Assessment",
      "Statistical Analysis",
      "Data Visualization",
      "SPSS",
      "Research Methods: Neuromapping",
      "Experimental Design", 
      "Focus Group Moderation",
      "Interviewing",
      "Testing & Optimization: A/B Testing",
      "Survey Design",
      "Psychometric Design"
    ],
    "VP of Marketing": [
      "Project & Roadmap Management",
      "Client Management",
      "Budget Planning",
      "Data Visualization",
      "Focus Group Moderation", 
      "Interviewing",
      "Content Creation: Premier Pro",
      "Photoshop",
      "DaVinci Resolve",
      "After Effects",
      "Copywriting"
    ],
    "Insights Director": [
      "Data Visualization",
      "Statistical Analysis",
      "Machine Learning",
      "SPSS",
      "Research Methods: Neuromapping",
      "Experimental Design",
      "Focus Group Moderation", 
      "Survey Design",
      "Psychometric Design"
    ],
    "Game Master": [
      "Team Building",
      "Wargaming",
      "Crisis Management",
      "Game Design: Unity, Phaser",
      "Content Creation: Premier Pro",
      "Photoshop",
      "Copywriting"
    ]
  };

  // Define skill categories with more distinct colors
  const skillCategories: SkillCategory[] = [
    {
      category: 'Leadership & Strategy',
      color: 'from-blue-600 to-purple-700', // Keep this one blue-purple for leadership
      skills: [
        'Project & Roadmap Management',
        'Client Management',
        'Risk Assessment',
        'Budget Planning',
        'Team Building',
        'Wargaming',
        'Crisis Management',
      ],
    },
    {
      category: 'Technical & Data Skills',
      color: 'from-teal-500 to-emerald-600', // Changed to teal/green for tech
      skills: [
        'Programming: C#, Python, R, SQL, Rust',
        'Data: Cloud Computing',
        'Data Visualization',
        'Statistical Analysis',
        'Machine Learning',
        'SPSS',
      ],
    },
    {
      category: 'Research & Analysis',
      color: 'from-amber-500 to-orange-600', // Changed to amber/orange for research
      skills: [
        'Research Methods: Neuromapping',
        'Experimental Design',
        'Focus Group Moderation',
        'Interviewing',
        'Testing & Optimization: A/B Testing',
        'Survey Design',
        'Psychometric Design',
      ],
    },
    {
      category: 'Creative & Media',
      color: 'from-pink-500 to-rose-600', // Kept pink/rose for creative
      skills: [
        'Content Creation: Premier Pro',
        'Photoshop',
        'DaVinci Resolve',
        'After Effects',
        'Copywriting',
        'Game Design: Unity, Phaser',
      ],
    },
  ];

  // Listen for job title changes from HeroSection
  useEffect(() => {
    const handleTitleChange = (event: Event) => {
      const customEvent = event as CustomEvent<{
        currentTitle: string;
        highlightedWords: string[];
        highlightIntensity: number;
      }>;

      const { currentTitle, highlightIntensity } = customEvent.detail;
      setCurrentJobTitle(currentTitle);
      setHighlightIntensity(highlightIntensity);

      // Get the skills to highlight for this job title
      const skillsToHighlight = jobTitleToSkills[currentTitle] || [];
      setHighlightedSkills(skillsToHighlight);
    };

    window.addEventListener('jobTitleChange', handleTitleChange as EventListener);

    return () => {
      window.removeEventListener('jobTitleChange', handleTitleChange as EventListener);
    };
  }, []);

  // Function to check if a skill should be highlighted
  const shouldHighlight = useCallback((skill: string) => {
    return highlightedSkills.includes(skill);
  }, [highlightedSkills]);

  return (
    <section className="py-8 overflow-visible">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="rounded-md border border-white overflow-visible">
          <h2 className="text-3xl font-bold py-4 px-6 border-b border-white text-white bg-gray-800/50">
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
            <div className="pl-20">
              {skillCategories.map((category, categoryIndex) => (
                <div key={category.category} className="mb-8 relative">
                  {/* Horizontal line extension for each category - corrected position */}
                  <div 
                    className="absolute h-0.5 bg-white" 
                    style={{
                      left: "-66px", // Corrected starting position
                      width: "50px", // Shorter line that doesn't overshoot
                      top: "1em", // Aligned with category heading
                      zIndex: "2"
                    }}
                  ></div>
                
                  <h3 className="text-xl font-bold mb-4 text-white">
                    {category.category}
                  </h3>
                  
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <SkillBadge 
                        key={skill} 
                        skill={skill} 
                        gradientColor={category.color}
                        isHighlighted={shouldHighlight(skill)}
                        highlightIntensity={highlightIntensity}
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

// Updated skill badge component with more distinct hover effect
function SkillBadge({ 
  skill, 
  gradientColor, 
  isHighlighted,
  highlightIntensity
}: { 
  skill: string; 
  gradientColor: string; 
  isHighlighted: boolean;
  highlightIntensity: number;
}) {
  // Base and highlight opacity values
  const baseOpacity = 0.60; // Slightly dimmed for non-highlighted skills
  const highlightedOpacity = 1.0; // Full opacity for highlighted skills
  
  // Calculate the current opacity based on highlight status and intensity
  const opacity = isHighlighted 
    ? baseOpacity + (highlightedOpacity - baseOpacity) * highlightIntensity
    : baseOpacity;
  
  // Extract the main color from the gradient for the glow effect
  const glowColor = gradientColor.includes('blue') ? 'rgba(37, 99, 235, 0.5)' : 
                    gradientColor.includes('teal') ? 'rgba(20, 184, 166, 0.5)' :
                    gradientColor.includes('amber') ? 'rgba(245, 158, 11, 0.5)' :
                    'rgba(244, 63, 94, 0.5)'; // pink default
  
  return (
    <motion.div
      className={`relative px-4 py-2 rounded-md text-white font-medium overflow-hidden bg-gradient-to-r ${gradientColor}`}
      animate={{ 
        opacity: opacity,
        boxShadow: isHighlighted ? `0 0 12px 2px ${glowColor}` : 'none', // Glow that matches the color
        transition: { duration: 0.5 }
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 0 15px 4px ${glowColor}`, // Stronger glow on hover
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
      <span className="relative z-10">{skill}</span>
    </motion.div>
  );
}