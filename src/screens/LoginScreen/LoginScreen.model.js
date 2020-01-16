import {createDomain, forward} from 'effector';
import AsyncStorage from '@react-native-community/async-storage';

import {navigate} from '../../lib/navigation';
import {api} from '../../lib/api';

const sessionDomain = createDomain();

sessionDomain.onCreateStore(async store => {
  try {
    const useData = await AsyncStorage.getItem('session');
    const storeData = {isSynced: true};
    store.setState(
      useData ? {...JSON.parse(useData), ...storeData} : storeData
    );
  } catch (error) {}
});

export const onPressSignIn = sessionDomain.event();
export const onPressSignOut = sessionDomain.event();
export const $session = sessionDomain.store({isSynced: false});

const signInFx = sessionDomain.effect({
  handler: async data => {
    if (!data.email || !data.password) {
      throw new Error('Заполните поля');
    }

    const userData = await api.login({
      email: data.email,
      password: data.password
    });

    await AsyncStorage.setItem('session', JSON.stringify(userData));

    return Promise.resolve({...userData, isSynced: true});
  }
});

const signOutFx = sessionDomain.effect({
  handler: async () => {
    try {
      await AsyncStorage.removeItem('session');

      return Promise.resolve({isSynced: true});
    } catch (error) {}
  }
});

$session.on(signInFx.done, (_, {result}) => result);

signInFx.fail.watch(err => {
  alert(err ? err.error : 'Что-то пошло не так, попробуйте снова');
});

signInFx.done.watch(() => navigate('News'));
signOutFx.done.watch(() => navigate('News'));

// $session.watch(store => console.log(store));

forward({from: onPressSignIn, to: signInFx});
forward({from: onPressSignOut, to: signOutFx});
