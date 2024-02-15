'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import * as actions from '@/actions/user';

import { Button } from '@/components/ui';

const UpdateAddressForm = ({
  address,
}: {
  address: {
    streetName: string;
    city: string;
    streetNumber: string;
  };
}) => {
  const [state, formAction] = useFormState(actions.updateUserAddress, undefined);
  const { pending } = useFormStatus();

  return (
    <form className="flex w-full flex-col gap-4" action={formAction}>
      <label htmlFor="city">
        <input
          className="relative  w-full rounded-lg  px-4 py-2 "
          placeholder="City"
          type="text"
          name="city"
          defaultValue={address.city}
        />
      </label>
      <label htmlFor="streetName">
        <input
          className="relative  w-full rounded-lg  px-4 py-2 "
          placeholder="Street Name"
          type="text"
          name="streetName"
          defaultValue={address.streetName}
        />
      </label>
      <label htmlFor="streetNumber">
        <input
          className="relative  w-full rounded-lg  px-4 py-2 "
          placeholder="Street Number"
          type="text"
          name="streetNumber"
          defaultValue={address.streetNumber}
        />
      </label>
      {state?.message && <p className="text-center text-base text-red-500">{state.message}</p>}
      <Button aria-disabled={pending} disabled={pending}>
        {pending ? 'Updating...' : 'Update Address'}
      </Button>
    </form>
  );
};

export default UpdateAddressForm;
