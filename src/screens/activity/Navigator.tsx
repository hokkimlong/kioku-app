import React from 'react';
import PostScreen from './PostScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapNavigator from '../map/Navigator';

import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import InformationScreen from './InformationScreen';
import ChatScreen from './chatScreen';

export type ActivityHomeTabList = {
  Home: { addScreen: string };
  Activity: undefined;
  NewActivity: undefined;
  Nearby: undefined;
  Chat: undefined;
  Map: undefined;
  Information: undefined;
};

const Tab = createBottomTabNavigator<ActivityHomeTabList>();

const ActivityTabs = () => {
  console.log('postscreen', { ...PostScreen.navigationOptions() });
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={PostScreen}
        options={{
          ...PostScreen.navigationOptions(),
          tabBarIcon: () => (
            <IconFontAwesome5 name="home" size={20} color="#72d4bb" solid />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: () => (
            <IconFontAwesome6 name="comments" size={20} color="#72bcd4" solid />
          ),
        }}
      />
      <Tab.Screen
        name="Information"
        component={InformationScreen}
        options={{
          ...InformationScreen.navigationOptions(),
          tabBarIcon: () => (
            <IconFontAwesome6
              name="signs-post"
              size={20}
              color="#72d4bb"
              solid
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapNavigator}
        options={{
          tabBarIcon: () => (
            <IconFontAwesome6 name="map" size={20} color="#728bd4" solid />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ActivityTabs;
