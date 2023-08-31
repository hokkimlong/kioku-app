import axios from 'axios';
import { accessToken } from './authentication';

const baseURL = 'http://192.168.18.10:3000';

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(
  async config => {
    const token = await accessToken.get();
    config.headers.Authorization = `Bearer ${token}`;
    console.log(token);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const get = <T>(url: string, params?: any) => {
  return axiosInstance<T>({
    url,
    params,
    method: 'get',
  }).then(response => response.data);
};

export const post = <T>(url: string, payload: any) => {
  return axiosInstance<T>({
    url,
    data: payload,
    method: 'post',
  }).then(response => response.data);
};
