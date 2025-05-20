"use client";

import { useState, useEffect } from 'react';

type NavItem = {
  id: string;
  label: string;
  isEmail?: boolean;
  email?: string;
};

export default function NavMenu() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  // Navigation items
  const navItems: NavItem[] = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'contact', label: 'Contact', isEmail: true, email: 'artem.ceshire@gmail.com' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click on navigation item
  const handleNavClick = (item: NavItem) => {
    if (item.isEmail && item.email) {
      // Open email client if it's the contact button
      window.location.href = `mailto:${item.email}`;
    } else {
      // Scroll to section for other buttons
      const section = document.getElementById(item.id);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="py-6 max-w-5xl mx-auto px-4">
        <div className="flex justify-center">
          <div 
            className={`bg-gray-900/60 rounded-full p-1.5 border border-purple-500/30 backdrop-blur-sm transition-opacity duration-500 ${
              scrolled && !hoveredItem ? 'opacity-40' : 'opacity-100'
            }`}
          >
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`px-6 py-3 text-white font-medium text-lg rounded-full transition-all duration-200 whitespace-nowrap
                    ${hoveredItem === item.id ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80' : 'bg-transparent'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}