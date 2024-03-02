'use server';

import { axiosInstance } from '@/utils/network';
import { redirect } from 'next/navigation';

/**
 * Sends a reset password link to the user's email.
 * @param formState - The state of the form.
 * @param formData - The form data containing the email.
 * @returns An object with success or error messages.
 */
export const sendResetPasswordLink = async (formState: any, formData: FormData) => {
  const email = formData.get('email');

  if (!email) {
    return {
      message: 'Email is required',
    };
  }
  const response = await axiosInstance.post('/users/reset-password', {
    email,
  });

  if (response.status !== 200) {
    return {
      message: 'An error occurred',
    };
  }
  redirect('/forgot-password/success');
};
