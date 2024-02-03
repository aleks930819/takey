import { Restaurant } from '@/interfaces/restaurants';
import { axiosInstance } from '@/utils/network';

interface RestaurantResponse {
  status: string;
  results: number;
  data: {
    restaurants: Restaurant[];
  };
}

const getAllRestaurants = async (): Promise<RestaurantResponse> => {
  try {
    const response = await axiosInstance.get('/restaurants');
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getAllRestaurants;
