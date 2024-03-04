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
export const getAllCuisines = async (): Promise<CuisinesResponse> => {
  try {
    const response = await axiosInstance.get('/cuisines');
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

interface CuisineResponse {
  status: string;
  data: {
    cuisine: Cuisine;
  };
}

/**
 * Retrieves a single cuisine from the server.
 * @param id The ID of the cuisine to retrieve.
 * @returns A Promise that resolves to a Cuisine object.
 * @throws An error if the request fails.
 */
export const getSingleCuisine = async (id: string): Promise<CuisineResponse> => {
  try {
    const response = await axiosInstance.get(`/cuisines/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
