import { Star } from 'lucide-react';
import Link from 'next/link';
import { Tooltip } from '../ui';

const ReviewsStars = ({ rating }: { rating: number }) => {
  return [...Array(5)].map((_, i) => {
    const ratingValue = i + 1;
    return (
      <span key={i}>
        <Star size={20} fill={ratingValue <= rating ? 'orange' : 'none'} className="text-orange-400" />
      </span>
    );
  });
};

// TODO: Rename this component with a more descriptive name
const Reviews = ({
  reviewsCount,
  rating,
  reviewsLink,
  averageRating,
}: {
  reviewsCount: number;
  rating: number;
  reviewsLink: string;
  averageRating: number;
}) => {
  return (
    <div className="flex flex-col gap-2 text-gray-600">
      <p className="text-lg ">
        Rating: <strong>{averageRating.toFixed(2)}</strong>
      </p>
      <div className="flex">
        <ReviewsStars rating={rating} />
        <Tooltip position="bottom" tooltip="See all reviews">
          <Link href={reviewsLink} className="ml-2 underline">
            <p>{reviewsCount} Reviews</p>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default Reviews;
