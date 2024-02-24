'use server';

import { StaticPage } from '@/interfaces/static-page';
import { axiosInstance } from '@/utils/network';

interface StaticPageResponse {
  status: string;
  data: {
    page: StaticPage;
  };
}

export const getStaticPageBySlug = async (slug: string) => {
  try {
    const response = await axiosInstance.get<StaticPageResponse>(`/static-pages/${slug}`);
    return response.data.data.page as StaticPage;
  } catch (error) {
    console.error(error);
  }
};
