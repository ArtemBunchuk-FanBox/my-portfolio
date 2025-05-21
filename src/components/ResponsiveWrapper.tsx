"use client";
/* eslint-disable */
import { ReactNode } from 'react';
import { useResponsive } from '../context/ResponsiveContext';

interface ResponsiveWrapperProps {
  mobileComponent: ReactNode;
  desktopComponent: ReactNode;
}

export default function ResponsiveWrapper({
  mobileComponent,
  desktopComponent,
}: ResponsiveWrapperProps) {
  const { isMobile } = useResponsive();

  return (
    <>
      {isMobile ? (
        <div className="block md:hidden">{mobileComponent}</div>
      ) : (
        <div className="hidden md:block">{desktopComponent}</div>
      )}
    </>
  );
}
