"use client";

import { useState, useEffect } from 'react';
import { FaEnvelope, FaLinkedinIn, FaCheck } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';

export default function MobileContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [mounted, setMounted] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);
  
  // Set mounted to true when component mounts (client-side only)
  useEffect(() => {
    setMounted(true);
    // Delay form rendering slightly to avoid hydration mismatch with browser extensions
    setTimeout(() => {
      setIsFormReady(true);
    }, 0);
  }, []);
  
  // Form submission handler using Formspree
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !message) {
      return;
    }
    
    setFormStatus('submitting');
    
    try {
      // Send form data to Formspree
      const response = await fetch('https://formspree.io/f/xwpodnkr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // If successful, clear form
      setName('');
      setEmail('');
      setMessage('');
      setFormStatus('success');
      
      // Reset status after a delay
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <section className="py-6 relative overflow-hidden">
      {/* Subtle gradient background effect - same as desktop */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="rounded-md border border-white overflow-hidden">
          <h2 className="text-2xl font-bold py-3 px-4 border-b border-white text-white bg-gray-800/50">
            Contact
          </h2>

          {/* CTA section - now with gradient background */}
          <div className="p-4 bg-gradient-to-br from-gray-900 to-purple-900/40 border-b border-white/10">
            {/* Main message */}
            <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Want to chat?
            </h3>
            
            <p className="text-gray-300 text-sm mb-4">
              Let&apos;s grab a coffee or something stronger.
            </p>
            
            {/* Quick contact buttons */}
            <div className="flex gap-3 mt-4">
              <a 
                href="mailto:artem.cheshire@gmail.com" 
                className="flex items-center gap-2 text-white bg-gray-800/70 hover:bg-gray-700/90 px-3 py-2 rounded-md transition-all text-sm"
              >
                <FaEnvelope className="text-purple-400" />
                <span>Email</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/artem-bunchuk-4023b6143" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-white bg-gray-800/70 hover:bg-gray-700/90 px-3 py-2 rounded-md transition-all text-sm"
              >
                <FaLinkedinIn className="text-blue-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Form section with enhanced background */}
          <div className="p-4 bg-gray-900/70 relative">
            {/* Background glow effects - enhanced like desktop */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4 text-white">Drop me a line.</h3>
              
              {mounted && formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-6 px-2">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
                    <FaCheck className="text-green-400 text-lg" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-300 text-sm">I&apos;ll get back to you shortly.</p>
                </div>
              ) : (
                <>
                  {/* Show form placeholder during initial render to avoid hydration errors */}
                  {!isFormReady && (
                    <div className="opacity-0 pointer-events-none">
                      <div className="w-full h-10 bg-gray-800/50 rounded-md mb-4"></div>
                      <div className="w-full h-10 bg-gray-800/50 rounded-md mb-4"></div>
                      <div className="w-full h-24 bg-gray-800/50 rounded-md mb-4"></div>
                      <div className="w-full h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-md"></div>
                    </div>
                  )}
                
                  {/* Only show actual form after component is mounted and ready */}
                  {isFormReady && (
                    <form 
                      onSubmit={handleSubmit} 
                      className="space-y-3"
                      autoComplete="off" // Discourage browser extensions from modifying
                    >
                      <input
                        type="text"
                        id="name-mobile"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-white text-sm"
                        placeholder="Your name"
                        required
                      />
                      
                      <input
                        type="email"
                        id="email-mobile"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-white text-sm"
                        placeholder="Email address"
                        required
                      />
                      
                      <textarea
                        id="message-mobile"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-white resize-none text-sm"
                        placeholder="Your message"
                        required
                      />
                      
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-md transition-all text-sm hover:from-indigo-700 hover:to-blue-700"
                        disabled={formStatus === 'submitting'}
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <MdSend className="text-base" />
                            <span>Send</span>
                          </>
                        )}
                      </button>
                      
                      {formStatus === 'error' && (
                        <p className="text-red-400 text-center mt-2 text-xs">Something went wrong. Please try again.</p>
                      )}
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
