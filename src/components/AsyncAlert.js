import {Alert as NativeAlert} from 'react-native';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

translate.cache.clear();

const defaultButtons = (resolve, reject) => [
  {
    text: translate('Button.OK'),
    onPress: () => {
      resolve();
    }
  }
];

const AsyncAlert = (title, msg, getButtons = defaultButtons) =>
  new Promise((resolve, reject) => {
    NativeAlert.alert(title, msg, getButtons(resolve, reject), {
      cancelable: false
    });
  });

export default AsyncAlert;
