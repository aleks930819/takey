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
    <div className="mx-auto  flex h-full w-full flex-col justify-start  border-b   py-4  lg:w-1/2   lg:py-0">
      <div className="mb-auto flex items-center gap-4">
        <figure className="relative  hidden h-[50px] w-[50px] overflow-hidden rounded-full  lg:block">
          <Image src={user.photo} alt={user.name} fill className="object-cover" />
        </figure>
        <div className=" px-4 py-4 lg:px-0 lg:py-6">
          <p className="flex flex-col text-lg font-bold">
            {user.name}
            <span className="text-sm font-normal text-gray-600">{formatDate(updatedAt)}</span>
          </p>
        </div>
      </div>
      <div className="mb-2 flex flex-col  items-start justify-start gap-2 px-4 text-gray-600 ">
        <div className="flex gap-2">
          <RatingStars rating={review.rating} />
        </div>
        <p>{reviewText}</p>
        {isOwner && <OwnerActions review={review} />}
      </div>
    </div>
  );
};

export default ReviewCard;
