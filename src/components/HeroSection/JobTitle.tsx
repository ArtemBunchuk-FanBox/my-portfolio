/* eslint-disable */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaThumbtack } from 'react-icons/fa';
import { useJobTitle } from '../../context/JobTitleContext';

export default function JobTitle() {
  const {
    displayedText,
    titleIndex,
    titleHovered,
    titlePinned,
    hoveredItemIndex,
    jobTitles,
    handleTitleSelect,
    toggleTitlePin,
    setTitleHovered,
    setHoveredItemIndex
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
  
  // Handle title hover
  const handleTitleHover = () => {
    setTitleHovered(true);
  };

  return (
    <div className="mb-4 h-12 relative select-none">
      <div className="font-bold text-3xl md:text-5xl relative">
        {/* Hover area */}
        <div 
          className="absolute top-0 bottom-0 left-0 flex items-center"
          style={{ 
            width: "calc(65% )",
            zIndex: 10
          }}
          onMouseEnter={handleTitleHover}
        >
          {/* Invisible area for text only with no events */}
          <div className="w-full h-full"></div>
        </div>
        
        {/* Pin button */}
        <motion.button
          className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer z-30"
          style={{ right: "18rem" }}
          onClick={toggleTitlePin}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          title={titlePinned ? "Unpin title" : "Pin this title"}
          onMouseEnter={handleTitleHover}
        >
          <FaThumbtack 
            size={16} 
            className={`transition-all duration-300 ${titlePinned ? "text-yellow-400 rotate-0" : "text-gray-500 rotate-45"}`}
          />
        </motion.button>
        
        {/* Title text */}
        <span style={{
          ...titleGradient,
          textShadow: titlePinned 
            ? '0 0 12px rgba(166, 79, 249, 0.5), 0 0 4px rgba(130, 38, 227, 0.4)' 
            : '0 0 8px rgba(166, 79, 249, 0.3)'
        }}>
          {displayedText}
          {!titleHovered && !titlePinned && (
            <motion.span 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block"
            >
              |
            </motion.span>
          )}
        </span>
      
        {/* Create an overlay area */}
        {titleHovered && (
          <div 
            className="fixed inset-0 z-20"
            onMouseMove={(e) => {
              // Only hide menu when cursor is far from title area and menu
              const menu = document.getElementById('job-title-menu');
              const title = document.getElementById('job-title-area');
              
              if (menu && title) {
                const menuRect = menu.getBoundingClientRect();
                const titleRect = title.getBoundingClientRect();
                
                // Check if cursor is inside menu or title area with some margin
                const isNearMenu = 
                  e.clientX >= menuRect.left - 20 && 
                  e.clientX <= menuRect.right + 20 && 
                  e.clientY >= menuRect.top - 20 && 
                  e.clientY <= menuRect.bottom + 20;
                  
                const isNearTitle = 
                  e.clientX >= titleRect.left - 20 && 
                  e.clientX <= titleRect.right + 20 && 
                  e.clientY >= titleRect.top - 20 && 
                  e.clientY <= titleRect.bottom + 20;
                
                // Only close if cursor is far from both menu and title
                if (!isNearMenu && !isNearTitle) {
                  setTitleHovered(false);
                }
              }
            }}
            onClick={(e) => {
              // Close menu when clicking anywhere else on the page
              const menu = document.getElementById('job-title-menu');
              if (menu && !menu.contains(e.target as Node)) {
                setTitleHovered(false);
              }
            }}
          />
        )}
        
        {/* Reference ID for interaction detection */}
        <div 
          id="job-title-area" 
          className="absolute inset-0"
          style={{ pointerEvents: 'none' }}
        />
        
        {/* Dropdown menu for job titles */}
        <AnimatePresence>
          {titleHovered && (
            <motion.div 
              id="job-title-menu"
              className="absolute left-0 mt-2 w-72 bg-gray-900/95 border border-gray-700 rounded-md shadow-xl z-30"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setTitleHovered(true)}
            >
              <div className="py-1 px-1">
                {jobTitles.map((title, index) => (
                  <motion.div 
                    key={index}
                    className={`px-3 py-2 rounded-md text-base md:text-lg cursor-pointer flex justify-between items-center ${
                      index === titleIndex ? 'bg-gray-700/10' : 'hover:bg-gray-800'
                    }`}
                    onClick={() => {
                      handleTitleSelect(index);
                    }}
                    onMouseEnter={() => setHoveredItemIndex(index)}
                    onMouseLeave={() => setHoveredItemIndex(null)}
                    whileHover={{ 
                      x: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <span style={{
                      ...titleGradient,
                      opacity: index === titleIndex ? 1 : 0.8
                    }}>
                      {title}
                    </span>
                    
                    {/* Show pin icon only when this is the current title or the item is hovered */}
                    {(index === titleIndex || hoveredItemIndex === index) && (
                      <motion.div
                        className="ml-2 p-1 hover:bg-gray-600"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering parent click
                          if (index === titleIndex) {
                            // Toggle pin state if this is the current title
                            toggleTitlePin();
                          } else {
                            // Select and pin if this is a different title
                            handleTitleSelect(index);
                            toggleTitlePin();
                          }
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title={index === titleIndex && titlePinned ? "Unpin this title" : "Pin this title"}
                      >
                        <FaThumbtack 
                          size={12} 
                          className={`transition-all duration-300 ${
                            index === titleIndex && titlePinned 
                              ? "text-yellow-400 rotate-0" 
                              : "text-gray-400 rotate-45"
                          }`}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
