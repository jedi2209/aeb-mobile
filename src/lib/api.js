import {Platform, NativeModules} from 'react-native';
import {API} from '../core/server';

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;

const lang = deviceLanguage.includes('ru') ? 'rus' : 'eng';

export const api = new API({lang, platform: Platform.OS});
