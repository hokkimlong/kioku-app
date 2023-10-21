import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import { Appbar } from 'react-native-paper';
import RegisterScreen from './RegisterScreen';
import RegisterSuccess from './RegisterSuccess';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import VerificationScreen from './VerificationScreen';
import NewPasswordScreen from './NewPasswordScreen';
import { Image, StyleSheet } from 'react-native';
import ResetPasswordSuccess from './ResetPasswordSuccess';
import { Colors, backgroundColor } from '~/utils/color';

export type AuthenticationStackList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Verification: { identifier: string };
  NewPasswordScreen: { identifier: string; validToken: string };
  ResetPasswordSuccess: undefined;
  RegisterSuccess: undefined;
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
      <Stack.Screen
        name="ResetPasswordSuccess"
        component={ResetPasswordSuccess}
      />
      <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} />
    </Stack.Navigator>
  );
};

const DefaultAppBar = (props: any) => {
  return (
    <Appbar.Header style={style.header}>
      {props.back ? (
        <Appbar.Action
          style={style.action}
          icon={backIcon}
          onPress={props.navigation.goBack}
          size={28}
        />
      ) : (
        <Image
          style={{
            width: 80,
            height: 50,
            marginLeft: 10,
            objectFit: 'contain',
          }}
          source={require('../../assets/logo/logo.png')}
        />
      )}

      <Appbar.Content
        title={props.options?.headerTitle}
        color={props.options.headerTintColor}
        titleStyle={style.titleStyle}
      />
      {props.back && (
        <Image
          style={{
            width: 80,
            height: 50,
            marginRight: 10,
            objectFit: 'contain',
          }}
          source={require('../../assets/logo/logo.png')}
        />
      )}
    </Appbar.Header>
  );
};

const style = StyleSheet.create({
  header: {
    backgroundColor: Colors.background,
    elevation: 0,
    height: 70,
  },
  action: {
    marginLeft: 15,
  },
  titleStyle: {
    fontSize: 18,
  },
});

const backIcon = () => (
  <MaterialIcon color={'white'} size={28} name="arrow-back-ios" />
);

export default AuthenticationNavigator;
