'use server';

import { cookies } from 'next/headers';

export const deleteCookie = (cookieName: string) => {
  cookies().delete(cookieName);
};
