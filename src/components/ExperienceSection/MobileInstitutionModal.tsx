import React, { useCallback } from 'react';
import Image from 'next/image';
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Institution, jobTitleToResponsibilities } from '@/data/experience';

interface MobileInstitutionModalProps {
  activeInstitution: Institution | null;
  closeInstitutionDetails: () => void;
  activeTab: 'work' | 'education';
  currentJobTitle: string;
  highlightIntensity: number;
  titlePinned: boolean;
}

export default function MobileInstitutionModal({
  activeInstitution,
  closeInstitutionDetails,
  activeTab,
  currentJobTitle,
  highlightIntensity,
  titlePinned
}: MobileInstitutionModalProps) {
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
    <AnimatePresence>
      {activeInstitution && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] overflow-y-auto bg-black/95" 
          onClick={closeInstitutionDetails}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="relative bg-gradient-to-b from-gray-900 to-black min-h-screen w-full border-0 pt-16"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              className="fixed top-4 right-4 z-[10000] w-[42px] h-[42px] flex items-center justify-center rounded-full bg-black/70 backdrop-blur-sm text-white shadow-lg border border-purple-500/30 active:scale-95 transition-all hover:bg-black/80"
              onClick={closeInstitutionDetails}
              whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(139, 92, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close modal"
            >
              <FaTimes size={18} />
            </motion.button>
            
            {/* Hero image section */}
            <div className="h-48 relative w-full overflow-hidden border-0 -mt-16">
              {activeInstitution.bannerImage ? (
                <Image
                  src={activeInstitution.bannerImage}
                  alt={activeInstitution.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  quality={95}
                  priority
                  className="brightness-90"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-purple-900 to-indigo-900 flex items-center justify-center">
                  {activeInstitution.logo && (
                    <div className="w-24 h-24 relative">
                      <Image
                        src={activeInstitution.logo}
                        alt={activeInstitution.name}
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  )}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
            </div>
            
            {/* Company content with mobile-optimized layout */}
            <div className="px-5 py-6 relative z-10 pb-24">
              {/* Title section with proper background and styling */}
              <div className="mb-6 pb-6 border-b border-gray-800 flex flex-col">
                <h2
                  className="text-3xl font-bold mb-3"
                  style={{
                    background: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  {activeInstitution.name}
                </h2>
                
                {/* External link button if available */}
                {activeInstitution.link && (
                  <a
                    href={activeInstitution.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-800/80 text-white hover:bg-gray-700 transition-all duration-300 self-start"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Website</span>
                    <FaExternalLinkAlt size={12} />
                  </a>
                )}
              </div>

              {/* Company overview */}
              {activeInstitution.description && (
                <div className="mb-6 pb-6 border-b border-gray-800">
                  <h3 className="text-base uppercase text-gray-200 font-medium mb-3">BACKGROUND</h3>
                  <div className="bg-gray-800/30 border-l-2 border-purple-500/40 pl-4 py-3 pr-3 rounded-r-sm">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {activeInstitution.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Roles section */}
              <div className="mb-6">
                <h3 className="text-base uppercase text-gray-200 font-medium mb-3">
                  {activeTab === 'work' ? 'ROLES & ACHIEVEMENTS' : 'QUALIFICATIONS & RESEARCH'}
                </h3>
                
                <div className="space-y-8">
                  {activeInstitution.roles.map((role, roleIndex) => (
                    <div 
                      key={`mobile-modal-role-${roleIndex}`} 
                      id={`mobile-modal-role-${roleIndex}`}
                      className="bg-gray-800/30 border-l-2 border-purple-500/40 pl-4 py-3 pr-3 rounded-r-sm transition-all duration-500"
                    >
                      {/* Period and title - fixed layout with top alignment */}
                      <div className="mb-3 flex justify-between items-start">
                        <div className="flex-1 min-w-0 pr-2">
                          <h4
                            className="text-xl font-bold break-words"
                            style={{
                              background: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                              color: 'transparent'
                            }}
                          >
                            {role.title}
                          </h4>
                        </div>
                        <div className="text-gray-400 text-sm whitespace-nowrap flex-shrink-0 pt-1">
                          {role.period}
                        </div>
                      </div>
                      
                      {/* Add role summary in modal */}
                      {role.summary && (
                        <p className="text-gray-300 mb-3 text-sm">
                          {role.summary}
                        </p>
                      )}
                      
                      {/* Responsibilities with highlighting applied */}
                      <ul className="space-y-1 text-gray-300 text-sm">
                        {role.responsibilities.map((responsibility, respIndex) => (
                          <li 
                            key={`modal-resp-${roleIndex}-${respIndex}`}
                            className="flex transition-all duration-300 mb-1.5"
                            style={getHighlightStyle(responsibility)}
                          >
                            <span className="inline-block flex-shrink-0 w-4 mr-1.5 text-center">•</span>
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
