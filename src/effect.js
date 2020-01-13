import {createEffect} from 'effector';
import {menuChange} from './event';
import AsyncStorage from '@react-native-community/async-storage';

export const getCurrentMenuItem = createEffect({
  handler: async () => {
    const item = await AsyncStorage.getItem('currentMenu');
    console.log('getCurrentMenuItem from AsyncStorage', item);
    return !item ? 'Events' : item;
  }
});

export const updateCurrentMenuItem = createEffect({
  handler: async item => {
    try {
      await AsyncStorage.setItem('currentMenu', `${item}`, err => {
        if (err) {
          console.error(err);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
});
