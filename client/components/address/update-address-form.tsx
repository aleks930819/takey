'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import * as actions from '@/actions/user';

import { Button } from '@/components/ui';

const UpdateAddressForm = ({
  address,
}: {
  address: {
    streetName: string | undefined;
    city: string | undefined;
    streetNumber: string | undefined;
    phone: string | undefined;
  };
}) => {
  const [state, formAction] = useFormState(actions.updateUserAddress, undefined);
  const { pending } = useFormStatus();

  return (
    <form className="flex w-full flex-col gap-4" action={formAction}>
      <div className="flex flex-col gap-2 lg:flex-row">
        <label htmlFor="city" className="w-full">
          <input
            className="relative  w-full rounded-lg  px-4 py-2 "
            placeholder="City"
            type="text"
            name="city"
            defaultValue={address?.city || ''}
          />
        </label>
        <label htmlFor="phone" className="w-full">
          <input
            className="relative  w-full rounded-lg  px-4 py-2 "
            placeholder="Your phone number"
            type="phone"
            name="phone"
            defaultValue={address?.phone || ''}
          />
        </label>
      </div>
      <div className="flex w-full flex-col gap-2 lg:flex-row">
        <label htmlFor="streetName" className="w-full">
          <input
            className="relative  w-full rounded-lg  px-4 py-2 "
            placeholder="Street Name"
            type="text"
            name="streetName"
            defaultValue={address?.streetName || ''}
          />
        </label>
        <label htmlFor="streetNumber" className="w-full">
          <input
            className="relative  w-full rounded-lg  px-4 py-2 "
            placeholder="Street Number"
            type="text"
            name="streetNumber"
            defaultValue={address?.streetNumber || ''}
          />
        </label>
      </div>

      {state?.message && <p className="text-center text-base text-red-500">{state.message}</p>}
      <Button aria-disabled={pending} disabled={pending} className="lg:w-1/2 p-2">
        {pending ? 'Updating...' : 'Update Address'}
      </Button>
    </form>
  );
};

export default UpdateAddressForm;
