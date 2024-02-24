'use client';

import React, { useState } from 'react';

import { useCartState, useRestaurantIdState } from '@/lib/state';
import { DELIVERY_FEE } from '@/constants';

import { IUserInfo } from '@/app/(restaurants)/restaurants/[id]/page';

import CartItems from './cart-items';
import CartCheckout from './cart-checkout';
import { useWindowSize } from '@uidotdev/usehooks';
import ShowCartButton from './show-cart-button';
import { cn } from '@/lib/utils';
import { Button } from '../ui';
import { X } from 'lucide-react';

const Cart = ({ userInfo }: { userInfo: IUserInfo | undefined }) => {
  const [showCartOnMobile, setShowCartOnMobile] = useState(false);
  const restaurantId = useRestaurantIdState((state) => state.restaurantId);
  const { width } = useWindowSize();

  const carts = useCartState((state) => state.carts);
  const totalCartItemsPrice = useCartState((state) => state.totalCartItemsPrice[restaurantId] || 0);

  const isMobile = width! < 768;

  // TODO: Fix this any type
  let currentCart: any[] = [];

  if (carts && carts[restaurantId]) {
    currentCart = carts[restaurantId];
  }

  const cartTotal = totalCartItemsPrice + DELIVERY_FEE;

  const toggleCart = () => {
    setShowCartOnMobile(!showCartOnMobile);
  };

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
    <>
      {isMobile && <ShowCartButton items={currentCart} toggleCart={toggleCart} />}
      <div
        className={cn('w-full rounded-lg  px-2 py-6 text-gray-600', {
          hidden: isMobile && !showCartOnMobile,
          block: !isMobile,
          'trasnlate-y-0 fixed bottom-0 left-0 overflow-y-auto  right-0 top-0 z-[90] flex h-screen w-full flex-col gap-4  bg-white':
            isMobile && showCartOnMobile,
        })}
      >
        <p className="mb-3 flex items-center justify-between text-lg">
          <strong>Your Cart</strong>
          {isMobile && (
            <button onClick={toggleCart} className="rounded-full border border-gray-300 p-1">
              <X size={20} />
            </button>
          )}
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
    </>
  );
};

export default Cart;
