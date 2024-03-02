'use server';

import { revalidatePath } from 'next/cache';
import { axiosInstance } from '@/utils/network';
import { getSession } from '../auth';
import { Review } from '@/interfaces/reviews';

export const addReview = async (formState: any, formData: FormData) => {
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

interface ReviewResponse {
  status: string;
  results: number;
  totalPages: number;
  totalReviews: number;
  data: {
    reviews: Review[];
  };
}

/**
 * Retrieves all reviews for a restaurant from the server.
 * @param restaurantId - The ID of the restaurant to retrieve reviews for.
 * @param limit - The maximum number of reviews to retrieve.
 * @param page - The page number of the reviews to retrieve.
 * @returns A promise that resolves to a ReviewResponse object.
 * @throws An error if the request fails.
 */

export const getAllReviews = async ({
  restaurantId,
  limit = 12,
  page = 1,
}: {
  restaurantId: string;
  limit?: number;
  page?: number;
}): Promise<ReviewResponse> => {
  try {
    const response = await axiosInstance.get(`/restaurants/${restaurantId}/reviews?limit=${limit}&page=${page}`);
    return response.data;
  } catch (error: any) {
    let err = new Error(error.response.data.message);
    throw err;
  }
};

export const editReview = async (initialState: any, formData: FormData) => {
  const reasturantId = initialState.restaurantId;
  const reviewId = initialState.reviewId;
  const review = formData.get('review');
  const rating = Number(formData.get('rating'));
  const session = await getSession();

  const token = session?.accessToken;

  await axiosInstance.patch(
    `/restaurants/${reasturantId}/reviews/${reviewId}`,
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
};

export const deleteReview = async (restaurantId: string, reviewId: string) => {
  try {
    const session = await getSession();
    const token = session?.accessToken;

    const response = await axiosInstance.delete(`/restaurants/${restaurantId}/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    let err = new Error(error.response.data.message);
    throw err;
  }
};
