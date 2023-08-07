import {
  MutateOptions,
  UseMutationOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { get, post } from './fetcher';
import { RegisterFormSchema } from '~/screens/authentication/RegisterScreen';

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

export const useRegister = () => {
  const mutation = useMutation({
    mutationFn: (formData: Omit<RegisterFormSchema, 'confirmPassword'>) => {
      return post('/auth/register', formData);
    },
  });
  return { ...mutation, registerUser: mutation.mutateAsync };
};
