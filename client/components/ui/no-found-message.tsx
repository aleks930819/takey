import { MaxWidth, SpaceContainer } from '../common';

const NoRestaurantsMessage = () => {
  return (
    <MaxWidth>
      <SpaceContainer variant="medium" />
      <h1 className="text-center text-lg lg:text-2xl font-bold tracking-wide text-heading">No restaurants found</h1>
      <SpaceContainer variant="medium" />
    </MaxWidth>
  );
};

export default NoRestaurantsMessage;
