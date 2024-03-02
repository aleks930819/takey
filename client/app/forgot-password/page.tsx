'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { sendResetPasswordLink } from '@/actions/reset-password';

import { MaxWidth, SpaceContainer } from '@/components/common';

const ForgotPassword = () => {
  const [state, formAction] = useFormState(sendResetPasswordLink, undefined);
  const { pending } = useFormStatus();

  return (
    <>
      <SpaceContainer />
      <MaxWidth>
        <section className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-white px-4 py-12 text-heading ">
          <h1 className=" text-center text-3xl font-bold tracking-wider">Forgot Password</h1>
          <p className="mb-2 w-3/4 text-center text-sm text-gray-500">Enter your email to receive a reset link</p>
          <form tabIndex={0} className="flex w-[90%] lg:w-1/2 flex-col gap-4" action={formAction} autoFocus>
            <label className="flex w-full flex-col gap-1" htmlFor="email">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="mb-2 w-full  rounded-lg border border-gray-300 px-4 py-2  focus:outline-none"
              />
              {state?.message && <p className="text-center text-base text-red-500">{state.message}</p>}
            </label>
            <button
              aria-disabled={pending}
              disabled={pending}
              aria-label="Send Reset Link"
              className="w-full rounded-lg bg-primary py-2 text-white hover:bg-primary-dark"
            >
              {pending ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        </section>
      </MaxWidth>
    </>
  );
};

export default ForgotPassword;
