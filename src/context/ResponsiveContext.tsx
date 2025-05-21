"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ResponsiveContextProps {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const defaultContext: ResponsiveContextProps = {
  isMobile: false,
  isTablet: false,
  isDesktop: true,
};

const ResponsiveContext = createContext<ResponsiveContextProps>(defaultContext);

export const useResponsive = () => useContext(ResponsiveContext);

export const ResponsiveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    // Set initial values
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ResponsiveContext.Provider value={{ isMobile, isTablet, isDesktop }}>
      {children}
    </ResponsiveContext.Provider>
  );
};
