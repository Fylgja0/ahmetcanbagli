import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      {
        source: '/giris',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/oduller',
        destination: '/awards',
        permanent: true,
      },
      {
        source: '/admin/oduller',
        destination: '/admin/awards',
        permanent: true,
      },
      {
        source: '/admin/projeler',
        destination: '/admin/projects',
        permanent: true,
      },
      {
        source: '/admin/mesajlar',
        destination: '/admin/messages',
        permanent: true,
      },
      {
        source: '/admin/oturumlar',
        destination: '/admin/sessions',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
