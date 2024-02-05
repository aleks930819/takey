import { Review } from '@/interfaces/reviews';
import { axiosInstance } from '@/utils/network';

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

const getAllReviews = async ({
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

export default getAllReviews;
