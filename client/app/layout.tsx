import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { GoogleAnalytics } from '@next/third-parties/google';

import './globals.css';

import openGraphImage from '@/public/images/opengraph.png';

import { Footer, Navbar } from '@/components';
import { ScrollToTopButton } from '@/components/common';
import { Providers } from './providers';
import { LoadingScreen } from '@/components/ui';

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Takey',
  description: 'Takey is a ordering app for restaurants.',

  openGraph: {
    type: 'website',
    title: 'Takey',
    description: 'Takey is a ordering app for restaurants.',
    locale: 'en_IE',
    url: 'https://takey.vercel.app/',
    images: [
      {
        url: `${openGraphImage.src}`,
        width: 600,
        height: 400,
        alt: 'Takey',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string} />
      <body className={`${roboto.className} flex min-h-screen flex-col justify-between`}>
        <Providers>
          <Navbar />
          <main>
            <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
          </main>
          <div id="modal-root" />
          <ScrollToTopButton />
          <Suspense>
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}

