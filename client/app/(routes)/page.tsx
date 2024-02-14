import { getAllRestaurants } from '@/actions/restaurants';
import { MaxWidth, Pagination } from '@/components/common';
import { RestaruantCard } from '@/components/restaruant';

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
  console.log(restaruants);

  if (data && data.results === 0) {
    return (
      <MaxWidth>
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
}
