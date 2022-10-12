import 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from './src/hooks/auth';
import { LogBox } from 'react-native';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';
import theme from './src/styles/theme';
import { Routes } from './src/routes';
import { QueryClientProvider, QueryClient } from 'react-query';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  })


  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'Expected style "fontSize: 17" to contain units',
    'expo-app-loading'
  ]);

  if (!fontsLoaded) {
    return <AppLoading />
  }

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
