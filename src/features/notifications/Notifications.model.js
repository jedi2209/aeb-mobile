import {createDomain} from 'effector';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotifications from './PushNotifications';
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

$notifications.on(onSubscribePressed, async (state, page) => {
  let PushStatus = false;
  switch (page) {
    case 'Publications':
      const {status, settings} = await requestNotifications(['alert', 'sound']);
      console.log('status', status);
      if (status !== RESULTS.GRANTED) {
        PushStatus = Alert.alert(
          translate('Push.Publications.PleaseAllowTitle'),
          translate('Push.Publications.PleaseAllow'),
          [
            {
              text: translate('Button.AskLater'),
              style: 'cancel',
              onPress: () => {
                console.log('Ask me later pressed');
                return {
                  ...state,
                  [page]: false
                };
              }
            },
            {
              text: translate('Button.Cancel'),
              style: 'cancel',
              onPress: () => {
                console.log('Cancel pressed');
                return {
                  ...state,
                  [page]: false
                };
              }
            },
            {
              text: translate('Button.OK'),
              onPress: () => {
                openSettings().catch(() =>
                  console.warn('Cannot open settings')
                );
                return {
                  ...state,
                  [page]: false
                };
              }
            }
          ],
          {cancelable: false}
        );
      } else {
        PushStatus = Alert.alert(
          translate('Push.Publications.YouHaveSubscribedTitle'),
          translate('Push.Publications.YouHaveSubscribedDescription'),
          [
            {
              text: translate('Button.OK'),
              onPress: () => {
                return {
                  ...state,
                  [page]: true
                };
              }
            }
          ]
        );
      }
      break;
  }
  console.log('PushStatus', PushStatus);
  console.log('state[page]', state[page]);
  return {
    ...state,
    [page]: state[page] ? !state[page] : false
  };
});

$notifications.watch(async store => {
  try {
    await AsyncStorage.setItem('notifications', JSON.stringify(store));
    //console.log('$notifications.watch', store);
  } catch (error) {}
});

$notifications.watch(val => {
  //console.log('val', val);
});
