import { MaxWidth, SpaceContainer } from '@/components/common';
import React from 'react';

const SuccessForgotPassswordPage = () => {
  return (
    <div>
      <SpaceContainer />
      <MaxWidth>
        <h1 className="text-center text-lg font-bold tracking-wider lg:text-3xl">
          You have successfully reset your password
          <span className="mx-auto mt-6 block w-3/4 text-center text-sm text-gray-500">
            <p>Login with your new password. If you have any issues, please contact support </p>
          </span>
        </h1>
      </MaxWidth>
    </div>
  );
};

export default SuccessForgotPassswordPage;
