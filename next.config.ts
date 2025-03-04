import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Set limit to 10MB (adjust as needed)
    },
  },
  images: {
    // Option A (for Next.js 12+ and 13+): Use 'remotePatterns'
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "img-clerk.com",
      },
      {
        protocol: "https",
        hostname: "eyslrmwmvaubiprgyeqt.supabase.co",
      },
    ],

    // Option B (simpler syntax, works on older versions):
    // domains: ['via.placeholder.com'],
  },
};

export default nextConfig;
