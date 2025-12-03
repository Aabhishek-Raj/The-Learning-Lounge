import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //  cacheComponents: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '4kwallpapers.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
