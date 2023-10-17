import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get, post } from './fetcher';
import { RegisterFormSchema } from '~/screens/authentication/RegisterScreen';
// import { useSpinner } from '~/components/ui/Spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { alert } from '~/utils/alert';
import { User } from './member';
import { useSpinner } from '~/components/ui/Spinner';
import { ForgotPasswordSchema } from '~/screens/authentication/ForgotPasswordScreen';

export const useUser = () => {
  const { data, ...other } = useQuery<User>(['user'], () =>
    get<User>('/auth/profile'),
  );
  return { user: data, ...other };
};

export const accessToken = {
  TOKEN_KEY: 'token',
  async store(token: string) {
    try {
      await AsyncStorage.setItem(this.TOKEN_KEY, token);
    } catch (e: any) {
      alert.error(e?.title, e?.message);
    }
  },
  async remove() {
    try {
      await AsyncStorage.removeItem(this.TOKEN_KEY);
    } catch (e: any) {
      alert.error(e?.title, e?.message);
    }
  },
  async get() {
    try {
      return await AsyncStorage.getItem(this.TOKEN_KEY);
    } catch (e: any) {
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
    mutationFn: ({
      identifier,
      password,
    }: {
      identifier: string;
      password: string;
    }) => {
      return post('/auth', { identifier, password });
    },
    onSuccess(response: any) {
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

export const forgotPassword = (formData: ForgotPasswordSchema) => {
  return post('/auth/forgot-password', formData);
};

export const verifyCode = (formData: { identifier: string; code: string }) => {
  return post('/auth/verify-forgot-password', formData);
};

export const resetPassword = (formData: {
  token: string;
  newPassword: string;
  identifier: string;
}) => {
  return post('/auth/reset-password', formData);
};
