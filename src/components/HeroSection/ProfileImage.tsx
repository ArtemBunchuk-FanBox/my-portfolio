/* eslint-disable */
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileImageProps {
  profileHovered: boolean;
  setProfileHovered: (value: boolean) => void;
}

export default function ProfileImage({ profileHovered, setProfileHovered }: ProfileImageProps) {
  const [showThugLifeGlasses, setShowThugLifeGlasses] = useState(false);

  return (
    <div className="relative w-40 h-40 md:w-56 md:h-56 z-10 select-none">
      <motion.div 
        className="w-full h-full rounded-full overflow-hidden relative"
        style={{ 
          borderWidth: "3px",
          borderStyle: "solid",
          borderColor: profileHovered ? undefined : "#ffffff"
        }}
        animate={
          profileHovered 
            ? { 
                borderColor: [
                  "#ffffff", "#ffffff", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3", "#ffffff"
                ],
                boxShadow: [
                  "0 0 25px 8px rgba(255,255,255,0.3)", 
                  "0 0 25px 8px rgba(255,255,255,0.3)", 
                  "0 0 25px 8px rgba(255,127,0,0.6)",
                  "0 0 25px 8px rgba(255,255,0,0.6)",
                  "0 0 25px 8px rgba(0,255,0,0.6)",
                  "0 0 25px 8px rgba(0,0,255,0.6)",
                  "0 0 25px 8px rgba(75,0,130,0.6)",
                  "0 0 25px 8px rgba(148,0,211,0.6)",
                  "0 0 25px 8px rgba(255,255,255,0.3)"
                ],
                transition: {
                  borderColor: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "linear",
                    times: [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.85, 1],
                  },
                  boxShadow: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "linear",
                    times: [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.85, 1],
                  }
                }
              }
            : { 
                borderColor: "#ffffff",
                boxShadow: [
                  "0 0 25px 8px rgba(255,255,255,0.3)",
                  "0 0 25px 8px rgba(255,255,255,0)"
                ],
                transition: {
                  borderColor: { duration: 0.5 },
                  boxShadow: { duration: 1 }
                }
              }
        }
        onMouseEnter={() => {
          setShowThugLifeGlasses(true);
          setProfileHovered(true);
        }}
        onMouseLeave={() => {
          setShowThugLifeGlasses(false);
          setProfileHovered(false);
        }}
      >
        {/* Base profile image */}
        <Image 
          src="/images/profile.jpg" 
          alt="Artem Bunchuk" 
          fill 
          className="object-cover" 
        />
        
        {/* Thug Life glasses overlay */}
        <AnimatePresence>
          {showThugLifeGlasses && (
            <motion.div 
              className="absolute"
              style={{
                width: '65%',
                height: 'auto',
                top: '18%',
                left: '11%',
                zIndex: 10,
              }}
              initial={{ 
                y: -50, 
                opacity: 0,
                rotate: -20
              }}
              animate={{ 
                y: 0, 
                opacity: 1,
                rotate: 0,
                transition: { 
                  duration: 1,
                  ease: "easeOut"
                }
              }}
              exit={{
                y: 100,
                opacity: 0,
                rotate: 45,
                transition: {
                  y: { duration: 0.8, ease: "easeIn" },
                  rotate: { duration: 0.8, ease: "easeIn" },
                  opacity: { duration: 0.8, delay: 0.2 }
                }
              }}
            >
              <Image 
                src="/images/thug-life-glasses.png" 
                alt="Thug Life" 
                width={100}
                height={30}
                className="w-full h-auto" 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
