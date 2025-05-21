"use client";
/* eslint-disable */
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

export default function MobileSkillsSection() {
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
      color: 'from-blue-600 to-purple-700',
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
      color: 'from-teal-500 to-emerald-600',
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
      color: 'from-amber-500 to-orange-600',
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
      color: 'from-pink-500 to-rose-600',
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
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="rounded-md border border-white overflow-hidden">
          <h2 className="text-2xl font-bold py-3 px-4 border-b border-white text-white bg-gray-800/50">
            Skills
          </h2>
          
          <div className="p-4">
            {skillCategories.map((category) => (
              <div key={category.category} className="mb-6">
                {/* Category header */}
                <div 
                  className="mb-3 py-2 px-3 rounded-md font-semibold text-white"
                  style={{ 
                    background: `linear-gradient(to right, ${category.color.replace('from-', '').replace('to-', '')})`
                  }}
                >
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

// Mobile-optimized skill badge with simpler animations
function MobileSkillBadge({ 
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
  const baseOpacity = 0.65; // Slightly higher base opacity for better mobile readability
  const highlightedOpacity = 1.0;
  
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
