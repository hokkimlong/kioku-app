import React from 'react';
import PostScreen from './PostScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InformationScreen from './InformationScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatScreen from './ChatScreen';
import { Colors } from '~/utils/color';

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
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 1,
          borderColor: Colors.background,
        },
        tabBarActiveTintColor: Colors.primary,
        // tabBarA
        // tabBarBackground: () => Colors.background,
      }}>
      <Tab.Screen
        name="Home"
        component={PostScreen}
        options={{
          ...PostScreen.navigationOptions(),
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          // headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Information"
        component={InformationScreen}
        options={{
          ...InformationScreen.navigationOptions(),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="bulletin-board"
              size={size}
              color={color}
            />
          ),
        }}
      />
      {/* <Tab.Screen name="Map" component={MapNavigator}
        options={{
          tabBarIcon: () => (
            <IconFontAwesome6 name="map" size={20} color="#728bd4" solid />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default ActivityTabs;
