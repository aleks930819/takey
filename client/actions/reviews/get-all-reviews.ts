import { Review } from '@/interfaces/reviews';
import { axiosInstance } from '@/utils/network';

interface ReviewResponse {
  status: string;
  results: number;
  data: {
    reviews: Review[];
  };
}

/**
 * Retrieves all reviews for a restaurant from the server.
 * @param restaurantId - The ID of the restaurant to retrieve reviews for.
 * @returns A promise that resolves to a ReviewResponse object.
 * @throws An error if the request fails.
 */

const getAllReviews = async (restaurantId: string): Promise<ReviewResponse> => {
  try {
    const response = await axiosInstance.get(`/restaurants/${restaurantId}/reviews`);
    return response.data;
  } catch (error: any) {
    let err = new Error(error.response.data.message);
    throw err;
  }
};

export default getAllReviews;
