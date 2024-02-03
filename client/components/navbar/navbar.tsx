import React from 'react';
import { Logo, MaxWidth } from '../common';

const Navbar = () => {
  return (
    <header className="bg-primary">
      <MaxWidth>
        <nav className="text-heading flex items-center justify-between py-4">
          <Logo className="h-[100px] w-[100px]" />
          <ul>NAV</ul>
        </nav>
      </MaxWidth>
    </header>
  );
};

export default Navbar;
