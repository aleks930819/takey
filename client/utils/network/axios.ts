import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'test' ? 'http://localhost:3000' : `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
});

export default axiosInstance;
