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
    Home: { screen: HomeScreen }
  },
  {
    initialRouteName: "Home"
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainNavigator
    },
    Menu: {
      screen: MenuScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
