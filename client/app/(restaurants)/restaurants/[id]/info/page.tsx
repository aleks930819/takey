import { Clock } from 'lucide-react';

import { getRestaurant } from '@/actions/restaurants';
import NotFound from '@/app/not-found';
import { MaxWidth, PaddingContainer, SpaceContainer } from '@/components/common';
import Image from 'next/image';

const RestaruantInfoPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data } = await getRestaurant(params.id);

  if (!data.restaurant) {
    return <NotFound />;
  }

  const [lng, lat] = data.restaurant.location.coordinates;

  return (
    <>
      <SpaceContainer className="hidden lg:block" />
      <MaxWidth>
        <div>
          <header className="mb-10">
            <figure className="relative h-[200px] w-full overflow-hidden rounded-lg">
              <Image src={data.restaurant.image} fill className="object-cover " alt={data.restaurant.image} />
            </figure>
            <PaddingContainer>
              <h1 className="my-6 text-start text-3xl font-bold text-heading">{data.restaurant.name}</h1>
            </PaddingContainer>
          </header>
          <PaddingContainer>
            <section className="flex w-full flex-col items-start justify-center gap-6 ">
              {/* WORKING HOURS */}
              <div className="h-full w-full rounded-lg p-4  ">
                <h2 className="mb-4 flex items-center justify-start gap-2 border-b pb-2 text-center text-2xl font-bold text-heading">
                  <Clock size={24} />
                  Opening Hours
                </h2>

                <ul className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                  {data.restaurant.openingHours.map((day) => (
                    <li key={day.day} className="border-b py-2 ">
                      <p className="mb-2 flex w-full flex-col justify-between  text-lg font-semibold ">
                        <strong>{day.day}</strong>
                        <span className="text-gray-600">
                          {day.open} - {day.close}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              {/* IFRAME MAP */}
              <p className="text-start text-xl font-bold">Location</p>
              <iframe
                loading="lazy"
                className="aspect-video w-full overflow-hidden rounded-lg "
                src={`https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${lng},${lat}&zoom=18`}
              ></iframe>
            </section>
          </PaddingContainer>
        </div>
        <SpaceContainer />
      </MaxWidth>
    </>
  );
};

export default RestaruantInfoPage;
