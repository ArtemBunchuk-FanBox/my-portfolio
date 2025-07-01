import { 
  FaJs, FaReact, FaNodeJs, FaPython, FaGitAlt, FaGithub,
  FaRProject, FaTable, FaChartBar
} from 'react-icons/fa';
import { 
  SiTypescript, SiC, SiNextdotjs, 
  SiMongodb, SiAdobephotoshop, 
  SiAdobeillustrator, SiMysql, SiPostgresql, SiAdobepremierepro, SiAdobeaftereffects,
  SiDavinciresolve, SiTableau, SiHuggingface, SiOpenai,
  SiHtml5, SiCss3, SiRust, SiAnthropic
} from 'react-icons/si';
import { GiSpermWhale } from "react-icons/gi";
import React from 'react';
import { VscAzure } from "react-icons/vsc";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { LiaAws } from "react-icons/lia";


export type Technology = {
  name: string;
  icon: React.ReactNode | string;
  type: TechType;
};

export type TechType = 
  'language' | 
  'frontend' | 
  'backend' | 
  'database' | 
  'cloud' | 
  'data' | 
  'design' | 
  'ai';

// Define technologies with their categories
export const technologies: Technology[] = [
  // Programming Languages
  { name: 'JavaScript', icon: <FaJs />, type: 'language' },
  { name: 'TypeScript', icon: <SiTypescript />, type: 'language' },
  { name: 'Python', icon: <FaPython />, type: 'language' },
  { name: 'C#', icon: <SiC />, type: 'language' },
  { name: 'Rust', icon: <SiRust />, type: 'language' },
  
  // Frontend
  { name: 'React', icon: <FaReact />, type: 'frontend' },
  { name: 'Next.JS', icon: <SiNextdotjs />, type: 'frontend' },
  { name: 'HTML', icon: <SiHtml5 />, type: 'frontend' },
  { name: 'CSS', icon: <SiCss3 />, type: 'frontend' },
  
  // Backend
  { name: 'Node.JS', icon: <FaNodeJs />, type: 'backend' },
  
  // Databases
  { name: 'MongoDB', icon: <SiMongodb />, type: 'database' },
  { name: 'MySQL', icon: <SiMysql />, type: 'database' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, type: 'database' },
  
  // Cloud & DevOps
  { name: 'AWS', icon: <LiaAws />, type: 'cloud' },
  { name: 'Microsoft Azure', icon: <VscAzure />, type: 'cloud' },
  { name: 'Git', icon: <FaGitAlt />, type: 'cloud' },
  { name: 'GitHub', icon: <FaGithub />, type: 'cloud' },
  
  // Data Analytics & Visualization
  { name: 'R', icon: <FaRProject />, type: 'data' },
  { name: 'MATLAB', icon: <FaChartBar />, type: 'data' },
  { name: 'Advanced Excel', icon: <PiMicrosoftExcelLogo />, type: 'data' },
  { name: 'SPSS', icon: <FaTable />, type: 'data' },
  { name: 'Tableau', icon: <SiTableau />, type: 'data' },
  
  // Design & Media
  { name: 'Photoshop', icon: <SiAdobephotoshop />, type: 'design' },
  { name: 'Illustrator', icon: <SiAdobeillustrator />, type: 'design' },
  { name: 'Premier Pro', icon: <SiAdobepremierepro />, type: 'design' },
  { name: 'After Effects', icon: <SiAdobeaftereffects />, type: 'design' },
  { name: 'DaVinci Resolve', icon: <SiDavinciresolve />, type: 'design' },
  
  // AI
  { name: 'Hugging Face', icon: <SiHuggingface />, type: 'ai' },
  { name: 'OpenAI API', icon: <SiOpenai />, type: 'ai' },
  { name: 'Anthropic API', icon: <SiAnthropic />, type: 'ai' },
  { name: 'DeepSeek', icon: <GiSpermWhale />, type: 'ai' },
];

// Map of types to their display names
export const typeToName: Record<TechType, string> = {
  language: 'Programming Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Databases',
  cloud: 'Cloud & DevOps',
  data: 'Data Science',
  design: 'Design & Media',
  ai: 'AI & Machine Learning'
};

// Map of types to their legend colors
export const typeToColor: Record<TechType, string> = {
  language: 'bg-gradient-to-r from-indigo-600 to-blue-600',
  frontend: 'bg-gradient-to-r from-teal-500 to-emerald-600',
  backend: 'bg-gradient-to-r from-purple-600 to-fuchsia-500',
  database: 'bg-gradient-to-r from-amber-500 to-orange-600',
  cloud: 'bg-gradient-to-r from-sky-500 to-blue-500',
  data: 'bg-gradient-to-r from-lime-500 to-green-600',
  design: 'bg-gradient-to-r from-pink-500 to-rose-600',
  ai: 'bg-gradient-to-r from-violet-500 to-purple-700'
};

// Get appropriate color based on technology type
export const getTypeColor = (type: TechType): string => {
  switch (type) {
    case 'language':
      return 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white';
    case 'frontend':
      return 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white';
    case 'backend':
      return 'bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white';
    case 'database':
      return 'bg-gradient-to-r from-amber-500 to-orange-600 text-white';
    case 'cloud':
      return 'bg-gradient-to-r from-sky-500 to-blue-500 text-white';
    case 'data':
      return 'bg-gradient-to-r from-lime-500 to-green-600 text-white';
    case 'design':
      return 'bg-gradient-to-r from-pink-500 to-rose-600 text-white';
    case 'ai':
      return 'bg-gradient-to-r from-violet-500 to-purple-700 text-white';
    default:
      return 'bg-gray-600 text-white';
  }
};

// Function to get glow shadow color based on tech type
export const getGlowColor = (type: TechType): string => {
  switch(type) {
    case 'language':
      return '0 0 12px 2px rgba(79, 70, 229, 0.6)'; // Indigo glow
    case 'frontend':
      return '0 0 12px 2px rgba(20, 184, 166, 0.6)'; // Teal glow
    case 'backend':
      return '0 0 12px 2px rgba(147, 51, 234, 0.6)'; // Purple glow
    case 'database':
      return '0 0 12px 2px rgba(245, 158, 11, 0.6)'; // Amber glow
    case 'cloud':
      return '0 0 12px 2px rgba(14, 165, 233, 0.6)'; // Sky glow
    case 'data':
      return '0 0 12px 2px rgba(132, 204, 22, 0.6)'; // Lime glow
    case 'design':
      return '0 0 12px 2px rgba(236, 72, 153, 0.6)'; // Pink glow
    case 'ai':
      return '0 0 12px 2px rgba(139, 92, 246, 0.6)'; // Violet glow
    default:
      return '0 0 12px 2px rgba(255, 255, 255, 0.4)'; // Default white glow
  }
};

// Map of job titles to relevant technologies
export const jobTitleToTech: Record<string, string[]> = {
  "Strategy Director": ['JavaScript', 'TypeScript', 'React', 'Node.JS', 'MongoDB', 'Git', 'GitHub', 'Tableau', 'Advanced Excel'],
  "VP of Product": ['JavaScript', 'TypeScript', 'React', 'Node.JS', 'MongoDB', 'Git', 'GitHub', 'Next.JS', 'Tailwind CSS'],
  "Innovation Lead": ['JavaScript', 'TypeScript', 'Python', 'React', 'Vue.JS', 'Next.JS', 'Node.JS', 'MongoDB', 'MySQL', 'AWS', 'Git', 'GitHub', 'OpenAI API', 'Hugging Face'],
  "Research Director": ['JavaScript', 'Python', 'R', 'MATLAB', 'SPSS', 'Tableau', 'Power BI', 'MongoDB', 'MySQL', 'Advanced Excel'],
  "VP of Marketing": ['WordPress', 'Elementor', 'Photoshop', 'Illustrator', 'Premier Pro', 'PowerPoint'],
  "Insights Director": ['JavaScript', 'Python', 'R', 'SQL', 'Tableau', 'Power BI', 'MongoDB', 'MySQL'],
  "Head of Operations": ['JavaScript', 'TypeScript', 'React', 'Node.JS', 'MongoDB', 'Git', 'GitHub', 'Advanced Excel', 'Tableau', 'AI Integration'],
  "Chief of Staff": ['Advanced Excel', 'PowerPoint']
};