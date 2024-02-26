'use server';

import { Order } from '@/interfaces/orders';
import { axiosInstance } from '@/utils/network';
import { createCheckoutSession } from '../payment';
import { redirect } from 'next/navigation';

interface CreateOrderResponse {
  status: string;
  data: {
    order: Order;
  };
}

const createSession = async (initialState: any) => {
  try {
    const session = await createCheckoutSession({
      menuItems: initialState.menuItems.map((item: any) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    });
    return session.url;
  } catch (err) {}
};

export const createOrder = async (initialState: any, formData: FormData) => {
  const city = formData.get('city');
  const name = formData.get('name');
  const streetName = formData.get('streetName');
  const streetNumber = formData.get('streetNumber');
  const phone = formData.get('phone');

  let data = {};

  if (!initialState.accessToken) {
    data = {
      guest: {
        name,
        phone,
        streetName,
        streetNumber,
      },
      ...initialState,
    };
  } else {
    data = {
      city,
      streetName,
      streetNumber,
      phone,
      ...initialState,
    };
  }

  if (initialState.paymentMethod === 'credit-card') {
    const url = await createSession(initialState);
    return redirect(url);
  }

  const response = await axiosInstance.post<CreateOrderResponse>('/orders', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${initialState.accessToken}`,
    },
  });

  if (response.status === 201) {
    return redirect('/success');
  }
};

export const getMyOrders = async (accessToken: string) => {
  try {
    const response = await axiosInstance.get('/orders/my-orders', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data.orders as Order[];
  } catch (err: unknown) {
    console.log(err);
  }
};
