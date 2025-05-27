/* eslint-disable */
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  workExperience, 
  educationExperience,
  Institution
} from '@/data/experience';
import { useJobTitle } from '@/context/JobTitleContext';
import ExperienceTab from './ExperienceTab';
import ExperienceTimeline from './ExperienceTimeline';
import InstitutionModal from './InstitutionModal';

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');
  const [activeInstitution, setActiveInstitution] = useState<Institution | null>(null);
  const [isChangingTab, setIsChangingTab] = useState(false);
  
  // NEW: State for "See More" functionality
  const [showAllWorkExperiences, setShowAllWorkExperiences] = useState(false);
  const [showAllEducationExperiences, setShowAllEducationExperiences] = useState(false);

  // Function to open institution details modal with optional initial role index
  const openInstitutionDetails = (institution: Institution, initialRoleIndex?: number) => {
    setActiveInstitution(institution);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Dispatch custom event to hide navigation
    const event = new CustomEvent('modalStateChange', { 
      detail: { isOpen: true } 
    });
    window.dispatchEvent(event);

    // If an initial role index is provided, set focus to that role after modal opens
    if (initialRoleIndex !== undefined && initialRoleIndex >= 0) {
      setTimeout(() => {
        const roleElement = document.getElementById(`modal-role-${initialRoleIndex}`);
        if (roleElement) {
          roleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add a temporary highlight effect
          roleElement.classList.add('highlight-role');
          setTimeout(() => roleElement.classList.remove('highlight-role'), 1500);
        }
      }, 400);
    }
  };

  // Function to close institution details modal
  const closeInstitutionDetails = () => {
    setActiveInstitution(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
    
    // Dispatch custom event to show navigation again
    const event = new CustomEvent('modalStateChange', { 
      detail: { isOpen: false } 
    });
    window.dispatchEvent(event);
  };

  // Enhanced tab switching with animation
  const handleTabChange = (tab: 'work' | 'education') => {
    if (tab === activeTab) return;
    
    // Store current scroll position
    const scrollPosition = window.scrollY;
    
    // Set changing tab state for other effects
    setIsChangingTab(true);
    
    // Wait for content to animate out, then change tab
    setTimeout(() => {
      setActiveTab(tab);
      
      // Wait for the new content to fully appear, then restore interaction
      setTimeout(() => {
        setIsChangingTab(false);
        
        // Restore scroll position after everything is complete
        setTimeout(() => window.scrollTo(0, scrollPosition), 50);
      }, 400);
    }, 300);
  };

  // Updated: Handle "See More/Less" button click as a toggle
  const handleSeeMoreClick = () => {
    if (activeTab === 'work') {
      // Toggle the state
      setShowAllWorkExperiences(prevState => !prevState);
    } else {
      setShowAllEducationExperiences(true);
    }
  };

  // NEW: Reset "See More" state when tab changes
  useEffect(() => {
    // Reset both states when tab changes to ensure clean state
    if (activeTab === 'work') {
      setShowAllEducationExperiences(false);
    } else {
      setShowAllWorkExperiences(false);
    }
  }, [activeTab]);

  // Get experiences to show - FIXED to ensure only first role is shown
  const getExperiencesToShow = () => {
    const currentExperiences = activeTab === 'work' ? workExperience : educationExperience;
    
    // For education, always show all experiences regardless of state
    if (activeTab === 'education') {
      return currentExperiences;
    }
    
    // For work, respect the showAll state
    const showAll = showAllWorkExperiences;
    
    if (showAll) {
      return currentExperiences; // Show everything for work
    } else {
      // Create a deep copy of the first organization
      if (currentExperiences.length > 0) {
        // Create new object to avoid modifying the original
        const firstOrg = {
          ...currentExperiences[0],
          roles: [{ ...currentExperiences[0].roles[0] }] // Only include first role (as a new object)
        };
        return [firstOrg];
      }
      return [];
    }
  };
  
  const experiencesToShow = getExperiencesToShow();
  const currentExperiences = activeTab === 'work' ? workExperience : educationExperience;
  const showAllCurrent = activeTab === 'work' ? showAllWorkExperiences : showAllEducationExperiences;

  // Calculate total hidden content for button text
  const getTotalHiddenContent = () => {
    if (currentExperiences.length === 0) return { roles: 0, orgs: 0 };
    
    const firstOrg = currentExperiences[0];
    const hiddenRolesInFirstOrg = firstOrg.roles.length - 1; // Remaining roles in first org
    const hiddenOrgs = currentExperiences.length - 1; // Remaining organizations
    
    let totalHiddenRoles = hiddenRolesInFirstOrg;
    for (let i = 1; i < currentExperiences.length; i++) {
      totalHiddenRoles += currentExperiences[i].roles.length;
    }
    
    return { roles: totalHiddenRoles, orgs: hiddenOrgs };
  };

  const hiddenContent = getTotalHiddenContent();

  return (
    <section className="py-8 overflow-visible">
      <div className="container mx-auto px-4 max-w-5xl overflow-visible">
        <div className="rounded-md border border-white overflow-visible">
          <h2 className="text-3xl font-bold py-4 px-6 border-b border-white text-white bg-gray-800/50 select-none">
            Experience
          </h2>
          
          <div className="px-6 pt-6 relative overflow-visible">
            {/* Vertical line */}
            <div 
              className="absolute w-0.5 bg-white" 
              style={{
                left: "36px",
                top: "1px",
                bottom: "-65px",
                zIndex: "0",
                pointerEvents: "none",
                opacity: 1,
              }}
            ></div>
            
            {/* Tab Selector Component */}
            <ExperienceTab 
              activeTab={activeTab} 
              handleTabChange={handleTabChange} 
            />
            
            {/* Timeline Content Component */}
            <ExperienceTimeline
              activeTab={activeTab}
              experiencesToShow={experiencesToShow}
              isChangingTab={isChangingTab}
              openInstitutionDetails={openInstitutionDetails}
              showAllCurrent={showAllCurrent}
              handleSeeMoreClick={handleSeeMoreClick}
              hiddenContent={hiddenContent}
            />
          </div>
        </div>
      </div>

      {/* Institution Modal Component */}
      <InstitutionModal
        activeInstitution={activeInstitution}
        closeInstitutionDetails={closeInstitutionDetails}
        activeTab={activeTab}
      />
      
      <style jsx global>{`
        .highlight-role {
          box-shadow: 0 0 0 2px rgba(166, 79, 249, 0.5);
          background-color: rgba(130, 38, 227, 0.15) !important;
          transition: all 0.5s ease-in-out;
        }
        
        /* Gradual hover effect for role titles */
        .role-title-hover {
          text-shadow: 0 0 0px rgba(166, 79, 249, 0);
          transition: text-shadow 0.5s ease-in-out;
        }
        
        .role-title-hover:hover {
          text-shadow: 0 0 10px rgba(166, 79, 249, 0.5);
        }
        
        .role-title-hover:hover .inline-block {
          opacity: 0.7;
        }
        
        @keyframes roleGlow {
          0% { text-shadow: 0 0 5px rgba(166, 79, 249, 0); }
          50% { text-shadow: 0 0 10px rgba(166, 79, 249, 0.5); }
          100% { text-shadow: 0 0 5px rgba(166, 79, 249, 0); }
        }
        
        /* Add smooth transition for tab content */
        .tab-transition-enter {
          opacity: 0;
          transform: translateY(10px);
        }
        .tab-transition-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 300ms, transform 300ms;
        }
        .tab-transition-exit {
          opacity: 1;
        }
        .tab-transition-exit-active {
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 300ms, transform 300ms;
        }

        /* Prevent logo from appearing behind vertical line during animations */
        .logo-container-circle {
          z-index: 50 !important;
          position: relative;
          background: black;
        }

        /* Ensure elements are properly layered during transitions */
        .experience-item {
          position: relative;
          z-index: 5;
        }

        /* Ensure horizontal lines appear above the content but below the vertical line */
        .horizontal-line {
          z-index: 8 !important;
        }

        /* Ensure logo image is always on top */
        .logo-container-circle img {
          position: relative;
          z-index: 60 !important;
        }

        /* Add specific style for the logo container */
        .logo-image-container {
          z-index: 55 !important;
          position: relative;
        }

        /* Add styles for dropdown behavior */
        .dropdown-container {
          position: relative;
        }

        /* Create an invisible overlap area between button and dropdown */
        .job-title-button::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          right: 0;
          height: 15px;
          z-index: 8;
          pointer-events: none;
        }

        #role-dropdown-menu::before {
          content: '';
          position: absolute;
          top: -15px;
          left: 0;
          right: 0;
          height: 15px;
          z-index: 8;
          pointer-events: auto;
        }
      `}</style>
    </section>
  );
}