import React from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollToTopButton } from '@/components/common';

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
        <main className="px-4 py-20">{children}</main>
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
