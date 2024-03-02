'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { resetPassword } from '@/actions/reset-password';

import { MaxWidth, SpaceContainer } from '@/components/common';

const ForgotPassword = () => {
  const [state, formAction] = useFormState(resetPassword, undefined);
  const { pending } = useFormStatus();

  return (
    <>
      <SpaceContainer />
      <MaxWidth>
        <section className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-white px-4 py-12 text-heading ">
          <h1 className=" text-center text-3xl font-bold tracking-wider">Reset Password</h1>
          <form className="flex w-1/2 flex-col gap-4" action={formAction}>
            <label className="flex w-full flex-col gap-1" htmlFor="email">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="mb-2 w-full  rounded-lg border border-gray-300 px-4 py-2  focus:outline-none"
              />
            </label>
            <label className="flex w-full flex-col gap-1" htmlFor="password">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="mb-2 w-full  rounded-lg border border-gray-300 px-4 py-2  focus:outline-none"
              />
            </label>
            <label className="flex w-full flex-col gap-1" htmlFor="confirmPassword">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="mb-2 w-full  rounded-lg border border-gray-300 px-4 py-2  focus:outline-none"
              />
            </label>
            <label className="flex w-full flex-col gap-1" htmlFor="token">
              <input
                type="text"
                name="token"
                placeholder="Reset Password Token"
                className="mb-2 w-full  rounded-lg border border-gray-300 px-4 py-2  focus:outline-none"
              />
            </label>
            <button
              aria-disabled={pending}
              disabled={pending}
              aria-label="Send Reset Link"
              className="w-full rounded-lg bg-primary py-2 text-white hover:bg-primary-dark"
            >
              {pending ? 'Loading...' : 'Reset Password'}
            </button>
          </form>
        </section>
      </MaxWidth>
    </>
  );
};

export default ForgotPassword;
