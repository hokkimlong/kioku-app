import axios from 'axios';
import { accessToken } from './authentication';
import appConfig from '../config/app-config.json';

const baseURL = appConfig.baseURL;

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(
  async config => {
    const token = await accessToken.get();
    config.headers.Authorization = `Bearer ${token}`;

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

export const remove = <T>(url: string) => {
  return axiosInstance<T>({
    url,
    method: 'delete',
  }).then(response => response.data);
};

export const update = <T>(url: string, payload: any) => {
  return axiosInstance<T>({
    url,
    data: payload,
    method: 'patch',
  }).then(response => response.data);
};
