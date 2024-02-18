import { getSession } from '@/actions/auth';

import { Logo, MaxWidth, PaddingContainer } from '../common';
import { SignInButton } from '../account';

const Navbar = async () => {
  const session = await getSession();

  return (
    <header className="z-50 border-b border-gray-300 bg-white">
      <MaxWidth>
        <PaddingContainer>
          <nav className="flex items-center justify-between px-4 py-4 text-heading lg:px-0">
            <Logo className="h-[70px] w-[70px] lg:h-[100px] lg:w-[100px]" />
            <ul>
              <SignInButton isAuth={!!session} />
            </ul>
          </nav>
        </PaddingContainer>
      </MaxWidth>
    </header>
  );
};

export default Navbar;
