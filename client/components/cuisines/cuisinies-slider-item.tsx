import Image from 'next/image';
import Link from 'next/link';

import { Cuisine } from '@/interfaces/cuisines';
import { paths } from '@/utils';
import { cn } from '@/lib/utils';

const CuisinesSliderItem = ({ cuisine }: { cuisine: Cuisine }) => {
  return (
    <Link href={paths.cuisine(cuisine._id)} className="  full inline-block w-full rounded-lg">
      <figure className={cn('relative -ml-4 h-[100px] w-full overflow-hidden rounded-lg bg-gray-200 lg:ml-0 ')}>
        <Image
          src={cuisine.imageCover}
          alt={cuisine.name}
          fill
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
          className="object-cover opacity-0 transition-all duration-300 ease-in-out hover:scale-105"
        />
      </figure>
      <p className="pl-2 pt-2 text-sm font-semibold text-heading">{cuisine.name}</p>
    </Link>
  );
};

export default CuisinesSliderItem;
