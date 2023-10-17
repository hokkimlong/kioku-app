import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { Button } from '~/components/ui/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthenticationStackList } from './Navigator';
import { View } from 'react-native';

type Props = NativeStackScreenProps<
  AuthenticationStackList,
  'ResetPasswordSuccess'
>;

const ResetPasswordSuccess = ({ navigation }: Props) => {
  return (
    <TitleContainer
      title="Reset Password Successful"
      description="You have reset your password successfully">
      <View style={{ height: 30 }} />
      <Button onPress={() => navigation.pop()}>Back to Login</Button>
    </TitleContainer>
  );
};

export default ResetPasswordSuccess;
