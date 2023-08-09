import React from 'react';
import { useLogout, useUser } from '~/services/authentication';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { Text } from 'react-native-paper';
import { Button } from '~/components/ui/Button';

const ProfileScreen = () => {
  const { logout } = useLogout();
  const { user } = useUser();
  return (
    <TitleContainer title="Profile">
      <Text>@{user?.username}</Text>
      <Button onPress={logout} outlined>
        Logout
      </Button>
    </TitleContainer>
  );
};

export default ProfileScreen;
