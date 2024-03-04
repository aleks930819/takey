import React from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { GoogleAnalytics } from '@next/third-parties/google';

import './globals.css';
import { Footer, Navbar } from '@/components';
import { ScrollToTopButton } from '@/components/common';
import { Providers } from './providers';

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Takey',
  description: 'Takey is a ordering app for restaurants.',
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
          <main>{children}</main>
          <div id="modal-root" />
          <ScrollToTopButton />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
