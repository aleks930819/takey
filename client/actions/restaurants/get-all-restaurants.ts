import { Restaurant } from '@/interfaces/restaurants';
import { axiosInstance } from '@/utils/network';

interface RestaurantResponse {
  status: string;
  results: number;
  data: {
    restaurants: Restaurant[];
  };
}

/**
 * Retrieves all restaurants from the server.
 * @param cuisineId - Optional cuisine ID to filter the restaurants by.
 * @returns A promise that resolves to a RestaurantResponse object.
 * @throws An error if the request fails.
 */
const getAllRestaurants = async (cuisineId?: string): Promise<RestaurantResponse> => {
  const constructedUrl = cuisineId ? `/restaurants?cuisine=${cuisineId}` : '/restaurants';

  try {
    const response = await axiosInstance.get(constructedUrl);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getAllRestaurants;
