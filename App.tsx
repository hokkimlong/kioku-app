import 'react-native-gesture-handler';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AuthenticationNavigator from './src/screens/authentication/Navigator';
import HomeNavigator from './src/screens/home/HomeNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUser } from './src/services/authentication';
import './src/utils/s3';
import SpinnerProvider from '~/components/ui/Spinner';
import { Colors } from '~/utils/color';

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
  const { user } = useUser();

  return (
    <NavigationContainer theme={theme}>
      {user ? <HomeNavigator /> : <AuthenticationNavigator />}
    </NavigationContainer>
  );
}

export default Main;
