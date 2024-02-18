'use client';

import React from 'react';

import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/ui';

interface AddToCartButtonProps {
  menuItemId: string;
  className?: string;
}

const AddToCartButton = ({ className, menuItemId }: AddToCartButtonProps) => {
  return (
    <Tooltip tooltip="Add to cart" position="bottom">
      <button className={cn('flex h-10 w-10 items-center justify-center rounded-full bg-white', className)}>
        <ShoppingCart size={20} />
      </button>
    </Tooltip>
  );
};

export default AddToCartButton;
