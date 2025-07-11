// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ResponsiveProvider } from '../context/ResponsiveContext';
import { JobTitleProvider } from '@/context/JobTitleContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Artem Bunchuk - Personal Portfolio',
  description: 'Research, Strategy & Operations',
  icons: {
    icon: '/favicon.ico', // This assumes you've added favicon.ico to the public folder
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-800/70 text-white min-h-screen flex flex-col`}>
        <JobTitleProvider>
          <ResponsiveProvider>
            <div className="flex-grow relative z-10">
              {children}
            </div>
          </ResponsiveProvider>
        </JobTitleProvider>
      </body>
    </html>
  );
}