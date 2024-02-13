'use server';

import { Cuisine } from '@/interfaces/cuisines';

import { axiosInstance } from '@/utils/network';

interface CuisinesResponse {
  status: string;
  results: number;
  data: {
    cuisines: Cuisine[];
  };
}

/**
 * Retrieves all cuisines from the server.
 * @returns A Promise that resolves to a CuisinesResponse object.
 * @throws An error if the request fails.
 */
const getAllRestaurants = async (): Promise<CuisinesResponse> => {
  try {
    const response = await axiosInstance.get('/cuisines');
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getAllRestaurants;
