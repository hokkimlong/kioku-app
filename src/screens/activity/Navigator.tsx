import React from 'react';
import {
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '../home/HomeScreen';
import NotificationScreen from '../home/NotificationScreen';
import ActivityDetailScreen from '../home/ActivityDetailScreen';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Appbar } from 'react-native-paper';
import { backIcon, defaultAppbarStyle } from '../home/HomeNavigator';
import { AddIcon } from '~/components/ui/AddIconButton';
import LiveMap from '../map/LiveMap';
import MapNavigator from '../map/Navigator';

export type ActivityHomeTabList = {
  Home: { addScreen: string };
  Activity: undefined;
  NewActivity: undefined;
  Nearby: undefined;
  Chat: undefined;
  Map: undefined;
};

const Tab = createBottomTabNavigator<ActivityHomeTabList>();

const ActivityTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ header: DefaultAppBar }}>
      <Tab.Screen
        name="Home"
        initialParams={{ addScreen: 'Activity' }}
        component={ActivityDetailScreen}
      />
      {/* <Tab.Screen name="" component={ActivityDetailScreen} /> */}
      {/* <Tab.Screen name="List" component={ActivityDetailScreen} /> */}
      {/* <Tab.Screen name="" component={HomeScreen} /> */}
      {/* <Tab.Screen name="Nearby" component={NotificationScreen} /> */}
      {/* <Tab.Screen name="Chat" component={NotificationScreen} /> */}
      <Tab.Screen name="Map" component={MapNavigator} />
    </Tab.Navigator>
  );
};

export const DefaultAppBar = (props: BottomTabHeaderProps) => {
  props.route.params;
  return (
    <Appbar.Header style={defaultAppbarStyle.header}>
      <Appbar.Action
        style={defaultAppbarStyle.action}
        icon={backIcon}
        onPress={props.navigation.goBack}
        size={28}
      />
      {props.route.params && 'addScreen' in props.route.params && (
        <Appbar.Action
          style={defaultAppbarStyle.action}
          icon={AddIcon}
          onPress={props.navigation.goBack}
          size={36}
        />
      )}
    </Appbar.Header>
  );
};

export default ActivityTabs;
