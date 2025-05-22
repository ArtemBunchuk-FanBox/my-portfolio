/* eslint-disable */
"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import projectsData, { Project } from '@/data/projects';

export default function MobileRecentProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showingAll, setShowingAll] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right'>('right');
  
  // Use ALL projects in the carousel, not just featured ones
  const carouselProjects = projectsData;
  
  // Only show one project at a time in carousel
  const currentProject = carouselProjects[currentProjectIndex];
  
  // Create refs for all project elements
  const projectRefs = useRef<HTMLDivElement[]>([]);
  
  // Reset refs array when project data changes
  useEffect(() => {
    projectRefs.current = projectRefs.current.slice(0, projectsData.length);
  }, [projectsData]);
  
  // Effect to measure all cards and find the max height after they're rendered
  useEffect(() => {
    // Wait for all cards to be rendered
    setTimeout(() => {
      // Measure all cards
      let maxHeight = 0;
      
      projectRefs.current.forEach(ref => {
        if (ref) {
          const height = ref.offsetHeight;
          if (height > maxHeight) {
            maxHeight = height;
          }
        }
      });
      
      // Set the max height (add some buffer)
      if (maxHeight > 0) {
        setCardHeight(maxHeight + 20); 
      }
    }, 500); // Give enough time for all cards to render
  }, []);

  // Handle modal open/close
  const openProjectDetails = (project: Project) => {
    setActiveProject(project);
    document.body.style.overflow = 'hidden';
    
    // Dispatch custom event to notify the navigation to hide
    document.dispatchEvent(new CustomEvent('projectModalStateChange', { detail: { isOpen: true } }));
    
    // For backward compatibility, also handle the old way
    const navElement = document.getElementById('mobile-nav');
    if (navElement) navElement.style.display = 'none';
  };

  const closeProjectDetails = () => {
    setActiveProject(null);
    document.body.style.overflow = 'auto';
    
    // Dispatch custom event to notify the navigation that modal is closed
    document.dispatchEvent(new CustomEvent('projectModalStateChange', { detail: { isOpen: false } }));
    
    // For backward compatibility, also handle the old way
    const navElement = document.getElementById('mobile-nav');
    if (navElement) navElement.style.display = '';
  };

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
      
      // Dispatch custom event to notify the navigation that modal is closed
      document.dispatchEvent(new CustomEvent('projectModalStateChange', { detail: { isOpen: false } }));
      
      // For backward compatibility, also handle the old way
      const navElement = document.getElementById('mobile-nav');
      if (navElement) navElement.style.display = '';
    };
  }, []);

  // Toggle between showing all projects or just the carousel
  const toggleShowAll = () => {
    setShowingAll(!showingAll);
  };
  
  // Handle swipe in carousel - Fixed to match expected behavior
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        // Swipe right - previous project
        setSwipeDirection('right');
        goToPreviousProject();
      } else {
        // Swipe left - next project
        setSwipeDirection('left');
        goToNextProject();
      }
    }
  };
  
  // Navigate to next project in carousel
  const goToNextProject = () => {
    setSwipeDirection('left');
    setCurrentProjectIndex((prevIndex) => 
      prevIndex === carouselProjects.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Navigate to previous project in carousel
  const goToPreviousProject = () => {
    setSwipeDirection('right');
    setCurrentProjectIndex((prevIndex) => 
      prevIndex === 0 ? carouselProjects.length - 1 : prevIndex - 1
    );
  };

  // FIXED: Variants for animation with correct directional behavior
  const slideVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? 300 : -300,  // When swiping left, new content enters from right; when swiping right, new content enters from left
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? -300 : 300,  // When swiping left, old content exits to left; when swiping right, old content exits to right
      opacity: 0
    })
  };

  return (
    <section className="py-6">
      {/* Add global styles for description links */}
      <style jsx global>{`
        .description-content a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
          border-bottom: 2px solid transparent;
          background-image: linear-gradient(90deg, #3b82f6, #60a5fa);
          background-size: 100% 2px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          padding-bottom: 1px;
        }
        
        .description-content a:hover {
          color: #60a5fa;
          border-bottom-color: transparent;
        }
      `}</style>

      {/* Hidden container for measuring all projects to find the max height */}
      <div className="fixed left-[-9999px] top-[-9999px] invisible">
        {projectsData.map((project, index) => (
          <div
            key={`measure-${project.id}`}
            ref={el => {
              if (el) projectRefs.current[index] = el;
            }}
            className="bg-gray-800/30 rounded-md w-[350px]" // Approximate mobile width
          >
            {/* Project preview image */}
            <div className="relative w-full h-44">
              <div className="absolute inset-0 bg-gray-700" />
            </div>
            
            {/* Project details */}
            <div className="p-4">
              {/* Title */}
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              
              {/* Short description */}
              <div className="mb-3">
                <p className="text-gray-300 text-sm">{project.shortDescription}</p>
              </div>
              
              {/* Technologies */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={`measure-${project.id}-tech-${idx}`}
                      className="px-2 py-0.5 text-xs rounded-full text-white"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Learn more button */}
              <button className="w-full px-4 py-2 rounded-md">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="rounded-md border border-white overflow-hidden">
          <div className="flex justify-between items-center bg-gray-800/50 border-b border-white">
            <h2 className="text-2xl font-bold py-3 px-4 text-white">
              Recent Projects
            </h2>
            {/* Mobile-friendly show all toggle button */}
            <button
              onClick={toggleShowAll}
              className="mr-4 flex items-center justify-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-medium"
            >
              <span>{showingAll ? 'Show Less' : 'View All'}</span>
              <IoIosArrowDown 
                className={`h-3.5 w-3.5 transition-transform duration-300 ${showingAll ? 'rotate-180' : ''}`} 
              />
            </button>
          </div>
          
          <div className="p-4">
            <AnimatePresence mode="wait">
              {!showingAll ? (
                // Carousel view - one project at a time
                <motion.div
                  key="carousel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative"
                >
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.3}
                    onDragEnd={handleDragEnd}
                    className="touch-pan-y"
                  >
                    {/* Use AnimatePresence with custom variants based on swipe direction */}
                    <AnimatePresence mode="popLayout" custom={swipeDirection} initial={false}>
                      <motion.div
                        key={currentProjectIndex}
                        custom={swipeDirection}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ 
                          duration: 0.3,
                          type: "spring",
                          stiffness: 300,
                          damping: 30
                        }}
                        className="bg-gray-800/30 rounded-md overflow-hidden border border-purple-500/20"
                        style={cardHeight ? { minHeight: `${cardHeight}px` } : undefined}
                      >
                        {/* Project preview image */}
                        <div 
                          className="relative w-full h-44 cursor-pointer"
                          onClick={() => openProjectDetails(currentProject)}
                        >
                          <Image
                            src={currentProject.previewImage}
                            alt={currentProject.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            quality={90}
                            priority
                          />
                          {/* Add subtle overlay to indicate interactivity */}
                          <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-all duration-300"></div>
                        </div>
                        
                        {/* Project details - no fixed heights, let content flow naturally */}
                        <div className="p-4 flex flex-col">
                          {/* Title with gradient styling */}
                          <h3 
                            className="text-lg font-bold mb-2"
                            style={{
                              background: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                              color: 'transparent'
                            }}
                          >
                            {currentProject.title}
                          </h3>
                          
                          {/* Short description - no fixed height */}
                          <div className="mb-3">
                            <p className="text-gray-300 text-sm">{currentProject.shortDescription}</p>
                          </div>
                          
                          {/* Technologies - no fixed height */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1.5">
                              {currentProject.technologies.map((tech, idx) => (
                                <span
                                  key={`${currentProject.id}-tech-${idx}`}
                                  className={`px-2 py-0.5 text-xs rounded-full text-white ${tech.color}`}
                                >
                                  {tech.name}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Learn more button */}
                          <button
                            onClick={() => openProjectDetails(currentProject)}
                            className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm active:opacity-90 mt-auto hover:opacity-90 transition-opacity duration-300"
                          >
                            Learn More
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                  
                  {/* Enhanced carousel navigation controls */}
                  <div className="mt-5">
                    <div className="flex justify-center flex-wrap gap-1">
                      {carouselProjects.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            // Set swipe direction based on which dot was clicked
                            setSwipeDirection(index > currentProjectIndex ? 'left' : 'right');
                            setCurrentProjectIndex(index);
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentProjectIndex === index 
                              ? 'bg-purple-500 scale-125' 
                              : 'bg-gray-500'
                          }`}
                          aria-label={`Go to project ${index + 1}`}
                        />
                      ))}
                    </div>
                    
                    {/* Improved swipe hint with larger, more touchable navigation arrows */}
                    <div className="flex items-center justify-center gap-3 mt-3">
                      <button 
                        onClick={goToPreviousProject}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/80 text-white text-lg hover:bg-gray-700/80 active:scale-95 transition-all duration-300"
                        aria-label="Previous project"
                      >
                        ←
                      </button>
                      <p className="text-xs text-center text-gray-400">
                        Swipe to navigate <span className="text-white text-sm ml-1">{currentProjectIndex + 1}/{carouselProjects.length}</span>
                      </p>
                      <button 
                        onClick={goToNextProject}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/80 text-white text-lg hover:bg-gray-700/80 active:scale-95 transition-all duration-300"
                        aria-label="Next project"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // Full list of all projects
                <motion.div
                  key="all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {projectsData.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="bg-gray-800/30 rounded-md overflow-hidden border border-purple-500/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      style={cardHeight ? { minHeight: `${cardHeight}px` } : undefined}
                    >
                      {/* Project preview image */}
                      <div 
                        className="relative w-full h-44 cursor-pointer"
                        onClick={() => openProjectDetails(project)}
                      >
                        <Image
                          src={project.previewImage}
                          alt={project.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          quality={90}
                        />
                        {/* Add subtle overlay to indicate interactivity */}
                        <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-all duration-300"></div>
                      </div>
                      
                      {/* Project details */}
                      <div className="p-4 flex flex-col">
                        {/* Title */}
                        <h3 
                          className="text-lg font-bold mb-2"
                          style={{
                            background: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent'
                          }}
                        >
                          {project.title}
                        </h3>
                        
                        {/* Short description */}
                        <div className="mb-3">
                          <p className="text-gray-300 text-sm">{project.shortDescription}</p>
                        </div>
                        
                        {/* Technologies */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.map((tech, idx) => (
                              <span
                                key={`${project.id}-tech-${idx}`}
                                className={`px-2 py-0.5 text-xs rounded-full text-white ${tech.color}`}
                              >
                                {tech.name}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Learn more button */}
                        <button
                          onClick={() => openProjectDetails(project)}
                          className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm active:opacity-90 mt-auto hover:opacity-90 transition-opacity duration-300"
                        >
                          Learn More
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Project details modal - completely redesigned for better visual appeal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] overflow-y-auto bg-black/95"
            onClick={closeProjectDetails}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="relative bg-gradient-to-b from-gray-900 to-black min-h-screen w-full overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button with better styling and positioning */}
              <button
                className="fixed top-4 right-4 z-[10000] w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white shadow-lg border border-white/20 active:scale-95 transition-all hover:bg-black/70"
                onClick={closeProjectDetails}
              >
                <FaTimes size={20} />
              </button>
              
              {/* Scrollable content container with improved layout */}
              <div className="overflow-y-auto h-full pb-12 pt-4"> {/* Reduced pb-24 to pb-12 */}
                {/* Hero image section without title overlay */}
                <div className="h-56 md:h-64 relative w-full overflow-hidden">
                  <Image
                    src={activeProject.previewImage}
                    alt={activeProject.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    quality={95}
                    priority
                    className="brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
                </div>
                
                {/* Project content with properly positioned title */}
                <div className="px-5 pt-6 pb-6 relative z-10">
                  {/* Title section with proper background and styling */}
                  <div className="mb-6 pb-6 border-b border-gray-800">
                    <h2 
                      className="text-3xl font-bold" // Changed from text-2xl to text-3xl
                      style={{
                        background: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent'
                      }}
                    >
                      {activeProject.title}
                    </h2>
                  </div>
                
                  {/* Technology badges */}
                  <div className="mb-6 pb-6 border-b border-gray-800">
                    <div className="flex flex-wrap gap-2">
                      {activeProject.technologies.map((tech, idx) => (
                        <span
                          key={`modal-tech-${idx}`}
                          className={`px-3 py-1.5 text-xs rounded-full text-white font-medium ${tech.color} shadow-sm`}
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Project description with better typography */}
                  <div className="mb-6 pb-6 border-b border-gray-800">
                    <h3 className="text-base uppercase text-gray-200 font-medium mb-3">Overview</h3>
                    {/* Short description - styled more subtly but distinct */}
                    <div className="mb-5 bg-gray-800/30 border-l-2 border-purple-500/40 pl-4 py-2 pr-3 rounded-r-sm">
                      <p className="text-base text-gray-300 leading-relaxed">
                        {activeProject.shortDescription}
                      </p>
                    </div>
                    
                    {/* Section divider - only show if there's a full description */}
                    {(activeProject.fullDescription || activeProject.fullDescriptionHtml) && (
                      <h3 className="text-base uppercase text-gray-200 font-medium mb-3">Details</h3>
                    )}
                  
                    {/* Full description with improved styling */}
                    <div className="text-gray-300 space-y-4 project-description">
                      <div className="bg-gray-800/30 border-l-2 border-purple-500/40 pl-4 py-2 pr-3 rounded-r-sm">
                        {activeProject.fullDescriptionHtml ? (
                          <div 
                            dangerouslySetInnerHTML={{ __html: activeProject.fullDescriptionHtml }} 
                            className="description-content text-base text-gray-300 leading-relaxed"
                          />
                        ) : (
                          activeProject.fullDescription.split('\n\n').map((paragraph, idx) => (
                            <p key={`para-${idx}`} className="text-base text-gray-300 leading-relaxed">
                              {paragraph}
                            </p>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                
                  {/* Project links without a section title */}
                  <div className="flex flex-col gap-3">
                    {activeProject.githubUrl && (
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-4 py-3.5 rounded-lg bg-gray-800/80 text-white hover:bg-gray-700 transition-all duration-300 active:opacity-90 shadow-lg border border-gray-700"
                      >
                        <FaGithub className="text-lg" />
                        <span className="font-medium">View Source Code</span>
                      </a>
                    )}
                    {/* Only show Live Demo link if it's not the portfolio project */}
                    {activeProject.liveUrl && activeProject.id !== 'this-website' && (
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-4 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 transition-all duration-300 active:opacity-90 shadow-lg"
                      >
                        <FaExternalLinkAlt />
                        <span className="font-medium">View Live Project</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}