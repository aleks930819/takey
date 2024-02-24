'use client';
import React from 'react';
import { Button } from '@/components/ui';

const FormInput = ({ label, id, type, required }: { label: string; id: string; type: string; required: boolean }) => {
  return (
    <label htmlFor={id} className="flex flex-col gap-1">
      {label}
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        className="rounded-lg border-2 border-gray-300 p-2"
        placeholder={label}
      />
    </label>
  );
};

const CartCheckout = () => {
  return (
    <form className="flex flex-col gap-2">
      <FormInput label="Email" id="email" type="email" required />
      <FormInput label="Phone" id="phone" type="tel" required />
      <FormInput label="Street Number" id="streetNumber" type="text" required />
      <FormInput label="Street name" id="streetName" type="text" required />
      <Button type="submit" variant="primary" className="w-full rounded-lg">
        Checkout
      </Button>
    </form>
  );
};

export default CartCheckout;
