import { create } from 'zustand';

interface RestaurantIdState {
  restaurantId: string;
  // eslint-disable-next-line no-unused-vars
  setRestaurantId: (restaurantId: string) => void;
}

const useRestaurantIdState = create<RestaurantIdState>((set) => ({
  restaurantId: '',
  setRestaurantId: (restaurantId) => set({ restaurantId }),
}));

export default useRestaurantIdState;
