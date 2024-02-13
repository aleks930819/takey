import { getFavoritesList } from '@/actions/favorites';
import { MaxWidth, SpaceContainer } from '@/components/common';
import FavoritesCard from '@/components/favorites/favorites-card';
import { FavoritesRestaurant } from '@/interfaces/favorites';

const FavoritesPage = async () => {
  const favoritesList = await getFavoritesList();
  const restaurants = favoritesList?.data.favorite.restaurants;

  return (
    <MaxWidth>
      <section>
        <h1 className="text-2xl font-bold text-heading">
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
