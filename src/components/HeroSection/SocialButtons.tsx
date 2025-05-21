/* eslint-disable */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaUtensils, FaDownload } from 'react-icons/fa';

interface SocialButtonsProps {
  activeTooltip: string | null;
  setActiveTooltip: (id: string | null) => void;
  resumeUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  emailAddress?: string;
  blogUrl?: string;
}

export default function SocialButtons({ 
  activeTooltip, 
  setActiveTooltip,
  resumeUrl = "/your-resume.pdf",
  linkedinUrl = "https://linkedin.com/in/yourprofile",
  githubUrl = "https://github.com/yourusername",
  emailAddress = "your.email@example.com",
  blogUrl = "https://your-cooking-blog.com"
}: SocialButtonsProps) {
  const [resumeHovered, setResumeHovered] = useState(false);

  return (
    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
      {/* Resume button - larger size */}
      <div className="relative">
        <motion.a 
          href={resumeUrl} 
          className="bg-gray-800/70 text-gray-300 px-5 py-2.5 text-lg rounded-md flex items-center gap-2 overflow-hidden relative"
          onMouseEnter={() => {
            setActiveTooltip('resume');
            setResumeHovered(true);
          }}
          onMouseLeave={() => {
            setActiveTooltip(null);
            setResumeHovered(false);
          }}
          whileHover={{
            boxShadow: "0 0 8px 2px rgba(37, 99, 235, 0.7)",
          }}
        >
          {/* Background fill on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 hover:opacity-100 bg-blue-600 rounded-md"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ 
              scale: 1, 
              opacity: 1 
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Icon with color change on hover */}
          <div className="relative z-10 transition-colors duration-300" 
            style={{ color: resumeHovered ? "#2563eb" : "white" }}
          >
            <FaDownload size={20} />
          </div>
          
          {/* Text with color change on hover */}
          <span className="relative z-10 transition-colors duration-300" 
            style={{ color: resumeHovered ? "#5a8cfb" : "white" }}
          >
            Resume
          </span>
        </motion.a>
        
        {/* Tooltip */}
        {activeTooltip === 'resume' && (
          <motion.div 
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-xs rounded whitespace-nowrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            style={{ 
              color: "#5a8cfb", // blue-600
              border: "1px solid #5a8cfb",
              boxShadow: "0 0 8px 1px rgba(37, 99, 235, 0.3)"
            }}
          >
            Download Resume
          </motion.div>
        )}
      </div>
      
      {/* LinkedIn with brand color */}
      <SocialIconButton 
        icon={<FaLinkedin size={24} />} 
        href={linkedinUrl} 
        tooltip="LinkedIn Profile"
        tooltipId="linkedin"
        activeTooltip={activeTooltip}
        setActiveTooltip={setActiveTooltip}
        brandColor="#04a6fa"
      />
      
      {/* GitHub with brand color */}
      <SocialIconButton 
        icon={<FaGithub size={24} />} 
        href={githubUrl} 
        tooltip="GitHub Projects"
        tooltipId="github"
        activeTooltip={activeTooltip}
        setActiveTooltip={setActiveTooltip}
        brandColor="#aa92cd"
      />
      
      {/* Email with brand color */}
      <SocialIconButton 
        icon={<FaEnvelope size={24} />} 
        href={`mailto:${emailAddress}`} 
        tooltip="Contact Me"
        tooltipId="email"
        activeTooltip={activeTooltip}
        setActiveTooltip={setActiveTooltip}
        brandColor="#EA4335"
      />
      
      {/* Food blog with brand color */}
      <SocialIconButton 
        icon={<FaUtensils size={24} />} 
        href={blogUrl} 
        tooltip="Artichoks - My Cooking Blog"
        tooltipId="food"
        activeTooltip={activeTooltip}
        setActiveTooltip={setActiveTooltip}
        brandColor="#FF9800"
      />
    </div>
  );
}

// Enhanced social button component with pulsating effect
function SocialIconButton({ 
  icon, 
  href, 
  tooltip, 
  tooltipId,
  activeTooltip,
  setActiveTooltip,
  brandColor
}: { 
  icon: React.ReactNode, 
  href: string,
  tooltip: string,
  tooltipId: string,
  activeTooltip: string | null,
  setActiveTooltip: (id: string | null) => void,
  brandColor: string
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <motion.a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-800/70 text-gray-300 p-3.5 rounded-md flex items-center justify-center relative overflow-hidden"
        style={{ width: '48px', height: '48px' }}
        onMouseEnter={() => {
          setActiveTooltip(tooltipId);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setActiveTooltip(null);
          setIsHovered(false);
        }}
        whileHover={{
          boxShadow: `0 0 12px 3px ${brandColor}`,
        }}
      >
        {/* Animated background fill */}
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100"
          style={{ backgroundColor: brandColor }}
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ 
            scale: 1, 
            opacity: 1 
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Pulsating outline */}
        <motion.div
          className="absolute inset-0 rounded-md"
          animate={{ 
            boxShadow: activeTooltip === tooltipId ? `0 0 12px 3px ${brandColor}` : "none" 
          }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 1 
          }}
        />
        
        {/* Icon - now with color change on hover */}
        <div 
          className="relative z-10 transition-colors duration-300" 
          style={{ color: isHovered ? brandColor : 'currentColor' }}
        >
          {icon}
        </div>
      </motion.a>
      
      {/* Tooltip - now with brand color styling */}
      {activeTooltip === tooltipId && (
        <motion.div 
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-xs rounded whitespace-nowrap"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          style={{ 
            color: brandColor,
            border: `1px solid ${brandColor}`,
            boxShadow: `0 0 8px 1px ${brandColor}50`
          }}
        >
          {tooltip}
        </motion.div>
      )}
    </div>
  );
}
