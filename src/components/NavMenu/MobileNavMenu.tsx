"use client";
/* eslint-disable */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function MobileNavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Navigation links - updated to match the desktop navigation
  const navLinks = [
    { name: 'Home', href: '#top', isEmail: false },
    { name: 'Experience', href: '#experience', isEmail: false },
    { name: 'Projects', href: '#projects', isEmail: false },
    { name: 'Skills', href: '#skills', isEmail: false },
    { name: 'Tech Stack', href: '#tech-stack', isEmail: false },
    { name: 'Contact', href: 'mailto:artem.ceshire@gmail.com', isEmail: true }
  ];

  // Handle click outside to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Listen for custom events to hide/show the navigation
  useEffect(() => {
    // Function to handle the project modal state changes
    const handleProjectModalStateChange = (event: CustomEvent) => {
      const isModalOpen = event.detail.isOpen;
      
      // If project modal is open, close and hide the nav
      if (isModalOpen) {
        setIsOpen(false);
      }
    };

    // Add event listener for custom events
    document.addEventListener('projectModalStateChange', handleProjectModalStateChange as EventListener);
    
    // Cleanup
    return () => {
      document.removeEventListener('projectModalStateChange', handleProjectModalStateChange as EventListener);
    };
  }, []);

  // Close menu and handle navigation based on link type
  const handleNavigation = (href: string, isEmail: boolean) => {
    setIsOpen(false);
    
    // If it's an email link, the browser will handle it natively
    if (isEmail) {
      return; // The default link behavior will open email client
    }
    
    // Handle top of page specially
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Scroll to the section
    const element = document.querySelector(href);
    if (element) {
      // Small delay to allow menu to close first
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-4 right-4 z-50" id="mobile-nav">
      {/* Mobile menu button with enhanced animation */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`p-3 rounded-full text-white transition-all duration-300 border border-purple-500/30 backdrop-blur-sm ${
          isOpen ? 'bg-gray-900/50' : 'bg-gray-900/70 hover:bg-gray-800/90'
        }`}
        aria-label="Toggle navigation menu"
        style={{
          boxShadow: isOpen ? '0 0 15px rgba(166, 79, 249, 0.4)' : 'none'
        }}
      >
        {/* Simplify to ensure consistent button behavior */}
        {isOpen ? (
          <FaTimes size={20} />
        ) : (
          <FaBars size={20} />
        )}
      </button>
      
      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 bg-gray-900/80 border border-purple-500/30 rounded-md shadow-lg backdrop-blur-md overflow-hidden w-48"
          >
            <div className="p-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    // Only prevent default for non-email links
                    if (!link.isEmail) {
                      e.preventDefault();
                    }
                    handleNavigation(link.href, link.isEmail);
                  }}
                  className="block py-2.5 px-4 text-white hover:bg-purple-900/30 rounded-md transition-colors font-medium text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
