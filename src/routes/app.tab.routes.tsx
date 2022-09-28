import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const { Navigator, Screen } = createBottomTabNavigator();

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

import { Home } from '../screens/Home';
import { NavigationContainer } from '@react-navigation/native'

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MyCars } from "../screens/MyCars";
import { AppStackRoutes } from "./app.stack.routes";
import theme from "../styles/theme";

export function AppTabRoutes() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Navigator 
          screenOptions={{ 
            headerShown: false, 
            tabBarActiveTintColor: theme.colors.main,
            tabBarInactiveTintColor: theme.colors.text_detail,
            tabBarShowLabel: false
          }}
         >
          <Screen
            name="Home"
            component={AppStackRoutes}
            options={{
              tabBarIcon: ({ color }) => (
                <HomeSvg width={24} height={24} fill={color} />
              )
            }}
          />
          <Screen
            name="Profile"
            component={Home}
            options={{
              tabBarIcon: ({ color }) => (
                <PeopleSvg width={24} height={24} fill={color} />
              )
            }}
          />
          <Screen
            name="MyCars"
            component={MyCars}
            options={{
              tabBarIcon: ({ color }) => (
                <CarSvg width={24} height={24} fill={color} />
              )
            }}
          />
        </Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}