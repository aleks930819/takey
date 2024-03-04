'use client';

import Link from 'next/link';

import { Logo, Modal } from '@/components/common';

import { useState } from 'react';
import { useClickAway } from '@uidotdev/usehooks';

import { SignIn, SignUp } from './forms';

const AuthModal = ({ closeAuthModal }: { closeAuthModal: () => void }) => {
  const [authModalState, setAuthModalState] = useState('login');

  const ref = useClickAway(() => {
    closeAuthModal();
  });

  const changeAuthModalState = () => {
    if (authModalState == 'login') return setAuthModalState('register');
    if (authModalState == 'register') return setAuthModalState('login');
  };

  return (
    <Modal>
      <div
        ref={ref as any}
        className="mx-auto flex h-auto w-[90%]  flex-col items-center justify-between gap-4 rounded-lg bg-white px-4 py-12 text-heading xl:w-[40%]"
      >
        <div className="flex w-full items-center gap-3 ">
          <Logo className="h-20 w-20" />
          <h2 className="text-center  text-xl lg:text-2xl">{authModalState === 'login' ? 'Sign In' : 'Sign Up'}</h2>
        </div>
        {authModalState === 'login' ? (
          <SignIn closeAuthModal={closeAuthModal} />
        ) : (
          <SignUp closeAuthModal={closeAuthModal} />
        )}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button onClick={changeAuthModalState}>
            <p>{authModalState === 'login' ? 'Dont have an account?' : 'Already have an account?'}</p>
          </button>
          <Link href="/forgot-password" className="underline" onClick={closeAuthModal}>
            <p>Forgot Password?</p>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
