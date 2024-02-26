'use client';
import React from 'react';
import { IUserInfo } from '@/app/(restaurants)/restaurants/[id]/page';
import { Button } from '@/components/ui';

import * as actions from '@/actions/orders';
import { useRestaurantIdState } from '@/lib/state';
import { CartItem } from '@/lib/state/cart';
import { RadioInput } from '../ui/radio-input';

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

const paymentOptiosn = [
  {
    label: 'Cash',
    value: 'cash',
  },
  {
    label: 'Credit Card',
    value: 'credit-card',
  },
];

const CartCheckout = ({ userInfo, cartsItems, totalCartItemsPrice }: ICartCheckout) => {
  const restaurantId = useRestaurantIdState((state) => state.restaurantId);

  const [paymentMethod, setPaymentMethod] = React.useState<string>('cash');

  const createOrder = actions.createOrder.bind(null, {
    accessToken: userInfo?.accessToken || null,
    user: userInfo?._id || null,
    restaurant: restaurantId,
    menuItems: cartsItems.map((item: CartItem) => ({
      menuItem: item._id,
      name: item.name,
      price: item.price,
      quantity: item.cartItemQuantity,
    })),
    total: totalCartItemsPrice,
    paymentMethod: paymentMethod,
  });

  return (
    <form className="flex flex-col gap-4" action={createOrder}>
      <FormInput label="Name" id="name" type="name" required defaultValue={userInfo?.name || ''} />
      <FormInput label="Phone" id="phone" type="tel" required defaultValue={userInfo?.address.phone || ''} />
      <FormInput
        label="Street name"
        id="streetName"
        type="text"
        required
        defaultValue={userInfo?.address?.streetName || ''}
      />
      <FormInput
        label="Street Number"
        id="streetNumber"
        type="text"
        required
        defaultValue={userInfo?.address?.streetNumber || ''}
      />
      <div className="flex flex-col items-start justify-start gap-4">
        <fieldset>
          <legend className="mb-4 text-lg font-bold ">{'Payment Method'}</legend>
          {paymentOptiosn.map((option) => (
            <RadioInput
              key={option.value}
              label={option.label}
              name={'paymentMethod'}
              value={option.value}
              checked={option.value === paymentMethod}
              onChange={() => setPaymentMethod(option.value)}
              id={option.value.toString()}
            />
          ))}
        </fieldset>
      </div>
      <Button type="submit" variant="primary" className="w-full rounded-lg">
        {/* {pending ? <Spinner color="white" size="sm" /> : 'Checkout'} */}
        Checkout
      </Button>
    </form>
  );
};

export default CartCheckout;
