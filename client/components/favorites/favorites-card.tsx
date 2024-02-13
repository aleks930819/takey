import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import { FavoritesRestaurant } from '@/interfaces/favorites';
import { paths } from '@/utils';

const FavoritesCard = ({ _id, name, image }: FavoritesRestaurant) => {
  return (
    <Link
      href={paths.restaurant(_id)}
      className="group relative flex h-[300px] cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg bg-white p-4 shadow-lg transition-all duration-300 ease-in-out  hover:shadow-xl"
    >
      <figure className="opacity90 absolute h-full w-full">
        <Image src={image} alt={name} fill className="h-full w-full object-cover" />
      </figure>

      <div className="absolute bottom-0 z-10 flex h-1/2 w-full translate-y-full transform items-center justify-center bg-black/90 opacity-0 transition-all duration-300 ease-in-out group-hover:z-20 group-hover:translate-y-0  group-hover:bg-black/70 group-hover:opacity-100">
        <h2 className="text-2xl font-bold text-white">{name}</h2>
      </div>
    </Link>
  );
};

export default FavoritesCard;
