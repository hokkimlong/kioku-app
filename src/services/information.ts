import { useQuery } from '@tanstack/react-query';
import { get, post } from './fetcher';
import { Image } from './post';

export type CreateInformationDto = {
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
  _count: {
    images: number;
  };
};

export const createInformation = (payload: CreateInformationDto) => {
  return post('/information-board', payload);
};

export const useInformationById = (id: number) => {
  const { data, ...other } = useQuery<InformationBoard>(
    ['information-board', id],
    () => get<InformationBoard>('/information-board/' + id),
  );
  return { information: data, ...other };
};
