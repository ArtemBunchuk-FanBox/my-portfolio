import React from 'react';

interface MobileExperienceTabProps {
  activeTab: 'work' | 'education';
  handleTabChange: (tab: 'work' | 'education') => void;
}

export default function MobileExperienceTab({
  activeTab,
  handleTabChange
}: MobileExperienceTabProps) {
  return (
    <div className="flex rounded-lg mb-8 overflow-hidden bg-gray-800/80 max-w-xs mx-auto border border-purple-500/60">
      <button
        className={`flex-1 py-3 px-4 font-semibold text-center relative transition-all duration-300 text-white text-base`}
        onClick={(e) => {
          e.preventDefault();
          handleTabChange('work');
        }}
        style={{ 
          background: activeTab === 'work' 
            ? 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)' 
            : 'transparent',
          boxShadow: activeTab === 'work' ? '0 4px 12px rgba(166, 79, 249, 0.4)' : 'none'
        }}
      >
        Work
      </button>
      <button
        className={`flex-1 py-3 px-4 font-semibold text-center relative transition-all duration-300 text-white text-base`}
        onClick={(e) => {
          e.preventDefault();
          handleTabChange('education');
        }}
        style={{ 
          background: activeTab === 'education' 
            ? 'linear-gradient(270deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)' // Right to left gradient
            : 'transparent',
          boxShadow: activeTab === 'education' ? '0 4px 12px rgba(166, 79, 249, 0.4)' : 'none'
        }}
      >
        Education
      </button>
    </div>
  );
}
