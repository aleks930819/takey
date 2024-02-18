'use client';

import Link from 'next/link';
import React from 'react';

import { CartItem } from '@/lib/state/cart';

import { useCartState, useRestaurantIdState } from '@/lib/state';
import { DELIVERY_FEE } from '@/constants';
import CartQuantityButtons from './cart-quantity-buttons';
import RemoveCartItemButton from './remove-cart-item-button';

const CartItem = ({ item }: { item: CartItem }) => {
  return (
    <p className="flex w-full items-center justify-between border-b pb-2 text-gray-600">
      <span>
        <RemoveCartItemButton cartItemId={item._id} cartItemName={item.name} />
      </span>
      {item.name}
      <span className="flex items-center gap-2">
        <CartQuantityButtons cartItemId={item._id} />
        <p className="flex flex-col items-center gap-1">
          <strong>
            {item.cartItemQuantity} ({item.weight})
          </strong>
          <span>x ${item.price}</span>
        </p>
      </span>
    </p>
  );
};

const Cart = () => {
  const restaurantId = useRestaurantIdState((state) => state.restaurantId);

  const carts = useCartState((state) => state.carts);
  const totalCartItemsPrice = useCartState((state) => state.totalCartItemsPrice[restaurantId] || 0);

  // TODO: Fix this any type
  let currentCart: any[] = [];

  if (carts && carts[restaurantId]) {
    currentCart = carts[restaurantId];
  }

  const cartTotal = totalCartItemsPrice + DELIVERY_FEE;
  return (
    <div className="w-full rounded-lg  px-2 py-6 ">
      <p className="mb-3 text-lg">
        <strong>Your Cart</strong>
      </p>
      {currentCart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="mb-10 flex flex-col gap-4">
            {currentCart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </ul>
          <div className="mb-4 flex w-full flex-col gap-2">
            {/* Include subtotal calculation here if needed */}
            <p className="flex items-center justify-between">
              Delivery fee: <strong>${DELIVERY_FEE.toFixed(2)}</strong>
            </p>
            <p className="flex items-center justify-between">
              Total: <strong>${cartTotal.toFixed(2)}</strong>
            </p>
          </div>
          <Link
            href="/checkout"
            className="flex items-center justify-center rounded-full bg-primary-dark px-4 py-2 text-white hover:text-opacity-100"
          >
            Checkout
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
