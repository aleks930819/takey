import { RatingGrid } from './rating';

const Filter = () => {
  return (
    <div>
      <div className="flex flex-col items-start gap-4 px-4 py-4 lg:px-0 lg:py-6">
        <p className="text-lg font-bold lg:text-2xl">Rating</p>
        <RatingGrid />
      </div>
    </div>
  );
};

export default Filter;
