import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '~/components/form/Input';
import { PasswordInput } from '~/components/form/PasswordInput';
import { FormContainer } from '~/components/ui/FormContainer';
import { Button } from '~/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';

// import { useLogin } from '~/services/authentication';

const schema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

type FormSchema = z.infer<typeof schema>;

const RegisterScreen = () => {
  // const { loginUser } = useLogin();

  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (formData: FormSchema) => {
    console.log(formData);
  };

  return (
    <FormProvider {...methods}>
      <FormContainer title="Register" description="Connect, bond, and enjoy!">
        <Input
          name="username"
          label="Username"
          placeholder="Enter your username"
        />
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
        <PasswordInput
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
        />
        <Button onPress={methods.handleSubmit(onSubmit)}>Register</Button>
      </FormContainer>
    </FormProvider>
  );
};

export default RegisterScreen;
