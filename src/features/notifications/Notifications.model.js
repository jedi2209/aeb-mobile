import {createDomain, forward} from 'effector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationsClass from './PushNotifications';
import {Alert} from 'react-native';
import {
  check,
  checkNotifications,
  requestNotifications,
  openSettings,
  Permissions,
  PERMISSIONS,
  RESULTS
} from 'react-native-permissions';

import i18n from 'i18n-js';
import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

translate.cache.clear();

const notificationsDomain = createDomain();

notificationsDomain.onCreateStore(async store => {
  try {
    const notificationsData = await AsyncStorage.getItem('notifications');
    store.setState(JSON.parse(notificationsData) || {});
  } catch (error) {}
});

export const onSubscribePressed = notificationsDomain.event();
export const $notifications = notificationsDomain.store({});

const onAlertButtonPressed = notificationsDomain.event();
const PushNotifications = new PushNotificationsClass();

const subscribeFx = notificationsDomain.effect().use(async page => {
  const isEnabledNotifications = $notifications.getState()[page];

  if (isEnabledNotifications) {
    onAlertButtonPressed({page, status: false});
    return;
  }

  const {status, settings} = await requestNotifications(['alert', 'sound']);
  if (status !== RESULTS.GRANTED) {
    Alert.alert(
      translate(`Push.${page}.PleaseAllowTitle`),
      translate(`Push.${page}.PleaseAllow`),
      [
        {
          text: translate('Button.AskLater'),
          style: 'cancel',
          onPress: () => {
            console.log('Ask me later pressed');
            onAlertButtonPressed({page, status: false});
          }
        },
        {
          text: translate('Button.Cancel'),
          style: 'cancel',
          onPress: () => {
            console.log('Cancel pressed');
            onAlertButtonPressed({page, status: false});
          }
        },
        {
          text: translate('Button.OK'),
          onPress: () => {
            openSettings().catch(() => {
              console.log('Cannot open settings');
              // TODO: Разобраться.
              // onAlertButtonPressed({page, status: false});
            });
          }
        }
      ],
      {cancelable: false}
    );
  } else {
    Alert.alert(
      translate(`Push.${page}.YouHaveSubscribedTitle`),
      translate(`Push.${page}.YouHaveSubscribedDescription`),
      [
        {
          text: translate('Button.OK'),
          onPress: () => {
            onAlertButtonPressed({page, status: true});
          }
        }
      ]
    );
  }
});

$notifications.on(onAlertButtonPressed, (state, {page, status}) => ({
  ...state,
  [page]: status
}));

$notifications.watch(async store => {
  try {
    await AsyncStorage.setItem('notifications', JSON.stringify(store));
  } catch (error) {}
});

$notifications.watch(val => {
  Object.keys(val).map(item => {
    console.log('PushNotifications setSubscription', item, val[item]);
    PushNotifications.setSubscription(item, val[item]);
  });
});

forward({from: onSubscribePressed, to: subscribeFx});
