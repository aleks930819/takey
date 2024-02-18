import React, { Key, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Info, ShoppingBag } from 'lucide-react';

import { getRestaurant } from '@/actions/restaurants';
import { getSession } from '@/actions/auth';
import { isInFavoritesList } from '@/actions/favorites';
import { getCategory } from '@/actions/categories';

import NotFound from '@/app/not-found';
import { MaxWidth, SpaceContainer } from '@/components/common';
import { Reviews } from '@/components/reviews';
import { Spinner, Tooltip } from '@/components/ui';
import { FavoritesButton } from '@/components/favorites';
import { Categories } from '@/components';
import { Cart } from '@/components/cart';

const RestaurantPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const session = await getSession();

  const { data } = await getRestaurant(params.id);
  let isInFavorite = undefined;

  if (session) {
    isInFavorite = await isInFavoritesList({
      reastaurantId: params.id,
      userId: session.userId,
      accessToken: session.accessToken,
    });
  }

  const { restaurant } = data;

  if (!restaurant) {
    return <NotFound />;
  }

  return (
    <>
      <MaxWidth className="flex flex-col lg:px-4">
        <SpaceContainer variant="xsmall" />
        <div className="flex h-full w-full flex-col items-center gap-10 lg:flex-row ">
          <section className="h-full w-[80%] ">
            <header className="flex gap-6">
              <figure className="relative h-[300px] w-[50%] overflow-hidden rounded-lg">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="h-full w-full rounded-lg object-cover"
                />
              </figure>
              <div className="flex flex-col gap-4 py-6 text-gray-600">
                <div className="flex flex-col gap-2">
                  <p className="flex items-center gap-2">
                    <ShoppingBag size={18} />
                    <strong>Min. Order:</strong>${restaurant.minOrderPrice.toFixed(2)}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={18} />
                    <strong>Delivery Time:</strong>
                    {restaurant.deliveryTime} - min
                  </p>
                </div>
                <h1 className="flex items-center gap-2 text-3xl font-bold  text-heading">
                  {restaurant.name}
                  <span>
                    <Tooltip
                      position="bottom"
                      tooltip="Information such as opening hours, location and more about the restaurant."
                    >
                      <Link href={`/restaurants/${restaurant._id}/info`} className=" flex items-center gap-2 underline">
                        <Info size={18} />
                      </Link>
                    </Tooltip>
                  </span>
                </h1>
                <div className="flex w-full justify-center gap-2">
                  <FavoritesButton
                    className="w-full"
                    isInFavorite={isInFavorite}
                    accessToken={session?.accessToken}
                    reastaurantId={restaurant._id}
                    userId={session?.userId}
                  />
                </div>
                <Reviews
                  averageRating={restaurant.ratingsAverage as number}
                  reviewsCount={restaurant.ratingsQuantity as number}
                  rating={restaurant.ratingsAverage as number}
                  reviewsLink={`/restaurants/${restaurant._id}/reviews`}
                />
              </div>
            </header>
            <SpaceContainer variant="medium" />
            <MaxWidth>
              <Suspense fallback={<Spinner color="primary" size="md" />}>
                <Categories categoriesIds={restaurant.categories} />
              </Suspense>
            </MaxWidth>
          </section>
          <aside className="mb-auto h-full w-[40%] lg:sticky lg:top-4">
            <Cart />
          </aside>
        </div>
      </MaxWidth>
      <SpaceContainer />
    </>
  );
};

export default RestaurantPage;
