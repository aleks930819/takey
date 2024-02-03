import { RestaruantCard } from '@/app/page';
import { getAllRestaurants } from '@/actions/restaurants';

const CuisinesRestaruantsPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data } = await getAllRestaurants(params.id);
  return (
    <>
      {data.restaurants.map((restaurant) => (
        <RestaruantCard restaurant={restaurant} key={restaurant._id} />
      ))}
    </>
  );
};

export default CuisinesRestaruantsPage;
