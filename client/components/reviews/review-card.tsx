import { Review } from '@/interfaces/reviews';
import { formatDate } from '@/utils';
import Image from 'next/image';

import OwnerActions from './owner-actions';
import RatingStars from './ratings-stars';

interface ReviewCardProps {
  review: Review;
  currentUserId: string;
}

const ReviewCard = ({ review, currentUserId }: ReviewCardProps) => {
  const { user } = review;
  const { review: reviewText, updatedAt } = review;

  const isOwner = user._id === currentUserId;

  return (
    <div className="mx-auto flex h-auto w-full flex-col  py-4 shadow-xl lg:h-[200px] lg:w-1/2 lg:flex-row lg:gap-10 lg:py-0">
      <figure className="relative  hidden h-[50px] w-[50px] overflow-hidden lg:block  lg:h-full lg:w-[30%]">
        <Image src={user.photo} alt={user.name} fill className="object-cover" />
      </figure>
      <div>
        <div className="flex flex-col items-start gap-2 px-4 py-4 lg:px-0 lg:py-6">
          <p className="flex flex-col gap-2 text-lg font-bold">
            <span className="text-sm font-normal text-gray-600">{formatDate(updatedAt)}</span>
            {user.name}
          </p>
          <p>{reviewText}</p>
        </div>

        <div className="mb-2 flex items-center justify-start gap-2 px-4 text-gray-600    lg:px-0">
          <strong>Rating:</strong>
          <RatingStars rating={review.rating} />
          {isOwner && <OwnerActions />}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
