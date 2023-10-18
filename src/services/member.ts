import { useQuery } from '@tanstack/react-query';
import { get, remove } from './fetcher';

export type User = {
  id: string;
  username: string;
  email: string;
  activities: any[];
  posts: any[];
};

export const usersQueryKey = 'users';

export const useUsers = (search: string) => {
  const { data, ...other } = useQuery<User[]>(['users', search], () =>
    get<User[]>('/users', { search }),
  );
  return { users: data, ...other };
};

export const deleteUser = () => {
  return remove('/users/delete');
};
