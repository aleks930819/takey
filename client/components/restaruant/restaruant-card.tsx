import Image from 'next/image';
import Link from 'next/link';
import { Clock, DollarSign, ShoppingBag, Star } from 'lucide-react';

import { Restaurant } from '@/interfaces/restaurants';
import { cn } from '@/lib/utils';
import { paths } from '@/utils';

const RestaruantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Link
      href={paths.restaurant(restaurant._id)}
      key={restaurant._id}
      className={cn(
        'relative mb-10  flex h-full flex-col  overflow-hidden rounded-lg  shadow-md lg:h-[230px] lg:flex-row lg:gap-10',
      )}
    >
      {/* FIRST COLUMN */}
      <figure className=" relative h-[100px] w-full overflow-hidden bg-gray-200  lg:h-full lg:w-[40%]">
        <Image src={restaurant.image} alt={restaurant.name} fill className=" object-cover" />
      </figure>
      {/* SECOND COLUMN */}
      <div className="flex flex-col items-start  gap-3 px-4 py-4 lg:px-0  lg:py-6">
        <h2 className="text-lg font-bold lg:text-3xl">{restaurant.name}</h2>
        {/* TODO: Seperate this logic into own component  */}
        <p className="flex items-center gap-1 text-gray-600">
          <span>
            <Star size={20} fill="orange" className="text-orange-400" />
          </span>
          <strong>{restaurant.ratingsAverage}</strong>({restaurant.ratingsQuantity}) Reviews <br />
        </p>
        <p className="mb-1 flex items-center gap-2 text-sm text-gray-600 lg:text-base">
          <span className="">
            <ShoppingBag size={20} />
          </span>
          <p>
            Min. Order: <br />
          </p>
          ${restaurant.minOrderPrice.toFixed(2)}
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-600 lg:text-base">
          <span className="">
            <Clock size={20} />
          </span>
          <p>
            Min. Delivery Time: <br />
          </p>
          {restaurant.deliveryTime} min.
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-600 lg:text-base">
          <span className="">
            <DollarSign size={20} />
          </span>
          <p>
            Avg. Menu Price: <br />
          </p>
          ${restaurant.avgPrice}
        </p>
      </div>
      {restaurant.isOpen && (
        <span className="absolute left-0 top-0 bg-primary-dark px-2 py-1 text-xs text-white">Open</span>
      )}
      {!restaurant.isOpen && (
        <div
          className="bg absolute left-0
          top-0 h-full w-full
        bg-gray-200/80 px-2 py-1 text-xs text-white"
        >
          <span className="absolute left-0 top-0 bg-red-500 px-2 py-1 text-xs text-white">Closed</span>
        </div>
      )}
    </Link>
  );
};

export default RestaruantCard;
