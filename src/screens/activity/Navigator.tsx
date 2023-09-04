import React from 'react';
import PostScreen from './PostScreen';
import {
  // BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
// import HomeScreen from '../home/HomeScreen';
// import NotificationScreen from '../home/NotificationScreen';
// import ActivityDetailScreen from '../home/ActivityDetailScreen';
// import { NativeStackHeaderProps } from '@react-navigation/native-stack';
// import { Appbar } from 'react-native-paper';
// import { backIcon, defaultAppbarStyle } from '../home/HomeNavigator';
// import { AddIcon } from '~/components/ui/AddIconButton';
// import LiveMap from '../map/LiveMap';
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
    <Tab.Navigator
    // screenOptions={{ header: DefaultAppBar }}
    >
      <Tab.Screen
        name="Home"
        // initialParams={{ addScreen: 'Activity' }}
        component={PostScreen}
        options={PostScreen.navigationOptions}
      />
      {/* <Tab.Screen name="Hs"
        component={PostScreen}
        options={PostScreen.navigationOptions}
      /> */}
      {/* <Tab.Screen name="" component={HomeScreen} /> */}
      {/* <Tab.Screen name="Nearby" component={NotificationScreen} /> */}
      {/* <Tab.Screen name="Chat" component={NotificationScreen} /> */}
      {/* <Tab.Screen name="Map" component={MapNavigator} /> */}
    </Tab.Navigator>
  );
};

export default ActivityTabs;
