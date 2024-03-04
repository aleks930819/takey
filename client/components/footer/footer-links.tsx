import { Cuisine } from '@/interfaces/cuisines';
import { Navigation } from '@/interfaces/navigation';
import Link from 'next/link';
import React from 'react';

interface FooterNavigationProps {
  navigation: Navigation[] | undefined;
  cuisines: Cuisine[];
}

const FooterNavigation = ({ navigation, cuisines }: FooterNavigationProps) => {
  return (
    <nav className="flex flex-wrap justify-start gap-10">
      {navigation?.map((nav) => (
        <ul key={nav._id} className="mb-auto flex flex-col items-start justify-center">
          <p className="mb-2  text-lg font-bold text-heading">{nav.title}</p>
          {nav.items?.map((item, index) => (
            <li key={index} className=" text-sm text-heading">
              <Link
                prefetch={false}
                href={item.link}
                className=" transition-all duration-300 ease-in-out hover:underline"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ))}
      <ul className="mb-auto flex flex-col items-start justify-center">
        <p className="mb-2  text-lg font-bold text-heading">Cuisines</p>
        {cuisines?.map((cuisine, index) => (
          <li key={index} className=" text-sm text-heading">
            <Link
              prefetch={false}
              href={`/cuisines/${cuisine._id}`}
              className=" transition-all duration-300 ease-in-out hover:underline"
            >
              {cuisine.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterNavigation;
