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
}: {
  reviewsCount: number;
  rating: number;
  reviewsLink: string;
}) => {
  return (
    <div className="flex items-center gap-1">
      <ReviewsStars rating={rating} />
      <Tooltip position="bottom" tooltip="See all reviews">
        <Link href={reviewsLink} className="text-heading underline">
          <p>{reviewsCount} Reviews</p>
        </Link>
      </Tooltip>
    </div>
  );
};

export default Reviews;