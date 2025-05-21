/* eslint-disable */
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaUtensils, FaDownload } from 'react-icons/fa';

interface MobileSocialButtonsProps {
  activeTooltip: string | null;
  setActiveTooltip: (id: string | null) => void;
}

export default function MobileSocialButtons({ 
  activeTooltip, 
  setActiveTooltip 
}: MobileSocialButtonsProps) {
  // Mobile-optimized version with simpler interactions
  
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      {/* Resume button */}
      <motion.a 
        href="/your-resume.pdf" 
        className="bg-gray-800/70 text-white px-3 py-2 text-sm rounded-md flex items-center gap-1"
        whileTap={{ scale: 0.95 }}
      >
        <FaDownload size={14} />
        <span>Resume</span>
      </motion.a>
      
      {/* LinkedIn */}
      <MobileSocialIconButton 
        icon={<FaLinkedin size={18} />} 
        href="https://linkedin.com/in/yourprofile" 
        brandColor="#04a6fa"
      />
      
      {/* GitHub */}
      <MobileSocialIconButton 
        icon={<FaGithub size={18} />} 
        href="https://github.com/yourusername" 
        brandColor="#aa92cd"
      />
      
      {/* Email */}
      <MobileSocialIconButton 
        icon={<FaEnvelope size={18} />} 
        href="mailto:your.email@example.com" 
        brandColor="#EA4335"
      />
      
      {/* Food blog */}
      <MobileSocialIconButton 
        icon={<FaUtensils size={18} />} 
        href="https://your-cooking-blog.com" 
        brandColor="#FF9800"
      />
    </div>
  );
}

// Simplified social button for mobile
function MobileSocialIconButton({ 
  icon, 
  href,
  brandColor
}: { 
  icon: React.ReactNode, 
  href: string,
  brandColor: string
}) {
  return (
    <motion.a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gray-800/70 text-gray-300 p-2.5 rounded-md flex items-center justify-center"
      style={{ width: '38px', height: '38px' }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: `0 0 5px 1px ${brandColor}30`
      }}
    >
      <div className="relative z-10">
        {icon}
      </div>
    </motion.a>
  );
}
