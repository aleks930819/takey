'use server';

import { AxiosError } from 'axios';

import { axiosInstance } from '@/utils/network';

import { cookies } from 'next/headers';

import * as validation from '@/validation';
import { User } from '@/interfaces/user';
import { createFavoriteList } from '../favorites';

export const logOut = () => {
  cookies().set('session', '', { expires: new Date(0) });
};

interface Session {
  userId: string;
  accessToken: string;
  expiresAt: Date;
}

export const getSession = () => {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return JSON.parse(session) as Session;
};

export const isExpired = () => {
  const decoded = getSession();

  if (!decoded) return true;

  const expirationTime = new Date(decoded.expiresAt);
  const currentTime = new Date();

  return expirationTime < currentTime;
};
interface TokenResponse {
  accessToken: string;
  createdAt: number;
  expiresIn: number;
}

/**
 * Sign in function that authenticates a user with the provided email and password.
 * @param formState - The state of the form.
 * @param formData - The form data containing the email and password.
 * @returns An object with success or error messages and data(token).
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

    const userFavoriteList = await axiosInstance.get(`/users/${data.token.userId}/favorites`, {
      headers: {
        Authorization: `Bearer ${data.token.accessToken}`,
      },
    });

    // Get the user's favorite list if it doesn't have one
    if (!userFavoriteList.data.data.favorite) {
      await createFavoriteList({
        userId: data.token.userId,
        accessToken: data.token.accessToken,
      });
    }

    cookies().set('session', JSON.stringify(data.token), { httpOnly: true });

    return {
      data: data.token as TokenResponse,
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
 * @returns An object with success or error messages and data(token).
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
      data: data.token as TokenResponse,
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
 *
 * @param token  - The token of the user.
 * @returns An object with the following properties:
 */
export async function getMe(token: string) {
  try {
    const { data } = await axiosInstance.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data.user as User;
  } catch (error: unknown) {}
}
