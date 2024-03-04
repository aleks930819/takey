import { getAllRestaurants } from '@/actions/restaurants';
import { MaxWidth, Pagination } from '@/components/common';
import { RestaruantCard } from '@/components/restaruant';
import { NoRestaurantsMessage } from '@/components/ui';

export default async function Home({ searchParams }: { searchParams: any }) {
  const searchData = {
    ...searchParams,
    fields: 'name,ratingsAverage,image,ratingsQuantity,deliveryTime,minOrderPrice,avgPrice,isOpen,openingHours',
  };
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 12;

  const data = await getAllRestaurants({ searchData, limit });

  const totalPages = data?.totalPages;
  const restaruants = data?.data?.restaurants;

  if (data && data.results === 0) {
    return <NoRestaurantsMessage />;
  }

  return (
    <section>
      {restaruants?.map((restaurant) => <RestaruantCard restaurant={restaurant} key={restaurant._id} />)}
      <Pagination totalPages={totalPages} currentPage={page} />
    </section>
  );
}
