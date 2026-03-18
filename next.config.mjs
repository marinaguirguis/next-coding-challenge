import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const EXTERNAL_API = 'https://v0-api-endpoint-request.vercel.app';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-proxy/:path*',
        destination: `${EXTERNAL_API}/api/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
