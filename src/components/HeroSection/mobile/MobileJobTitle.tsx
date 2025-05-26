/* eslint-disable */
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaThumbtack } from 'react-icons/fa';
import { useJobTitle } from '@/context/JobTitleContext';

export default function MobileJobTitle() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Use the shared JobTitle context
  const {
    jobTitles,
    titleIndex,
    displayedText,
    isTyping,
    titlePinned,
    highlightIntensity,
    handleTitleSelect,
    toggleTitlePin
  } = useJobTitle();
  
  // Apply the purple-blue-crimson gradient to job titles
  const titleGradient = {
    backgroundImage: 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    textShadow: '0 0 8px rgba(166, 79, 249, 0.3)'
  };
  
  // Handle click outside to close the menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && showMenu) {
        setShowMenu(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);
  
  // Select a title and close the menu
  const selectTitle = (index: number) => {
    handleTitleSelect(index);
    setShowMenu(false);
  };
  
  // Handle pin toggle with improved logic for different roles
  const handlePinToggle = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click
    
    // If selecting a different role
    if (index !== titleIndex) {
      // Select the new role
      handleTitleSelect(index);
      
      // If not already pinned, pin it immediately
      if (!titlePinned) {
        toggleTitlePin();
      }
    } else {
      // For the same role, just toggle pin state
      toggleTitlePin();
    }
    
    setShowMenu(false);
  };

  return (
    <div className="relative mb-4">
      {/* Main title display with fixed layout */}
      <div className="flex items-center relative">
        {/* Pin button with motion animation instead of box-like hover */}
        <motion.button
          className="absolute right-8 top-0 transform -translate-y-5 bg-transparent border-none cursor-pointer"
          onClick={toggleTitlePin}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaThumbtack 
            size={16} 
            className={`transition-all duration-300 ${titlePinned ? "text-yellow-400 rotate-0" : "text-gray-500 rotate-45 hover:text-gray-300"}`}
          />
        </motion.button>
        
        {/* Title container with fixed width to prevent shifting */}
        <div className="font-bold text-3xl h-12 flex-1 text-center relative"
          onClick={() => setShowMenu(!showMenu)}>
          <span style={{
            ...titleGradient,
            textShadow: titlePinned 
              ? '0 0 12px rgba(166, 79, 249, 0.5), 0 0 4px rgba(130, 38, 227, 0.4)' 
              : '0 0 8px rgba(166, 79, 249, 0.3)'
          }}>
            {displayedText}
            <span className={`inline-block align-middle ${!titlePinned ? '' : 'opacity-0'}`}>
              {!titlePinned && isTyping && (
                <motion.span 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block"
                  style={{ verticalAlign: 'middle', marginLeft: '1px' }}
                >
                  |
                </motion.span>
              )}
            </span>
          </span>
        </div>
        
        {/* Dropdown menu - mobile optimized */}
        {showMenu && (
          <motion.div 
            ref={menuRef}
            className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-900/95 border border-gray-700 rounded-md shadow-xl z-30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-1 px-1">
              {jobTitles.map((title, index) => (
                <motion.div 
                  key={index}
                  className={`px-3 py-2 rounded-md text-base cursor-pointer flex justify-between items-center ${
                    index === titleIndex ? 'bg-gray-700/60' : 'hover:bg-gray-800'
                  }`}
                  onClick={() => selectTitle(index)}
                  whileTap={{ scale: 0.98 }}
                >
                  <span style={{
                    ...titleGradient,
                    opacity: index === titleIndex ? 1 : 0.8
                  }}>
                    {title}
                  </span>
                  
                  {/* Show pin icon for all items, not just the current index */}
                  <motion.div
                    onClick={(e) => handlePinToggle(index, e)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaThumbtack 
                      size={12} 
                      className={`transition-all duration-300 ${
                        index === titleIndex && titlePinned 
                          ? "text-yellow-400 rotate-0" 
                          : "text-gray-400 rotate-45 hover:text-gray-300"
                      }`}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
