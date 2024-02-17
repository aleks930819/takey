'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import * as actions from '@/actions/user';

import { Button } from '@/components/ui';

const UpdateProfileForm = ({ name, email }: { name: string; email: string }) => {
  const [state, formAction] = useFormState(actions.updateUserProfile, undefined);
  const { pending } = useFormStatus();

  return (
    <form className="flex w-full flex-col gap-4" action={formAction}>
      <div className="flex gap-2">
        <label htmlFor="name" className="w-full">
          <input
            className="relative  w-full rounded-lg  px-4 py-2 "
            placeholder="Your name"
            type="text"
            name="name"
            defaultValue={name}
          />
        </label>
        <label htmlFor="email" className="w-full">
          <input
            className="relative  w-full rounded-lg  px-4 py-2 "
            placeholder="Your email address"
            type="email"
            name="email"
            defaultValue={email}
          />
        </label>
      </div>

      {state?.message && <p className="text-center text-base text-red-500">{state.message}</p>}
      <Button aria-disabled={pending} disabled={pending}>
        {pending ? 'Updating...' : 'Update Address'}
      </Button>
    </form>
  );
};

export default UpdateProfileForm;
