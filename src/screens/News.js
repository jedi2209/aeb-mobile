import React, { useEffect } from 'react';
import { theme } from '../core/themeProvider';

import { createStore, createEffect } from 'effector';
import { useStore } from 'effector-react';

import moment from 'moment/min/moment-with-locales';

import Header from '../components/Header';
import { CarouselArticles } from '../components/CarouselArticles';
import ThumbList from '../components/ThumbList';

import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Platform,
  NativeModules
} from 'react-native';

import { API } from '../core/server';

// Есть конвеншен что эффекты начинаются с fx -> (fxFetchData), а сторы с $ -> ($data)
const fxFetchCountFromAsyncStorage = createEffect({
  handler: async page => {
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    const lang = deviceLanguage.includes('ru') ? 'rus' : 'eng';

    const api = new API({ lang, platform: Platform.OS });
    const data = await api.getNews(page);
    return data || { items: [], paginations: {} };
  }
});

// Создаем стор у которого по дефолту пустой массив
const $counter = createStore({ items: [], paginations: {} })
  // Подписываем стор на состояние эффекта когда он будет в статусе done, по дефолту все эффекты имеют 3 статуса pending, done, fail
  .on(fxFetchCountFromAsyncStorage.done, (_, { result }) => result);

fxFetchCountFromAsyncStorage.done.watch(({ result }) => {});

const NewsScreen = props => {
  const { items, paginations } = useStore($counter);

  useEffect(() => {
    fxFetchCountFromAsyncStorage(1);
  }, []);

  const { screenProps, navigation } = props;

  return (
    <SafeAreaView style={{ backgroundColor: theme.backgroundColor }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[{ marginTop: 10 }]}>
          <CarouselArticles data={items} navigation={navigation} />
        </View>
        <View style={theme.body}>
          <ThumbList
            screenProps={screenProps}
            type="news"
            title={screenProps.translate('last_news')} // "Last news"
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

NewsScreen.navigationOptions = ({ navigation, screenProps }) => {
  moment.locale(screenProps.locale);

  return {
    headerLeft: (
      <Header
        screen="news"
        onPress={() => navigation.navigate('Menu')}
        title={screenProps.translate('news')} // Новости
        date={moment().format('dddd, DD MMMM')}
      />
    ),
    headerStyle: [
      theme.headerShadow,
      {
        height: Platform.OS === 'ios' ? 80 : 88,
        borderBottomWidth: 0
      }
    ]
  };
};

const styles = StyleSheet.create({
  pageTitle: {
    marginBottom: 20
  }
});

export default NewsScreen;
