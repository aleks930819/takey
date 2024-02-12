'use client';

import { useState } from 'react';
import { User } from 'lucide-react';

import { cn } from '@/lib/utils';
import { AuthModal } from '@/components';
import { useRouter } from 'next/navigation';

const SignInButton = ({ className, isAuth }: { className?: string; isAuth: boolean }) => {
  const router = useRouter();
  const [isShownAuthModal, setIsShownAuthModal] = useState(false);

  const authModalHandler = () => {
    if (!isAuth) {
      setIsShownAuthModal(true);
    } else {
      router.push('/account');
    }
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
      {isShownAuthModal && <AuthModal closeAuthModal={() => setIsShownAuthModal(false)} />}
    </>
  );
};

export default SignInButton;
