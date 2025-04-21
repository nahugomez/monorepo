import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@monorepo/ui'],
  output: 'export',
};

export default nextConfig;
