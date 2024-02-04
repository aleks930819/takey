import React from 'react';

import { ClientOnly, MaxWidth, ScrollToTopButton, SpaceContainer } from '@/components/common';
import { Cuisines } from '@/components/cuisines';
import { Filter } from '@/components/filter';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClientOnly>
        <MaxWidth>
          <SpaceContainer variant="small" />
          <Cuisines />
          <SpaceContainer variant="small" />
          <section className="flex w-full flex-col gap-4 lg:flex-row">
            <aside className="w-full lg:w-[30%]  ">
              <div className="h-auto  lg:sticky lg:top-5">
                <Filter />
              </div>
            </aside>
            <div className="w-full px-4 ">{children}</div>
          </section>
        </MaxWidth>
      </ClientOnly>
      <ScrollToTopButton />
    </>
  );
}
