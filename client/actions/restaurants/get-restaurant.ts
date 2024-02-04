import { Restaurant } from '@/interfaces/restaurants';
import { axiosInstance } from '@/utils/network';

interface RestaurantResponse {
  status: string;
  data: {
    restaurant: Restaurant;
  };
}

/**
 * Retrieves a single restaurant from the server.
 * @param id - The ID of the restaurant to retrieve.
 * @returns A promise that resolves to a Restaurant object.
 * @throws An error if the request fails.
 */
const getRestaurant = async (id: string): Promise<RestaurantResponse> => {
  try {
    const response = await axiosInstance.get(`/restaurants/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export default getRestaurant;
