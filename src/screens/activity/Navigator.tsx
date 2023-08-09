import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../home/HomeScreen';
import NotificationScreen from '../home/NotificationScreen';

const Tab = createBottomTabNavigator();

const ActivityTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Activity" component={HomeScreen} />
      <Tab.Screen name="Nearby" component={NotificationScreen} />
      <Tab.Screen name="Chat" component={NotificationScreen} />
    </Tab.Navigator>
  );
};

export default ActivityTabs;
