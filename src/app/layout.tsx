import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost, DM_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Hôtel Lumière — Un Sanctuaire de Luxe Raffiné',
    template: '%s | Hôtel Lumière',
  },
  description: 'Vivez le summum de l\'hospitalité de luxe à l\'Hôtel Lumière. Là où l\'élégance intemporelle rencontre le raffinement contemporain.',
  keywords: ['hotel de luxe', 'cinq étoiles', 'hotel lumiere', 'suites', 'gastronomie', 'spa', 'فندق فاخر', 'فندق لومير'],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['ar_DZ'],
    url: '/',
    siteName: 'Hôtel Lumière',
    title: 'Hôtel Lumière — Un Sanctuaire de Luxe Raffiné',
    description: 'Vivez le summum de l\'hospitalité de luxe à l\'Hôtel Lumière.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hôtel Lumière',
    description: 'Un Sanctuaire de Luxe Raffiné',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${jost.variable} ${dmMono.variable}`}>
      <body className="bg-obsidian-950 text-cream-50 font-sans antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a1714',
                color: '#fdfaf5',
                border: '1px solid #C9A96E',
                fontFamily: 'var(--font-jost)',
                fontSize: '14px',
                letterSpacing: '0.02em',
              },
              success: { iconTheme: { primary: '#C9A96E', secondary: '#1a1714' } },
              error:   { iconTheme: { primary: '#ef4444', secondary: '#1a1714' } },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
