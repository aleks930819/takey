import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Info, ShoppingBag } from 'lucide-react';

import { getRestaurant } from '@/actions/restaurants';
import { isInFavoritesList } from '@/actions/favorites';

import NotFound from '@/app/not-found';
import { MaxWidth, SpaceContainer } from '@/components/common';
import { Reviews } from '@/components/reviews';
import { Tooltip } from '@/components/ui';
import { FavoritesButton } from '@/components/favorites';

const RestaurantPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data } = await getRestaurant(params.id);
  const isInFavorite = await isInFavoritesList(params.id);

  const { restaurant } = data;

  if (!restaurant) {
    return <NotFound />;
  }

  return (
    <>
      <div className="relative h-[200px] w-full">
        <Image src={restaurant.image} alt={restaurant.name} fill className="h-full w-full object-cover" />
      </div>
      <header className=" bg-white   py-10 shadow-lg">
        <MaxWidth className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-3xl font-bold  text-heading">{restaurant.name}</h1>
            <SpaceContainer variant="xsmall" />
            <Reviews
              reviewsCount={restaurant.ratingsQuantity as number}
              rating={restaurant.ratingsAverage as number}
              reviewsLink={`/restaurants/${restaurant._id}/reviews`}
            />
            <div className="mt-3">
              <p className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <strong>Min. Order:</strong>${restaurant.minOrderPrice.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip
              position="bottom"
              tooltip="Information such as opening hours, location and more about the restaurant."
            >
              <Link href={`/restaurants/${restaurant._id}/info`} className=" flex items-center gap-2 underline">
                See information about the restaurant
                <Info size={18} />
              </Link>
            </Tooltip>
            <FavoritesButton reastaurantId={restaurant._id} isInFavorite={isInFavorite || false} />
          </div>
        </MaxWidth>
      </header>
      <MaxWidth>
        <section></section>
      </MaxWidth>
    </>
  );
};

export default RestaurantPage;
