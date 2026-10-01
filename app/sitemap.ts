import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ahmetcanbagli.dev';
  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-09-30T00:00:00.000Z'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
