import axios from 'axios';

const baseURL = '';

const axiosInstance = axios.create({ baseURL });

export const createQuery = <T>(url: string, params?: any) => {
  return axiosInstance<T>({
    url,
    params,
    method: 'get',
  });
};
