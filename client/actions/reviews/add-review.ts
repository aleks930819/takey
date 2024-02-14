'use server';

import { axiosInstance } from '@/utils/network';
import { getSession } from '../auth';
import { revalidatePath } from 'next/cache';

const addReview = async (formState: any, formData: FormData) => {
  try {
    const review = formData.get('review');
    const rating = Number(formData.get('rating'));
    const reasturantId = formData.get('restaurantId');
    const session = await getSession();

    const token = session?.accessToken;

    const response = await axiosInstance.post(
      `/restaurants/${reasturantId}/reviews`,
      {
        review,
        rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    revalidatePath(`/restaurants/${reasturantId}/reviews`);
    return response.data;
  } catch (error: any) {
    let err = new Error(error.response.data.message);
    throw err;
  }
};

export default addReview;
