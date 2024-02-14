import React from 'react';

const RatingStars = ({ rating }: { rating: number }) => {
  return [...Array(rating)].map((_, i) => (
    <span key={i} className={i !== 0 ? '-ml-2' : ''} role="img" aria-label="star emoji">
      ⭐️
    </span>
  ));
};

export default RatingStars;
