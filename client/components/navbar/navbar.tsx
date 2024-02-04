import React from 'react';
import { Logo, MaxWidth } from '../common';
import { SignInButton } from '../account';

const Navbar = () => {
  return (
    <header className="bg-white shadow-lg z-50">
      <MaxWidth>
        <nav className="flex items-center justify-between px-4 py-4 text-heading lg:px-0">
          <Logo className="h-[70px] w-[70px] lg:h-[100px] lg:w-[100px]" />
          <ul>
            <SignInButton />
          </ul>
        </nav>
      </MaxWidth>
    </header>
  );
};

export default Navbar;
