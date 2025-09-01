/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build optimizations
  swcMinify: true,

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },

  // Build error handling
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
