import Link from 'next/link';
import Image from 'next/image';

import { Clock, ShoppingBag } from 'lucide-react';

import { getAllRestaurants } from '@/actions/restaurants';
import { ClientOnly, MaxWidth } from '@/components/common';
import { Button } from '@/components/ui';

export default async function Home() {
  const { data } = await getAllRestaurants();

  const restaurants = data.restaurants.map((restaurant) => {
    return (
      <Link
        href={`/restaurants/${restaurant._id}`}
        key={restaurant._id}
        className="mb-10 flex  h-full flex-col  overflow-hidden rounded-lg  shadow-md lg:h-[200px] lg:flex-row lg:gap-10"
      >
        {/* FIRST COLUMN */}
        <figure className=" relative h-[100px] w-full overflow-hidden bg-gray-200  lg:h-full lg:w-[40%]">
          <Image src={restaurant.image} alt={restaurant.name} fill className=" object-cover" />
        </figure>
        {/* SECOND COLUMN */}
        <div className="flex flex-col items-start  gap-4 px-4 py-4 lg:px-0  lg:py-6">
          <h2 className="text-lg font-bold lg:text-3xl">{restaurant.name}</h2>
          <p className="mb-1 flex items-center gap-2 text-sm font-semibold lg:text-base">
            <span className="">
              <ShoppingBag size={20} />
            </span>
            <p>
              Min. Order: <br />
            </p>
            ${restaurant.minOrderPrice.toFixed(2)}
          </p>
          <p className="flex items-center gap-2 text-sm font-semibold lg:text-base">
            <span className="">
              <Clock size={20} />
            </span>
            <p>
              Min. Delivery Time: <br />
            </p>
            {restaurant.deliveryTime} min.
          </p>
        </div>
      </Link>
    );
  });

  return (
    <ClientOnly>
      <div>
        <MaxWidth>
          <section className="flex w-full flex-col gap-4 lg:flex-row">
            <aside className="w-full lg:w-[30%]  ">
              <div className="h-auto bg-blue-500 lg:sticky lg:top-5">
                <Button>Filter</Button>
              </div>
            </aside>
            <div className="w-full ">
              {restaurants}
              {restaurants}
              {restaurants}
              {restaurants}
              {restaurants}
              {restaurants}
            </div>
          </section>
        </MaxWidth>
      </div>
    </ClientOnly>
  );
}
