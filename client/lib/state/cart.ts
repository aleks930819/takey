/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  name: string;
  price: number;
  _id: string;
  weight: string;
  cartItemQuantity: number;
  restaurantId: string;
}

interface CartStore {
  carts: Record<string, CartItem[]>;
  totalCartItemsPrice: Record<string, number>;
  addItem: (data: CartItem) => void;
  removeItem: (restaurantId: string, _id: string) => void;
  removeAll: (restaurantId: string) => void;
  increaseItemQuantity: (restaurantId: string, _id: string) => void;
  decreaseItemQuantity: (restaurantId: string, _id: string) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      carts: {},
      totalCartItemsPrice: {},
      addItem: (data: CartItem) => {
        const { restaurantId } = data;
        const currentItems = get().carts[restaurantId] || [];
        const existingItem = currentItems.find((item) => item._id === data._id);

        if (existingItem) {
          return toast.error('Item already in cart.');
        }

        data.cartItemQuantity = 1;

        set((state) => ({
          carts: {
            ...state.carts,
            [restaurantId]: [...currentItems, data],
          },
          totalCartItemsPrice: {
            ...state.totalCartItemsPrice,
            [restaurantId]: (state.totalCartItemsPrice[restaurantId] || 0) + Number(data.price),
          },
        }));

        toast.success(`${data.name} added to cart.`);
      },
      removeItem: (restaurantId: string, _id: string) => {
        const currentItems = get().carts[restaurantId] || [];
        const removedItem = currentItems.find((item) => item._id === _id);

        if (removedItem) {
          set((state) => ({
            carts: {
              ...state.carts,
              [restaurantId]: currentItems.filter((item) => item._id !== _id),
            },
            totalCartItemsPrice: {
              ...state.totalCartItemsPrice,
              [restaurantId]:
                (state.totalCartItemsPrice[restaurantId] || 0) -
                Number(removedItem.price) * removedItem.cartItemQuantity,
            },
          }));
        }
      },
      increaseItemQuantity: (restaurantId: string, _id: string) => {
        const currentItems = get().carts[restaurantId] || [];
        const item = currentItems.find((item) => item._id === _id);

        if (item) {
          item.cartItemQuantity += 1;
          set((state) => ({
            carts: {
              ...state.carts,
              [restaurantId]: currentItems,
            },
            totalCartItemsPrice: {
              ...state.totalCartItemsPrice,
              [restaurantId]: (state.totalCartItemsPrice[restaurantId] || 0) + Number(item.price),
            },
          }));
        }
      },
      decreaseItemQuantity: (restaurantId: string, _id: string) => {
        const currentItems = get().carts[restaurantId] || [];
        const item = currentItems.find((item) => item._id === _id);

        if (item) {
          if (item.cartItemQuantity > 1) {
            item.cartItemQuantity -= 1;
            set((state) => ({
              carts: {
                ...state.carts,
                [restaurantId]: currentItems,
              },
              totalCartItemsPrice: {
                ...state.totalCartItemsPrice,
                [restaurantId]: (state.totalCartItemsPrice[restaurantId] || 0) - Number(item.price),
              },
            }));
          } else {
            set((state) => ({
              carts: {
                ...state.carts,
                [restaurantId]: currentItems.filter((item) => item._id !== _id),
              },
              totalCartItemsPrice: {
                ...state.totalCartItemsPrice,
                [restaurantId]: (state.totalCartItemsPrice[restaurantId] || 0) - Number(item.price),
              },
            }));
          }
        }
      },
      removeAll: (restaurantId: string) => {
        set((state) => ({
          carts: {
            ...state.carts,
            [restaurantId]: [],
          },
          totalCartItemsPrice: {
            ...state.totalCartItemsPrice,
            [restaurantId]: 0,
          },
        }));
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCart;
