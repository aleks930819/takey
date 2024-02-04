import React from 'react';
import Image from 'next/image';

import { getRestaurant } from '@/actions/restaurants';

import NotFound from '@/app/not-found';
import { MaxWidth, SpaceContainer } from '@/components/common';
import { Reviews } from '@/components/reviews';

const RestaurantPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data } = await getRestaurant(params.id);

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
        <MaxWidth>
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-3xl font-bold  text-heading">{restaurant.name}</h1>
            <SpaceContainer variant="xsmall" />
            <Reviews reviewsCount={restaurant.ratingsQuantity as number} rating={restaurant.ratingsAverage as number} />
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
