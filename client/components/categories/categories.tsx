import React from 'react';
import Image from 'next/image';

import { MenuItem } from '@/interfaces/category';

import { getCategory } from '@/actions/categories';
import CategoryMenuItem from './category-menu-item';

const Categories = async ({ categoriesIds, isOpen }: { categoriesIds: string[]; isOpen: boolean }) => {
  const categoryData = await Promise.all(
    categoriesIds.map(async (categoryId: string) => {
      return await getCategory(categoryId);
    }),
  );
  categoryData.sort((a, b) => (a?.order || 0) - (b?.order || 0));
  // const categories = await getAllCategoriesForRestaurant(restaruantId);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 pr-0  ">
      {categoryData?.map((category, index) => (
        <div className=" flex w-full flex-col gap-4" key={index}>
          <div className=" flex h-[150px]  w-full flex-col gap-2  lg:h-[300px]">
            <figure className="relative  h-full w-full overflow-hidden rounded-lg " key={category?._id}>
              <Image
                src={category?.image || ''}
                alt={category?.name || 'Category Image'}
                fill
                className="rouned-lg h-full w-full object-cover"
              />
            </figure>
            <p className="my-2 text-start text-lg font-semibold uppercase text-gray-600 lg:my-6 lg:text-2xl">
              {category?.name}
            </p>
          </div>
          <section>
            <ul>
              {category?.menuItems.map((menuItem: MenuItem) => (
                <li key={menuItem._id}>
                  <CategoryMenuItem menuItem={menuItem} isOpen={isOpen} />
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
