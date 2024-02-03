import Image from 'next/image';
import Link from 'next/link';

import { Cuisine } from '@/interfaces/cuisines';

const CuisinesSliderItem = ({ cuisine }: { cuisine: Cuisine }) => {
  return (
    <Link href={`/cuisines/${cuisine._id}`} className="  full inline-block w-full rounded-lg">
      <figure className="relative h-[100px] w-full overflow-hidden rounded-lg bg-gray-200 ">
        <Image
          src={cuisine.imageCover}
          alt={cuisine.name}
          fill
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
          className="object-cover opacity-0 transition-all duration-300 ease-in-out hover:scale-105"
        />
      </figure>
      <p className="text-heading pl-2 pt-2 text-sm font-semibold">{cuisine.name}</p>
    </Link>
  );
};

export default CuisinesSliderItem;
