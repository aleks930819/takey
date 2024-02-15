'use server';

import { Restaurant } from '@/interfaces/restaurants';
import { axiosInstance } from '@/utils/network';

import queryString from 'query-string';

interface RestaurantResponse {
  status: string;
  results: number;
  totalRestaurants: number;
  totalPages: number;
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
const getAllRestaurants = async ({
  searchData,
  cuisineId,
  limit = 12,
}: {
  searchData?: any;
  cuisineId?: string;
  limit?: number;
  page?: number;
}): Promise<RestaurantResponse | null> => {
  const constructQuery = (searchData: any) => {
    return queryString.stringify(searchData);
  };

  let query = '';

  if (searchData) {
    query = constructQuery(searchData);
  }

  const constructedUrl = cuisineId ? `/restaurants?cuisine=${cuisineId}&${query}` : `/restaurants?${query}`;

  try {
    const response = await axiosInstance.get(`${constructedUrl}&limit=${limit}`);

    return response.data;
  } catch (error: any) {
    return null;
  }
};

export default getAllRestaurants;
