import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components'

import { CarDetails } from './src/screens/CarDetails';
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
import { Scheduling } from './src/screens/Scheduling';
import { SchedulingComplete } from './src/screens/SchedulingComplete';
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

  if (!fontsLoaded) {
    return <AppLoading />
  }

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
