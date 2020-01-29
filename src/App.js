import React from 'react';
import {useStore} from 'effector-react';

import NewsScreen from './screens/News';
import MenuScreen from './screens/Menu';
import ArticleScreen from './screens/Article';
import ReleasesScreen from './screens/Releases';
import PublicationsScreen from './screens/Publications';
import CommitteesScreen from './screens/Committees';
import CommitteesPage from './screens/CommitteesPage';
import EventsScreen from './screens/Events';
import EventPage from './screens/EventPage';
import ContactsScreen from './screens/Contacts';
import {Settings} from './screens/Settings';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance

import SplashScreen from 'react-native-splash-screen';

import {
  SafeAreaView,
  I18nManager,
  Platform,
  NativeModules,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

import {setTopLevelNavigator} from './lib/navigation';

import AsyncStorage from '@react-native-community/async-storage';
import {LoginScreen} from './screens/LoginScreen/LoginScreen';
import {$session} from './screens/LoginScreen/LoginScreen.model';

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require('./translations/en.json'),
  rus: () => require('./translations/ru.json')
};

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = () => {
  const deviceLang = {
    languageTag: deviceLanguage.includes('ru') ? 'rus' : 'en',
    isRTL: false
  };

  const {languageTag, isRTL} = deviceLang;

  console.log('languageTag', languageTag, isRTL);
  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = {[languageTag]: translationGetters[languageTag]()};
  i18n.locale = languageTag;
};

const persistenceKey = 'News';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: NewsScreen},
    News: {screen: NewsScreen},
    Article: {screen: ArticleScreen},
    Event: {screen: EventPage},
    CommitteesPage: {screen: CommitteesPage},
    Releases: {screen: ReleasesScreen},
    Publications: {screen: PublicationsScreen},
    Committees: {screen: CommitteesScreen},
    Events: {screen: EventsScreen},
    Contacts: {screen: ContactsScreen},
    Settings: {screen: Settings},
    LoginScreen: {
      screen: LoginScreen
    }
  },
  {
    initialRouteName: persistenceKey
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

const persistNavigationState = async navState => {
  try {
    await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState));
  } catch (err) {
    // handle the error according to your needs
  }
};
const loadNavigationState = async () => {
  const jsonString = await AsyncStorage.getItem(persistenceKey);
  return JSON.parse(jsonString);
};

const AppContainer = createAppContainer(RootStack);

if (__DEV__) {
  import('./core/ReactotronConfig').then(() =>
    console.log('Reactotron Configured')
  );
}

const AppContainerWrapper = props => {
  const session = useStore($session);

  if (!session.isSynced) {
    return (
      <SafeAreaView>
        <View style={{marginTop: 200}}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <AppContainer
      {...props}
      ref={navigatorRef => {
        setTopLevelNavigator(navigatorRef);
      }}
    />
  );
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };

    setI18nConfig(); // set initial config
  }

  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange);
    SplashScreen.hide();
    OneSignal.init('829b3b43-bb6d-40fa-b82e-3305342bd57b', {
      kOSSettingsKeyAutoPrompt: false
    });
    OneSignal.setSubscription(true);
    OneSignal.enableVibrate(true);
    OneSignal.enableSound(true);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading !== this.state.loading) {
      console.log('need update');

      return true;
    }
  }

  render() {
    return (
      <AppContainerWrapper
        persistNavigationState={persistNavigationState}
        loadNavigationState={loadNavigationState}
        screenProps={{
          translate,
          locale: deviceLanguage.includes('ru') ? 'ru' : 'en'
        }}
      />
    );
  }
}
