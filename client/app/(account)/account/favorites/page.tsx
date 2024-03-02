import { getSession } from '@/actions/auth';
import { getFavoritesList } from '@/actions/favorites';

import { FavoritesRestaurant } from '@/interfaces/favorites';

import { MaxWidth, SpaceContainer } from '@/components/common';
import FavoritesCard from '@/components/favorites/favorites-card';

const FavoritesPage = async () => {
  const session = await getSession();

  const favoritesList = await getFavoritesList({
    userId: session!.userId,
    accessToken: session!.accessToken,
  });
  const restaurants = favoritesList?.data.favorite.restaurants;

  return (
    <MaxWidth>
      <section>
        <h1 className="text-2xl tracking-wider font-bold text-heading">
          Your favorite restaurants
          <span className="ml-2 text-base font-normal text-gray-500">({restaurants?.length})</span>
        </h1>
        <SpaceContainer variant="xsmall" />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants?.map((restaurant: FavoritesRestaurant) => (
            <FavoritesCard key={restaurant._id} {...restaurant} />
          ))}
        </ul>
      </section>
    </MaxWidth>
  );
};

export default FavoritesPage;
