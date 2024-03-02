import { MaxWidth, SpaceContainer } from '@/components/common';
import { UpdateProfileForm } from '@/components/profile';

import * as actions from 'actions/auth';

const ProfilePage = async () => {
  const token = await actions.getSession()?.accessToken;

  if (!token) return null;

  const me = await actions.getMe(token);

  if (!me) return null;

  return (
    <MaxWidth>
      <h1 className="text-2xl font-bold tracking-wider text-heading">Your profile information</h1>
      <SpaceContainer variant="xsmall" />
      <UpdateProfileForm name={me.name} email={me.email} />
    </MaxWidth>
  );
};

export default ProfilePage;
