'use client';

import React, { useState } from 'react';

import { X } from 'lucide-react';
import { useCartState, useRestaurantIdState } from '@/lib/state';
import { DELIVERY_FEE } from '@/constants';
import { cn } from '@/lib/utils';

import { IUserInfo } from '@/app/(restaurants)/restaurants/[id]/page';

import CartItems from './cart-items';
import CartCheckout from './cart-checkout';
import { useWindowSize } from '@uidotdev/usehooks';
import ShowCartButton from './show-cart-button';
import EmptyCartMessage from './empty-cart-message';
import NotOpenRestaurantMessage from './not-open-restaurant-message';
import CartSummary from './cart-summary';

export interface CartProps {
  userInfo: IUserInfo | undefined;
  isOpen: boolean;
  minOrderPrice: number;
}

const Cart = ({ userInfo, isOpen, minOrderPrice }: CartProps) => {
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

  if (!isOpen) <NotOpenRestaurantMessage />;

  if (currentCart.length === 0) <EmptyCartMessage />;

  return (
    <>
      {isMobile && <ShowCartButton items={currentCart} toggleCart={toggleCart} />}
      <div
        className={cn('w-full rounded-lg  px-2 py-6 text-gray-600', {
          hidden: isMobile && !showCartOnMobile,
          block: !isMobile,
          'trasnlate-y-0 fixed bottom-0 left-0 right-0  top-0 z-[90] flex h-screen w-full flex-col gap-4 overflow-y-auto  bg-white':
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
        <CartSummary cartTotal={cartTotal} DELIVERY_FEE={DELIVERY_FEE} />
        {totalCartItemsPrice < minOrderPrice ? (
          <p className="text-red-500">
            You need to add more items to reach the minimum order price of ${minOrderPrice.toFixed(2)}
          </p>
        ) : (
          <CartCheckout userInfo={userInfo} cartsItems={currentCart} totalCartItemsPrice={totalCartItemsPrice} />
        )}
      </div>
    </>
  );
};

export default Cart;
