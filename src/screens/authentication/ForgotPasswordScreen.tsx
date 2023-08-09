import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '~/components/form/Input';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { Button } from '~/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthenticationStackList } from './Navigator';

// import { useLogin } from '~/services/authentication';

const schema = z.object({
  email: z.string().email().nonempty(),
});

type FormSchema = z.infer<typeof schema>;

type Props = NativeStackScreenProps<AuthenticationStackList, 'ForgotPassword'>;
const ForgotPasswordScreen = ({ navigation }: Props) => {
  // const { loginUser } = useLogin();

  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (formData: FormSchema) => {
    console.log(formData);
  };

  return (
    <FormProvider {...methods}>
      <TitleContainer
        title="Forgot Password"
        description="Connect, bond, and enjoy!">
        <Input
          keyboardType="email-address"
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
        <Button onPress={() => navigation.push('Verification')}>
          Reset Password
        </Button>
      </TitleContainer>
    </FormProvider>
  );
};

export default ForgotPasswordScreen;
