import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaSuitcase, FaExternalLinkAlt } from 'react-icons/fa';
import { Institution } from '@/data/experience';
import { useJobTitle } from '@/context/JobTitleContext';
import { jobTitleToResponsibilities, projectTags } from '@/data/experience';

interface ExperienceItemProps {
  institution: Institution;
  index: number;
  openInstitutionDetails: (institution: Institution, initialRoleIndex?: number) => void;
}

export default function ExperienceItem({ 
  institution, 
  index, 
  openInstitutionDetails 
}: ExperienceItemProps) {
  const { titleIndex, jobTitles, highlightIntensity, titlePinned } = useJobTitle();
  const currentJobTitle = jobTitles[titleIndex];
  
  // Gather all the responsibility points that should be highlighted for this job title
  const highlightedPoints = React.useMemo(() => {
    const points: string[] = [];
    
    const jobMapping = jobTitleToResponsibilities[currentJobTitle] || {};
    
    // For each institution in the mapping
    Object.keys(jobMapping).forEach(instName => {
      const institutionMapping = jobMapping[instName];
      
      // For each role in this institution
      Object.keys(institutionMapping).forEach(roleTitle => {
        // Add all points that should be highlighted
        const rolePoints = institutionMapping[roleTitle] || [];
        points.push(...rolePoints);
      });
    });
    
    return points;
  }, [currentJobTitle]);

  // Function to check if a responsibility should be highlighted
  const shouldHighlight = useCallback((responsibility: {text: string, bold: string}) => {
    // Check if any highlighted point is contained in this responsibility text
    return highlightedPoints.some(point => 
      responsibility.text.toLowerCase().includes(point.toLowerCase()));
  }, [highlightedPoints]);

  // Get style for highlighted points
  const getHighlightStyle = useCallback((responsibility: {text: string, bold: string}) => {
    const baseOpacity = 0.55;
    const highlightedOpacity = 1.0;
    
    if (shouldHighlight(responsibility)) {
      const effectiveIntensity = titlePinned ? 1 : highlightIntensity;
      const opacity = baseOpacity + (highlightedOpacity - baseOpacity) * effectiveIntensity;
      
      return {
        opacity: opacity,
        transition: 'opacity 0.5s ease',
        textShadow: titlePinned ? '0 0 1px rgba(255,255,255,0.1)' : 'none'
      };
    } else {
      return {
        opacity: baseOpacity,
        transition: 'opacity 0.5s ease'
      };
    }
  }, [highlightIntensity, shouldHighlight, titlePinned]);

  return (
    <motion.div 
      className="relative pl-22"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Horizontal line extension from vertical timeline to logo */}
      <div 
        className="absolute w-4 h-0.5 bg-white" 
        style={{
          left: "0",
          top: "37px",
          zIndex: "2"
        }}
      ></div>
      
      {/* Logo - clickable to open modal */}
      <div className="absolute left-0 z-10">
        <div 
          className="w-[75px] h-[75px] rounded-full overflow-hidden flex items-center justify-center border-2 border-white bg-transparent relative p-0 cursor-pointer hover:border-purple-500/70 transition-all duration-300 select-none logo-container-circle"
          onClick={() => openInstitutionDetails(institution)}
        >
          <div className="absolute inset-0 rounded-full bg-black/90"></div>
          
          {institution.logo ? (
            <div className="relative z-10 w-[75px] h-[75px] logo-image-container">
              <Image
                src={institution.logo}
                alt={institution.name}
                width={75}
                height={75}
                style={{ objectFit: 'contain', width: '75px', height: '75px' }}
                className="select-none"
              />
            </div>
          ) : (
            <FaSuitcase className="w-8 h-8 text-gray-800" />
          )}
        </div>
      </div>
      
      {/* Content */}
      <div>
        <div className="text-gray-400 text-base mb-1">{institution.period}</div>
        {/* Company name clickable to open modal - with improved hover effect */}
        <span 
          className="inline-block text-xl md:text-2xl font-bold text-white hover:text-purple-400 transition-colors cursor-pointer"
          onClick={() => openInstitutionDetails(institution)}
        >
          {institution.name}
          <FaExternalLinkAlt className="inline-block ml-2 text-xs opacity-70" />
        </span>
        
        {/* List all roles for this institution */}
        <div className="mt-2 space-y-6">
          {institution.roles.map((role, roleIndex) => (
            <div key={`${role.title}-${roleIndex}`} className="relative">
              {/* Horizontal line for roles */}
              <div 
                className="absolute h-0.5 bg-white" 
                style={{
                  left: "-76px",
                  width: "52px",
                  top: "0.8em",
                  zIndex: "2"
                }}
              ></div>
              
              {/* Period */}
              <div className="text-gray-400 text-base mb-1">{role.period}</div>
              
              {/* Title - clickable */}
              <span
                className={`text-2xl md:text-3xl font-bold cursor-pointer inline-block role-title-hover`}
                onClick={() => openInstitutionDetails(institution, roleIndex)}
                style={{
                  background: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  position: 'relative',
                  transition: 'text-shadow 0.5s ease'
                }}
              >
                {role.title}
                <FaExternalLinkAlt 
                  className="inline-block ml-2 text-xs opacity-0 transition-opacity duration-500" 
                  style={{
                    verticalAlign: 'super',
                    fontSize: '0.6em'
                  }}
                />
              </span>
              
              {/* Summary */}
              {role.summary && (
                <p className="mt-3 text-base md:text-lg text-gray-300 mb-4">
                  {role.summary}
                </p>
              )}
              
              {/* Bullet points */}
              <ul className="mt-3 text-base md:text-lg text-gray-300">
                {role.responsibilities.map((responsibility, respIndex) => (
                  <li 
                    key={`resp-${respIndex}`}
                    className="flex transition-all duration-300 mb-2"
                    style={getHighlightStyle(responsibility)}
                  >
                    <span className="inline-block flex-shrink-0 w-4 md:w-5 mr-1.5 md:mr-2 text-center">•</span>
                    <span className="flex-1">
                      {responsibility.bold ? (
                        <>
                          <span className="font-bold">{responsibility.bold}</span>
                          {responsibility.text.substring(responsibility.bold.length)}
                        </>
                      ) : (
                        responsibility.text
                      )}
                    </span>
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
          ))}
        </div>
      </div>
    </motion.div>
  );
}
