import { getRestaurant } from '@/actions/restaurants';
import { getAllReviews } from '@/actions/reviews';

import NotFound from '@/app/not-found';
import { MaxWidth, SpaceContainer, GoBackButton, LoadMoreButton, Pagination } from '@/components/common';
import { ReviewCard } from '@/components/reviews';

interface RestaruantReviewsPageProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string;
  };
}

const RestaruantReviews = async ({ params, searchParams }: RestaruantReviewsPageProps) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 10;

  const data = await getAllReviews({ restaurantId: params.id, limit: 4, page });

  const { data: restaruantData } = await getRestaurant(params.id);

  const reviews = data.data.reviews;

  const { results, totalPages, totalReviews } = data;

  if (!reviews) {
    return <NotFound />;
  }

  if (results === 0) {
    return (
      <MaxWidth>
        <SpaceContainer variant="medium" />
        <h1 className="text-2xl font-bold text-black">There are no reviews for {restaruantData.restaurant.name}</h1>
      </MaxWidth>
    );
  }

  return (
    <div className="absolute left-0 top-0 z-[60] h-full w-full bg-white p-4">
      <GoBackButton className="mb-4" />
      <MaxWidth>
        <header className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-bold text-heading">
            Reviews
            <span className="ml-2 text-base text-gray-600">({totalReviews})</span>
          </h1>
          <p className="flex items-center">
            Аverage rating:
            <strong>{restaruantData.restaurant.ratingsAverage}</strong>
          </p>
        </header>
        <SpaceContainer variant="small" />

        <section>
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        </section>
        <SpaceContainer variant="small" />
        <Pagination totalPages={totalPages} currentPage={page} />
        <SpaceContainer variant="medium" />
      </MaxWidth>
    </div>
  );
};

export default RestaruantReviews;
