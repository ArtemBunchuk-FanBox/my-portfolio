/* eslint-disable */
"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type StarProps = {
  size: number;
  delay: number;
  blinkDuration: number;
  isGlowing: boolean;
};

const Star = ({ size, delay, blinkDuration, isGlowing }: StarProps) => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "#fff" : "#666",
      }}
      transition={{
        duration: blinkDuration,
        ease: "easeInOut",
        delay: delay,
      }}
      className="absolute z-20 rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: "#666",
      }}
    />
  );
};

// Simplified glow effect for mobile
const Glow = ({ delay, blinkDuration }: { delay: number; blinkDuration: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: blinkDuration,
        ease: "easeInOut",
        delay: delay,
      }}
      className="absolute left-1/2 -translate-x-1/2 z-10 h-1 w-1 rounded-full bg-blue-500 blur-[1px] shadow-lg shadow-blue-400"
    />
  );
};

export default function MobileStars() {
  const [starData, setStarData] = useState<{
    x: number;
    y: number;
    size: number;
    delay: number;
    isGlowing: boolean;
  }[]>([]);

  // Initialize fewer stars for mobile
  useEffect(() => {
    const totalStars = 80; // Reduced from 200 for mobile
    const newStarData = Array.from({ length: totalStars }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.8 + 0.5, // Same size range
      delay: Math.random() * 0.5,
      isGlowing: false,
    }));
    setStarData(newStarData);
  }, []);

  // Make stars twinkle less frequently
  useEffect(() => {
    const interval = setInterval(() => {
      setStarData(prevStars => {
        const newStars = [...prevStars];
        // Reset all stars to not glowing
        newStars.forEach(star => star.isGlowing = false);
        
        // Make fewer stars glow
        for (let i = 0; i < 3; i++) { // Reduced from 8 to 3
          const randomIndex = Math.floor(Math.random() * newStars.length);
          newStars[randomIndex].isGlowing = true;
        }
        return newStars;
      });
    }, 4000); // Increased from 3000 to 4000ms for less frequent twinkling
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {starData.map((star, index) => (
        <div
          key={index}
          className="relative"
          style={{
            position: "absolute",
            top: `${star.y}%`,
            left: `${star.x}%`,
          }}
        >
          <Star
            size={star.size}
            delay={star.delay}
            blinkDuration={2.5}
            isGlowing={star.isGlowing}
          />
          <AnimatePresence mode="wait">
            {star.isGlowing && (
              <Glow
                delay={star.delay}
                blinkDuration={2.5}
              />
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
