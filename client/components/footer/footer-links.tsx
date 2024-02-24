import { Navigation } from '@/interfaces/navigation';
import Link from 'next/link';
import React from 'react';

const FooterNavigation = ({ navigation }: { navigation: Navigation[] | undefined }) => {
  return (
    <nav className="flex flex-wrap justify-start">
      {navigation?.map((nav, index) => (
        <ul key={index} className=" flex flex-col items-start justify-center">
          <p className="mb-4 text-lg font-bold text-heading">{nav.title}</p>
          {nav.items?.map((item, index) => (
            <li key={index} className="mb-2 text-sm text-heading">
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
    </nav>
  );
};

export default FooterNavigation;
