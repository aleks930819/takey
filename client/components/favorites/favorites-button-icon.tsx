import { Heart } from 'lucide-react';
import { Spinner } from '@/components/ui';
import { cn } from '@/lib/utils';

const FavoriteButtonIcon = ({ isLoading, isInFavorite }: { isLoading: boolean; isInFavorite: boolean }) => {
  return (
    <>
      {isLoading ? (
        <Spinner size="sm" color="primary" />
      ) : (
        <Heart
          size={18}
          className={cn('group:transition-all group:duration-300 group:ease-in-out group-hover:fill-red-600', {
            'fill-red-600': isInFavorite,
          })}
        />
      )}
    </>
  );
};

export default FavoriteButtonIcon;
