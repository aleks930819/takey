import React, { Suspense, cache } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Info, ShoppingBag } from 'lucide-react';

import * as actions from 'actions/auth';

import { getRestaurant } from '@/actions/restaurants';
import { getSession } from '@/actions/auth';
import { isInFavoritesList } from '@/actions/favorites';

import NotFound from '@/app/not-found';
import { MaxWidth, PaddingContainer, SpaceContainer } from '@/components/common';
import { Reviews } from '@/components/reviews';
import { Spinner, Tooltip } from '@/components/ui';
import { FavoritesButton } from '@/components/favorites';
import { Categories } from '@/components';
import { Cart } from '@/components/cart';
import { User } from '@/interfaces/user';
import { Metadata } from 'next';

interface Props {
  params: {
    id: string;
  };
}

const getSingleRestaurant = cache(async (id: string) => {
  const { data } = await getRestaurant(id);
  return data;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const restaraunt = await getSingleRestaurant(params.id);

  if (!restaraunt) {
    return {
      title: 'Page not found',
    };
  }
  return {
    title: restaraunt.restaurant.name,
    openGraph: {
      title: restaraunt.restaurant.name,
      images: [
        {
          url: restaraunt.restaurant.image,
          width: 600,
          height: 400,
          alt: restaraunt.restaurant.name,
        },
      ],
    },
  };
}

export interface IUserInfo {
  name: string;
  _id: string;
  address: User['address'];
  accessToken: string;
}

const RestaurantPage = async ({ params }: Props) => {
  const session = await getSession();
  let userInfo: IUserInfo | undefined = undefined;

  if (session) {
    const me = await actions.getMe(session?.accessToken as string);
    userInfo = {
      _id: me?._id as string,
      name: me?.name as string,
      address: {
        streetName: me?.address?.streetName,
        streetNumber: me?.address?.streetNumber,
        phone: me?.address?.phone,
      } as User['address'],
      accessToken: session.accessToken,
    };
  }

  const data = await getSingleRestaurant(params.id);

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
      <figure className="relative block h-[150px] w-full overflow-hidden lg:hidden  lg:h-[300px] lg:w-[50%]">
        <Image src={restaurant.image} alt={restaurant.name} fill className="h-full w-full  object-cover" />
      </figure>
      <MaxWidth className="flex flex-col lg:px-4">
        <SpaceContainer variant="xsmall" />
        <PaddingContainer>
          <div className="flex h-full w-full flex-col items-center gap-5 lg:flex-row lg:gap-10 ">
            <section className="h-full w-full lg:w-[70%] ">
              <header className="flex flex-col gap-6 lg:flex-row">
                <figure className="relative hidden h-[150px] w-full overflow-hidden rounded-lg lg:block lg:h-[300px] lg:w-[50%]">
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    className="h-full w-full rounded-lg object-cover"
                  />
                </figure>
                <div className="flex flex-col gap-4 text-gray-600 lg:py-6">
                  <div className="flex flex-col gap-2 text-sm lg:text-base">
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
                  <h1 className="flex items-center gap-2 text-xl font-bold tracking-wider text-heading  lg:text-2xl">
                    {restaurant.name}
                    <span>
                      <Tooltip
                        position="bottom"
                        tooltip="Information such as opening hours, location and more about the restaurant."
                      >
                        <Link
                          href={`/restaurants/${restaurant._id}/info`}
                          className=" flex items-center gap-2 underline"
                        >
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
                <Suspense
                  fallback={
                    <div className="flex h-full w-full items-center justify-center">
                      <Spinner color="primary" size="md" />
                    </div>
                  }
                >
                  <Categories
                    categoriesIds={restaurant.categories}
                    isOpen={restaurant.isOpen}
                  />
                </Suspense>
              </MaxWidth>
            </section>
            <aside className="mb-auto h-full w-full lg:sticky lg:top-4 lg:w-[30%]">
              <Suspense fallback={<Spinner color="primary" size="md" />}>
                <Cart userInfo={userInfo} isOpen={restaurant.isOpen} />
              </Suspense>
            </aside>
          </div>
        </PaddingContainer>
      </MaxWidth>
      <SpaceContainer />
    </>
  );
};

export default RestaurantPage;
