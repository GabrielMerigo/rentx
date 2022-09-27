import React from "react";

import { createStackNavigator } from '@react-navigation/stack'
const { Navigator, Screen } = createStackNavigator();

import { Home } from '../screens/Home';
import { Confirmation } from '../screens/Confirmation'
import { NavigationContainer } from '@react-navigation/native'
import { Splash } from "../screens/Splash";
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep'
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep'

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SignIn } from "../screens/SignIn";

export function AuthRoutes() {
  const config = {
    screens: {
      Home: {
        initialRouteName: 'Splash',
      },
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Navigator {...config} screenOptions={{ headerShown: false }}>
          <Screen
            name="Splash"
            component={Splash}
          />
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
            name="Confirmation"
            component={Confirmation}
          />
        </Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}