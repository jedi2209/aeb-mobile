/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";

import HomeScreen from "./screens/Home";
import MenuScreen from "./screens/Menu";

import { createStackNavigator, createAppContainer } from "react-navigation";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Menu: { screen: MenuScreen }
  },
  {
    initialRouteName: "Home"
  }
);

const App = createAppContainer(MainNavigator);

export default App;
