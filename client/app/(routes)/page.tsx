import { getAllRestaurants } from '@/actions/restaurants';
import { ClientOnly, MaxWidth } from '@/components/common';
import { RestaruantCard } from '@/components/restaruant';

export default async function Home({ searchParams }: { searchParams: any }) {
  const searchData = {
    ...searchParams,
  };
  const data = await getAllRestaurants({ searchData });

  let restaruants = null;

  if (data) {
    restaruants = data.data.restaurants;
  }

  if (data && data.results === 0) {
    return (
      <MaxWidth>
        <h1 className="text-2xl font-bold text-black">No restaurants found</h1>
      </MaxWidth>
    );
  }

  const restaurantsData = restaruants?.map((restaurant) => {
    return <RestaruantCard restaurant={restaurant} key={restaurant._id} />;
  });

  return <ClientOnly>{restaurantsData}</ClientOnly>;
}
