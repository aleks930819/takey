'use client';

import React from 'react';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import { addToFavoritesList, removeFromFavoritesList } from '@/actions/favorites';
import FavoriteButtonIcon from './favorites-button-icon';

interface FavoritesButtonProps {
  reastaurantId: string;
  isInFavorite: boolean;
}

const FavoritesButton = ({ reastaurantId, isInFavorite }: FavoritesButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const onFavoritesClick = () => {
    startTransition(() => {
      toast.success(isInFavorite ? 'Removed from favorites' : 'Added to favorites');
      if (isInFavorite) {
        removeFromFavoritesList(reastaurantId);
      } else {
        addToFavoritesList(reastaurantId);
      }
      router.refresh();
    });
  };

  return (
    <button
      disabled={isPending}
      aria-label={isInFavorite ? 'Remove from favorites' : 'Add to favorites'}
      onClick={() => {
        onFavoritesClick();
      }}
      className="dsiabled:bg-gray-200/600 group flex  h-10 w-10 items-center justify-center bg-gray-200 text-red-600 transition-colors duration-300 ease-in-out"
    >
      <FavoriteButtonIcon isLoading={isPending} isInFavorite={isInFavorite} />
    </button>
  );
};

export default FavoritesButton;
