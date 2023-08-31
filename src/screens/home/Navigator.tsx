import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  NativeStackHeaderProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import ProfileScreen from './ProfileScreen';
import NewActivityScreen from './NewActivityScreen';
import NotificationScreen from './NotificationScreen';
import ActivityTabs from '../activity/Navigator';
import NewActivityNavigator from './NewActivityScreen';

export type HomeStackList = {
  Home: undefined;
  Profile: undefined;
  NewActivity: undefined;
  Notification: undefined;
  ActivityDetail: undefined;
};

const Stack = createNativeStackNavigator<HomeStackList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: DefaultAppBar,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="NewActivity"
        component={NewActivityNavigator}
      />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="ActivityDetail" component={ActivityTabs} />
    </Stack.Navigator>
  );
};

export const DefaultAppBar = (props: NativeStackHeaderProps) => {
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
        <>
          <Appbar.Action
            style={style.action}
            icon={notificationIcon}
            onPress={() => props.navigation.push('Notification')}
            size={28}
          />
          <Appbar.Action
            style={style.actionRight}
            icon={profileIcon}
            onPress={() => props.navigation.push('Profile')}
            size={30}
          />
        </>
      )}
    </Appbar.Header>
  );
};

const style = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    elevation: 1,
    height: 55,
    justifyContent: 'space-between',
  },
  action: {
    marginLeft: 15,
  },
  actionRight: {
    marginRight: 30,
  },
});

const notificationIcon = () => (
  <Fontisto color={'black'} size={27} name="bell" />
);

const backIcon = () => (
  <MaterialIcon color={'black'} size={28} name="arrow-back-ios" />
);

const profileIcon = () => (
  <MaterialIcon color={'black'} size={30} name="alternate-email" />
);

export default HomeNavigator;
