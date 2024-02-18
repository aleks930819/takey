'use client';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

import { useCartState, useRestaurantIdState } from '@/lib/state';

const RemoveCartItemButton = ({ cartItemId, cartItemName }: { cartItemId: string; cartItemName: string }) => {
  const restaurantId = useRestaurantIdState((state) => state.restaurantId);
  const removeITem = useCartState((state) => state.removeItem);

  const onRemove = () => {
    removeITem(restaurantId, cartItemId);
    toast.success(`${cartItemName} removed from cart`);
  };

  return (
    <button className="text-red-500" onClick={onRemove}>
      <span className="sr-only">Remove {cartItemName} from cart</span>
      <X size={24} />
    </button>
  );
};

export default RemoveCartItemButton;
