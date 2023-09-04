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
import { emailRequired } from '~/components/form/utils';

// import { useLogin } from '~/services/authentication';

const schema = z.object({
  email: emailRequired,
});

type FormSchema = z.infer<typeof schema>;

type Props = NativeStackScreenProps<AuthenticationStackList, 'Verification'>;
const VerificationScreen = ({ navigation }: Props) => {
  // const { loginUser } = useLogin();

  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (formData: FormSchema) => {
    // console.log(formData);
  };

  return (
    <FormProvider {...methods}>
      <TitleContainer
        title="Verfication"
        description="Connect, bond, and enjoy!">
        <Input
          keyboardType="email-address"
          name="otp"
          label="OTP"
          placeholder="Enter 4 digit code"
        />
        <View
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <LinkButton>Resend Code</LinkButton>
        </View>
        <Button onPress={() => navigation.push('NewPasswordScreen')}>
          Next
        </Button>
      </TitleContainer>
    </FormProvider>
  );
};

export default VerificationScreen;
