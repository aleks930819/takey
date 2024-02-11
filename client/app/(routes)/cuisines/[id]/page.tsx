import { getAllRestaurants } from '@/actions/restaurants';
import { MaxWidth, SpaceContainer } from '@/components/common';
import { RestaruantCard } from '@/components/restaruant';

const CuisinesRestaruantsPage = async ({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string;
  };
}) => {
  const data = await getAllRestaurants({ cuisineId: params.id, searchData: { ...searchParams } });

  let restaruants = null;

  if (data) {
    restaruants = data.data.restaurants;
  }

  if (data && data.results === 0) {
    return (
      <MaxWidth>
        <SpaceContainer variant="medium" />
        <h1 className="text-2xl font-bold text-black">No restaurants found</h1>
      </MaxWidth>
    );
  }
  return <>{restaruants?.map((restaurant) => <RestaruantCard restaurant={restaurant} key={restaurant._id} />)}</>;
};

export default CuisinesRestaruantsPage;
