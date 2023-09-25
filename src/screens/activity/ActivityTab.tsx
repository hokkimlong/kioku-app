import React from 'react';
import PostScreen from './PostScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapNavigator from '../map/Navigator';
import ChatScreen from './chatScreen';
import InformationScreen from './InformationScreen';

export type ActivityHomeTabList = {
  Home: undefined;
  Activity: undefined;
  NewActivity: undefined;
  Nearby: undefined;
  Chat: undefined;
  Map: undefined;
  Information: undefined;
};

const Tab = createBottomTabNavigator<ActivityHomeTabList>();

const ActivityTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={PostScreen}
        options={PostScreen.navigationOptions}
      />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen
        name="Information"
        component={InformationScreen}
        options={InformationScreen.navigationOptions}
      />
    </Tab.Navigator>
  );
};

export default ActivityTabs;
