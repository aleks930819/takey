'use server';

import { AxiosError } from 'axios';

import { axiosInstance } from '@/utils/network';

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import * as validation from '@/validation';

export const getSession = () => {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return JSON.parse(session);
};

export const isExpired = (request: NextRequest) => {
  const decoded = getSession();

  if (!decoded) return true;
  return (decoded.createdAt + decoded.expiresIn) * 1000 <= Date.now();
};

/**
 * Sign in function that authenticates a user with the provided email and password.
 * @param formState - The state of the form.
 * @param formData - The form data containing the email and password.
 * @returns An object with the following properties:
 *   - If successful:
 *     - data: The response data from the server.
 *   - If there are validation errors:
 *     - message: The error message describing the validation error.
 *   - If there is an error during the sign-in process:
 *     - message: The error message describing the error.
 */
export async function signIn(formState: any, formData: FormData) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      return {
        message: 'All fields are required!',
      };
    }

    const isValidEmail = validation.isValidEmail(email as string);

    if (!isValidEmail) {
      return {
        message: 'Please enter a valid email',
      };
    }

    const { data } = await axiosInstance.post('/users/login', {
      email,
      password,
    });

    cookies().set('session', JSON.stringify(data.token), { httpOnly: true });

    return {
      data,
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return {
        message: error.response?.data.message,
      };
    } else {
      return {
        message: 'An error occurred',
      };
    }
  }
}

/**
 * Sign up function that registers a new user with the provided name, email, and password.
 * @param formState - The state of the form.
 * @param formData - The form data containing the name, email, and password.
 * @returns An object with the following properties:
 *   - If successful:
 *     - data: The response data from the server.
 *   - If there are validation errors:
 *     - message: The error message describing the validation error.
 *   - If there is an error during the sign-up process:
 *     - message: The error message describing the error.
 */
export async function signUp(formState: any, formData: FormData) {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const passwordConfirm = formData.get('passwordConfirm');

    if (!name || !email || !password || !passwordConfirm) {
      return {
        message: 'All fields are required!',
      };
    }

    const isValidEmail = validation.isValidEmail(email as string);
    const isValidName = validation.isValidName(name as string);
    const isValidPassword = validation.isValidPassword(password as string);

    if (!isValidEmail) {
      return {
        message: 'Please enter a valid email',
      };
    }

    if (!isValidPassword) {
      return {
        message: 'Password must be at least 8 characters long',
      };
    }

    if (!isValidName) {
      return {
        message: 'Please enter a valid name',
      };
    }

    if (password !== passwordConfirm) {
      return {
        message: 'Passwords do not match',
      };
    }

    const { data } = await axiosInstance.post('/users/register', {
      name,
      email,
      password,
      passwordConfirm,
    });

    return {
      data,
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error);
      return {
        message: error.response?.data.message,
      };
    } else {
      return {
        message: 'An error occurred',
      };
    }
  }
}
