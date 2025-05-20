"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { FaJs, FaReact, FaVuejs, FaNodeJs, FaPython, FaGitAlt, FaGithub, FaWordpress, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiPhp, SiC, SiCplusplus, SiNextdotjs, SiIonic, SiTailwindcss, SiMongodb, SiSupabase, SiBitbucket, SiElementor, SiAdobephotoshop, SiAdobeillustrator, SiMysql, SiClerk } from 'react-icons/si';

type Technology = {
  name: string;
  icon: React.ReactNode | string;
  type: 'language' | 'frontend' | 'backend' | 'database' | 'versionControl' | 'design';
};

type TechType = Technology['type'];

export default function TechStackSection() {
  // Add state to track which type is being hovered
  const [hoveredType, setHoveredType] = useState<TechType | null>(null);
  
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

  // Function to determine opacity based on hover state
  const getOpacityClass = (type: Technology['type']) => {
    if (!hoveredType) return 'opacity-100';
    return type === hoveredType ? 'opacity-100' : 'opacity-30';
  };

  // Function to handle mouse enter on tech item or legend
  const handleMouseEnter = (type: Technology['type']) => {
    setHoveredType(type);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setHoveredType(null);
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="rounded-md border border-white overflow-hidden">
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
                // Extend further below the container
                bottom: "-80px",
                zIndex: "1"
              }}
            ></div>
            
            {/* Shifted content to the right */}
            <div className="pl-20">
              <div className="flex flex-wrap gap-4">
                {technologies.map((tech) => (
                  <motion.div
                    key={tech.name}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${getTypeColor(tech.type)} transition-opacity duration-300 ${getOpacityClass(tech.type)}`}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
                    }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => handleMouseEnter(tech.type)}
                    onMouseLeave={handleMouseLeave}
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
                  </motion.div>
                ))}
              </div>
              
              {/* Legend with color indicators matching the updated colors */}
              <div className="mt-8 flex flex-wrap gap-2">
                {Object.entries(typeToName).map(([type, name]) => {
                  const typedType = type as TechType;
                  const isHovered = hoveredType === typedType;
                  return (
                    <div 
                      key={type}
                      className={`flex items-center gap-2 cursor-pointer rounded-full px-3 py-1 transition-all duration-300 ${
                        getOpacityClass(typedType)
                      }`}
                      style={{
                        background: isHovered 
                          ? 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)' 
                          : 'transparent',
                        boxShadow: isHovered ? '0 4px 12px rgba(166, 79, 249, 0.4)' : 'none'
                      }}
                      onMouseEnter={() => handleMouseEnter(typedType)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className={`w-4 h-4 rounded-full overflow-hidden`}>
                        <div className={`w-full h-full ${typeToColor[typedType]}`}></div>
                      </div>
                      <span className={`text-base ${isHovered ? 'text-white' : 'text-gray-300'}`}>{name}</span>
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