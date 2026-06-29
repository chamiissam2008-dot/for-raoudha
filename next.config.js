/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol:"https", hostname:"images.unsplash.com" },
      { protocol:"https", hostname:"cdn.myanimelist.net" },
    ],
    deviceSizes: [640, 828, 1080, 1200, 1920],
    minimumCacheTTL: 86400,
  },
};
module.exports = nextConfig;
