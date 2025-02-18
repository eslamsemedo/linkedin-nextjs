import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Option A (for Next.js 12+ and 13+): Use 'remotePatterns'
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol:"https",
        hostname: "img-clerk. com",
      },
    ],

    // Option B (simpler syntax, works on older versions):
    // domains: ['via.placeholder.com'],
  },
};

export default nextConfig;
