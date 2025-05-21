"use client";
/* eslint-disable */
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FaSuitcase } from 'react-icons/fa';

// Define types for our data
type Role = {
  title: string;
  period: string;
  responsibilities: string[];
  keyPoints?: string[]; // Specify which responsibilities are key points for certain job titles
};

type Institution = {
  name: string;
  logo?: string;
  link?: string;
  period: string;
  roles: Role[];
};

// Definition of which responsibility points relate to each job title
interface JobTitleResponsibilityMap {
  [jobTitle: string]: {
    [institution: string]: {
      [roleTitle: string]: string[]; // Array of responsibility text snippets to highlight
    }
  }
}

export default function MobileExperienceSection() {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');
  const [currentJobTitle, setCurrentJobTitle] = useState<string>('');
  const [highlightIntensity, setHighlightIntensity] = useState<number>(1);
  const [highlightedPoints, setHighlightedPoints] = useState<string[]>([]);

  // Map of job titles to relevant experience bullets
  const jobTitleToResponsibilities: JobTitleResponsibilityMap = {
    "Strategy Director": {
      "Fanbox": {
        "Head of Operations": [
          "Co-created revenue and LTIP strategies aligned with company goals",
          "Conducted risk assessments to strengthen company resilience"
        ],
        "Head of Research, Insights & Audience Activation": [
          "Developed predictive analytics tools and multi-source data strategies"
        ],
        "Strategy Consultant": [
          "Managed 30+ research projects across sectors"
        ]
      }
    },
    "VP of Product": {
      "Fanbox": {
        "Head of Operations": [
          "Built Content Department, expanded digital presence, and opened new B2B/B2C opportunities",
          "Automated freelancer management, reducing invoice payment time from 21 to 5 days"
        ],
        "Head of Research, Insights & Audience Activation": [
          "Directed neuromarketing R&D and contributed to Popcorn event platform launch",
          "Automated and built the Popcorn Movie Database, merging 120k profiles"
        ]
      }
    },
    "Innovation Lead": {
      "Fanbox": {
        "Head of Operations": [
          "Built Content Department, expanded digital presence, and opened new B2B/B2C opportunities" 
        ],
        "Head of Research, Insights & Audience Activation": [
          "Directed neuromarketing R&D and contributed to Popcorn event platform launch"
        ],
        "Strategy Consultant": [
          "Developed psychometric campaigns and led R&D for platform innovation"
        ]
      }
    },
    "Head of Research": {
      "Fanbox": {
        "Head of Research, Insights & Audience Activation": [
          "Led a team of 8 in audience growth, analytics, and psychometric research",
          "Directed neuromarketing R&D and contributed to Popcorn event platform launch",
          "Developed predictive analytics tools and multi-source data strategies"
        ],
        "Strategy Consultant": [
          "Managed 30+ research projects across sectors"
        ]
      }
    },
    "VP of Marketing": {
      "Fanbox": {
        "Head of Operations": [
          "Built Content Department, expanded digital presence, and opened new B2B/B2C opportunities"
        ],
        "Head of Research, Insights & Audience Activation": [
          "Grew subscriber base from 5k to 120k through influencer collaborations"
        ],
        "Head of Project Delivery – Universal Pictures (UP)": [
          "Managed Universal Pictures account, generating $2M annual revenue",
          "Negotiated contracts, expanded account value, and developed creative toolkits"
        ]
      }
    },
    "Insights Director": {
      "Fanbox": {
        "Head of Research, Insights & Audience Activation": [
          "Led a team of 8 in audience growth, analytics, and psychometric research",
          "Developed predictive analytics tools and multi-source data strategies"
        ],
        "Strategy Consultant": [
          "Managed 30+ research projects across sectors",
          "Developed psychometric campaigns and led R&D for platform innovation"
        ]
      }
    },
    "Game Master": {
      "Fanbox": {
        "Head of Operations": [
          "Launched employee benefits and initiatives to boost engagement and efficiency"
        ],
        "Head of Project Delivery – Universal Pictures (UP)": [
          "Led workshops and market research for new business opportunities"
        ]
      }
    }
  };

  // Sample work experience data
  const workExperience: Institution[] = [
    {
      name: 'Fanbox',
      logo: '/images/wearefanbox_logo (1).jpg',
      link: 'https://www.linkedin.com/company/75001500/',
      period: '',
      roles: [
        {
          title: 'Head of Operations',
          period: 'Jul 2023 - Present',
          responsibilities: [
            'Oversaw operations for 41 staff, reporting to founders.',
            'Led restructuring, reducing overtime by 20% and raising satisfaction by 15%.',
            'Built Content Department, expanded digital presence, and opened new B2B/B2C opportunities.',
            'Automated freelancer management, reducing invoice payment time from 21 to 5 days.',
            'Co-created revenue and LTIP strategies aligned with company goals.',
            'Launched employee benefits and initiatives to boost engagement and efficiency.',
            'Conducted risk assessments to strengthen company resilience.'
          ]
        },
        {
          title: 'Head of Research, Insights & Audience Activation',
          period: 'Jul 2021 - Jul 2023',
          responsibilities: [
            'Led a team of 8 in audience growth, analytics, and psychometric research.',
            'Directed neuromarketing R&D and contributed to Popcorn event platform launch.',
            'Automated and built the Popcorn Movie Database, merging 120k profiles.',
            'Developed predictive analytics tools and multi-source data strategies.',
            'Grew subscriber base from 5k to 120k through influencer collaborations.'
          ]
        },
        {
          title: 'Head of Project Delivery – Universal Pictures (UP)',
          period: 'Jul 2020 - Jul 2021',
          responsibilities: [
            'Managed Universal Pictures account, generating $2M annual revenue.',
            'Negotiated contracts, expanded account value, and developed creative toolkits.',
            'Led workshops and market research for new business opportunities.'
          ]
        },
        {
          title: 'Strategy Consultant',
          period: 'Jul 2019 - Jun 2020',
          responsibilities: [
            'Managed 30+ research projects across sectors.',
            'Developed psychometric campaigns and led R&D for platform innovation.',
            'Implemented software tools to streamline operations.'
          ]
        }
      ]
    }
  ];

  // Sample education data
  const educationExperience: Institution[] = [
    {
      name: 'University of Manchester',
      logo: '/images/MCR.jpg',
      link: undefined,
      period: '',
      roles: [
        {
          title: 'BSc Physics with Philosophy',
          period: '2012 - 2015',
          responsibilities: []
        }
      ]
    },
    {
      name: 'University College London',
      logo: '/images/university_college_london_logo.jpg',
      link: undefined,
      period: '',
      roles: [
        {
          title: 'MSc. Advanced Neuroimaging',
          period: '2015 - 2016',
          responsibilities: []
        }
      ]
    }
  ];

  // Project tags
  const projectTags = [
    { name: 'NFTVue', url: '#' }
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

      // Gather all the responsibility points that should be highlighted for this job title
      const highlightPoints: string[] = [];

      const jobMapping = jobTitleToResponsibilities[currentTitle] || {};

      // For each institution in the mapping
      Object.keys(jobMapping).forEach(instName => {
        const institutionMapping = jobMapping[instName];

        // For each role in this institution
        Object.keys(institutionMapping).forEach(roleTitle => {
          // Add all points that should be highlighted
          const points = institutionMapping[roleTitle] || [];
          highlightPoints.push(...points);
        });
      });

      setHighlightedPoints(highlightPoints);
    };

    window.addEventListener('jobTitleChange', handleTitleChange as EventListener);

    return () => {
      window.removeEventListener('jobTitleChange', handleTitleChange as EventListener);
    };
  }, []);

  // Function to check if a responsibility should be highlighted
  const shouldHighlight = useCallback((responsibility: string) => {
    // Check if any highlighted point is contained in this responsibility
    return highlightedPoints.some(point => 
      responsibility.toLowerCase().includes(point.toLowerCase()));
  }, [highlightedPoints]);

  // Get style for highlighted points - making relevant points much brighter and others dimmer
  const getHighlightStyle = useCallback((responsibility: string) => {
    // Base text opacity values - increased contrast for mobile
    const baseOpacity = 0.6; // Slightly less dimmed for better readability on small screens
    const highlightedOpacity = 1.0; // Fully bright text (highlighted)
    
    // If this responsibility should be highlighted, make it brighter
    if (shouldHighlight(responsibility)) {
      // Interpolate opacity based on highlight intensity
      const opacity = baseOpacity + (highlightedOpacity - baseOpacity) * highlightIntensity;
      
      return {
        opacity: opacity,
        transition: 'opacity 0.5s ease' // Slightly longer transition for smoother effect
      };
    } 
    // Otherwise, dim it more significantly
    else {
      return {
        opacity: baseOpacity,
        transition: 'opacity 0.5s ease'
      };
    }
  }, [highlightIntensity, shouldHighlight]);

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="rounded-md border border-white overflow-visible">
          <h2 className="text-2xl font-bold py-3 px-4 border-b border-white text-white bg-gray-800/50">
            Experience
          </h2>
          
          {/* Tabs - mobile optimized and repositioned */}
          <div className="px-4 pt-4 relative">
            {/* Simplified tab design - more prominent */}
            <div className="flex rounded-lg mb-8 overflow-hidden bg-gray-800/80 max-w-xs mx-auto border border-purple-500/60">
              <button
                className={`flex-1 py-3 px-4 font-semibold text-center relative transition-all duration-300 text-white text-base`}
                onClick={(e) => {
                  e.preventDefault();
                  const scrollPosition = window.scrollY;
                  setActiveTab('work');
                  setTimeout(() => window.scrollTo(0, scrollPosition), 0);
                }}
                style={{ 
                  background: activeTab === 'work' 
                    ? 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)' 
                    : 'transparent',
                  boxShadow: activeTab === 'work' ? '0 4px 12px rgba(166, 79, 249, 0.4)' : 'none'
                }}
              >
                Work
              </button>
              <button
                className={`flex-1 py-3 px-4 font-semibold text-center relative transition-all duration-300 text-white text-base`}
                onClick={(e) => {
                  e.preventDefault();
                  const scrollPosition = window.scrollY;
                  setActiveTab('education');
                  setTimeout(() => window.scrollTo(0, scrollPosition), 0);
                }}
                style={{ 
                  background: activeTab === 'education' 
                    ? 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)' 
                    : 'transparent',
                  boxShadow: activeTab === 'education' ? '0 4px 12px rgba(166, 79, 249, 0.4)' : 'none'
                }}
              >
                Education
              </button>
            </div>
            
            {/* Completely redesigned timeline content */}
            <div className="pb-4">
              {/* Experience items with clearer layout */}
              <div className="space-y-10">
                {(activeTab === 'work' ? workExperience : educationExperience).map((institution, index) => (
                  <div key={`${institution.name}-${index}`} className="bg-gray-800/30 rounded-lg border border-purple-500/20 overflow-hidden">
                    {/* Institution logo at the top */}
                    <div className="flex justify-center pt-4 pb-2">
                      <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center border-2 border-white/70 bg-white/10">
                        {institution.logo ? (
                          <Image
                            src={institution.logo}
                            alt={institution.name}
                            width={60}
                            height={60}
                            style={{ objectFit: 'contain' }}
                          />
                        ) : (
                          <FaSuitcase className="w-8 h-8 text-white" />
                        )}
                      </div>
                    </div>
                    
                    {/* List all roles with improved spacing and readability */}
                    <div className="px-4 pb-4">
                      {institution.roles.map((role, roleIndex) => {
                        // Check if this role has highlighted points for the current job title
                        const hasHighlightedPoints = jobTitleToResponsibilities[currentJobTitle]?.[institution.name]?.[role.title]?.length > 0;
                        
                        return (
                          <div 
                            key={`${role.title}-${roleIndex}`} 
                            className={`mb-6 ${roleIndex > 0 ? 'pt-5 border-t border-white/10' : ''}`}
                          >
                            {/* Organization name and period ABOVE the title */}
                            <div className="flex justify-between items-center mb-3 text-sm">
                              <a 
                                href={institution.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white hover:text-purple-400 transition-colors font-medium"
                              >
                                {institution.name}
                              </a>
                              <span className="text-gray-300">{role.period}</span>
                            </div>
                            
                            {/* Title with larger font size */}
                            <h3
                              className={`text-xl font-bold mb-4 ${hasHighlightedPoints ? 'relative' : ''}`}
                              style={{
                                background: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                color: 'transparent'
                              }}
                            >
                              {role.title}
                              {/* Indicator for relevant points */}
                              {hasHighlightedPoints && (
                                <span 
                                  className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-sm"
                                  style={{ 
                                    animation: 'pulse 2s infinite',
                                    WebkitBackgroundClip: 'initial',
                                    WebkitTextFillColor: 'initial',
                                    backgroundClip: 'initial',
                                    color: '#a64ff9'
                                  }}
                                >
                                  •
                                </span>
                              )}
                            </h3>
                            
                            {/* Responsibilities - larger text for better readability */}
                            {role.responsibilities.length > 0 && (
                              <ul className="space-y-2 list-disc list-outside ml-5 text-gray-200 text-base">
                                {role.responsibilities.map((responsibility, respIndex) => (
                                  <li 
                                    key={`resp-${respIndex}`}
                                    style={getHighlightStyle(responsibility)}
                                    className="transition-all duration-300"
                                  >
                                    {responsibility}
                                  </li>
                                ))}
                              </ul>
                            )}
                            
                            {/* Project tags with improved styling */}
                            {role.title.includes('NFTVue') && (
                              <div className="mt-3 flex gap-2 flex-wrap">
                                {projectTags.map((tag) => (
                                  <a
                                    key={tag.name}
                                    href={tag.url}
                                    className="px-3 py-1 text-sm border border-purple-500/30 rounded-md text-white hover:bg-purple-500/20 transition-colors inline-flex items-center gap-1 bg-gray-800/30"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span className="mr-1">🔗</span> {tag.name}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
