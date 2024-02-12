import { Mail, User } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import React from 'react';

import * as actions from '@/actions/auth';

import PasswordInputField from './password-input-field';
import { Button } from '@/components/ui';

const SignUp = ({ closeAuthModal }: { closeAuthModal: () => void }) => {
  const [state, formAction] = useFormState(actions.signUp, undefined);
  const { pending } = useFormStatus();
  if (state?.data) {
    closeAuthModal();
  }
  return (
    <form className="flex w-full flex-col gap-4" action={formAction}>
      <span className="relative">
        <input className="relative  w-full rounded-lg  px-4 py-2 " placeholder="Name" type="text" name="name" />
        <User className="absolute right-4 top-1/2 -translate-y-1/2 transform" />
      </span>
      <span className="relative">
        <input className="relative  w-full rounded-lg  px-4 py-2 " placeholder="Email" type="email" name="email" />
        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 transform" />
      </span>
      <PasswordInputField />
      <PasswordInputField placeholder="Confirm Password" />
      {state?.message && <p className="text-center text-base text-red-500">{state.message}</p>}
      <Button aria-disabled={pending} disabled={pending}>
        Sign Up
      </Button>
    </form>
  );
};

export default SignUp;
