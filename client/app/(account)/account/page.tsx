import { getMe, getSession } from '@/actions/auth';
import React from 'react';

const AccountPage = async () => {
  const session = await getSession();
  if (!session) return null;
  const me = await getMe(session?.accessToken);
  return (
    <div>
      <h1 className="text-center text-lg font-bold tracking-wider lg:text-3xl">
        Hello {me?.name}, welcome to your account page
      </h1>
      <p className="mx-auto mt-6 block w-3/4 text-center text-sm text-gray-500">
        Here you can view and update your account details, change your password, and view your order history.
      </p>
    </div>
  );
};

export default AccountPage;
