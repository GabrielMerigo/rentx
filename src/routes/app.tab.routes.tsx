import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const { Navigator, Screen } = createBottomTabNavigator();

import { Home } from '../screens/Home';
import { NavigationContainer } from '@react-navigation/native'

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MyCars } from "../screens/MyCars";
import { AppStackRoutes } from "./app.stack.routes";

export function AppTabRoutes() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen
            name="Home"
            component={AppStackRoutes}
          />
          <Screen
            name="Profile"
            component={Home}
          />
          <Screen
            name="MyCars"
            component={MyCars}
          />
        </Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}