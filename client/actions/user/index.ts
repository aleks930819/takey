'use server';

import { axiosInstance } from '@/utils/network';
import { AxiosError } from 'axios';
import { getSession } from '../auth';

const session = getSession();

/**
 * Updates the user's address.
 *
 * @param formState - The state of the form.
 * @param formData - The form data containing the updated address information.
 * @returns The updated user data if successful, or an error message if unsuccessful.
 */
export const updateUserAddress = async (formState: any, formData: FormData) => {
  try {
    const city = formData.get('city');
    const streetName = formData.get('streetName');
    const streetNumber = formData.get('streetNumber');

    if (!city || !streetName || !streetNumber) {
      return {
        message: 'All fields are required!',
      };
    }

    const response = await axiosInstance.patch(
      '/users/me',
      {
        address: {
          city,
          streetName,
          streetNumber,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return {
        message: err.response?.data.message,
      };
    } else {
      return {
        message: 'An error occurred',
      };
    }
  }
};
