'use client';

import { Star } from 'lucide-react';

interface RatingButtonProps {
  ratingValue: number;
  hoveredStar: number;
  ratingFromTheUrl?: string | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const RatingButton = ({
  ratingValue,
  hoveredStar,
  onMouseEnter,
  onMouseLeave,
  onClick,
  ratingFromTheUrl,
}: RatingButtonProps) => {
  const isFilled =
    hoveredStar >= ratingValue || (ratingFromTheUrl && ratingValue <= Number(ratingFromTheUrl) ? true : false);
  return (
    <button
      type="button"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="Rating for restaurant search"
      onClick={onClick}
    >
      <Star
        size={20}
        fill={isFilled ? '#FFA500' : 'none'}
        className="text-orange-400 transition-all duration-300 ease-in-out"
      />
    </button>
  );
};

export default RatingButton;
