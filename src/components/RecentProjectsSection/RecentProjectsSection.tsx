/* eslint-disable */
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { IoIosArrowUp } from 'react-icons/io';
import projectsData, { Project } from '@/data/projects';

export default function RecentProjectsSection() {
  const [expanded, setExpanded] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Filter projects by featured status
  const featuredProjects = projectsData.filter(project => project.featured);

  // Function to open project details modal
  const openProjectDetails = (project: Project) => {
    setActiveProject(project);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  // Function to close project details modal
  const closeProjectDetails = () => {
    setActiveProject(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  // Handler for toggling expanded view
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Calculate which projects to display based on expanded state
  const displayedProjects = expanded ? projectsData : featuredProjects;

  return (
    <section className="py-8 overflow-visible">
      {/* Add global styles for description links with improved hover effect and blue gradient */}
      <style jsx global>{`
        .description-content a {
          color: #3b82f6; /* Blue color instead of purple */
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
          border-bottom: 2px solid transparent;
          background-image: linear-gradient(90deg, #3b82f6, #60a5fa); /* Blue gradient */
          background-size: 100% 2px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          padding-bottom: 1px;
        }
        
        .description-content a:hover {
          color: #60a5fa; /* Lighter blue on hover */
          border-bottom-color: transparent;
        }
      `}</style>

      <div className="container mx-auto px-4 max-w-5xl overflow-visible">
        <div className="rounded-md border border-white overflow-visible">
          <div className="flex justify-between items-center bg-gray-800/50 border-b border-white">
            <h2 className="text-3xl font-bold py-4 px-6 text-white">
              Recent Projects
            </h2>
            {/* View more/less button */}
            <button
              onClick={toggleExpanded}
              className="mr-6 flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all duration-300"
            >
              <span>{expanded ? 'Show Less' : 'View All'}</span>
              <motion.div
                animate={{ rotate: expanded ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <IoIosArrowUp className="h-5 w-5" />
              </motion.div>
            </button>
          </div>

          <div className="p-6 relative overflow-visible">
            {/* Vertical line with extended bottom */}
            <div
              className="absolute w-0.5 bg-white"
              style={{
                left: "36px",
                top: "-1px",
                bottom: "-65px", // Changed from 0 to -65px to extend beyond container
                zIndex: "1"
              }}
            ></div>

            {/* Projects grid with animation */}
            <div className="pl-20">
              <AnimatePresence>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={false}
                  animate={{ height: 'auto' }}
                >
                  {displayedProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="bg-gray-800/30 rounded-md overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 flex flex-col h-full"
                      initial={expanded ? { opacity: 0, y: 20 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {/* Project preview image without border - clickable to open details */}
                      <div className="relative w-full overflow-hidden p-3 pt-3 cursor-pointer" onClick={() => openProjectDetails(project)}>
                        <div className="h-44 relative w-full overflow-hidden rounded-md">
                          <Image
                            src={project.previewImage}
                            alt={project.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            quality={90}
                          />
                        </div>
                      </div>

                      {/* Project details - using flex-col and flex-grow to ensure consistent button positioning */}
                      <div className="px-5 pb-5 flex flex-col flex-grow">
                        {/* Title with gradient styling matching job titles */}
                        <h3
                          className="text-xl font-bold mb-2"
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

                        {/* Full short description - no line clamping */}
                        <p className="text-gray-300 mb-4 flex-grow">{project.shortDescription}</p>

                        {/* Fixed height container for tech tags to ensure consistent spacing */}
                        <div className="mb-4 min-h-[32px]">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 3).map((tech, idx) => (
                              <span
                                key={`${project.id}-tech-${idx}`}
                                className={`px-3 py-1 text-xs rounded-full text-white ${tech.color}`}
                              >
                                {tech.name}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="px-2 py-1 text-xs rounded-full bg-gray-700 text-white">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Learn more button - with simpler, elegant animation */}
                        <button
                          onClick={() => openProjectDetails(project)}
                          className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-blue-600 text-white transition-all duration-300 mt-auto hover:shadow-lg hover:shadow-indigo-500/20 hover:translate-y-[-1px] active:translate-y-[1px]"
                        >
                          Learn More
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Project details modal - improved positioning to center in viewport */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/95 flex items-center justify-center"
            onClick={closeProjectDetails}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="relative bg-gradient-to-b from-gray-900 to-black max-w-4xl w-full mx-4 rounded-lg overflow-hidden"
              style={{ maxHeight: '90vh' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Scrollable content container */}
              <div className="max-h-[90vh] overflow-y-auto">
                {/* Close button - improved styling */}
                <button
                  className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white shadow-lg border border-white/20 active:scale-95 transition-all hover:bg-black/70"
                  onClick={closeProjectDetails}
                >
                  <FaTimes size={20} />
                </button>

                {/* Project image */}
                <div className="h-64 relative w-full overflow-hidden">
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

                {/* Project content with improved layout */}
                <div className="px-6 py-6 relative z-10">
                  {/* Title section with proper background and styling */}
                  <div className="mb-6 pb-6 border-b border-gray-800">
                    <h2
                      className="text-3xl font-bold"
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
                    <h3 className="text-sm uppercase text-gray-500 font-medium mb-2">Overview</h3>
                    <p className="text-base text-gray-300 font-light leading-relaxed mb-4">
                      {activeProject.shortDescription}
                    </p>

                    {/* Full description with improved styling */}
                    <div className="text-gray-300 space-y-4 project-description">
                      {activeProject.fullDescriptionHtml ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: activeProject.fullDescriptionHtml }}
                          className="description-content text-sm font-light leading-relaxed"
                        />
                      ) : (
                        activeProject.fullDescription.split('\n\n').map((paragraph, idx) => (
                          <p key={`para-${idx}`} className="text-sm font-light leading-relaxed">
                            {paragraph}
                          </p>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Project links without a section title */}
                  <div className="flex gap-4">
                    {activeProject.githubUrl && (
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-gray-800/80 text-white hover:bg-gray-700 transition-all duration-300 active:opacity-90 shadow-lg border border-gray-700"
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
                        className="flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 transition-all duration-300 active:opacity-90 shadow-lg"
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