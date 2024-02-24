import { UpdateAddressForm } from '@/components';
import { MaxWidth, SpaceContainer } from '@/components/common';

import * as actions from 'actions/auth';

const AccountAddressPage = async () => {
  const token = await actions.getSession()?.accessToken;

  if (!token) return null;

  const me = await actions.getMe(token);

  if (!me) return null;

  return (
    <MaxWidth>
      <h1 className="text-2xl font-bold text-heading">Your address information</h1>
      <SpaceContainer variant="xsmall" />
      <UpdateAddressForm address={me?.address} />
    </MaxWidth>
  );
};

export default AccountAddressPage;
