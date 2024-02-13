'use server';

import { cookies } from 'next/headers';

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
 * @param userId - The ID of the user.
 * @param accessToken - The user's access token.
 * @returns  A promise that resolves to a response object.
 */
export const createFavoriteList = async ({ userId, accessToken }: { userId: string; accessToken: string }) => {
  try {
    const response = await axiosInstance.post<FavoritesResponse>(`/users/${userId}/favorites`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
   @param userId - The ID of the user.
*  @param accessToken - The user's access token.
 * @returns A promise that resolves to a response object.
 */
export const addToFavoritesList = async ({
  reastaurantId,
  userId,
  accessToken,
}: {
  reastaurantId: string;
  userId: string;
  accessToken: string;
}) => {
  try {
    const response = await axiosInstance.post<FavoritesResponse>(
      `/users/${userId}/favorites/add`,
      { reastaurantId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

/**
 * Removes a restaurant from the user's favorite list.
 *
 * @param reastaurantId - The ID of the restaurant to remove from the favorite list.
 * @param userId - The ID of the user.
 *  @param accessToken - The user's access token.
 * @returns A promise that resolves to a response object.
 */
export const removeFromFavoritesList = async ({
  reastaurantId,
  userId,
  accessToken,
}: {
  reastaurantId: string;
  userId: string;
  accessToken: string;
}) => {
  try {
    const response = await axiosInstance.delete<FavoritesResponse>(
      `/users/${userId}/favorites/remove/${reastaurantId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
 * @param userId - The ID of the user.
 * @param accessToken - The user's access token.
 * @returns A promise that resolves to a response object.
 */
export const getFavoritesList = async ({ userId, accessToken }: { userId: string; accessToken: string }) => {
  try {
    const response = await axiosInstance.get<FavoritesResponse>(`/users/${userId}/favorites`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
 * @param userId - The ID of the user.
 * @param accessToken - The user's access token.
 * @returns A promise that resolves to a boolean value.
 */
export const isInFavoritesList = async ({
  reastaurantId,
  userId,
  accessToken,
}: {
  reastaurantId: string;
  userId: string;
  accessToken: string;
}) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}/favorites/check/${reastaurantId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const isRestaurantInFavorite = response.data.data.isRestaurantInFavorite;
    return isRestaurantInFavorite as boolean;
  } catch (error: unknown) {
    console.log(error);
  }
};
