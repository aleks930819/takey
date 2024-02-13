import { getAllRestaurants } from '@/actions/restaurants';
import { MaxWidth, Pagination, SpaceContainer } from '@/components/common';
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
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 12;

  const data = await getAllRestaurants({ cuisineId: params.id, limit, searchData: { ...searchParams } });
  const totalPages = data?.totalPages;

  const restaruants = data?.data.restaurants;

  if (data && data.results === 0) {
    return (
      <MaxWidth>
        <SpaceContainer variant="medium" />
        <h1 className="text-2xl font-bold text-black">No restaurants found</h1>
      </MaxWidth>
    );
  }
  return (
    <section>
      {restaruants?.map((restaurant) => <RestaruantCard restaurant={restaurant} key={restaurant._id} />)}
      <Pagination totalPages={totalPages} currentPage={page} />
    </section>
  );
};

export default CuisinesRestaruantsPage;
