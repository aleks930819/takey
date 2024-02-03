import React from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { MaxWidth, ScrollToTopButton, SpaceContainer } from '@/components/common';
import { Cuisines } from '@/components/cuisines';
import { RestaruantCard } from './page';

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
        <main className="px-4">
          <MaxWidth>
            <SpaceContainer variant="small" />
            <Cuisines />
            <SpaceContainer variant="small" />
            <section className="flex w-full flex-col gap-4 lg:flex-row">
              <aside className="w-full lg:w-[30%]  ">
                <div className="h-auto bg-blue-500 lg:sticky lg:top-5">
                  <>Filter</>
                </div>
              </aside>
              <div className="w-full ">{children}</div>
            </section>
          </MaxWidth>
        </main>
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
