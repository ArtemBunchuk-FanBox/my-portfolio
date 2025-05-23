/* eslint-disable */
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaThumbtack } from 'react-icons/fa';
import { useJobTitle } from '@/context/JobTitleContext';

type NavItem = {
  id: string;
  label: string;
  isEmail?: boolean;
  email?: string;
  isHome?: boolean;
};

export default function NavMenu() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  
  // Add state to track text size adjustment
  const [textScale, setTextScale] = useState(1);
  
  // Add timeoutRef for delayed menu close
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Text container ref to measure available space
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  // Use the JobTitle context
  const { 
    jobTitles,
    titleIndex, 
    handleTitleSelect, 
    titlePinned, 
    toggleTitlePin,
    isTyping,
    displayedText,
    highlightIntensity
  } = useJobTitle();
  
  // Get the current role from context
  const currentRole = jobTitles[titleIndex];
  
  // Apply the purple-blue-crimson gradient to job titles - same as JobTitle component
  const titleGradient = {
    backgroundImage: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    textShadow: '0 0 8px rgba(166, 79, 249, 0.3)'
  };

  // Navigation items
  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', isHome: true },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'contact', label: 'Contact', isEmail: true, email: 'artem.ceshire@gmail.com' }
  ];

  // Fix the duplicate handleNavClick function
  const handleNavClick = (item: NavItem) => {
    if (item.isEmail && item.email) {
      window.location.href = `mailto:${item.email}`;
    } else if (item.isHome) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const section = document.getElementById(item.id);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  // Scroll effect for showing the role selector - with improved transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
      
      // Show role selector earlier - after scrolling past hero section
      const heroHeight = window.innerHeight * 0.4; // Much earlier trigger
      
      // Don't immediately set showRoleSelector, set it after a delay
      if (scrollPosition > heroHeight && !showRoleSelector) {
        // Add timeout to delay showing the selector
        setTimeout(() => {
          setShowRoleSelector(true);
        }, 300);
      } else if (scrollPosition <= heroHeight && showRoleSelector) {
        // Add timeout to delay hiding the selector
        setTimeout(() => {
          setShowRoleSelector(false);
        }, 300);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showRoleSelector]);
  
  // Listen for modal state changes
  useEffect(() => {
    const handleModalStateChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ isOpen: boolean }>;
      setModalIsOpen(customEvent.detail.isOpen);
    };
    
    window.addEventListener('modalStateChange', handleModalStateChange as EventListener);
    return () => {
      window.removeEventListener('modalStateChange', handleModalStateChange as EventListener);
    };
  }, []);

  // Calculate text scale based on title length
  useEffect(() => {
    if (textContainerRef.current) {
      // Base calculation on the current title
      const title = currentRole;
      const baseWidth = 130;
      const containerWidth = 150;
      
      // Calculate approximate text width based on characters
      const estTextWidth = title.length * 8;
      
      if (estTextWidth > containerWidth) {
        // Scale down if text is too long
        const newScale = containerWidth / estTextWidth;
        setTextScale(Math.max(newScale, 0.6));
      } else {
        // Reset scale if text is short enough
        setTextScale(1);
      }
    }
  }, [currentRole, displayedText]);

  // Cleanup timeouts on component unmount
  useEffect(() => {
    return () => clearCloseTimeout();
  }, []);

  // Function to clear any pending close timeout
  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  // Modified function to handle navigation item hover
  const handleNavItemHover = (id: string | null) => {
    // Close the role dropdown when hovering on other navigation items
    if (id !== 'role-selector' && roleDropdownOpen) {
      clearCloseTimeout();
      setRoleDropdownOpen(false);
    }
    setHoveredItem(id);
  };
  
  // Enhanced function to handle role selector hover
  const handleRoleSelectorMouseEnter = () => {
    // Clear any pending close timeout
    clearCloseTimeout();
    
    // Open menu and set hover state
    setHoveredItem('role-selector');
    setRoleDropdownOpen(true);
  };

  // Enhanced function to handle role selector mouse leave with delay
  const handleRoleSelectorMouseLeave = (e: React.MouseEvent) => {
    // Check if cursor might be moving to the dropdown
    const dropdown = document.getElementById('role-dropdown-menu');
    if (dropdown) {
      const rect = dropdown.getBoundingClientRect();
      
      const isMovingTowardDropdown = e.clientY < rect.top && 
                                    e.clientX >= rect.left - 20 && 
                                    e.clientX <= rect.right + 20;
      
      if (isMovingTowardDropdown) {
        return;
      }
    }
    
    // Set a delayed timeout to close the menu
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
      setRoleDropdownOpen(false);
    }, 100);
  };

  // Enhanced function for dropdown mouse enter
  const handleDropdownMouseEnter = () => {
    clearCloseTimeout();
    setRoleDropdownOpen(true);
  };

  // Enhanced function for dropdown mouse leave with delay
  const handleDropdownMouseLeave = (e: React.MouseEvent) => {
    const button = document.querySelector('.role-selector-button');
    if (button) {
      const rect = button.getBoundingClientRect();
      const isMovingToButton = e.clientY >= rect.top - 20 && 
                              e.clientY <= rect.bottom + 20 &&
                              e.clientX >= rect.left - 20 && 
                              e.clientX <= rect.right + 20;
      
      if (isMovingToButton) {
        return;
      }
    }
    
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
      setRoleDropdownOpen(false);
    }, 150);
  };

  // Handle role selection from dropdown
  const selectRole = (index: number) => {
    handleTitleSelect(index);
    setRoleDropdownOpen(false);
    setHoveredItem(null);
  };

  // Also update the pin toggle function
  const handlePinToggleAndSelect = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    selectRole(index);
    toggleTitlePin();
    setHoveredItem(null);
  };

  // Split handlers for role selector
  const handleRoleSelectorClick = () => {
    // Normal click behavior - always opens the dropdown
    setRoleDropdownOpen(!roleDropdownOpen);
  };
  
  // Handle pin button click
  const handlePinButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown toggle
    toggleTitlePin();
  };

  // Determine if we should show the typing cursor
  const showCursor = isTyping || (!titlePinned && showRoleSelector);

  // IMPORTANT: Only return null after all hooks have been defined
  if (modalIsOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="py-6 max-w-5xl mx-auto px-4">
        <div className="flex justify-center">
          <div 
            className={`bg-gray-900/60 rounded-full p-1.5 border border-purple-500/30 backdrop-blur-sm transition-opacity duration-500 ${
              scrolled && !hoveredItem && !roleDropdownOpen ? 'opacity-40' : 'opacity-100'
            }`}
          >
            <div className="flex items-center space-x-1">
              {/* Regular Navigation Items - unchanged */}
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  onMouseEnter={() => handleNavItemHover(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`px-6 py-3 text-white font-medium text-lg rounded-full transition-all duration-200 whitespace-nowrap select-none cursor-pointer
                    ${hoveredItem === item.id ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80' : 'bg-transparent'}`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Role Selector - improved transition with larger delay */}
              <AnimatePresence mode="wait">
                {showRoleSelector && (
                  <motion.div 
                    className="relative ml-2 flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.8, width: 0 }}
                    animate={{ opacity: 1, scale: 1, width: '220px' }}
                    exit={{ opacity: 0, scale: 0.8, width: 0 }}
                    transition={{ 
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                    onMouseEnter={handleRoleSelectorMouseEnter}
                    onMouseLeave={handleRoleSelectorMouseLeave}
                  >
                    <div 
                      className={`role-selector-button w-full px-4 py-3 text-white font-medium text-base rounded-full transition-all duration-300 flex items-center justify-between cursor-pointer
                        ${titlePinned 
                          ? 'bg-gradient-to-r from-purple-600/80 to-amber-500/80 border border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]' 
                          : hoveredItem === 'role-selector' || roleDropdownOpen 
                            ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 border-transparent' 
                            : 'bg-transparent border border-white/20'}`}
                    >
                      {/* Text part - clickable to open dropdown with fixed width, scale and increased font size */}
                      <div
                        ref={textContainerRef}
                        className="flex-1 flex items-center cursor-pointer overflow-hidden"
                        onClick={handleRoleSelectorClick}
                        title={titlePinned ? "Click to choose a different role" : "Click to change role"}
                      >
                        <span 
                          className={`truncate flex-1 text-left transition-all duration-200 text-white origin-left transform ${
                            titlePinned ? 'font-semibold' : ''
                          }`}
                          style={{
                            transform: `scale(${textScale})`,
                            transformOrigin: 'left center',
                            ...(hoveredItem === 'role-selector' || roleDropdownOpen || titlePinned
                              ? { opacity: 1 } 
                              : { opacity: 0.8 })
                          }}
                        >
                          {displayedText}
                          {showCursor && !titlePinned && (
                            <motion.span 
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ repeat: Infinity, duration: 0.8 }}
                              className="inline-block"
                            >
                              |
                            </motion.span>
                          )}
                        </span>
                      </div>
                      
                      {/* Pin button - always visible */}
                      <div 
                        className={`ml-2 p-1.5 rounded-full transition-all duration-300 flex-shrink-0 cursor-pointer ${
                          titlePinned ? 'bg-amber-500/20 hover:bg-amber-500/40' : 'hover:bg-white/10'
                        }`}
                        onClick={handlePinButtonClick}
                        title={titlePinned ? "Unpin this role" : "Pin current role"}
                      >
                        <FaThumbtack 
                          size={10} 
                          className={`transition-all duration-300 ${
                            titlePinned 
                              ? "text-amber-300 rotate-0" 
                              : "text-gray-400 rotate-45"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Role Dropdown - fixed hover highlight to extend under the text and pin */}
                    <AnimatePresence>
                      {roleDropdownOpen && (
                        <motion.div
                          id="role-dropdown-menu"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full right-0 mt-2 bg-gray-900/95 border border-purple-500/30 rounded-lg shadow-xl overflow-hidden z-10 cursor-pointer"
                          style={{ width: '220px' }}
                          onMouseEnter={handleDropdownMouseEnter}
                          onMouseLeave={handleDropdownMouseLeave}
                        >
                          {jobTitles.map((role, index) => (
                            <div
                              key={role}
                              className="hover:bg-purple-900/30 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center justify-between w-full px-2">
                                <button
                                  onClick={() => selectRole(index)}
                                  className="flex-1 text-left px-4 py-2.5 text-base text-white hover:text-purple-300 cursor-pointer"
                                >
                                  {role}
                                </button>
                                <button
                                  onClick={(e) => handlePinToggleAndSelect(e, index)}
                                  className="p-2 hover:bg-white/10 rounded mr-1 transition-colors cursor-pointer"
                                  title="Pin this role"
                                >
                                  <FaThumbtack 
                                    size={12} 
                                    className={`transition-all duration-300 ${
                                      index === titleIndex && titlePinned 
                                        ? "text-yellow-400 rotate-0" 
                                        : "text-gray-400 rotate-45"
                                    }`}
                                  />
                                </button>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}