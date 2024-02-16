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
            <Suspense fallback={<Spinner size="md" color="primary" />}>{children}</Suspense>
          </div>
        </div>
      </PaddingContainer>
    </MaxWidth>
  );
};

export default AccountLayout;