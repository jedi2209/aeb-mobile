import React from 'react';

import NewsScreen from './screens/News';
import MenuScreen from './screens/Menu';
import ArticleScreen from './screens/Article';
import ReleasesScreen from './screens/Releases';
import PublicationsScreen from './screens/Publications';
import CommitteesScreen from './screens/Committees';
import CommitteesPage from './screens/CommitteesPage';
import EventsScreen from './screens/Events';
import EventPage from './screens/EventPage';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance

import { I18nManager } from 'react-native';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require('./translations/en.json'),
  rus: () => require('./translations/ru.json')
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: 'en', isRTL: false };

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};

const MainNavigator = createStackNavigator(
  {
    Home: { screen: NewsScreen },
    News: { screen: NewsScreen },
    Article: { screen: ArticleScreen },
    Event: { screen: EventPage },
    CommitteesPage: { screen: CommitteesPage },
    Releases: { screen: ReleasesScreen },
    Publications: { screen: PublicationsScreen },
    Committees: { screen: CommitteesScreen },
    Events: { screen: EventsScreen }
  },
  {
    initialRouteName: 'Home'
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
    mode: 'modal',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    setI18nConfig(); // set initial config
    OneSignal.init('829b3b43-bb6d-40fa-b82e-3305342bd57b', {
      kOSSettingsKeyAutoPrompt: true
    });
    OneSignal.addEventListener('received', this.onReceivedPush);
    OneSignal.addEventListener('opened', this.onOpenedPush);
    OneSignal.addEventListener('ids', this.onIdsPush);
  }

  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);
    OneSignal.removeEventListener('received', this.onReceivedPush);
    OneSignal.removeEventListener('opened', this.onOpenedPush);
    OneSignal.removeEventListener('ids', this.onIdsPush);
  }

  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };

  onReceivedPush(notification) {
    console.log('Notification received: ', notification);
  }

  onOpenedPush(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIdsPush(device) {
    console.log('Device info: ', device);
  }

  render() {
    return <AppContainer screenProps={{ translate }} />;
  }
}
