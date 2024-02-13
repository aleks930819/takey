'use server';

import { cookies } from 'next/headers';

import { getSession } from '../auth';
import { axiosInstance } from '@/utils/network';
import { Favorites } from '@/interfaces/favorites';

interface FavoritesResponse {
  status: string;
  data: {
    favorite: Favorites;
  };
}

/**
 * Creates a new favorite list for the user.
 *
 * @description Function creates a new favorite list for the user and stores the ID of the list in a cookie.
 * @returns  A promise that resolves to a response object.
 */
export const createFavoriteList = async () => {
  const seasson = await getSession();

  if (!seasson) {
    return;
  }

  try {
    const response = await axiosInstance.post<FavoritesResponse>(`/users/${seasson.userId}/favorites`, null, {
      headers: {
        Authorization: `Bearer ${seasson.accessToken}`,
      },
    });
    cookies().set('favoritesId', response.data.data.favorite._id, {
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

/**
 * Adds a restaurant to the user's favorite list.
 *
 * @param reastaurantId - The ID of the restaurant to add to the favorite list.
 * @returns A promise that resolves to a response object.
 */
export const addToFavoritesList = async (reastaurantId: string) => {
  const seasson = await getSession();

  const favoritesId = cookies().get('favoritesId')?.value;

  if (!seasson || !favoritesId) {
    return;
  }

  try {
    const response = await axiosInstance.patch<FavoritesResponse>(
      `/users/${seasson.userId}/favorites/${favoritesId}`,
      { reastaurantId },
      {
        headers: {
          Authorization: `Bearer ${seasson.accessToken}`,
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

/**
 * Removes a restaurant from the user's favorite list.
 *
 * @param reastaurantId - The ID of the restaurant to remove from the favorite list.
 * @returns A promise that resolves to a response object.
 */
export const removeFromFavoritesList = async (reastaurantId: string) => {
  const seasson = await getSession();

  const favoritesId = cookies().get('favoritesId')?.value;

  if (!seasson || !favoritesId) {
    return;
  }

  try {
    const response = await axiosInstance.patch<FavoritesResponse>(
      `/users/${seasson.userId}/favorites/${favoritesId}/remove`,
      { reastaurantId },
      {
        headers: {
          Authorization: `Bearer ${seasson.accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

/**
 * Get the user's favorite list.
 *
 * @returns A promise that resolves to a response object.
 */
export const getFavoritesList = async () => {
  const seasson = await getSession();

  const favoritesId = cookies().get('favoritesId')?.value;

  if (!seasson || !favoritesId) {
    return;
  }

  try {
    const response = await axiosInstance.get<FavoritesResponse>(`/users/${seasson.userId}/favorites/${favoritesId}`, {
      headers: {
        Authorization: `Bearer ${seasson.accessToken}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

/**
 * Utility function to check if a restaurant is in the user's favorite list.
 *
 * @param reastaurantId - The ID of the restaurant to check.
 * @returns A promise that resolves to a boolean value.
 */
export const isInFavoritesList = async (reastaurantId: string) => {
  const seasson = await getSession();

  const favoritesId = cookies().get('favoritesId')?.value;

  if (!seasson || !favoritesId) {
    return;
  }

  try {
    const response = await axiosInstance.get(`/users/${seasson.userId}/favorites/check/${reastaurantId}`, {
      headers: {
        Authorization: `Bearer ${seasson.accessToken}`,
      },
    });
    const isRestaurantInFavorite = response.data.data.isRestaurantInFavorite;
    return isRestaurantInFavorite as boolean;
  } catch (error: unknown) {
    console.log(error);
  }
};
