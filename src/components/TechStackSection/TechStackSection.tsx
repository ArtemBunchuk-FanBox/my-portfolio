/* eslint-disable */
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { FaJs, FaReact, FaVuejs, FaNodeJs, FaPython, FaGitAlt, FaGithub, FaWordpress, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiPhp, SiC, SiCplusplus, SiNextdotjs, SiIonic, SiTailwindcss, SiMongodb, SiSupabase, SiBitbucket, SiElementor, SiAdobephotoshop, SiAdobeillustrator, SiMysql, SiClerk } from 'react-icons/si';

type Technology = {
  name: string;
  icon: React.ReactNode | string;
  type: 'language' | 'frontend' | 'backend' | 'database' | 'versionControl' | 'design';
};

type TechType = Technology['type'];

export default function TechStackSection() {
  // Add state to track which type is being hovered and which is selected (frozen)
  const [hoveredType, setHoveredType] = useState<TechType | null>(null);
  const [selectedType, setSelectedType] = useState<TechType | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
  
  // Define technologies with their categories
  const technologies: Technology[] = [
    // Programming Languages
    { name: 'JavaScript', icon: <FaJs />, type: 'language' },
    { name: 'TypeScript', icon: <SiTypescript />, type: 'language' },
    { name: 'PHP', icon: <SiPhp />, type: 'language' },
    { name: 'Python', icon: <FaPython />, type: 'language' },
    { name: 'C', icon: <SiC />, type: 'language' },
    { name: 'C++', icon: <SiCplusplus />, type: 'language' },
    
    // Frontend
    { name: 'React', icon: <FaReact />, type: 'frontend' },
    { name: 'Vue.JS', icon: <FaVuejs />, type: 'frontend' },
    { name: 'Next.JS', icon: <SiNextdotjs />, type: 'frontend' },
    { name: 'Ionic', icon: <SiIonic />, type: 'frontend' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, type: 'frontend' },
    
    // Backend
    { name: 'Node.JS', icon: <FaNodeJs />, type: 'backend' },
    { name: 'Clerk', icon: <SiClerk />, type: 'backend' },
    
    // Databases
    { name: 'MongoDB', icon: <SiMongodb />, type: 'database' },
    { name: 'MySQL', icon: <SiMysql />, type: 'database' },
    { name: 'Supabase', icon: <SiSupabase />, type: 'database' },
    
    // Version Control
    { name: 'Git', icon: <FaGitAlt />, type: 'versionControl' },
    { name: 'GitHub', icon: <FaGithub />, type: 'versionControl' },
    { name: 'BitBucket', icon: <SiBitbucket />, type: 'versionControl' },
    
    // Design
    { name: 'WordPress', icon: <FaWordpress />, type: 'design' },
    { name: 'Elementor', icon: <SiElementor />, type: 'design' },
    { name: 'Photoshop', icon: <SiAdobephotoshop />, type: 'design' },
    { name: 'Illustrator', icon: <SiAdobeillustrator />, type: 'design' },
  ];

  // Get appropriate color based on technology type - updated to make colors more distinct
  const getTypeColor = (type: Technology['type']) => {
    switch (type) {
      case 'language':
        return 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white'; // Changed to indigo-blue
      case 'frontend':
        return 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white'; // Tech color
      case 'backend':
        return 'bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white'; // More purple-fuchsia
      case 'database':
        return 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'; // Amber/orange
      case 'versionControl':
        return 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'; // Cyan-blue
      case 'design':
        return 'bg-gradient-to-r from-pink-500 to-rose-600 text-white'; // Changed back to pink-rose
      default:
        return 'bg-gray-600 text-white';
    }
  };

  // Map of types to their legend colors - updated to match
  const typeToColor = {
    language: 'bg-gradient-to-r from-indigo-600 to-blue-600', // Changed
    frontend: 'bg-gradient-to-r from-teal-500 to-emerald-600',
    backend: 'bg-gradient-to-r from-purple-600 to-fuchsia-500', // Changed
    database: 'bg-gradient-to-r from-amber-500 to-orange-600',
    versionControl: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    design: 'bg-gradient-to-r from-pink-500 to-rose-600', // Changed
  };

  // Map of types to their display names
  const typeToName = {
    language: 'Programming Languages',
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Databases',
    versionControl: 'Version Control',
    design: 'Design',
  };

  // Function to determine opacity based on hover state and selected state
  const getOpacityClass = (type: Technology['type']) => {
    if (!hoveredType && !selectedType) return 'opacity-100';
    return (type === hoveredType || type === selectedType) ? 'opacity-100' : 'opacity-30';
  };

  // Function to handle mouse enter on tech item or legend
  const handleMouseEnter = (type: Technology['type']) => {
    if (!selectedType) {
      setHoveredType(type);
    }
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    if (!selectedType) {
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

  // Function to get glow shadow color based on tech type
  const getGlowColor = (type: Technology['type']) => {
    switch(type) {
      case 'language':
        return '0 0 12px 2px rgba(79, 70, 229, 0.6)'; // Indigo glow
      case 'frontend':
        return '0 0 12px 2px rgba(20, 184, 166, 0.6)'; // Teal glow
      case 'backend':
        return '0 0 12px 2px rgba(147, 51, 234, 0.6)'; // Purple glow
      case 'database':
        return '0 0 12px 2px rgba(245, 158, 11, 0.6)'; // Amber glow
      case 'versionControl':
        return '0 0 12px 2px rgba(6, 182, 212, 0.6)'; // Cyan glow
      case 'design':
        return '0 0 12px 2px rgba(236, 72, 153, 0.6)'; // Pink glow
      default:
        return '0 0 12px 2px rgba(255, 255, 255, 0.4)'; // Default white glow
    }
  };

  return (
    <section className="py-8 select-none" ref={sectionRef}>
      <div className="container mx-auto px-4 max-w-5xl select-none">
        <div className="rounded-md border border-white overflow-hidden select-none">
          <h2 className="text-3xl font-bold py-4 px-6 border-b border-white text-white bg-gray-800/50">
            Tech Stack
          </h2>
          
          <div className="p-6 relative">
            {/* Vertical line with extended bottom to reach the next section */}
            <div 
              className="absolute w-0.5 bg-white" 
              style={{
                left: "36px",
                top: "-1px",
                bottom: "-80px",
                zIndex: "1"
              }}
            ></div>
            
            {/* Shifted content to the right */}
            <div className="pl-20 select-none">
              <div className="flex flex-wrap gap-4 select-none">
                {technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className={`tech-item flex items-center gap-2 px-4 py-2 rounded-md ${getTypeColor(tech.type)} 
                      transition-all duration-200 ${getOpacityClass(tech.type)} 
                      hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] 
                      cursor-pointer select-none`}
                    style={{
                      boxShadow: selectedType === tech.type ? getGlowColor(tech.type) : 'none'
                    }}
                    onMouseEnter={() => handleMouseEnter(tech.type)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleTypeClick(tech.type)}
                  >
                    <div className="text-2xl">
                      {typeof tech.icon === 'string' ? (
                        <Image 
                          src={tech.icon} 
                          alt={tech.name} 
                          width={24} 
                          height={24} 
                          className="w-6 h-6"
                        />
                      ) : (
                        tech.icon
                      )}
                    </div>
                    <span className="font-medium">{tech.name}</span>
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
                      className={`legend-item flex items-center gap-2 cursor-pointer rounded-full px-3 py-1 
                        transition-all duration-200 ${getOpacityClass(typedType)}
                        ${isActive ? 'bg-gradient-to-r from-purple-700 to-pink-600' : 'bg-transparent'}
                        select-none`}
                      style={{
                        boxShadow: isSelected ? getGlowColor(typedType) : 'none'
                      }}
                      onMouseEnter={() => handleMouseEnter(typedType)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleTypeClick(typedType)}
                    >
                      <div className={`w-4 h-4 rounded-full overflow-hidden`}>
                        <div className={`w-full h-full ${typeToColor[typedType]}`}></div>
                      </div>
                      <span className={`text-base ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}