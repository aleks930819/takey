import React from 'react';

import { ChevronUp, ChevronDown } from 'lucide-react';
import { useCartState, useRestaurantIdState } from '@/lib/state';

interface CartQuantityButtonProps {
  cartItemId: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (id: string) => void;
  variant: 'increase' | 'decrease';
}

const CartQuantityButton = ({ cartItemId, onClick, variant }: CartQuantityButtonProps) => {
  const label = variant === 'increase' ? 'Increase quantity' : 'Decrease quantity';
  const icon = variant === 'increase' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  return (
    <button
      aria-label={label}
      className="rounded-md border border-gray-300 px-2 py-1"
      onClick={() => onClick(cartItemId)}
    >
      <span className="sr-only">{label}</span>
      {icon}
    </button>
  );
};

const CartQuantityButtons = ({ cartItemId }: { cartItemId: string }) => {
  const restaurantId = useRestaurantIdState((state) => state.restaurantId);

  const increaseItemQuantity = useCartState((state) => state.increaseItemQuantity);
  const decreaseItemQuantity = useCartState((state) => state.decreaseItemQuantity);

  return (
    <div className="flex flex-col gap-[3px]">
      <CartQuantityButton
        cartItemId={cartItemId}
        onClick={() => increaseItemQuantity(restaurantId, cartItemId)}
        variant="increase"
      />
      <CartQuantityButton
        cartItemId={cartItemId}
        onClick={() => decreaseItemQuantity(restaurantId, cartItemId)}
        variant="decrease"
      />
    </div>
  );
};

export default CartQuantityButtons;
