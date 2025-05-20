"use client";

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

export default function ExperienceSection() {
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
    // Base text opacity values - increased contrast
    const baseOpacity = 0.55; // More dimmed text (non-highlighted)
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
    <section className="py-8 overflow-visible">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="rounded-md border border-white overflow-visible">
          <h2 className="text-3xl font-bold py-4 px-6 border-b border-white text-white bg-gray-800/50">
            Experience
          </h2>
          
          {/* Tabs - now inside the border */}
          <div className="px-6 pt-6 relative overflow-visible">
            {/* Vertical line with overflow visible to extend beyond container */}
            <div 
              className="absolute w-0.5 bg-white" 
              style={{
                left: "36px",
                top: "-1px",
                bottom: "-65px", // Extremely long value to ensure it reaches
                zIndex: "1"
              }}
            ></div>
            
            {/* Changed width to max-w-md (448px) */}
            <div className="flex rounded-full mb-9 overflow-hidden bg-gray-800/50 max-w-md mx-auto p-1.5 border border-purple-500/30">
              <button
                className={`flex-1 py-3 px-6 font-medium text-center relative transition-all duration-300 text-white rounded-full`}
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
                className={`flex-1 py-3 px-6 font-medium text-center relative transition-all duration-300 text-white rounded-full`}
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
            
            {/* Timeline content without its own vertical line */}
            <div className="relative pb-0">
              {/* Experience items with reduced bottom margin */}
              <div className="space-y-16 mb-6">
                {(activeTab === 'work' ? workExperience : educationExperience).map((institution, index) => (
                  <div key={`${institution.name}-${index}`} className="relative pl-22">
                    {/* Horizontal line extension from vertical timeline to logo - for all institutions */}
                    <div 
                      className="absolute w-4 h-0.5 bg-white" 
                      style={{
                        left: "0", // Start from the main vertical line
                        top: "37px", // Center of the logo
                        zIndex: "2"
                      }}
                    ></div>
                    
                    {/* Logo */}
                    <div className="absolute left-0 z-10">
                      <div className="w-[75px] h-[75px] rounded-full overflow-hidden flex items-center justify-center border-2 border-white
                      -500 bg-transparent relative p-0">
                        {institution.logo ? (
                          <Image
                            src={institution.logo}
                            alt={institution.name}
                            width={75}
                            height={75}
                            style={{ objectFit: 'contain', width: '75px', height: '75px' }}
                            className=""
                          />
                        ) : (
                          <FaSuitcase className="w-8 h-8 text-gray-800" />
                        )}
                      </div>
                    </div>
                    
                    {/* Content with updated font sizes */}
                    <div>
                      <div className="text-gray-400 text-base mb-1">{institution.period}</div>
                      <a 
                        href={institution.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xl md:text-2xl font-bold text-white hover:text-blue-400 transition-colors"
                      >
                        {institution.name}
                      </a>
                      
                      {/* List all roles for this institution */}
                      <div className="mt-2 space-y-6">
                        {institution.roles.map((role, roleIndex) => {
                          // Check if this role has highlighted points for the current job title
                          const hasHighlightedPoints = jobTitleToResponsibilities[currentJobTitle]?.[institution.name]?.[role.title]?.length > 0;
                          
                          return (
                            <div key={`${role.title}-${roleIndex}`} className="relative">
                              {/* Horizontal line for ALL roles, including the first one */}
                              <div 
                                className="absolute h-0.5 bg-white" 
                                style={{
                                  left: "-76px", // Position to start from the main vertical line
                                  width: "52px", // Length of the horizontal line
                                  top: "0.8em", // Align with the period text (not the role title)
                                  zIndex: "2"
                                }}
                              ></div>
                              
                              {/* Period moved above title */}
                              <div className="text-gray-400 text-base mb-1">{role.period}</div>
                              
                              {/* Title now comes after period */}
                              <span
                                className={`text-2xl md:text-3xl font-bold ${hasHighlightedPoints ? 'relative' : ''}`}
                                style={{
                                  background: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  backgroundClip: 'text',
                                  color: 'transparent'
                                }}
                              >
                                {role.title}
                                {/* Add a subtle indicator for roles with highlighted points */}
                                {hasHighlightedPoints && (
                                  <span 
                                    className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-sm"
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
                              </span>
                              
                              {/* Reduced spacing between bullet points */}
                              <ul className="mt-3 space-y-0.5 list-disc list-inside text-base md:text-lg text-gray-300">
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
                              
                              {/* Project tags */}
                              {role.title.includes('NFTVue') && (
                                <div className="mt-3 flex gap-2">
                                  {projectTags.map((tag) => (
                                    <a
                                      key={tag.name}
                                      href={tag.url}
                                      className="px- py-1 text-sm border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition-colors inline-flex items-center gap-1"
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
                  </div>
                ))}
              </div>
              
              {/* Smaller empty space at bottom */}
              <div className="h-3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}