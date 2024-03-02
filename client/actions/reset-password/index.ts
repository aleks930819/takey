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

/**
 * Resets the user's password.
 * @param formState - The state of the form.
 * @param formData - The form data containing the password, passwordConfirm, and token.
 * @returns An object with success or error messages.
 */
export const resetPassword = async (formState: any, formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');
  const passwordConfirm = formData.get('passwordConfirm');
  const token = formData.get('token');

  if (!password || !passwordConfirm || !token || !email) {
    return {
      message: 'All fields are required!',
    };
  }

  if (password !== passwordConfirm) {
    return {
      message: 'Passwords do not match',
    };
  }

  const response = await axiosInstance.post('/users/reset-password', {
    password,
    token,
    email,
  });

  if (response.status !== 200) {
    return {
      message: 'An error occurred',
    };
  }
  redirect('/reset-password/success');
};
