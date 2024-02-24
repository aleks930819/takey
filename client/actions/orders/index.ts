'use server';

import { Order } from '@/interfaces/orders';
import { axiosInstance } from '@/utils/network';

interface CreateOrderResponse {
  status: string;
  data: {
    order: Order;
  };
}

export const createOrder = async (initialState: any, formData: FormData) => {
  try {
    const city = formData.get('city');
    const streetName = formData.get('streetName');
    const streetNumber = formData.get('streetNumber');
    const phone = formData.get('phone');

    const data = {
      city,
      streetName,
      streetNumber,
      phone,
      ...initialState,
    };

    const response = await axiosInstance.post<CreateOrderResponse>('/orders', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${initialState.accessToken}`,
      },
    });

    return response.data.data.order;
  } catch (err: unknown) {
    console.log(err);
  }
};
