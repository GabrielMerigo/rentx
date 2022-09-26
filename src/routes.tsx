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
import { Splash } from "./screens/Splash";
import { SignIn } from "./screens/SignIn";
import { SignUpFirstStep } from './screens/SignUp/SignUpFirstStep'
import { SignUpSecondStep } from './screens/SignUp/SignUpSecondStep'

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export function Routes() {
  const config = {
    screens: {
      Home: {
        initialRouteName: 'SignIn',
      },
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Navigator {...config} screenOptions={{ headerShown: false }}>
          <Screen
            name="SignIn"
            component={SignIn}
          />
          <Screen
            name="SignUpFirstStep"
            component={SignUpFirstStep}
          />
          <Screen
            name="SignUpSecondStep"
            component={SignUpSecondStep}
          />
          <Screen
            name="Home"
            component={Home}
            options={{
              gestureEnabled: false
            }}
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
    </GestureHandlerRootView>
  )
}