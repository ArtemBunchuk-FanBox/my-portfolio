/* eslint-disable */
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900/30 border-t border-gray-800 py-6 relative z-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left side - Logo or name */}
          <div className="mb-4 md:mb-0 select-none">
            {/* F1 car logo or your custom logo */}
            <div className="flex items-center">
              <Image 
                src="/images/cat3.png" 
                alt="Logo" 
                width={50} 
                height={20} 
                className="mr-2"
              />
            </div>
          </div>

          {/* Middle - Copyright */}
          <div className="text-gray-500 text-sm mb-4 md:mb-0 select-none">
            © {currentYear} Artem Bunchuk
          </div>

          {/* Right side - Social links */}
          <div className="flex items-center space-x-6 select-none">
            <Link 
              href="https://linkedin.com/in/artem-bunchuk-4023b6143" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaLinkedin size={20} />
            </Link>
            <Link 
              href="https://github.com/ArtemBunchuk-FanBox" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub size={20} />
            </Link>
            <Link 
              href="mailto:artem.cheshire@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaEnvelope size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}