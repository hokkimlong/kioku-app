import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import { Appbar } from 'react-native-paper';
import RegisterScreen from './RegisterScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import VerificationScreen from './VerificationScreen';
import NewPasswordScreen from './NewPasswordScreen';

export type AuthenticationStackList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Verification: undefined;
  NewPasswordScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthenticationStackList>();

const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: DefaultAppBar,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
    </Stack.Navigator>
  );
};

const DefaultAppBar = props => {
  return (
    <Appbar.Header
      style={{ backgroundColor: 'white', elevation: 0, height: 70 }}>
      {props.back ? (
        <Appbar.Action
          style={{ marginLeft: 15 }}
          icon={backIcon}
          onPress={props.navigation.goBack}
          size={28}
        />
      ) : null}
      <Appbar.Content
        title={props.options.headerTitle}
        color={props.options.headerTintColor}
        titleStyle={{ fontSize: 18 }}
      />
    </Appbar.Header>
  );
};

const backIcon = props => (
  <MaterialIcon color={'black'} size={28} name="arrow-back-ios" />
);

export default AuthenticationNavigator;
