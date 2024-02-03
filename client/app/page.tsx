import { getAllRestaurants } from '@/actions/restaurants';
import { Button } from '@/components/ui';
import Image from 'next/image';

export default async function Home() {
  const { data } = await getAllRestaurants();

  const restaurants = data.restaurants.map((restaurant) => {
    return (
      <div key={restaurant._id}>
        <p>{restaurant.name}</p>
        <Image src={restaurant.image} alt={restaurant.name} width={50} height={50} />
        <Button variant="outline">View</Button>
      </div>
    );
  });

  return (
    <div>
      <h1>Restaurants</h1>
      {restaurants}
    </div>
  );
}
