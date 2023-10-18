import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';
import { Input } from '~/components/form/Input';
import { PasswordInput } from '~/components/form/PasswordInput';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { Button } from '~/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthenticationStackList } from './Navigator';
import { useLogin } from '~/services/authentication';
import { alert } from '~/utils/alert';
import { useSpinner } from '~/components/ui/Spinner';
import LinkButton from '~/components/ui/LinkButton';

const schema = z.object({
  identifier: z.string().nonempty().min(1),
  password: z.string().nonempty(),
});

type FormSchema = z.infer<typeof schema>;

type Props = NativeStackScreenProps<AuthenticationStackList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const { loginUser } = useLogin();
  const { openSpinner, closeSpinner } = useSpinner();

  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (formData: FormSchema) => {
    openSpinner();
    loginUser(formData)
      .catch(error => {
        alert.error('fail', error.response.data.message);
      })
      .finally(() => {
        closeSpinner();
      });
  };

  return (
    <FormProvider {...methods}>
      <TitleContainer title="Login" description="Connect, bond, and enjoy!">
        <Input
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          name="identifier"
          label="Username / Email"
          placeholder="Enter your username or email"
          onSubmitEditing={() => methods.setFocus('password')}
        />
        <PasswordInput
          autoCapitalize="none"
          name="password"
          label="Password"
          placeholder="Enter your password"
          onSubmitEditing={methods.handleSubmit(onSubmit)}
        />
        <Button onPress={methods.handleSubmit(onSubmit)}>Login</Button>
        <LinkButton onPress={() => navigation.push('ForgotPassword')}>
          Forgot password?
        </LinkButton>
        <View style={{ flex: 1 }} />
        <Button outlined onPress={() => navigation.push('Register')}>
          Create new account
        </Button>
      </TitleContainer>
    </FormProvider>
  );
};

export default LoginScreen;
