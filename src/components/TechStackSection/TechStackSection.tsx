/* eslint-disable */
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { 
  technologies, 
  typeToColor, 
  typeToName, 
  getGlowColor, 
  getTypeColor,
  Technology, 
  TechType 
} from '@/data/technologies';

export default function TechStackSection() {
  // Add state to track which type is being hovered and which is selected (frozen)
  const [hoveredType, setHoveredType] = useState<TechType | null>(null);
  const [selectedType, setSelectedType] = useState<TechType | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle clicks outside of tech items to clear selection
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (sectionRef.current && 
          !target.closest('.tech-item') && 
          !target.closest('.legend-item')) {
        setSelectedType(null);
        setHoveredType(null);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to determine opacity based on hover state and selected state
  const getOpacityClass = (type: Technology['type']) => {
    if (!hoveredType && !selectedType) return 'opacity-100';
    return (type === hoveredType || type === selectedType) ? 'opacity-100' : 'opacity-30';
  };

  // Function to handle mouse enter on tech item or legend with delay
  const handleMouseEnter = (type: Technology['type']) => {
    if (!selectedType) {
      // Clear any existing hover timer
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
      
      // Set a new timer for the hover effect
      hoverTimerRef.current = setTimeout(() => {
        setHoveredType(type);
      }, 200); // 200ms delay before hover effect starts
    }
  };

  // Function to handle mouse leave with cancellation
  const handleMouseLeave = () => {
    if (!selectedType) {
      // Clear any pending hover effect
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      
      // Set the hover type to null immediately
      setHoveredType(null);
    }
  };
  
  // Function to handle click on tech type in legend or tech item
  const handleTypeClick = (type: Technology['type']) => {
    // If clicking the already selected type, unfreeze it
    if (selectedType === type) {
      setSelectedType(null);
      setHoveredType(null);
    } else {
      // Otherwise, select this type and clear any previous selection
      setSelectedType(type);
      setHoveredType(null); // Clear hover state when selecting
    }
  };

  return (
    <section className="py-8 select-none overflow-visible" ref={sectionRef}>
      <div className="container mx-auto px-4 max-w-5xl select-none">
        <div className="rounded-md border border-white overflow-visible">
          <h2 className="text-3xl font-bold py-4 px-6 border-b border-white text-white bg-gray-800/50">
            Tech Stack
          </h2>
          
          <div className="p-6 relative">
            {/* Vertical line with EXTENDED bottom to reach the next Contact section */}
            <div 
              className="absolute w-0.5 bg-white" 
              style={{
                left: "36px",
                top: "-1px",
                bottom: "-65px", // Increased to reach further down to the Contact section
                zIndex: "1",
                pointerEvents: "none" // Ensure clicks pass through
              }}
            ></div>
            
            {/* Horizontal line extension for the section */}
            <div 
              className="absolute h-0.5 bg-white" 
              style={{
                left: "6px", // Starting point
                width: "30px", // Width of horizontal line
                top: "30px", // Positioned near the top to connect with section title
                zIndex: "2"
              }}
            ></div>
            
            {/* Shifted content to the right */}
            <div className="pl-20 select-none">
              <div className="flex flex-wrap gap-4 select-none">
                {technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className={`tech-item flex items-center gap-2 px-4 py-2 rounded-md ${getTypeColor(tech.type)} 
                      cursor-pointer select-none text-base font-medium`}
                    style={{
                      boxShadow: selectedType === tech.type ? getGlowColor(tech.type) : 'none',
                      opacity: (!hoveredType && !selectedType) || tech.type === hoveredType || tech.type === selectedType ? 1 : 0.3,
                      transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={() => handleMouseEnter(tech.type)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleTypeClick(tech.type)}
                  >
                    <div className="text-xl">
                      {typeof tech.icon === 'string' ? (
                        <Image 
                          src={tech.icon} 
                          alt={tech.name} 
                          width={24} 
                          height={24} 
                          className="w-5 h-5"
                        />
                      ) : (
                        tech.icon
                      )}
                    </div>
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
              
              {/* Legend with color indicators matching the updated colors */}
              <div className="mt-8 flex flex-wrap gap-2 select-none">
                {Object.entries(typeToName).map(([type, name]) => {
                  const typedType = type as TechType;
                  const isHovered = hoveredType === typedType;
                  const isSelected = selectedType === typedType;
                  const isActive = isHovered || isSelected;
                  
                  return (
                    <div 
                      key={type}
                      className="legend-item flex items-center gap-2 cursor-pointer rounded-full px-3 py-1 select-none relative overflow-hidden"
                      style={{
                        boxShadow: isSelected ? getGlowColor(typedType) : 'none',
                        opacity: (!hoveredType && !selectedType) || typedType === hoveredType || typedType === selectedType ? 1 : 0.3,
                        transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={() => handleMouseEnter(typedType)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleTypeClick(typedType)}
                    >
                      {/* Background gradient overlay that animates in and out */}
                      <div 
                        className="absolute inset-0 z-0 rounded-full" 
                        style={{
                          background: 'linear-gradient(to right, rgb(109, 40, 217), rgb(219, 39, 119))',
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: 'left center',
                          transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1), transform 1200ms cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      />
                      
                      {/* Content positioned above the background */}
                      <div className="z-10 relative flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full overflow-hidden`}>
                          <div className={`w-full h-full ${typeToColor[typedType]}`}></div>
                        </div>
                        <span 
                          className="text-base"
                          style={{
                            color: isActive ? '#ffffff' : '#d1d5db',
                            transition: 'color 1200ms cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        >
                          {name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add a CSS utility class to ensure overflow is visible */}
      <style jsx>{`
        section {
          overflow: visible !important;
        }
      `}</style>
    </section>
  );
}