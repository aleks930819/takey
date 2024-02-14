'use client';

import React from 'react';
import { useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import { addToFavoritesList, removeFromFavoritesList } from '@/actions/favorites';
import FavoriteButtonIcon from './favorites-button-icon';
import { useAuthModalState } from '@/lib/state';

interface FavoritesButtonProps {
  reastaurantId: string;
  isInFavorite: boolean;
  accessToken: string | null;
  userId: string | null;
}

const FavoritesButton = ({ reastaurantId, isInFavorite, accessToken, userId }: FavoritesButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const { showAuthModal } = useAuthModalState();

  const router = useRouter();

  const onFavoritesClick = () => {
    if (!accessToken || !userId) {
      return showAuthModal();
    }
    startTransition(() => {
      toast.success(isInFavorite ? 'Removed from favorites' : 'Added to favorites');
      if (isInFavorite) {
        removeFromFavoritesList({
          reastaurantId,
          userId,
          accessToken,
        });
      } else {
        addToFavoritesList({
          reastaurantId,
          userId,
          accessToken,
        });
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
