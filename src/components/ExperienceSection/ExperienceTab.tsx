import React from 'react';

interface ExperienceTabProps {
  activeTab: 'work' | 'education';
  handleTabChange: (tab: 'work' | 'education') => void;
}

export default function ExperienceTab({ activeTab, handleTabChange }: ExperienceTabProps) {
  return (
    <div className="flex rounded-full mb-9 overflow-hidden bg-gray-800/50 max-w-md mx-auto p-1.5 border border-purple-500/30 select-none">
      <button
        className={`flex-1 py-3 px-6 font-medium text-center relative transition-all duration-300 text-white rounded-full select-none`}
        onClick={(e) => {
          e.preventDefault();
          handleTabChange('work');
        }}
        style={{ 
          background: activeTab === 'work' 
            ? 'linear-gradient(90deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)' 
            : 'transparent',
          boxShadow: activeTab === 'work' ? '0 4px 12px rgba(166, 79, 249, 0.4)' : 'none',
          cursor: 'pointer'
        }}
      >
        Work
      </button>
      <button
        className={`flex-1 py-3 px-6 font-medium text-center relative transition-all duration-300 text-white rounded-full select-none cursor-pointer`}
        onClick={(e) => {
          e.preventDefault();
          handleTabChange('education');
        }}
        style={{ 
          background: activeTab === 'education' 
            ? 'linear-gradient(270deg, #a64ff9 0%, #8226e3 50%, #c0392b 100%)'
            : 'transparent',
          boxShadow: activeTab === 'education' ? '0 4px 12px rgba(166, 79, 249, 0.4)' : 'none',
          cursor: 'pointer'
        }}
      >
        Education
      </button>
    </div>
  );
}
