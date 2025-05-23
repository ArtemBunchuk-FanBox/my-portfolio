"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { 
  technologies, 
  typeToColor, 
  typeToName, 
  getTypeColor,
  TechType 
} from '@/data/technologies';

export default function MobileTechStackSection() {
  const [activeType, setActiveType] = useState<TechType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | 'auto'>('auto');
  const [isAnimating, setIsAnimating] = useState(false);

  // Simplified filter handling with height preservation
  const handleFilterClick = (type: TechType | null) => {
    // Don't do anything if already animating
    if (isAnimating) return;
    
    const newFilter = type === activeType ? null : type;
    const isReduction = (activeType === null && type !== null) || 
                        (activeType !== null && type !== null && activeType !== type);
    
    if (isReduction && containerRef.current) {
      // Save current height before filter change
      setContainerHeight(containerRef.current.offsetHeight);
      setIsAnimating(true);
      
      // Update filter after a short delay
      setTimeout(() => {
        setActiveType(newFilter);
        
        // Begin gradual height transition
        setTimeout(() => {
          setContainerHeight('auto');
          
          // Wait for transition to complete
          setTimeout(() => {
            setIsAnimating(false);
          }, 400); // Match with transition duration
        }, 50);
      }, 50);
    } else {
      // For expansion or same filter, just update immediately
      setActiveType(newFilter);
    }
  };

  // Get technologies to display based on active filter
  const filteredTechnologies = activeType 
    ? technologies.filter(tech => tech.type === activeType)
    : technologies;

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="rounded-md border border-white overflow-hidden">
          <h2 className="text-2xl font-bold py-3 px-4 border-b border-white text-white bg-gray-800/50">
            Tech Stack
          </h2>
          
          <div className="p-4">
            {/* Mobile-optimized filter pills */}
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeType === null 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' 
                    : 'bg-gray-700/50 text-gray-300'
                }`}
                onClick={() => handleFilterClick(null)}
              >
                All
              </button>
              
              {(Object.keys(typeToName) as TechType[]).map(type => (
                <button
                  key={type}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeType === type 
                      ? typeToColor[type] + ' text-white'
                      : 'bg-gray-700/50 text-gray-300'
                  }`}
                  onClick={() => handleFilterClick(type)}
                >
                  {typeToName[type]}
                </button>
              ))}
            </div>
            
            {/* Container with controlled height transition */}
            <div 
              ref={containerRef}
              style={{ 
                height: containerHeight, 
                transition: 'height 400ms ease-out',
                overflow: 'hidden'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeType || 'all'} // Force re-render on filter change
                  className="flex flex-wrap gap-2" // Changed to flex-wrap like in SkillsSection
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredTechnologies.map((tech) => (
                    <motion.div
                      key={tech.name}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getTypeColor(tech.type)} overflow-hidden`} // Exact same padding as SkillsSection
                      whileTap={{ scale: 0.95 }} // Same animation as SkillsSection
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex-shrink-0 flex items-center justify-center w-4 h-4">
                        {typeof tech.icon === 'string' ? (
                          <Image 
                            src={tech.icon} 
                            alt={tech.name} 
                            width={16} 
                            height={16} 
                            className="w-4 h-4"
                            style={{ transform: 'translateZ(0)' }}
                          />
                        ) : (
                          <span style={{ transform: 'translateZ(0)' }}>{tech.icon}</span>
                        )}
                      </div>
                      <span className="font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis" style={{ transform: 'translateZ(0)' }}>
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
