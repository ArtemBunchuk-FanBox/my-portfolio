/* eslint-disable */
"use client";

import MobileStars from './MobileStars';

export default function MobileSky() {
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
      <MobileStars />
      {/* No clouds for mobile to improve performance */}
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
