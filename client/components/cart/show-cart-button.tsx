import { ShoppingBasket } from 'lucide-react';
import { CartItem } from '@/lib/state/cart';

const ShowCartButton = ({ items, toggleCart }: { items: CartItem[]; toggleCart: () => void }) => {
  return (
    <div className="fixed bottom-10 left-0 z-[70] ">
      <button
        onClick={toggleCart}
        className="group  rounded-sm bg-primary-dark px-4 py-2 text-white shadow-xl transition-all duration-300 ease-in-out hover:bg-primary-dark/60 hover:text-white"
      >
        <span className="realtive ">
          <ShoppingBasket size={25} />
          <span className="absolute -right-2 -top-2 rounded-full bg-primary px-1 text-xs text-white">
            {items.length}
          </span>
        </span>
      </button>
    </div>
  );
};

export default ShowCartButton;
