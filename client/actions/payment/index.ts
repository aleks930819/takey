'use server';

import { axiosInstance } from '@/utils/network';

interface MenuItems {
  menuItems: {
    name: string;
    price: number;
    quantity: number;
  }[];
}

export const createCheckoutSession = async ({ menuItems }: { menuItems: MenuItems }) => {
  try {
    const session = await axiosInstance.post('/payments/checkout-session', { menuItems });
    return session.data.data;
  } catch (err) {}
};
