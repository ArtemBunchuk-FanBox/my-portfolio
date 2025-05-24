/* eslint-disable */
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface MobileProfileImageProps {
  profileHovered: boolean;
  setProfileHovered: (value: boolean) => void;
}

export default function MobileProfileImage({ 
  profileHovered, 
  setProfileHovered 
}: MobileProfileImageProps) {
  const [showGlasses, setShowGlasses] = useState(false);
  const [brightEffect, setBrightEffect] = useState(false);

  // Toggle everything on click
  const handleProfileClick = () => {
    setShowGlasses(!showGlasses);
    setProfileHovered(!profileHovered);
    setBrightEffect(!brightEffect);
  };

  return (
    <motion.div 
      className="w-28 h-28 rounded-full overflow-hidden relative border-2 border-white mb-4"
      animate={
        brightEffect
          ? {
              boxShadow: [
                "0 0 18px 5px rgba(255,255,255,0.6)",
                "0 0 18px 5px rgba(255,127,0,0.8)",
                "0 0 18px 5px rgba(255,255,0,0.8)",
                "0 0 18px 5px rgba(0,255,0,0.8)",
                "0 0 18px 5px rgba(0,0,255,0.8)",
                "0 0 18px 5px rgba(75,0,130,0.8)",
                "0 0 18px 5px rgba(148,0,211,0.8)",
                "0 0 18px 5px rgba(255,255,255,0.6)"
              ]
            }
          : {
              boxShadow: [
                "0 0 15px 3px rgba(255,255,255,0.2)",
                "0 0 10px 2px rgba(255,255,255,0.1)",
                "0 0 15px 3px rgba(255,255,255,0.2)"
              ]
            }
      }
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: "linear",
        times: brightEffect ? [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1] : undefined
      }}
      onClick={handleProfileClick}
    >
      <Image 
        src="/images/profile.jpg" 
        alt="Artem Bunchuk" 
        fill 
        className="object-cover" 
      />
      <AnimatePresence>
        {showGlasses && (
          <motion.div
            className="absolute top-5 left-3"
            initial={{ y: -40, opacity: 0, rotate: -20 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 50, opacity: 0, rotate: 20 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/images/thug-life-glasses.png"
              width={70}
              height={32}
              alt="Thug Life Glasses"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
