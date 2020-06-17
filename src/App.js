import React from 'react';
import {useStore} from 'effector-react';

import NewsScreen from './screens/News';
import MenuScreen from './screens/Menu';
import ArticleScreen from './screens/Article';
import ReleasesScreen from './screens/Releases';
import PublicationsScreen from './screens/Publications';
import CommitteesScreen from './screens/Committees';
import CommitteesPage from './screens/CommitteesPage';
import SubCommitteesPage from './screens/SubCommitteesPage';
import EventsScreen from './screens/Events';
import EventPage from './screens/EventPage';
import ContactsScreen from './screens/Contacts';
import {Settings} from './screens/Settings';
import {Profile} from './screens/Profile';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance

import SplashScreen from 'react-native-splash-screen';
import {LoadingIndicator} from './core/themeProvider';

import PushNotifications from './features/notifications/PushNotifications';

import * as Sentry from '@sentry/react-native';

import {
  SafeAreaView,
  I18nManager,
  Platform,
  NativeModules,
  View,
  Text,
  ActivityIndicator,
  Linking
} from 'react-native';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

import NavigationService from './lib/navigation';

import AsyncStorage from '@react-native-community/async-storage';
import {LoginScreen} from './screens/LoginScreen/LoginScreen';
import {$session} from './screens/LoginScreen/LoginScreen.model';

if (__DEV__) {
  import('./core/ReactotronConfig').then(() =>
    console.log('Reactotron Configured')
  );
} else {
  Sentry.init({
    dsn: 'https://3b90574d17b84e10a8f5ab5cf0c49a65@sentry.io/2461509'
  });
}

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
    SubCommitteesPage: {screen: SubCommitteesPage},
    Releases: {screen: ReleasesScreen},
    Publications: {screen: PublicationsScreen},
    Committees: {screen: CommitteesScreen},
    Events: {screen: EventsScreen},
    Contacts: {screen: ContactsScreen},
    Settings: {screen: Settings},
    Profile: {screen: Profile},
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
  this.setState({
    loading: false
  });
  return JSON.parse(jsonString);
};

const AppContainer = createAppContainer(RootStack);

const AppContainerWrapper = props => {
  const session = useStore($session);

  if (!session.isSynced) {
    return (
      <SafeAreaView>
        <LoadingIndicator color="white" />
      </SafeAreaView>
    );
  }

  return (
    <AppContainer
      {...props}
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
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
    OneSignal.init('829b3b43-bb6d-40fa-b82e-3305342bd57b', {
      kOSSettingsKeyAutoPrompt: false
    });
    OneSignal.setSubscription(true);
    OneSignal.enableVibrate(true);
    OneSignal.enableSound(true);

    OneSignal.addEventListener('received', this.onReceivedPush.bind(this));
    OneSignal.addEventListener('ids', this.onIdsPush.bind(this));
    OneSignal.addEventListener('opened', this.onOpenedPush.bind(this));

    setTimeout(function() {
      SplashScreen.hide();
    }, 550);
  }

  onOpenedPush(openResult) {
    const addData = openResult.notification.payload.additionalData || [];
    const type = addData.type;
    const locale = deviceLanguage.includes('ru') ? 'ru' : 'en';
    let id = 0;
    id = addData.id ? addData.id : 0;
    if (typeof id === 'object' && id[locale]) {
      id = id[locale];
    }
    switch (type) {
      case 'Article':
        setTimeout(function() {
          NavigationService.navigate(type, {
            itemId: id,
            locale: locale
          });
        }, 150);
        break;
      case 'Publications':
        setTimeout(function() {
          NavigationService.navigate(type, {
            itemId: id,
            locale: locale
          });
        }, 150);
        break;
      case 'Events':
        // if (item.iblock && item.iblock !== 14) {
        //   // если событие НЕ встреча комитета
        //   this.props.navigation.navigate('Event', {
        //     itemId: item.id,
        //     otherParam: item
        //   });
        // } else {
        //   if (item.committee && item.committee.url) {
        //     return Linking.openURL(item.committee.url);
        //   }
        // }
        setTimeout(function() {
          NavigationService.navigate(type, {
            itemId: id,
            locale: locale,
          });
        }, 150);
        break;
      case 'Releases':
        const groupID = addData.groupID;
        setTimeout(function() {
          NavigationService.navigate(type, {
            itemId: id,
            locale: locale,
            filter: groupID,
          });
        }, 150);
        break;
      case 'NewsCovid':
        let link =
          translate('const.mainDomain') +
          addData.link;
        Linking.openURL(link);
        break;
    }

    // console.log('Data: ', openResult.notification.payload.additionalData);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);
  }

  onReceivedPush(notification) {
    console.log('Notification received: ', notification);
  }

  onIdsPush(device) {
    console.log('Device info: ', device);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);

    OneSignal.removeEventListener('received', this.onReceivedPush.bind(this));
    OneSignal.removeEventListener('opened', this.onIdsPush.bind(this));
    OneSignal.removeEventListener('ids', this.onIdsPush.bind(this));
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
