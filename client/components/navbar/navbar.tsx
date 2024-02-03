import React from 'react';
import { Logo, MaxWidth } from '../common';
import { SignInButton } from '../account';

const Navbar = () => {
  return (
    <header className="bg-white shadow-lg">
      <MaxWidth>
        <nav className="text-heading flex items-center justify-between py-4 px-4 lg:px-0">
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
