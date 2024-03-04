'use server';

import { Category } from '@/interfaces/category';
import { axiosInstance } from '@/utils/network';

export const getCategory = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/categories/${id}`);
    return response.data.data.category as Category;
  } catch (error) {
    console.error(error);
  }
};

export const getAllCategoriesForRestaurant = async (restaurantId: string) => {
  try {
    const response = await axiosInstance.get(`/categories?restaurantId=${restaurantId}`);
    return response.data.data.categories as Category[];
  } catch (error) {
    console.error(error);
  }
};
