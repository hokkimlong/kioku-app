import 'react-native-gesture-handler';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
// import AuthenticationNavigator from './src/screens/authentication/Navigator';
import HomeNavigator from './src/screens/home/Navigator';
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUser } from './src/services/authentication';
// import SpinnerProvider from '~/components/ui/Spinner';

const queryClient = new QueryClient();

function Main() {
  const colorScheme = useColorScheme();

  const paperTheme =
    colorScheme !== 'dark' ? { ...MD3DarkTheme } : { ...MD3LightTheme };

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={paperTheme}>
        {/* <SpinnerProvider> */}
        <App />
        {/* </SpinnerProvider> */}
      </PaperProvider>
    </QueryClientProvider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

function App() {
  const { user } = useUser();
  console.log(user);
  return (
    <NavigationContainer theme={theme}>
      {/* {user ? <HomeNavigator /> : <AuthenticationNavigator />} */}
      <MapNavigator />
      {/* <HomeNavigator /> */}
    </NavigationContainer>
  );
}

export default Main;
