/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";

import NewsScreen from "./screens/News";
import MenuScreen from "./screens/Menu";
import ArticleScreen from "./screens/Article";
import ReleasesScreen from "./screens/Releases";
import PublicationsScreen from './screens/Publications'

import { createStackNavigator, createAppContainer } from "react-navigation";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: NewsScreen },
    News: { screen: NewsScreen },
    Article: { screen: ArticleScreen },
    Releases: { screen: ReleasesScreen },
    Publications: { screen: PublicationsScreen }
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
