'use client';

import { useState } from 'react';
import { User } from 'lucide-react';

import { cn } from '@/lib/utils';
import { AuthModal } from '@/components';

const SignInButton = ({ className }: { className?: string }) => {
  const [isShownAuthModal, setIsShownAuthModal] = useState(false);

  const authModalHandler = () => {
    setIsShownAuthModal(!isShownAuthModal);
  };

  return (
    <>
      <button
        onClick={authModalHandler}
        className={cn(
          'rounded-full p-2 text-heading transition-all duration-300 ease-in-out hover:bg-primary-dark hover:text-white',
          className,
        )}
      >
        <User size={30} />
      </button>
      {isShownAuthModal && <AuthModal closeAuthModal={authModalHandler} />}
    </>
  );
};

export default SignInButton;
