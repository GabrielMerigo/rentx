import React from "react";

import { createStackNavigator } from '@react-navigation/stack'
const { Navigator, Screen } = createStackNavigator();

import { Home } from './screens/Home';
import { Scheduling } from './screens/Scheduling'
import { CarDetails } from './screens/CarDetails'
import { SchedulingDetails } from './screens/SchedulingDetails'
import { SchedulingComplete } from './screens/SchedulingComplete'

import { NavigationContainer } from '@react-navigation/native'
import { MyCars } from "./screens/MyCars";

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name="Home"
          component={Home}
        />
        <Screen
          name="Scheduling"
          component={Scheduling}
        />
        <Screen
          name="CarDetails"
          component={CarDetails}
        />
        <Screen
          name="SchedulingDetails"
          component={SchedulingDetails}
        />
        <Screen
          name="SchedulingComplete"
          component={SchedulingComplete}
        />
        <Screen
          name="MyCars"
          component={MyCars}
        />
      </Navigator>
    </NavigationContainer>
  )
}