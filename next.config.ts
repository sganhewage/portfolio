/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // required for static export if using next/image
  },
  basePath: isProd ? '/portfolio' : '',
  assetPrefix: isProd ? '/portfolio/' : '',
  eslint: {
    ignoreDuringBuilds: true, // ignore ESLint errors during build
  },
};

module.exports = nextConfig;
