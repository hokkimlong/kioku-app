import React, { createContext, useContext } from 'react';
import {
  NativeStackHeaderProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { Appbar } from 'react-native-paper';
import { backIcon, defaultAppbarStyle } from '../home/HomeNavigator';
import NewPostScreen from './NewPostScreen';
import { Activity } from '~/services/activity';
import CommentScreen from './CommentScreen';
import NewInformationScreen from './NewInformationScreen';
import InformationDetailScreen from './InformationDetailScreen';
import ActivityTabs from './Navigator';

export type DetailActivityStackList = {
  Post: undefined;
  NewPost: { id: number };
  NewInformation: { id: number };
  InformationDetail: { id: number };
  CommentScreen: { postId: number };
};

const Stack = createNativeStackNavigator<DetailActivityStackList>();

const ActivityContext = createContext<Activity | null>(null);

export const useActivityContext = () => useContext(ActivityContext);

const DetailActivityNavigator = (props: any) => {
  return (
    <ActivityContext.Provider value={props.route.params.activity}>
      <Stack.Navigator
        screenOptions={{
          header: DefaultAppBar,
        }}>
        <Stack.Screen
          name="Post"
          component={ActivityTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="NewPost" component={NewPostScreen} />
        <Stack.Screen name="CommentScreen" component={CommentScreen} />
        <Stack.Screen name="NewInformation" component={NewInformationScreen} />
        <Stack.Screen
          name="InformationDetail"
          component={InformationDetailScreen}
        />
      </Stack.Navigator>
    </ActivityContext.Provider>
  );
};

export const DefaultAppBar = (props: NativeStackHeaderProps) => {
  return (
    <Appbar.Header style={defaultAppbarStyle.header}>
      <Appbar.Action
        style={defaultAppbarStyle.action}
        icon={backIcon}
        onPress={props.navigation.goBack}
        size={28}
      />
    </Appbar.Header>
  );
};

export default DetailActivityNavigator;
