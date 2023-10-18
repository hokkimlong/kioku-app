import React, { useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  NativeStackHeaderProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import { Appbar, Badge, Menu } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ProfileScreen from './ProfileScreen';
import NotificationScreen from './NotificationScreen';
import NewActivityNavigator from './NewActivityScreen';
import DetailActivityNavigator from '../activity/DetailStackNavigator';
import { Activity } from '~/services/activity';
import { useLogout, useUser } from '~/services/authentication';
import { useNotifications } from '~/services/notification';
import ChangeUsername from './ChangeUsername';

export type HomeStackList = {
  Home: undefined;
  Profile: undefined;
  ChatScreen: undefined;
  NewActivity: { id?: number };
  Notification: undefined;
  ActivityDetail: { activity: Activity };
  ChangeUsername: undefined;
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
      <Stack.Screen
        name="ActivityDetail"
        options={{ headerShown: false }}
        component={DetailActivityNavigator}
      />
      <Stack.Screen name="ChangeUsername" component={ChangeUsername} />
    </Stack.Navigator>
  );
};

export const DefaultAppBar = (props: NativeStackHeaderProps) => {
  const { notifications } = useNotifications({
    enabled: !props.back,
  });

  return (
    <Appbar.Header style={defaultAppbarStyle.header}>
      {props.back ? (
        <Appbar.Action
          style={defaultAppbarStyle.action}
          icon={backIcon}
          onPress={props.navigation.goBack}
          size={28}
        />
      ) : (
        <>
          <View>
            <Appbar.Action
              style={defaultAppbarStyle.action}
              icon={notificationIcon}
              onPress={() => props.navigation.push('Notification')}
              size={28}
            />
            {notifications?.unSeenCount > 0 && (
              <Badge style={{ position: 'absolute', margin: 6 }}>
                {notifications?.unSeenCount}
              </Badge>
            )}
          </View>
          <Appbar.Action
            style={defaultAppbarStyle.actionRight}
            icon={ProfileIcon}
            onPress={() => props.navigation.push('Profile')}
            size={30}
          />
        </>
      )}
    </Appbar.Header>
  );
};

export const defaultAppbarStyle = StyleSheet.create({
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

export const backIcon = () => (
  <MaterialIcon color={'black'} size={28} name="arrow-back-ios" />
);

const ProfileIcon = () => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
  };

  const { logout } = useLogout();
  const { user } = useUser();
  return (
    // <TouchableOpacity onPress={openMenu}>
    //   <Menu
    //     visible={visible}
    //     onDismiss={closeMenu}
    //     anchor={
    //       <MaterialIcon color={'black'} size={30} name="alternate-email" />
    //     }>
    //     <Menu.Item leadingIcon="account" title={`@${user?.username}`} />
    //     <Menu.Item
    //       leadingIcon="logout"
    //       onPress={() => {
    //         logout();
    //         closeMenu();
    //       }}
    //       title="Logout"
    //     />
    //   </Menu>
    // </TouchableOpacity>
    <MaterialIcon color={'black'} size={30} name="alternate-email" />
  );
};

export default HomeNavigator;
