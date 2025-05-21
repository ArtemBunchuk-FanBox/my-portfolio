/* eslint-disable */
"use client";

import MobileStars from './MobileStars';

export default function MobileSky() {
  return (
    <div
      className="w-full h-full"
      style={{
        background: 'linear-gradient(to bottom, #0f1729 0%, #142952 100%)',
      }}
    >
      <MobileStars />
      {/* No clouds for mobile to improve performance */}
    </div>
  );
}
