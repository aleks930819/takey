import React from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';
import { Footer, Navbar } from '@/components';
import { ScrollToTopButton, SpaceContainer } from '@/components/common';

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
      <body className={`${roboto.className} flex min-h-screen flex-col justify-between`}>
        <Navbar />
        <main className="">{children}</main>
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
