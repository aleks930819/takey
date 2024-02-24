'use server';

import { Navigation } from '@/interfaces/navigation';
import { axiosInstance } from '@/utils/network';

interface NavigationResponse {
  status: string;
  results: number;
  data: {
    navigations: Navigation[];
  };
}

/**
 * Retrieves the navigation items from the server.
 * @param location - The location of the navigation items to retrieve (either 'footer' or 'header').
 * @returns A Promise that resolves to a NavigationResponse object.
 */
export const getNavigation = async (location: 'footer' | 'header') => {
  try {
    const response = await axiosInstance.get<NavigationResponse>(`/navigation?${location}`);
    return response.data.data.navigations as Navigation[];
  } catch (error) {
    console.error(error);
  }
};
