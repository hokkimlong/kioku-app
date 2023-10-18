import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { Button } from '~/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthenticationStackList } from './Navigator';
import { PasswordInput } from '~/components/form/PasswordInput';
import { stringRequired } from '~/components/form/utils';
import { resetPassword } from '~/services/authentication';
import { useSpinner } from '~/components/ui/Spinner';
import { useMutation } from '@tanstack/react-query';
import { alert } from '~/utils/alert';

const schema = z
  .object({
    newPassword: stringRequired,
    confirmPassword: stringRequired,
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormSchema = z.infer<typeof schema>;

type Props = NativeStackScreenProps<
  AuthenticationStackList,
  'NewPasswordScreen'
>;
const NewPasswordScreen = ({ navigation, route }: Props) => {
  const { identifier, validToken } = route.params;

  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const { openSpinner, closeSpinner } = useSpinner();

  const mutation = useMutation(resetPassword, {
    onMutate() {
      openSpinner();
    },
    onSuccess() {
      navigation.popToTop();
      navigation.navigate('ResetPasswordSuccess');
    },
    onError(error: any) {
      alert.error('Error', error.response.data.message);
    },
    onSettled() {
      closeSpinner();
    },
  });

  const onSubmit = (formData: FormSchema) => {
    mutation.mutate({
      newPassword: formData.newPassword,
      identifier,
      token: validToken,
    });
  };

  return (
    <FormProvider {...methods}>
      <TitleContainer
        title="Enter new password"
        description="Connect, bond, and enjoy!">
        <PasswordInput
          name="newPassword"
          label="New Password"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => methods.setFocus('confirmPassword')}
          placeholder="Enter your new password"
        />
        <PasswordInput
          name="confirmPassword"
          label="Confirm New Password"
          autoCapitalize="none"
          onSubmitEditing={methods.handleSubmit(onSubmit)}
          returnKeyType="send"
          placeholder="Confirm you new password"
        />
        <Button onPress={methods.handleSubmit(onSubmit)}>Submit</Button>
      </TitleContainer>
    </FormProvider>
  );
};

export default NewPasswordScreen;
