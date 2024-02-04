'use client';

import { useUpdateUrlSearchParams } from '@/hooks';
import { Star } from 'lucide-react';

const RatinButton = ({ ratingValue }: { ratingValue: number }) => {
  const { updateURL } = useUpdateUrlSearchParams();

  return (
    <button
      aria-label="Rating for restaurant search"
      onClick={() => {
        updateURL({ param: 'ratingsAverage[lte]', value: ratingValue.toString() });
      }}
    >
      <Star
        size={20}
        className="text-orange-400
       transition-all duration-300 ease-in-out hover:fill-orange-500
      "
      />
    </button>
  );
};

export default RatinButton;
