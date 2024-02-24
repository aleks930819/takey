'use client';

import React from 'react';

import { useCartState, useRestaurantIdState } from '@/lib/state';
import { DELIVERY_FEE } from '@/constants';

import { IUserInfo } from '@/app/(restaurants)/restaurants/[id]/page';

import CartItems from './cart-items';
import CartCheckout from './cart-checkout';

const Cart = ({ userInfo }: { userInfo: IUserInfo | undefined }) => {
  const restaurantId = useRestaurantIdState((state) => state.restaurantId);

  const carts = useCartState((state) => state.carts);
  const totalCartItemsPrice = useCartState((state) => state.totalCartItemsPrice[restaurantId] || 0);

  // TODO: Fix this any type
  let currentCart: any[] = [];

  if (carts && carts[restaurantId]) {
    currentCart = carts[restaurantId];
  }

  const cartTotal = totalCartItemsPrice + DELIVERY_FEE;

  if (currentCart.length === 0) {
    return (
      <>
        <p className="mb-3 text-lg">
          <strong>Your Cart</strong>
        </p>
        <p>Your cart is empty</p>
      </>
    );
  }

  return (
    <div className="w-full rounded-lg  px-2 py-6 text-gray-600">
      <p className="mb-3 text-lg">
        <strong>Your Cart</strong>
      </p>
      <CartItems currentCart={currentCart} />
      <div className="mb-4 flex w-full flex-col gap-2 border-b pb-2">
        <p className="flex items-center justify-between">
          Delivery fee: <strong>${DELIVERY_FEE.toFixed(2)}</strong>
        </p>
        <p className="flex items-center justify-between">
          Total: <strong>${cartTotal.toFixed(2)}</strong>
        </p>
      </div>
      <CartCheckout userInfo={userInfo} cartsItems={currentCart} totalCartItemsPrice={totalCartItemsPrice} />
    </div>
  );
};

export default Cart;
