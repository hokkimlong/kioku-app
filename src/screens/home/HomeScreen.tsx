import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useLogout } from '~/services/authentication';

const HomeScreen = () => {
  const { logout } = useLogout();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
};

export default HomeScreen;
