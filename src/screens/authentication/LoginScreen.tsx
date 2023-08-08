import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';
import { Input } from '~/components/form/Input';
import { PasswordInput } from '~/components/form/PasswordInput';
import { FormContainer } from '~/components/ui/FormContainer';
import { Button } from '~/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import LinkButton from '~/components/ui/LinkButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthenticationStackList } from './Navigator';
import { useLogin } from '~/services/authentication';
import { alert } from '~/utils/alert';

// import { useLogin } from '~/services/authentication';

const schema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

type FormSchema = z.infer<typeof schema>;

type Props = NativeStackScreenProps<AuthenticationStackList, 'Login'>;
const LoginScreen = ({ navigation }: Props) => {
  const { loginUser } = useLogin();

  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (formData: FormSchema) => {
    loginUser(formData)
      .then(response => {
        console.log(response);
        alert.success('Success', 'login success');
      })
      .catch(error => {
        alert.error('fail', error.response.data.message);
      });
  };

  return (
    <FormProvider {...methods}>
      <FormContainer title="Login" description="Connect, bond, and enjoy!">
        <Input
          keyboardType="email-address"
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Enter your password"
        />
        <Button onPress={methods.handleSubmit(onSubmit)}>Login</Button>
        <LinkButton onPress={() => navigation.push('ForgotPassword')}>
          Forgot password?
        </LinkButton>
        <View style={{ flex: 1 }} />
        <Button outlined onPress={() => navigation.push('Register')}>
          Create new account
        </Button>
      </FormContainer>
    </FormProvider>
  );
};

export default LoginScreen;
