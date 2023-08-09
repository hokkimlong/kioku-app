import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { Button } from '~/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthenticationStackList } from './Navigator';
import { PasswordInput } from '~/components/form/PasswordInput';

// import { useLogin } from '~/services/authentication';

const schema = z.object({
  email: z.string().email().nonempty(),
});

type FormSchema = z.infer<typeof schema>;

type Props = NativeStackScreenProps<
  AuthenticationStackList,
  'NewPasswordScreen'
>;
const NewPasswordScreen = ({ navigation }: Props) => {
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
        title="Enter new Password"
        description="Connect, bond, and enjoy!">
        <PasswordInput
          name="password"
          label="New Password"
          placeholder="Enter your new password"
        />
        <PasswordInput
          name="password"
          label="Confirm New Password"
          placeholder="Confirm you new password"
        />
        <Button
          onPress={() => {
            navigation.push('');
          }}>
          Submit
        </Button>
      </TitleContainer>
    </FormProvider>
  );
};

export default NewPasswordScreen;
