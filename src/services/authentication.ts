import { useMutation, useQuery } from '@tanstack/react-query';
import { get, post } from './fetcher';

type User = {
  id: string;
  username: string;
  email: string;
};

export const useUser = () => {
  const { data, ...other } = useQuery<User>(['user'], () => get<User>('/user'));
  return { user: data, ...other };
};

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return post('/user', { email, password });
    },
  });

  return { ...mutation, loginUser: mutation.mutateAsync };
};

export const useRegister = () => {};
