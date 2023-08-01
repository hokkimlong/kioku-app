import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Input } from '~/components/form/Input';
import { PasswordInput } from '~/components/form/PasswordInput';
import { FormContainer } from '~/components/ui/FormContainer';
import { LinearButton } from '~/components/ui/LinearButton';
// import { useLogin } from '~/services/authentication';

const LoginScreen = () => {
  // const { loginUser } = useLogin();

  return (
    <FormContainer title="Login" description="Connect, bond, and enjoy!">
      <Input label="Email" placeholder="Email" />
      <PasswordInput label="Password" placeholder="Password" />
      <LinearButton>Login</LinearButton>
      <Button>Forgot password?</Button>
      <View style={{ flex: 1 }} />
      <LinearButton>Login</LinearButton>
    </FormContainer>
  );
};

export default LoginScreen;
