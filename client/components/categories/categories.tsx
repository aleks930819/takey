import React from 'react';
import Image from 'next/image';

import { MenuItem } from '@/interfaces/category';

import { getCategory } from '@/actions/categories';
import CategoryMenuItem from './category-menu-item';
import { SpaceContainer } from '../common';

const Categories = async ({ categoriesIds }: { categoriesIds: string[] }) => {
  const categoryData = await Promise.all(
    categoriesIds.map(async (categoryId: string) => {
      return await getCategory(categoryId);
    }),
  );

  return (
    <div className="flex h-full w-full items-center gap-4 pr-20  ">
      {categoryData.map((category, index) => (
        <div className=" flex w-full flex-col gap-4" key={index}>
          <div className=" flex  h-[300px] w-full flex-col  gap-2">
            <figure className="relative  h-full w-full overflow-hidden rounded-lg " key={category?._id}>
              <Image
                src={category?.image || ''}
                alt={category?.name || 'Category Image'}
                fill
                className="rouned-lg h-full w-full object-cover"
              />
            </figure>
            <p className="my-6 text-start text-2xl font-semibold uppercase text-gray-600">{category?.name}</p>
          </div>
          <section>
            <ul>
              {category?.menuItems.map((menuItem: MenuItem) => (
                <li key={menuItem._id}>
                  <CategoryMenuItem menuItem={menuItem} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      ))}
    </div>
  );
};

export default Categories;
