/** @type {import('next').NextConfig} */
const EXTERNAL_API = 'https://v0-api-endpoint-request.vercel.app';

const nextConfig = {
  async rewrites() {
    if (process.env.NODE_ENV !== 'development') return [];

    return [
      {
        source: '/api-proxy/:path*',
        destination: `${EXTERNAL_API}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
