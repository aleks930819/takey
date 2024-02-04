import { Review } from '@/interfaces/reviews';

import { Star } from 'lucide-react';

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

const Reviews = ({ reviewsCount, rating }: { reviewsCount: number; rating: number }) => {
  return (
    <div className="">
      <div className="flex items-center gap-1">
        <ReviewsStars rating={rating} />
        <p>{reviewsCount} Reviews</p>
      </div>
    </div>
  );
};

export default Reviews;
