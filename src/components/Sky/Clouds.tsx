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
        duration: Math.random() * 100 + 100, 
        delay: Math.random() * 3 + 0.5, // Added base delay to ensure fade-in effect is visible
      });
    }
    
    setClouds(newClouds);
  }, []);

  const createCloudShape = (width: number, height: number) => {
    // Create a more natural cloud shape with CSS box-shadow
    return {
      boxShadow: `
        ${width * 0.25}px ${height * 0.1}px ${width * 0.1}px rgba(255, 255, 255, 0.1),
        ${-width * 0.2}px ${-height * 0.05}px ${width * 0.15}px rgba(255, 255, 255, 0.1),
        0 ${-height * 0.3}px ${width * 0.2}px rgba(255, 255, 255, 0.15),
        0 ${height * 0.2}px ${width * 0.1}px rgba(255, 255, 255, 0.1)
      `,
      borderRadius: `${width * 0.5}px ${width * 0.4}px ${width * 0.6}px ${width * 0.45}px`,
    };
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {clouds.map((cloud, index) => (
        <motion.div
          key={index}
          className="absolute bg-gray-400 blur-xl"
          style={{
            width: cloud.width,
            height: cloud.height,
            top: `${cloud.y}%`,
            ...createCloudShape(cloud.width, cloud.height),
          }}
          initial={{ left: '-35%', opacity: 0 }}
          animate={{ 
            left: '120%',
            opacity: cloud.opacity
          }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: "linear",
            opacity: { 
              duration: 3,
              delay: cloud.delay,
              ease: "easeIn"
            }
          }}
        />
      ))}
    </div>
  );
}
