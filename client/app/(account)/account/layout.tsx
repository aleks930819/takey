import React, { Suspense } from 'react';

import { MaxWidth, PaddingContainer, SpaceContainer } from '@/components/common';
import { Spinner } from '@/components/ui';
import { AccountNavigation } from '@/components/account';

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MaxWidth>
      <PaddingContainer>
        <SpaceContainer variant="medium" className="hidden lg:block" />
        <SpaceContainer variant="small" className="block lg:hidden" />
        <div className="flex flex-col gap-4  lg:flex-row">
          <div className="w-full lg:w-1/4">
            <AccountNavigation />
          </div>
          <div className="w-full  lg:w-3/4">
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center">
                  <Spinner size="md" color="primary" />
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
        </div>
        <SpaceContainer variant="medium" className="hidden lg:block" />
        <SpaceContainer variant="small" className="block lg:hidden" />
      </PaddingContainer>
    </MaxWidth>
  );
};

export default AccountLayout;
