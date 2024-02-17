'use server';

import { axiosInstance } from '@/utils/network';
import { AxiosError } from 'axios';
import { getSession } from '../auth';

const session = getSession();

const updateUser = async ({ data }: { data: any }) => {
  try {
    const response = await axiosInstance.patch('/users/me', data, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

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
    const phone = formData.get('phone');

    if (!city || !streetName || !streetNumber || !phone) {
      return {
        message: 'All fields are required!',
      };
    }

    const data = {
      address: {
        city,
        streetName,
        streetNumber,
        phone,
      },
    };
    return updateUser({ data });
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

/**
 * Updates the user's profile.
 *
 * @param formState - The state of the form.
 * @param formData - The form data containing the updated profile information.
 * @returns The updated user data if successful, or an error message if unsuccessful.
 */
export const updateUserProfile = async (formState: any, formData: FormData) => {
  try {
    const name = formData.get('name');
    const email = formData.get('email');

    if (!name || !email) {
      return {
        message: 'All fields are required!',
      };
    }

    const data = {
      name,
      email,
    };
    return updateUser({ data });
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      console.log(err.response?.data.message);
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

/**
 * Updates the user's password.
 *
 * @param formState - The state of the form.
 * @param formData - The form data containing the updated password information.
 * @returns The updated user data if successful, or an error message if unsuccessful.
 */
export const updateUserPassword = async (formState: any, formData: FormData) => {
  try {
    const password = formData.get('password');
    const passwordConfirm = formData.get('passwordConfirm');

    if (!password || !passwordConfirm) {
      return {
        message: 'All fields are required!',
      };
    }

    if (password !== passwordConfirm) {
      return {
        message: 'Passwords do not match!',
      };
    }

    const data = {
      password,
      passwordConfirm,
    };
    return updateUser({ data });
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
