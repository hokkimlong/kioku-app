import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DetailActivityNavigator, { DefaultAppBar } from './DetailStackNavigator';
import PostScreen from './PostScreen';

export type ActivityHomeTabList = {
  Home: { addScreen: string };
  Activity: undefined;
  NewActivity: undefined;
  Nearby: undefined;
  Chat: undefined;
};

const Tab = createBottomTabNavigator<ActivityHomeTabList>();

const ActivityTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ header: DefaultAppBar }}>
      <Tab.Screen
        name="Home"
        // initialParams={{ addScreen: 'Activity' }}
        component={PostScreen}
        options={PostScreen.navigationOptions}
      />
      <Tab.Screen
        name="Hs"
        component={PostScreen}
        options={PostScreen.navigationOptions}
      />
      {/* <Tab.Screen name="" component={HomeScreen} /> */}
      {/* <Tab.Screen name="Nearby" component={NotificationScreen} /> */}
      {/* <Tab.Screen name="Chat" component={NotificationScreen} /> */}
    </Tab.Navigator>
  );
};

export default ActivityTabs;
