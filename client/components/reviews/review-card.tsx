import { Review } from '@/interfaces/reviews';
import { formatDate } from '@/utils';
import Image from 'next/image';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { user } = review;
  const { review: reviewText, updatedAt } = review;

  return (
    <div className="mx-auto flex h-auto w-full flex-col  py-4 shadow-xl lg:h-[200px] lg:w-1/2 lg:flex-row lg:gap-10 lg:py-0">
      <figure className="relative  hidden h-[50px] w-[50px] overflow-hidden lg:block  lg:h-full lg:w-[20%]">
        <Image src={user.photo} alt={user.name} fill className="object-cover" />
      </figure>
      <div className="flex flex-col items-start gap-2 px-4 py-4 lg:px-0 lg:py-6">
        <p className="flex flex-col gap-2 text-lg font-bold">
          <span className="text-sm font-normal text-gray-600">{formatDate(updatedAt)}</span>
          {user.name}
        </p>
        <p>{reviewText}</p>
      </div>

      <div className="mb-2 flex items-start justify-start gap-2 px-4 text-gray-600 lg:ml-auto  lg:mr-2 lg:items-end lg:justify-end lg:px-0">
        <strong>Rating:</strong>
        {[...Array(review.rating)].map((_, i) => (
          <span key={i} className={i !== 0 ? '-ml-2' : ''} role="img" aria-label="star emoji">
            ⭐️
          </span>
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
