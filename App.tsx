import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticationNavigator from './src/screens/authentication/Navigator';
import HomeNavigator from './src/screens/home/Navigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function Main() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </QueryClientProvider>
  );
}

let user = null;
function App() {
  // const { user } = useAuth();
  return (
    <NavigationContainer>
      {user ? <HomeNavigator /> : <AuthenticationNavigator />}
    </NavigationContainer>
  );
}

export default Main;
