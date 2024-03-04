import { getSingleCuisine } from '@/actions/cuisine';
import { getAllRestaurants } from '@/actions/restaurants';
import { Pagination } from '@/components/common';
import { RestaruantCard } from '@/components/restaruant';
import { NoRestaurantsMessage } from '@/components/ui';
import { Metadata } from 'next';

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await getSingleCuisine(params.id);

  const { cuisine } = response.data;

  if (!cuisine) {
    return {
      title: 'Page not found',
    };
  }
  return {
    title: cuisine.name,
    openGraph: {
      title: cuisine.name,
      images: [
        {
          url: cuisine.imageCover,
          width: 600,
          height: 400,
          alt: cuisine.name,
        },
      ],
    },
  };
}

const CuisinesRestaruantsPage = async ({ params, searchParams }: Props) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 12;

  const searchData = {
    ...searchParams,
    fields: 'name,ratingsAverage,image,ratingsQuantity,deliveryTime,minOrderPrice,avgPrice,isOpen,openingHours',
  };

  const data = await getAllRestaurants({ cuisineId: params.id, limit, searchData });
  const totalPages = data?.totalPages;

  const restaruants = data?.data.restaurants;

  if (data && data.results === 0) {
    return <NoRestaurantsMessage />;
  }
  return (
    <section>
      {restaruants?.map((restaurant) => <RestaruantCard restaurant={restaurant} key={restaurant._id} />)}
      <Pagination totalPages={totalPages} currentPage={page} />
    </section>
  );
};

export default CuisinesRestaruantsPage;
