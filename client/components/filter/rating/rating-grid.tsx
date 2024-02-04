import RatinButton from './rating-button';

const values = [1, 2, 3, 4, 5];

const RatingGrid = () => {
  return (
    <div className="grid w-[50%] grid-cols-5 gap-1">
      {values.map((value) => (
        <RatinButton ratingValue={value} key={value} />
      ))}
    </div>
  );
};

export default RatingGrid;
