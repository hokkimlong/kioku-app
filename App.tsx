import 'react-native-gesture-handler';
import { PaperProvider, MD3LightTheme, Text } from 'react-native-paper';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AuthenticationNavigator from './src/screens/authentication/Navigator';
import HomeNavigator from './src/screens/home/HomeNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUser } from './src/services/authentication';
import './src/utils/s3';
import SpinnerProvider from '~/components/ui/Spinner';
import { Colors } from '~/utils/color';
import appConfig from './src/config/app-config.json';

const queryClient = new QueryClient();

function Main() {
  const paperTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: Colors.primary,
      text: Colors.textColorPrimary,
      onSurface: Colors.textColorPrimary,
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={paperTheme}>
        <SpinnerProvider>
          <App />
        </SpinnerProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#992967',

    background: Colors.background,
  },
};

function App() {
  const { user, isLoading } = useUser();

  return (
    <NavigationContainer theme={theme}>
      {!isLoading ? (
        user ? (
          <HomeNavigator />
        ) : (
          <AuthenticationNavigator />
        )
      ) : null}
    </NavigationContainer>
  );
}

import { LogLevel, OneSignal } from 'react-native-onesignal';
import { notificationQueryKey } from '~/services/notification';
import { StyleSheet, View } from 'react-native';

// Remove this method to stop OneSignal Debugging
OneSignal.Debug.setLogLevel(LogLevel.Verbose);

// OneSignal Initialization
OneSignal.initialize(appConfig.oneSignalAppId);

// requestPermission will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission
OneSignal.Notifications.requestPermission(true);
// OneSignal.login()

// Method for listening for notification clicks
OneSignal.Notifications.addEventListener('click', event => {
  queryClient.invalidateQueries([notificationQueryKey]);
});

OneSignal.Notifications.addEventListener('foregroundWillDisplay', event => {
  queryClient.invalidateQueries([notificationQueryKey]);
});

export default Main;
