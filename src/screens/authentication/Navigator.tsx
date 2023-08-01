import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import { Appbar, useTheme } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: DefaultAppBar,
      }}>
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const DefaultAppBar = props => {
  // const { colors } = useTheme();

  return (
    <Appbar.Header style={{ backgroundColor: 'white', elevation: 0 }}>
      {props.back ? (
        <Appbar.BackAction onPress={props.navigation.goBack} size={20} />
      ) : null}
      <Appbar.Content
        title={props.options.headerTitle}
        color={props.options.headerTintColor}
        titleStyle={{ fontSize: 18 }}
      />
      {/* {withHeaderRight} */}
    </Appbar.Header>
  );
};

export default AuthenticationNavigator;
