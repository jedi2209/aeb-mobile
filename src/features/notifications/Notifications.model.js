import {createDomain} from 'effector';
import AsyncStorage from '@react-native-community/async-storage';

const notificationsDomain = createDomain();

notificationsDomain.onCreateStore(async store => {
  try {
    const notificationsData = await AsyncStorage.getItem('notifications');
    store.setState(JSON.parse(notificationsData) || {});
  } catch (error) {}
});

export const onSubscribePressed = notificationsDomain.event();
export const $notifications = notificationsDomain.store({});

$notifications.on(onSubscribePressed, (state, page) => ({
  ...state,
  [page]: state[page] ? !state[page] : true
}));

$notifications.watch(async store => {
  try {
    await AsyncStorage.setItem('notifications', JSON.stringify(store));
  } catch (error) {}
});

$notifications.watch(console.log);
