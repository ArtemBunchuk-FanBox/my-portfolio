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

  // Get appropriate color based on technology type
  const getTypeColor = (type: Technology['type']) => {
    switch (type) {
      case 'language':
        return 'bg-blue-600 text-white';
      case 'frontend':
        return 'bg-green-600 text-white';
      case 'backend':
        return 'bg-purple-600 text-white';
      case 'database':
        return 'bg-amber-600 text-white';
      case 'versionControl':
        return 'bg-red-600 text-white';
      case 'design':
        return 'bg-pink-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  // Map of types to their legend colors
  const typeToColor = {
    language: 'bg-blue-600',
    frontend: 'bg-green-600',
    backend: 'bg-purple-600',
    database: 'bg-amber-600',
    versionControl: 'bg-red-600',
    design: 'bg-pink-600',
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
              
              {/* Legend with larger text and indicators */}
              <div className="mt-8 flex flex-wrap gap-5">
                {Object.entries(typeToName).map(([type, name]) => (
                  <div 
                    key={type}
                    className={`flex items-center gap-3 cursor-pointer transition-opacity duration-300 ${getOpacityClass(type as TechType)}`}
                    onMouseEnter={() => handleMouseEnter(type as TechType)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={`w-4 h-4 ${typeToColor[type as TechType]} rounded-full`}></div>
                    <span className="text-gray-300 text-base">{name}</span>
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