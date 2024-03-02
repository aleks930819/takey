'use client';

import React from 'react';

import { ShoppingCart } from 'lucide-react';

import { cn } from '@/lib/utils';

import { useCartState, useRestaurantIdState } from '@/lib/state';

import { Tooltip } from '@/components/ui';
import { MenuItem } from '@/interfaces/category';
import { CartItem } from '@/lib/state/cart';

interface AddToCartButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  menuItem: MenuItem;
  className?: string;
  disabled?: boolean;
}

const AddToCartButton = ({ className, menuItem, disabled, ...props }: AddToCartButtonProps) => {
  const restaurantId = useRestaurantIdState((state) => state.restaurantId);

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
    <Tooltip tooltip={disabled ? 'You cant add this items' : 'Add to cart'} position="bottom">
      <button
        {...props}
        disabled={disabled}
        aria-label="Add to cart"
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full bg-white disabled:cursor-not-allowed disabled:opacity-60',
          className,
        )}
        onClick={handleAddToCart}
      >
        <ShoppingCart size={20} />
      </button>
    </Tooltip>
  );
};

export default AddToCartButton;
