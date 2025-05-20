"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type CloudProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  duration: number;
  delay: number;
};

export default function Clouds() {
  const [clouds, setClouds] = useState<CloudProps[]>([]);

  useEffect(() => {
    // Generate random clouds
    const numberOfClouds = 6; // Fewer clouds for night sky
    const newClouds: CloudProps[] = [];
    
    for (let i = 0; i < numberOfClouds; i++) {
      newClouds.push({
        x: Math.random() * 100,
        y: Math.random() * 30 + 5, // Keep clouds higher in the sky
        width: Math.random() * 200 + 100,
        height: Math.random() * 50 + 30,
        opacity: Math.random() * 0.3 + 0.1, // More transparent for night
        duration: Math.random() * 100 + 100, // Reduced from 200+200 to 100+100 for faster movement
        delay: Math.random() * 3,
      });
    }
    
    setClouds(newClouds);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {clouds.map((cloud, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-gray-400 blur-xl"
          style={{
            width: cloud.width,
            height: cloud.height,
            top: `${cloud.y}%`,
            opacity: cloud.opacity,
          }}
          initial={{ left: '-5%' }}
          animate={{ 
            left: '120%',
          }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
