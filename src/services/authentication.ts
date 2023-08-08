import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get, post } from './fetcher';
import { RegisterFormSchema } from '~/screens/authentication/RegisterScreen';
import { useSpinner } from '~/components/ui/Spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { alert } from '~/utils/alert';

type User = {
  id: string;
  username: string;
  email: string;
};

export const useUser = () => {
  const { data, ...other } = useQuery<User>(
    ['user'],
    () => get<User>('/auth/profile'),
    { enabled: false },
  );
  return { user: data, ...other };
};

export const accessToken = {
  TOKEN_KEY: 'token',
  async store(token: string) {
    try {
      await AsyncStorage.setItem(this.TOKEN_KEY, token);
    } catch (e) {
      alert.error(e?.title, e?.message);
    }
  },
  async remove() {
    try {
      await AsyncStorage.removeItem(this.TOKEN_KEY);
    } catch (e) {
      alert.error(e?.title, e?.message);
    }
  },
  async get() {
    try {
      return await AsyncStorage.getItem(this.TOKEN_KEY);
    } catch (e) {
      alert.error(e?.title, e?.message);
    }
  },
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = () => {
    accessToken.remove().then(() => {
      queryClient.setQueryData(['user'], null);
    });
  };
  return { logout };
};

export const useLogin = () => {
  const { openSpinner, closeSpinner } = useSpinner();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return post('/auth', { email, password });
    },
    onSuccess(response) {
      if (response.access_token) {
        accessToken.store(response.access_token);
        queryClient.invalidateQueries(['user']);
      }
    },
    onMutate() {
      openSpinner();
    },
    onSettled() {
      closeSpinner();
    },
  });

  return { ...mutation, loginUser: mutation.mutateAsync };
};

export const useRegister = () => {
  const { openSpinner, closeSpinner } = useSpinner();
  const mutation = useMutation({
    mutationFn: (formData: Omit<RegisterFormSchema, 'confirmPassword'>) => {
      return post('/auth/register', formData);
    },
    onMutate() {
      openSpinner();
    },
    onSettled() {
      closeSpinner();
    },
  });
  return { ...mutation, registerUser: mutation.mutateAsync };
};
