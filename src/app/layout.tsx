// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Artem Bunchuk - Personal Portfolio',
  description: 'Personal portfolio website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-800/70 text-white min-h-screen flex flex-col`}>
        <div className="flex-grow relative z-10">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}