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
    const isProduction = process.env.NODE_ENV === 'production';
    const isVercelProduction = process.env.VERCEL_ENV === 'production';

    const cspDirectives = [
      "default-src 'self'",
      isProduction
        ? "script-src 'self' 'unsafe-inline'"
        : "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      isProduction
        ? "connect-src 'self'"
        : "connect-src 'self' ws://localhost:* ws://127.0.0.1:*",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      ...(isProduction ? ['upgrade-insecure-requests'] : []),
    ];

    const securityHeaders = [
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
      },
      ...(isVercelProduction
        ? [
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=63072000',
            },
          ]
        : []),
      {
        key: 'Content-Security-Policy-Report-Only',
        value: cspDirectives.join('; '),
      },
    ];

    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
