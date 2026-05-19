/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Only used by LogoCarousel for tech icons
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
    ],
  },
}
module.exports = nextConfig
