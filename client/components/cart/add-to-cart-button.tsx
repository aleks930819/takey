'use client';

import React from 'react';

import { ShoppingCart } from 'lucide-react';

import { cn } from '@/lib/utils';

import { useCartState, useRestaurantIdState } from '@/lib/state';

import { Tooltip } from '@/components/ui';
import { MenuItem } from '@/interfaces/category';
import { CartItem } from '@/lib/state/cart';

interface AddToCartButtonProps {
  menuItem: MenuItem;

  className?: string;
}

const AddToCartButton = ({ className, menuItem }: AddToCartButtonProps) => {
  const restaurantId = useRestaurantIdState((state) => state.restaurantId);

  console.log('restaurantId', restaurantId);

  const addItem = useCartState((state) => state.addItem);

  const cartItem: CartItem = {
    _id: menuItem._id,
    name: menuItem.name,
    price: menuItem.price,
    weight: menuItem.weight,
    restaurantId: restaurantId,
    cartItemQuantity: menuItem.cartItemQuantity,
  };

  const handleAddToCart = () => {
    addItem(cartItem);
  };

  return (
    <Tooltip tooltip="Add to cart" position="bottom">
      <button
        aria-label="Add to cart"
        className={cn('flex h-10 w-10 items-center justify-center rounded-full bg-white', className)}
        onClick={handleAddToCart}
      >
        <ShoppingCart size={20} />
      </button>
    </Tooltip>
  );
};

export default AddToCartButton;
