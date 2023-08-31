import { useQuery } from '@tanstack/react-query';
import { get } from './fetcher';

export type User = {
  id: string;
  username: string;
  email: string;
};

export const useUsers = () => {
  const { data, ...other } = useQuery<User[]>(['users'], () =>
    get<User[]>('/users'),
  );
  return { users: data, ...other };
};
