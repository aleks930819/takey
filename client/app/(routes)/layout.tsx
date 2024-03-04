import React from 'react';
import { Metadata } from 'next';

import { ClientOnly, MaxWidth, PaddingContainer, ScrollToTopButton, SpaceContainer } from '@/components/common';
import { Cuisines, Filter, SortBy } from '@/components';

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
    <>
      <ClientOnly>
        <MaxWidth>
          <PaddingContainer>
            <SpaceContainer variant="small" />
            <Cuisines />
            <SpaceContainer variant="small" />
            <div className="flex items-end justify-end">
              <SortBy />
            </div>
            <SpaceContainer variant="small" />
            <section className="flex w-full flex-col gap-4 lg:flex-row">
              <aside className="w-full lg:w-[30%]  ">
                <div className="h-auto  lg:sticky lg:top-5">
                  <Filter />
                </div>
              </aside>
              <div className="w-full px-4">{children}</div>
            </section>
          </PaddingContainer>
        </MaxWidth>
      </ClientOnly>
      <ScrollToTopButton />
    </>
  );
}
