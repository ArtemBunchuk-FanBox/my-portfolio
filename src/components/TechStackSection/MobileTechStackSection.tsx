"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { FaJs, FaReact, FaVuejs, FaNodeJs, FaPython, FaGitAlt, FaGithub, FaWordpress } from 'react-icons/fa';
import { SiTypescript, SiPhp, SiC, SiCplusplus, SiNextdotjs, SiIonic, SiTailwindcss, SiMongodb, SiSupabase, SiBitbucket, SiElementor, SiAdobephotoshop, SiAdobeillustrator, SiMysql, SiClerk } from 'react-icons/si';

type Technology = {
  name: string;
  icon: React.ReactNode | string;
  type: 'language' | 'frontend' | 'backend' | 'database' | 'versionControl' | 'design';
};

type TechType = Technology['type'];

export default function MobileTechStackSection() {
  const [activeType, setActiveType] = useState<TechType | null>(null);
  
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

  // Map of types to their display names
  const typeToName = {
    language: 'Programming Languages',
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Databases',
    versionControl: 'Version Control',
    design: 'Design',
  };

  // Get appropriate color based on technology type - updated to make colors more distinct
  const getTypeColor = (type: Technology['type']) => {
    switch (type) {
      case 'language':
        return 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white';
      case 'frontend':
        return 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white';
      case 'backend':
        return 'bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white';
      case 'database':
        return 'bg-gradient-to-r from-amber-500 to-orange-600 text-white';
      case 'versionControl':
        return 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white';
      case 'design':
        return 'bg-gradient-to-r from-pink-500 to-rose-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  // Map of types to their legend colors
  const typeToColor = {
    language: 'bg-gradient-to-r from-indigo-600 to-blue-600',
    frontend: 'bg-gradient-to-r from-teal-500 to-emerald-600',
    backend: 'bg-gradient-to-r from-purple-600 to-fuchsia-500',
    database: 'bg-gradient-to-r from-amber-500 to-orange-600',
    versionControl: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    design: 'bg-gradient-to-r from-pink-500 to-rose-600',
  };

  // Function to handle filter selection
  const handleFilterClick = (type: TechType | null) => {
    setActiveType(type === activeType ? null : type);
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
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
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
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
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
            
            {/* Tech stack items in a more compact grid */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {filteredTechnologies.map((tech) => (
                <motion.div
                  key={tech.name}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md ${getTypeColor(tech.type)}`}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="text-xl flex-shrink-0">
                    {typeof tech.icon === 'string' ? (
                      <Image 
                        src={tech.icon} 
                        alt={tech.name} 
                        width={20} 
                        height={20} 
                        className="w-5 h-5"
                      />
                    ) : (
                      tech.icon
                    )}
                  </div>
                  <span className="font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
