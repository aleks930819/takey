'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { Accordion } from '@/components/common';
import AccountNavigationOrderList from './account-navigation-order-list';

const AccountNavigation = () => {
  const pathname = usePathname();
  const currentPath = pathname.split('/').pop();

  const mobileAccountSection = [
    {
      title: 'Account',
      content: <AccountNavigationOrderList currentPath={currentPath} />,
    },
  ];

  return (
    <div>
      {/* MOBILE VIEW */}
      <div className="block lg:hidden">
        <Accordion sections={mobileAccountSection} icon="arrow" />
      </div>
      {/* DEKSTOP VIEW */}
      <div className="hidden lg:block">
        <AccountNavigationOrderList currentPath={currentPath} />
      </div>
    </div>
  );
};

export default AccountNavigation;
