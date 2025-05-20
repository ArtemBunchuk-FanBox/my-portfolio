/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: false,
  },
  outputFileTracingRoot: process.cwd(),
  outputFileTracingExcludes: {
    '*': ['**/.next/**'],
  },
  experimental: {
    // Remove the properties that have been moved to root level
  },
}

module.exports = nextConfig
