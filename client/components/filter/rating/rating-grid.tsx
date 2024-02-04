'use client';

import { useState } from 'react';
import RatingButton from './rating-button';
import { useUpdateUrlSearchParams } from '@/hooks';

import { useSearchParams } from 'next/navigation';

const values = [1, 2, 3, 4, 5];

const RatingGrid = () => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const { updateURL } = useUpdateUrlSearchParams();

  const searchParams = useSearchParams();

  const ratingFromTheUrl = searchParams.get('ratingsAverage[lte]');

  const handleMouseEnter = (starValue: number) => {
    setHoveredStar(starValue);
  };

  const handleMouseLeave = () => {
    setHoveredStar(0);
  };

  const handleClick = (starValue: number) => {
    updateURL({ param: 'ratingsAverage[lte]', value: starValue.toString() });
  };

  return (
    <div className="grid w-[40%] grid-cols-5 gap-1 transition-all duration-300 ease-in-out ">
      {values.map((value) => (
        <RatingButton
          ratingValue={value}
          key={value}
          ratingFromTheUrl={ratingFromTheUrl}
          hoveredStar={hoveredStar}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(value)}
        />
      ))}
    </div>
  );
};

export default RatingGrid;
