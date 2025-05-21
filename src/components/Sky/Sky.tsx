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
      className="w-full h-full"
      style={{
        background: 'linear-gradient(to bottom, #0f1729 0%, #142952 100%)',
      }}
    >
      <Stars />
      <Clouds />
    </div>
  );
}
