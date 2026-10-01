import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#00ff66',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ahmetcanbagli.dev'),
  title: 'Ahmetcan Bağlı | Big Data Analytics Student & Software Developer Candidate',
  description:
    'Personal portfolio of Ahmetcan Bağlı, Big Data Analytics student (Associate Degree) at Manisa Celal Bayar University focusing on C#, .NET 10, SQL Server, and Python data science.',
  keywords: [
    'Ahmetcan Bağlı',
    'Software Developer Candidate',
    'C#',
    '.NET 10',
    'Entity Framework Core 10',
    'Python Data Science',
    'CatBoost',
    'SQL Server',
    'Manisa Celal Bayar University',
    'Big Data Analytics',
    'Associate Degree',
  ],
  authors: [{ name: 'Ahmetcan Bağlı', url: 'https://ahmetcanbagli.dev' }],
  creator: 'Ahmetcan Bağlı',
  publisher: 'Ahmetcan Bağlı',
  alternates: {
    canonical: 'https://ahmetcanbagli.dev/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['tr_TR', 'de_DE', 'ru_RU'],
    url: 'https://ahmetcanbagli.dev/',
    siteName: 'Ahmetcan Bağlı Portfolio',
    title: 'Ahmetcan Bağlı | Big Data Analytics Student & Software Developer Candidate',
    description:
      'Personal portfolio of Ahmetcan Bağlı, Big Data Analytics student (Associate Degree) at Manisa Celal Bayar University focusing on C#, .NET 10, SQL Server, and Python data science.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmetcan Bağlı | Big Data Analytics Student & Software Developer Candidate',
    description:
      'Personal portfolio of Ahmetcan Bağlı, Big Data Analytics student (Associate Degree) at Manisa Celal Bayar University focusing on C#, .NET 10, SQL Server, and Python data science.',
    creator: '@ahmetcanbagli',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ahmetcan Bağlı',
  givenName: 'Ahmetcan',
  familyName: 'Bağlı',
  url: 'https://ahmetcanbagli.dev/',
  email: 'mailto:a.can.bagli@gmail.com',
  sameAs: [
    'https://github.com/Fylgja0',
    'https://www.linkedin.com/in/ahmetcanbagli',
  ],
  jobTitle: 'Software Developer Candidate',
  description:
    'Big Data Analytics student (Associate Degree) at Manisa Celal Bayar University focusing on C#, .NET 10, SQL Server, and Python data science.',
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Manisa Celal Bayar University',
    department: 'Big Data Analytics',
  },
  knowsAbout: [
    'C#',
    '.NET 10',
    'Entity Framework Core 10',
    'Microsoft SQL Server',
    'Relational Databases',
    'Python',
    'Pandas',
    'Scikit-learn',
    'CatBoost',
    'Data Science',
    'Exploratory Data Analysis',
    'Object-Oriented Programming',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="matrix" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  );
}
