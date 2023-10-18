import { useQuery } from '@tanstack/react-query';
import { get, post, remove } from './fetcher';
import { Image } from './post';

export type CreateInformationDto = {
  activityId: number;
  title: string;
  description: string;
  images: Image[];
};

export type UpdateInformationDto = {
  id: number;
  activityId: number;
  title: string;
  description: string;
  images: Image[];
};

export type InformationBoard = {
  id: number;
  activityId: number;
  title: string;
  description: string;
  images: Image[];
  createdAt: Date;
  userId: number;
  _count: {
    images: number;
  };
};

export const createInformation = (payload: CreateInformationDto) => {
  return post('/information-board', payload);
};

export const updateInformation = (payload: UpdateInformationDto) => {
  return post(`/information-board/${payload.id}`, payload);
};

export const deleteInformation = (id: number) => {
  return remove(`/information-board/${id}`);
};

export const useInformationById = (id: number, options?: any) => {
  const { data, ...other } = useQuery<InformationBoard>(
    ['information-board', id],
    () => get<InformationBoard>('/information-board/' + id),
    options,
  );
  return { information: data, ...other };
};
