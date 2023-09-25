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
import ChatScreen from './ChatScreen';

import Icon from 'react-native-vector-icons/FontAwesome5';

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
  console.log('postscreen', { ...PostScreen.navigationOptions() });
  return (
    <Tab.Navigator
    // screenOptions={{ header: DefaultAppBar }}
    >
      <Tab.Screen
        name="Homee"
        // initialParams={{ addScreen: 'Activity' }}
        component={PostScreen}
        options={{
          ...PostScreen.navigationOptions(),
          tabBarIcon: () => (
            <Icon name="home" size={20} color="#72d4bb" solid />
          ),
        }}
      />
      {/* <Tab.Screen name="Hs"
        component={PostScreen}
        options={PostScreen.navigationOptions}
      /> */}
      {/* <Tab.Screen name="" component={HomeScreen} /> */}
      {/* <Tab.Screen name="Nearby" component={NotificationScreen} /> */}
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="comments" size={20} color="#72bcd4" solid />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapNavigator}
        options={{
          tabBarIcon: () => <Icon name="map" size={20} color="#728bd4" solid />,
        }}
      />
    </Tab.Navigator>
  );
};

export default ActivityTabs;
