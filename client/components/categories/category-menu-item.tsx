import { MenuItem } from '@/interfaces/category';
import { AddToCartButton } from '../cart';

const CategoryMenuItem = ({ menuItem, isOpen }: { menuItem: MenuItem; isOpen: boolean }) => {
  return (
    <div className="mb-2 flex w-full justify-between  rounded-lg bg-gray-200 px-4 py-6 text-heading">
      <div>
        <p className="mb-2 text-lg lg:text-xl">
          <strong>{menuItem?.name}</strong>
        </p>
        <p className="mb-2 text-sm text-gray-700 lg:text-base">{menuItem?.description}</p>
        <p className="mb-2 text-sm text-gray-700 lg:text-base">
          <em>{menuItem?.weight}</em>
        </p>
        <strong className="text-lg lg:text-xl">${menuItem?.price?.toFixed(2)}</strong>
      </div>
      <div className="mb-auto">
        <AddToCartButton menuItem={menuItem} aria-disabled={!isOpen} disabled={!isOpen} />
      </div>
    </div>
  );
};

export default CategoryMenuItem;
