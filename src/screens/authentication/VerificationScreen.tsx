import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '~/components/form/Input';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { Button } from '~/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import LinkButton from '~/components/ui/LinkButton';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthenticationStackList } from './Navigator';
import { forgotPassword, verifyCode } from '~/services/authentication';
import { useSpinner } from '~/components/ui/Spinner';
import { useMutation } from '@tanstack/react-query';
import { alert } from '~/utils/alert';

const schema = z.object({
  code: z.string().trim().nonempty().max(5),
});

type FormSchema = z.infer<typeof schema>;

type Props = NativeStackScreenProps<AuthenticationStackList, 'Verification'>;
const VerificationScreen = ({ navigation, route }: Props) => {
  const { identifier } = route.params;
  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });
  const { openSpinner, closeSpinner } = useSpinner();

  const mutation = useMutation(verifyCode, {
    onMutate() {
      openSpinner();
    },
    onSuccess(data: any) {
      const { validToken } = data;
      navigation.push('NewPasswordScreen', {
        identifier,
        validToken,
      });
      methods.reset({ code: '' });
    },
    onError(error: any) {
      alert.error('Error', error.response.data.message);
    },
    onSettled() {
      closeSpinner();
    },
  });

  const resendMutation = useMutation(forgotPassword, {
    onMutate() {
      openSpinner();
    },
    onError(error: any) {
      alert.error('Error', error.response.data.message);
    },
    onSettled() {
      closeSpinner();
    },
  });

  const onSubmit = (formData: FormSchema) => {
    mutation.mutate({ identifier, code: formData.code?.trim() });
  };

  return (
    <FormProvider {...methods}>
      <TitleContainer
        title="Verfication"
        description="We sent verification code to your email">
        <Input
          keyboardType="number-pad"
          name="code"
          label="Code"
          placeholder="Enter 5 digit code"
          returnKeyType="next"
          onSubmitEditing={() => methods.handleSubmit(onSubmit)}
        />
        <View
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <LinkButton
            onPress={() =>
              resendMutation.mutate({
                identifier,
              })
            }>
            Resend Code
          </LinkButton>
        </View>
        <Button onPress={methods.handleSubmit(onSubmit)}>Next</Button>
      </TitleContainer>
    </FormProvider>
  );
};

export default VerificationScreen;
