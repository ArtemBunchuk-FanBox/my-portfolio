"use client";
/* eslint-disable */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaThumbtack } from 'react-icons/fa';
import { RiUserFill } from 'react-icons/ri';
import { useJobTitle } from '../../context/JobTitleContext';

export default function MobileNavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [textScale, setTextScale] = useState(1);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const [hideNavigation, setHideNavigation] = useState(false);
  
  // Use the complete job title context - adding back the animation-related properties
  const { 
    titleIndex,
    jobTitles,
    handleTitleSelect,
    titlePinned,
    toggleTitlePin,
    isTyping,
    displayedText,
    highlightIntensity
  } = useJobTitle();

  // Get the current title from the index
  const currentTitle = jobTitles[titleIndex];

  // Navigation links with updated formatting
  const navLinks = [
    { name: 'Home', href: '#top', id: 'top', isEmail: false },
    { name: 'Experience', href: '#experience', id: 'experience', isEmail: false },
    { name: 'Projects', href: '#projects', id: 'projects', isEmail: false },
    { name: 'Skills', href: '#skills', id: 'skills', isEmail: false },
    { name: 'Tech Stack', href: '#tech-stack', id: 'tech-stack', isEmail: false },
    { name: 'Contact', href: '#contact', id: 'contact', isEmail: false }
  ];

  // Enhanced handle click outside to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      
      // Close the role dropdown too when clicking outside
      if (roleDropdownOpen) {
        const roleDropdown = document.getElementById('mobile-role-dropdown');
        const roleButton = document.querySelector('.role-dropdown-button');
        
        if (roleDropdown && 
            roleButton && 
            !(roleDropdown.contains(event.target as Node) || 
              roleButton.contains(event.target as Node))) {
          setRoleDropdownOpen(false);
        }
      }
    }

    // Add the click event listener to the document
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [roleDropdownOpen]);

  // Show role selector after scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show role selector after scrolling past hero section
      const heroHeight = window.innerHeight * 0.3;
      setShowRoleSelector(scrollPosition > heroHeight);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced text scaling with dynamic width calculation
  useEffect(() => {
    const calculateIdealTextScale = () => {
      if (!titleContainerRef.current) return;
      
      const container = titleContainerRef.current;
      const containerWidth = container.clientWidth;
      
      // Create a temporary span to measure text width
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'nowrap';
      tempSpan.style.fontSize = '15px'; // Increased from 14px to 15px
      tempSpan.style.fontWeight = '500'; 
      tempSpan.innerText = currentTitle;
      
      document.body.appendChild(tempSpan);
      const textWidth = tempSpan.getBoundingClientRect().width;
      document.body.removeChild(tempSpan);
      
      // Calculate scale - leave some padding on both sides
      const availableWidth = containerWidth - 12; // Increased padding from 8 to 12
      
      if (textWidth > availableWidth) {
        const newScale = availableWidth / textWidth;
        setTextScale(Math.max(newScale, 0.7)); // Increased min scale from 0.65 to 0.7
      } else {
        setTextScale(1);
      }
    };
    
    // Calculate on mount and when title changes
    calculateIdealTextScale();
    
    // Also recalculate on window resize
    const handleResize = () => calculateIdealTextScale();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentTitle, displayedText]);

  // Listen for custom events to hide/show only the navigation menu
  useEffect(() => {
    const handleProjectModalStateChange = (event: CustomEvent) => {
      const isModalOpen = event.detail.isOpen;
      
      if (isModalOpen) {
        setIsOpen(false);
        setRoleDropdownOpen(false);
        setHideNavigation(true);
      } else {
        setHideNavigation(false);
      }
    };

    document.addEventListener('projectModalStateChange', handleProjectModalStateChange as EventListener);
    
    return () => {
      document.removeEventListener('projectModalStateChange', handleProjectModalStateChange as EventListener);
    };
  }, []);

  // Close menu and handle navigation based on link type
  const handleNavigation = (href: string, id: string, isEmail: boolean) => {
    setIsOpen(false);
    
    if (isEmail) {
      return; // Default link behavior will open email client
    }
    
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Update URL to remove hash when going home
      if (window.history && window.history.pushState) {
        window.history.pushState("", document.title, window.location.pathname);
      }
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        // Improved scrolling with better positioning
        const offset = 80; // Adjust offset as needed
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: elementTop,
          behavior: 'smooth'
        });
        
        // Update URL hash without jumping
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', href);
        }
      }, 100);
    }
  };

  // Handle URL hash on initial load for mobile too
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setTimeout(() => {
          const section = document.getElementById(hash);
          if (section) {
            window.scrollTo({
              top: section.offsetTop - 60, // Smaller offset for mobile
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };

    // Handle initial load with hash
    if (window.location.hash) {
      handleHashChange();
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Toggle dropdown when title area is clicked
  const handleTitleAreaClick = () => {
    setRoleDropdownOpen(!roleDropdownOpen);
  };

  // Handle role selection from dropdown
  const selectRole = (role: string) => {
    const index = jobTitles.indexOf(role);
    if (index !== -1) {
      handleTitleSelect(index);
      setRoleDropdownOpen(false);
    }
  };
  
  // Handle pin toggle with specific role - updated with improved logic
  const handlePinToggle = (role: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const index = jobTitles.indexOf(role);
    if (index !== -1) {
      // If selecting a different role
      if (index !== titleIndex) {
        // Select the new role
        handleTitleSelect(index);
        
        // If not already pinned, pin it immediately
        if (!titlePinned) {
          toggleTitlePin();
        }
      } else {
        // For the same role, just toggle the pin
        toggleTitlePin();
      }
      
      setRoleDropdownOpen(false);
    }
  };
  
  // Check if a specific role is the currently pinned one
  const isRolePinned = (role: string) => {
    return titlePinned && role === currentTitle;
  };

  // Handle title area click to toggle dropdown - always works even when pinned
  const handleTitleClick = () => {
    setRoleDropdownOpen(!roleDropdownOpen);
  };

  // Determine if we should show the typing cursor - copied from desktop
  const showCursor = isTyping || (!titlePinned && showRoleSelector);

  return (
    <div className="fixed top-0 left-0 w-full z-[10001]" id="mobile-nav">
      <div className="flex justify-between items-center p-4">
        {/* Title area with improved animations and alignment */}
        <AnimatePresence mode="wait">
          {showRoleSelector && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.19, 1.0, 0.22, 1.0],
                opacity: { duration: 0.4 }
              }}
              className="absolute left-1/2 transform -translate-x-1/2 top-4 w-[60%] max-w-[250px]"
            >
              <div 
                className={`role-dropdown-button flex items-center border rounded-full transition-all duration-500 cursor-pointer h-[42px] ${
                  titlePinned 
                    ? 'bg-gray-900/80 backdrop-blur-sm border-amber-400/50 shadow-[0_0_8px_rgba(251,191,36,0.3)]' 
                    : roleDropdownOpen
                      ? 'bg-gray-900/80 backdrop-blur-sm border-purple-500/50 shadow-[0_0_8px_rgba(139,92,246,0.3)]'
                      : 'bg-gray-900/80 backdrop-blur-sm border-purple-500/30'
                }`}
                onClick={handleTitleAreaClick}
              >
                {/* User icon at the start - with animation */}
                <motion.div 
                  className="w-[42px] h-[42px] flex-shrink-0 flex items-center justify-center rounded-full bg-gray-800/30"
                  whileHover={{ backgroundColor: 'rgba(79, 70, 229, 0.2)' }}
                  transition={{ duration: 0.2 }}
                >
                  <RiUserFill size={16} className="text-gray-300" />
                </motion.div>
                
                {/* Title text with typing animation - larger text */}
                <div 
                  ref={titleContainerRef}
                  className="flex-1 px-2 flex items-center justify-center overflow-hidden"
                >
                  <span 
                    className="text-[15px] font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 whitespace-nowrap text-center"
                    style={{ 
                      transform: `scale(${textScale})`,
                      transformOrigin: 'center',
                      textShadow: highlightIntensity ? `0 0 ${highlightIntensity}px rgba(168, 85, 247, 0.5)` : 'none'
                    }}
                  >
                    {displayedText}
                    {showCursor && (
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
                
                {/* Pin button at the end - with improved animation */}
                <div className="w-[42px] h-[42px] flex-shrink-0 flex items-center justify-center">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTitlePin();
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: titlePinned ? 'rgba(251, 191, 36, 0.3)' : 'rgba(255, 255, 255, 0.15)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      titlePinned 
                        ? 'bg-amber-500/20' 
                        : 'bg-transparent'
                    }`}
                    aria-label={titlePinned ? "Unpin current role" : "Pin current role"}
                  >
                    <FaThumbtack 
                      size={12} 
                      className={`transition-all duration-300 ${
                        titlePinned
                          ? "text-amber-300 rotate-0" 
                          : "text-gray-400 rotate-45"
                      }`}
                    />
                  </motion.button>
                </div>
              </div>
              
              {/* Role Dropdown - with improved animations */}
              <AnimatePresence>
                {roleDropdownOpen && (
                  <motion.div
                    id="mobile-role-dropdown"
                    initial={{ opacity: 0, height: 0, y: -5 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -5 }}
                    transition={{ 
                      duration: 0.3, 
                      ease: "easeInOut",
                      opacity: { duration: 0.2 }
                    }}
                    className="absolute left-0 right-0 mt-2 bg-gray-900/95 border border-purple-500/30 rounded-md shadow-xl overflow-hidden z-10"
                  >
                    <div className="py-1">
                      {jobTitles.map((role) => (
                        <motion.div
                          key={role}
                          className={`flex items-center justify-between hover:bg-purple-900/30 transition-colors ${
                            role === currentTitle ? 'bg-purple-900/20' : ''
                          }`}
                          whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
                          transition={{ duration: 0.15 }}
                        >
                          <button 
                            className={`flex-1 text-left px-3 py-2.5 text-sm ${
                              role === currentTitle ? 'text-purple-300' : 'text-white'
                            }`}
                            onClick={() => selectRole(role)}
                          >
                            {role}
                          </button>
                          
                          {/* Pin button for each role - with improved hover effect */}
                          <div className="w-10 flex-shrink-0 flex items-center justify-center">
                            <motion.button
                              onClick={(e) => handlePinToggle(role, e)}
                              whileHover={{ 
                                scale: 1.1,
                                backgroundColor: isRolePinned(role) 
                                  ? 'rgba(251, 191, 36, 0.3)' 
                                  : 'rgba(255, 255, 255, 0.15)'
                              }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-full transition-colors bg-transparent"
                              aria-label={isRolePinned(role) ? `Unpin ${role}` : `Pin ${role}`}
                            >
                              <FaThumbtack 
                                size={12} 
                                className={`transition-all duration-300 ${
                                  isRolePinned(role)
                                    ? "text-amber-300 rotate-0" 
                                    : "text-gray-400 rotate-45 hover:text-gray-200"
                                }`}
                              />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu button - with same height and alignment - conditionally hidden */}
        {!hideNavigation && (
          <div className="ml-auto">
            <motion.button 
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(139, 92, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full text-white transition-all duration-300 border border-purple-500/30 backdrop-blur-sm ${
                isOpen ? 'bg-gray-900/70' : 'bg-gray-900/60'
              }`}
              aria-label="Toggle navigation menu"
              style={{
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isOpen ? '0 0 15px rgba(166, 79, 249, 0.4)' : 'none'
              }}
            >
              {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </motion.button>
            
            {/* Mobile menu dropdown with ref for outside click detection */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute top-full right-4 mt-2 bg-gray-900/80 border border-purple-500/30 rounded-md shadow-lg backdrop-blur-md overflow-hidden w-48"
                >
                  <div className="p-1">
                    {navLinks.map((link) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => {
                          if (!link.isEmail) {
                            e.preventDefault();
                          }
                          handleNavigation(link.href, link.id, link.isEmail);
                        }}
                        whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
                        transition={{ duration: 0.2 }}
                        className="block py-2.5 px-4 text-white rounded-md transition-colors font-medium text-sm"
                      >
                        {link.name}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
