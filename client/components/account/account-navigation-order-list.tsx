import { accountNavigationLinks } from '@/data';
import Link from 'next/link';

const AccountNavigationOrderList = async ({ currentPath }: { currentPath: string | undefined }) => {
  return (
    <ul>
      {accountNavigationLinks.map((link) => (
        <li
          key={link.href}
          className={` mb-4 text-base hover:underline ${currentPath === link.activeLinkName ? 'font-bold text-black' : 'font-medium text-gray-500'}`}
        >
          <Link href={link.href}>{link.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default AccountNavigationOrderList;
