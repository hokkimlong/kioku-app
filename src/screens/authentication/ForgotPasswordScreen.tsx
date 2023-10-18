import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '~/components/form/Input';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { Button } from '~/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthenticationStackList } from './Navigator';
import { useMutation } from '@tanstack/react-query';
import { useSpinner } from '~/components/ui/Spinner';
import { forgotPassword } from '~/services/authentication';
import { stringRequired } from '~/components/form/utils';
import { alert } from '~/utils/alert';

const schema = z.object({
  identifier: stringRequired,
});

export type ForgotPasswordSchema = z.infer<typeof schema>;

type Props = NativeStackScreenProps<AuthenticationStackList, 'ForgotPassword'>;
const ForgotPasswordScreen = ({ navigation }: Props) => {
  const methods = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(schema),
  });

  const { openSpinner, closeSpinner } = useSpinner();

  const mutation = useMutation(forgotPassword, {
    onMutate() {
      openSpinner();
    },
    onSuccess(data: any) {
      const { identifier } = data;
      navigation.push('Verification', { identifier });
      methods.reset({ identifier: '' });
    },
    onError(error: any) {
      alert.error('Error', error.response.data.message);
    },
    onSettled() {
      closeSpinner();
    },
  });

  const onSubmit = (formData: ForgotPasswordSchema) => {
    mutation.mutate(formData);
  };

  return (
    <FormProvider {...methods}>
      <TitleContainer
        title="Forgot Password"
        description="No worry. sometime we forget thing">
        <Input
          autoCapitalize="none"
          keyboardType="email-address"
          name="identifier"
          label="Username / Email"
          placeholder="Enter your username or email"
          returnKeyType="send"
          onSubmitEditing={methods.handleSubmit(onSubmit)}
        />
        <Button onPress={methods.handleSubmit(onSubmit)}>Reset Password</Button>
      </TitleContainer>
    </FormProvider>
  );
};

export default ForgotPasswordScreen;
