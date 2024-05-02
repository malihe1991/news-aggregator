import axios from 'axios';
import type { TApiCall } from '@/types';
import { toast } from '@/utils/toast';

const axiosInstance = () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const axiosInstance = axios.create({
    baseURL: '',
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          toast(error.response.data.message || 'Error 401: Unauthorized');
        } else {
          toast(`Error: ${error.message}`);
        }
      } else if (error.request) {
        toast('Error: No response received');
      } else {
        toast(`Error: ${error.message}`);
      }

      return Promise.reject(error);
    },
  );
  return axiosInstance;
};

const API = axiosInstance();

export const request = {
  get: async ({ url, ...config }: TApiCall) => await API.get(url, config),
  post: async ({ url, ...config }: TApiCall) => await API.post(url, config),
};
