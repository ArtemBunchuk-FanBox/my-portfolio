import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: false,
  },
  outputFileTracingRoot: process.cwd(),
  outputFileTracingExcludes: {
    '*': ['**/.next/**'],
  },
  // Disable tracing completely for now to avoid EPERM error
};

export default nextConfig;
