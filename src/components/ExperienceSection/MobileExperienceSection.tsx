"use client";

import { useState } from 'react';
import { 
  workExperience, 
  educationExperience, 
  Institution 
} from '@/data/experience';
import { useJobTitle } from '@/context/JobTitleContext';
import MobileExperienceTab from './MobileExperienceTab';
import MobileExperienceTimeline from './MobileExperienceTimeline';
import MobileInstitutionModal from './MobileInstitutionModal';

export default function MobileExperienceSection() {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');
  const [activeInstitution, setActiveInstitution] = useState<Institution | null>(null);
  const [isChangingTab, setIsChangingTab] = useState(false);
  
  // NEW: Add state for "See More" functionality
  const [showAllWorkExperiences, setShowAllWorkExperiences] = useState(false);
  const [showAllEducationExperiences, setShowAllEducationExperiences] = useState(false);
  
  // Use the JobTitle context
  const { titleIndex, jobTitles, highlightIntensity, titlePinned } = useJobTitle();
  const currentJobTitle = jobTitles[titleIndex];

  // Function to open institution details modal
  const openInstitutionDetails = (institution: Institution, initialRoleIndex?: number) => {
    setActiveInstitution(institution);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Use projectModalStateChange event instead of direct DOM manipulation
    const event = new CustomEvent('projectModalStateChange', { 
      detail: { isOpen: true } 
    });
    document.dispatchEvent(event);
    
    // If an initial role index is provided, set focus to that role after modal opens
    if (initialRoleIndex !== undefined && initialRoleIndex >= 0) {
      // Increase timeout to ensure modal is fully rendered
      setTimeout(() => {
        const roleElement = document.getElementById(`mobile-modal-role-${initialRoleIndex}`);
        if (roleElement) {
          // First scroll to the element to get it in the viewport
          roleElement.scrollIntoView({ behavior: 'auto' });
          
          // Then apply a more precise scroll position with offset to show from the top
          const scrollContainer = document.querySelector('.overflow-y-auto');
          if (scrollContainer) {
            const modalHeader = 80; // Approximate height of the modal header/image
            const scrollOffset = 20; // Additional offset for better positioning
            const roleTop = roleElement.getBoundingClientRect().top;
            const containerTop = scrollContainer.getBoundingClientRect().top;
            const relativePosition = roleTop - containerTop;
            
            // Calculate the scroll position considering the container's current scroll position
            const targetScroll = scrollContainer.scrollTop + relativePosition - modalHeader - scrollOffset;
            
            // Apply the scroll with smooth behavior
            scrollContainer.scrollTo({
              top: targetScroll,
              behavior: 'smooth'
            });
          }
          
          // Add a temporary highlight effect
          roleElement.classList.add('highlight-role-mobile');
          setTimeout(() => roleElement.classList.remove('highlight-role-mobile'), 1500);
        }
      }, 500);
    }
  };

  // Function to close institution details modal
  const closeInstitutionDetails = () => {
    setActiveInstitution(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
    
    // Use projectModalStateChange event to show navigation again
    const event = new CustomEvent('projectModalStateChange', { 
      detail: { isOpen: false } 
    });
    document.dispatchEvent(event);
  };

  // Enhanced tab switching with animation
  const handleTabChange = (tab: 'work' | 'education') => {
    if (tab === activeTab) return;
    
    // Store current scroll position
    const scrollPosition = window.scrollY;
    
    // Set transitioning state
    setIsChangingTab(true);
    
    // Delay the actual tab change for the animation
    setTimeout(() => {
      setActiveTab(tab);
      setIsChangingTab(false);
      
      // Reset see more state when switching tabs
      if (tab === 'work') {
        setShowAllEducationExperiences(false);
      } else {
        setShowAllWorkExperiences(false);
      }
      
      // Restore scroll position after a slight delay to ensure render is complete
      setTimeout(() => window.scrollTo(0, scrollPosition), 50);
    }, 300);
  };
  
  // NEW: Handle "See More/Less" button click as a toggle
  const handleSeeMoreClick = () => {
    if (activeTab === 'work') {
      setShowAllWorkExperiences(prev => !prev);
    } else {
      setShowAllEducationExperiences(prev => !prev);
    }
  };
  
  // NEW: Get experiences to show based on showAll state
  const getExperiencesToShow = () => {
    const currentExperiences = activeTab === 'work' ? workExperience : educationExperience;
    
    // For education, respect the showAll state as well
    const showAll = activeTab === 'work' 
      ? showAllWorkExperiences 
      : showAllEducationExperiences;
    
    if (showAll) {
      return currentExperiences; // Show everything
    } else {
      // Create a deep copy of the first organization
      if (currentExperiences.length > 0) {
        // Create new object to avoid modifying the original
        const firstOrg = {
          ...currentExperiences[0],
          roles: [{ ...currentExperiences[0].roles[0] }] // Only include first role
        };
        return [firstOrg];
      }
      return [];
    }
  };
  
  const experiencesToShow = getExperiencesToShow();
  const showAllCurrent = activeTab === 'work' ? showAllWorkExperiences : showAllEducationExperiences;
  
  // NEW: Calculate total hidden content for button text
  const getTotalHiddenContent = () => {
    const currentExperiences = activeTab === 'work' ? workExperience : educationExperience;
    
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
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="rounded-md border border-white overflow-visible">
          <h2 className="text-2xl font-bold py-3 px-4 border-b border-white text-white bg-gray-800/50">
            Experience
          </h2>
          
          <div className="px-4 pt-4 relative">
            {/* Tab selector component */}
            <MobileExperienceTab 
              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />
            
            {/* Timeline content component with new props */}
            <MobileExperienceTimeline
              activeTab={activeTab}
              isChangingTab={isChangingTab}
              openInstitutionDetails={openInstitutionDetails}
              currentJobTitle={currentJobTitle}
              highlightIntensity={highlightIntensity}
              titlePinned={titlePinned}
              experiencesToShow={experiencesToShow}
              showAllCurrent={showAllCurrent}
              handleSeeMoreClick={handleSeeMoreClick}
              hiddenContent={hiddenContent}
            />
          </div>
        </div>
      </div>

      {/* Institution details modal component */}
      <MobileInstitutionModal
        activeInstitution={activeInstitution}
        closeInstitutionDetails={closeInstitutionDetails}
        activeTab={activeTab}
        currentJobTitle={currentJobTitle}
        highlightIntensity={highlightIntensity}
        titlePinned={titlePinned}
      />

      {/* Enhanced style tag with transition effects */}
      <style jsx global>{`
        .highlight-role-mobile {
          box-shadow: 0 0 0 2px rgba(166, 79, 249, 0.5);
          background-color: rgba(130, 38, 227, 0.15) !important;
          transition: all 0.5s ease-in-out;
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
      `}</style>
    </section>
  );
}
