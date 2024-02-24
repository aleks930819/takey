'use client';
import React from 'react';
import { IUserInfo } from '@/app/(restaurants)/restaurants/[id]/page';
import { Button, Spinner } from '@/components/ui';

import * as actions from '@/actions/orders';
import { useCartState, useRestaurantIdState } from '@/lib/state';
import { CartItem } from '@/lib/state/cart';

interface IFormInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const FormInput = ({ label, id, ...rest }: IFormInput) => {
  return (
    <label htmlFor={id} className="flex flex-col gap-1">
      {label}
      <input {...rest} id={id} name={id} className="rounded-lg border-2 border-gray-300 p-2" placeholder={label} />
    </label>
  );
};

interface ICartCheckout {
  userInfo: IUserInfo | undefined;
  cartsItems: CartItem[];
  totalCartItemsPrice: number;
}

const CartCheckout = ({ userInfo, cartsItems, totalCartItemsPrice }: ICartCheckout) => {
  const restaurantId = useRestaurantIdState((state) => state.restaurantId);

  const createOrder = actions.createOrder.bind(null, {
    accessToken: userInfo?.accessToken || '',
    user: userInfo?._id || '',
    restaurant: restaurantId,
    menuItems: cartsItems.map((item: CartItem) => ({
      menuItem: item._id,
      quantity: item.cartItemQuantity,
    })),
    total: totalCartItemsPrice,
    paymentMethod: 'cash',
  });

  return (
    <form className="flex flex-col gap-4" action={createOrder}>
      <FormInput label="Name" id="name" type="name" required defaultValue={userInfo.name} />
      <FormInput label="Phone" id="phone" type="tel" required defaultValue={userInfo.address.phone} />
      <FormInput label="Street name" id="streetName" type="text" required defaultValue={userInfo.address.streetName} />
      <FormInput
        label="Street Number"
        id="streetNumber"
        type="text"
        required
        defaultValue={userInfo.address.streetNumber}
      />
      <Button type="submit" variant="primary" className="w-full rounded-lg">
        {/* {pending ? <Spinner color="white" size="sm" /> : 'Checkout'} */}
        Checkout
      </Button>
    </form>
  );
};

export default CartCheckout;
