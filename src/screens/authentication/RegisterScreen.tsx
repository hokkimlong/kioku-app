import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '~/components/form/Input';
import { PasswordInput } from '~/components/form/PasswordInput';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { Button } from '~/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailRequired, stringRequired } from '~/components/form/utils';
import { useRegister } from '~/services/authentication';
import { PartialBy } from '~/utils/type';
import { alert } from '~/utils/alert';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthenticationStackList } from './Navigator';
import { useSpinner } from '~/components/ui/Spinner';
// import { alert } from '~/utils/alert';

const schema = z
  .object({
    username: stringRequired,
    email: emailRequired,
    password: stringRequired,
    confirmPassword: stringRequired,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormSchema = PartialBy<
  z.infer<typeof schema>,
  'confirmPassword'
>;

type Props = NativeStackScreenProps<AuthenticationStackList, 'Register'>;
const RegisterScreen = ({ navigation }: Props) => {
  const { registerUser } = useRegister();
  const { openSpinner, closeSpinner } = useSpinner();

  const methods = useForm<RegisterFormSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (formData: RegisterFormSchema) => {
    openSpinner();
    registerUser(formData)
      .then(() => {
        alert.success(
          'Register Success',
          'You have register successfully!',
          () => {
            navigation.pop();
          },
        );
      })
      .catch(error => {
        alert.errorResponse('Register Failed', error);
      })
      .finally(() => {
        closeSpinner();
      });
  };

  return (
    <FormProvider {...methods}>
      <TitleContainer title="Register" description="Join, embark, and fun!">
        <Input
          name="username"
          label="Username"
          autoCapitalize="none"
          onSubmitEditing={() => methods.setFocus('email')}
          returnKeyType="next"
          placeholder="Enter your username"
        />
        <Input
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => methods.setFocus('password')}
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
        <PasswordInput
          name="password"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => methods.setFocus('confirmPassword')}
          label="Password"
          placeholder="Enter your password"
        />
        <PasswordInput
          name="confirmPassword"
          autoCapitalize="none"
          label="Confirm Password"
          returnKeyType="send"
          onSubmitEditing={methods.handleSubmit(onSubmit)}
          placeholder="Confirm your password"
        />
        <Button onPress={methods.handleSubmit(onSubmit)}>Register</Button>
      </TitleContainer>
    </FormProvider>
  );
};

export default RegisterScreen;
