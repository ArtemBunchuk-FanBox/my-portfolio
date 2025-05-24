"use client";

import { useResponsive } from '@/context/ResponsiveContext';
import Stars from './Stars';
import Clouds from './Clouds';
import MobileSky from './MobileSky';

export default function Sky() {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return <MobileSky />;
  }
  
  return (
    <div
      className="fixed-sky w-full h-full"
      style={{
        background: 'linear-gradient(to bottom, #0f1729 0%, #142952 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
      }}
    >
      <Stars />
      <Clouds />
      <style jsx global>{`
        .fixed-sky {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
        }
      `}</style>
    </div>
  );
}
