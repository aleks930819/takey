import { MaxWidth, SpaceContainer } from '@/components/common';
import React from 'react';

const SuccessForgotPassswordPage = () => {
  return (
    <div>
      <SpaceContainer />
      <MaxWidth>
        <h1 className="text-center text-lg lg:text-3xl font-bold tracking-wider">
          Reset password link sent successfully
          <span className="mx-auto mt-6 block w-3/4 text-center text-sm text-gray-500">
            <p>Please check your email for the reset password link. If you dont see it, check your spam folder.</p>
          </span>
        </h1>
      </MaxWidth>
    </div>
  );
};

export default SuccessForgotPassswordPage;
