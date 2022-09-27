import React from "react";

import { createStackNavigator } from '@react-navigation/stack'
const { Navigator, Screen } = createStackNavigator();

import { Home } from '../screens/Home';
import { NavigationContainer } from '@react-navigation/native'

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MyCars } from "../screens/MyCars";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { Confirmation } from "../screens/Confirmation";

export function AppStackRoutes() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer independent={true}>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen
            name="Home"
            component={Home}
          />
          <Screen
            name="CarDetails"
            component={CarDetails}
          />
          <Screen
            name="Scheduling"
            component={Scheduling}
          />
          <Screen
            name="SchedulingDetails"
            component={SchedulingDetails}
          />
          <Screen
            name="Confirmation"
            component={Confirmation}
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