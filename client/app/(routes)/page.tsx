import Link from 'next/link';
import Image from 'next/image';

import { Clock, ShoppingBag, Star } from 'lucide-react';

import { getAllRestaurants } from '@/actions/restaurants';
import { ClientOnly, MaxWidth, SpaceContainer } from '@/components/common';
import { Restaurant } from '@/interfaces/restaurants';
import { cn } from '@/lib/utils';

export const RestaruantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Link
      href={`/restaurants/${restaurant._id}`}
      key={restaurant._id}
      className={cn(
        'relative mb-10  flex h-full flex-col  overflow-hidden rounded-lg  shadow-md lg:h-[220px] lg:flex-row lg:gap-10',
      )}
    >
      {/* FIRST COLUMN */}
      <figure className=" relative h-[100px] w-full overflow-hidden bg-gray-200  lg:h-full lg:w-[40%]">
        <Image src={restaurant.image} alt={restaurant.name} fill className=" object-cover" />
      </figure>
      {/* SECOND COLUMN */}
      <div className="flex flex-col items-start  gap-3 px-4 py-4 lg:px-0  lg:py-6">
        <h2 className="text-lg font-bold lg:text-3xl">{restaurant.name}</h2>
        <p className="flex items-center gap-1 text-gray-600">
          <span>
            <Star size={20} fill="orange" className="text-orange-400" />
          </span>
          <strong>{restaurant.ratingsAverage}</strong>({restaurant.ratingsQuantity}) Reviews <br />
        </p>
        <p className="mb-1 flex items-center gap-2 text-sm text-gray-600 lg:text-base">
          <span className="">
            <ShoppingBag size={20} />
          </span>
          <p>
            Min. Order: <br />
          </p>
          ${restaurant.minOrderPrice.toFixed(2)}
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-600 lg:text-base">
          <span className="">
            <Clock size={20} />
          </span>
          <p>
            Min. Delivery Time: <br />
          </p>
          {restaurant.deliveryTime} min.
        </p>
      </div>
      {restaurant.isOpen && (
        <span className="absolute left-0 top-0 bg-primary-dark px-2 py-1 text-xs text-white">Open</span>
      )}
      {!restaurant.isOpen && (
        <div
          className="bg absolute left-0
          top-0 h-full w-full
        bg-gray-200/80 px-2 py-1 text-xs text-white"
        >
          <span className="absolute left-0 top-0 bg-red-500 px-2 py-1 text-xs text-white">Closed</span>
        </div>
      )}
    </Link>
  );
};

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
        <SpaceContainer variant="medium" />
        <h1 className="text-2xl font-bold text-black">No restaurants found</h1>
      </MaxWidth>
    );
  }

  const restaurantsData = restaruants?.map((restaurant) => {
    return <RestaruantCard restaurant={restaurant} key={restaurant._id} />;
  });

  return <ClientOnly>{restaurantsData}</ClientOnly>;
}
