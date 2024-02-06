import { Clock } from 'lucide-react';

import { getRestaurant } from '@/actions/restaurants';
import NotFound from '@/app/not-found';
import { MaxWidth, SpaceContainer } from '@/components/common';

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
      <SpaceContainer />
      <MaxWidth>
        <div>
          <header className="mb-10">
            <h1 className="text-center text-3xl font-bold text-heading">
              Restaurant Info about <span className="underline">{data.restaurant.name}</span>
            </h1>
          </header>
          <section className="flex w-full flex-col items-center justify-center gap-2 lg:flex-row">
            {/* WORKING HOURS */}
            <div className="h-full w-full rounded-lg p-4 shadow-2xl ">
              <h2 className="mb-4 flex items-center justify-center gap-2 text-center text-2xl font-bold text-heading">
                <Clock size={24} />
                Opening Hours
              </h2>
              {data.restaurant.openingHours.map((day) => (
                <div key={day.day}>
                  <p className="mb-2 flex w-full justify-between text-lg font-semibold ">
                    <strong>{day.day}</strong>
                    <span className="text-gray-600">
                      {day.open} - {day.close}
                    </span>
                  </p>
                </div>
              ))}
            </div>
            {/* IFRAME MAP */}
            <iframe
              loading="lazy"
              className="aspect-video w-full shadow-2xl"
              src={`https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${lng},${lat}&zoom=18`}
            ></iframe>
          </section>
        </div>
        <SpaceContainer />
      </MaxWidth>
    </>
  );
};

export default RestaruantInfoPage;
