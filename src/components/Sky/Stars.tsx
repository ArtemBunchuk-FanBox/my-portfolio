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
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        opacity: 1,
        background: isGlowing ? "#fff" : "#666",
      }}
      transition={{
        duration: blinkDuration,
        ease: "easeInOut",
        delay: delay,
        opacity: { duration: 2.5, delay } // Slow fade in
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

// Glow effect component with color variations
const Glow = ({ delay, blinkDuration, color }: { delay: number; blinkDuration: number; color: string }) => {
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
      className="absolute left-1/2 -translate-x-1/2 z-10 h-1 w-1 rounded-full blur-[1px] shadow-2xl"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 12px 5px ${color}`,
      }}
    />
  );
};

export default function Stars() {
  const [starData, setStarData] = useState<{
    x: number;
    y: number;
    size: number;
    delay: number;
    isGlowing: boolean;
    color: string;
  }[]>([]);
  
  // Star colors - extracted from the project palette
  const starColors = [
    'rgba(139, 92, 246, 0.4)', // violet with opacity
    'rgba(20, 184, 166, 0.4)', // teal with opacity
    'rgba(6, 182, 212, 0.4)', // cyan with opacity
    'rgba(37, 99, 235, 0.4)', // blue with opacity
    'rgba(5, 150, 105, 0.4)', // emerald with opacity
    'rgba(126, 34, 206, 0.4)', // purple with opacity
  ];

  // Initialize stars on component mount
  useEffect(() => {
    const totalStars = 500; // Increased from 500 to 600 for more density
    const newStarData = Array.from({ length: totalStars }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.2 + 0.6,
      delay: Math.random() * 2, 
      isGlowing: false,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));
    setStarData(newStarData);
  }, []);

  // Make stars twinkle
  useEffect(() => {
    const interval = setInterval(() => {
      setStarData(prevStars => {
        const newStars = [...prevStars];
        // Reset all stars to not glowing
        newStars.forEach(star => star.isGlowing = false);
        
        // Make random stars glow (increased from 15 to 20)
        for (let i = 0; i < 20; i++) {
          const randomIndex = Math.floor(Math.random() * newStars.length);
          newStars[randomIndex].isGlowing = true;
        }
        return newStars;
      });
    }, 3000);
    
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
                color={star.color}
              />
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
