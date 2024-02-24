import { CartItem } from '@/lib/state/cart';

import CartQuantityButtons from './cart-quantity-buttons';
import RemoveCartItemButton from './remove-cart-item-button';

const CartItem = ({ item }: { item: CartItem }) => {
  return (
    <p className="flex w-full items-center justify-between border-b pb-2 text-gray-600">
      <span>
        <RemoveCartItemButton cartItemId={item._id} cartItemName={item.name} />
      </span>
      {item.name}
      <span className="flex items-center gap-2">
        <CartQuantityButtons cartItemId={item._id} />
        <p className="flex flex-col items-center gap-1">
          <strong>
            {item.cartItemQuantity} ({item.weight})
          </strong>
          <span>x ${item.price}</span>
        </p>
      </span>
    </p>
  );
};

const CartItems = ({ currentCart }: { currentCart: CartItem[] }) => {
  return (
    <ul className="mb-10 flex flex-col gap-4">
      {currentCart.map((item) => (
        <CartItem key={item._id} item={item} />
      ))}
    </ul>
  );
};

export default CartItems;
