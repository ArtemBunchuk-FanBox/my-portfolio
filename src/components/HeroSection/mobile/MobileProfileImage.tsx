/* eslint-disable */
import Image from 'next/image';
import { motion } from 'framer-motion';

interface MobileProfileImageProps {
  profileHovered: boolean;
  setProfileHovered: (value: boolean) => void;
}

export default function MobileProfileImage({ 
  profileHovered, 
  setProfileHovered 
}: MobileProfileImageProps) {
  // Simplified for mobile - no thug life glasses
  
  return (
    <motion.div 
      className="w-28 h-28 rounded-full overflow-hidden relative border-2 border-white mb-4"
      animate={{ 
        boxShadow: [
          "0 0 15px 3px rgba(255,255,255,0.2)",
          "0 0 10px 2px rgba(255,255,255,0.1)",
          "0 0 15px 3px rgba(255,255,255,0.2)"
        ]
      }}
      transition={{
        repeat: Infinity,
        duration: 3
      }}
      onClick={() => setProfileHovered(!profileHovered)} // Toggle on tap for mobile
    >
      <Image 
        src="/images/profile.jpg" 
        alt="Artem Bunchuk" 
        fill 
        className="object-cover" 
      />
    </motion.div>
  );
}
