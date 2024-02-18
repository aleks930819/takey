import { MenuItem } from '@/interfaces/category';
import { AddToCartButton } from '../cart';

const CategoryMenuItem = ({ menuItem }: { menuItem: MenuItem }) => {
  return (
    <div className="mb-2 flex justify-between  rounded-lg bg-gray-200 px-4 py-6 text-heading">
      <div>
        <p className="mb-2 text-xl">
          <strong>{menuItem?.name}</strong>
        </p>
        <p className="mb-2 text-gray-700">{menuItem?.description}</p>
        <p className="mb-2 text-gray-700">
          <em>{menuItem?.weight}</em>
        </p>
        <strong className="text-xl">${menuItem?.price?.toFixed(2)}</strong>
      </div>
      <div className="mb-auto">
        <AddToCartButton menuItem={menuItem} />
      </div>
    </div>
  );
};

export default CategoryMenuItem;
