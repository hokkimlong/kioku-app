import axios from 'axios';

const baseURL = '';

const axiosInstance = axios.create({ baseURL });

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
