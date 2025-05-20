"use client";

import Stars from './Stars';
import Clouds from './Clouds';

export default function Sky() {
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
