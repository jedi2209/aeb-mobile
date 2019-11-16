import React, { useEffect } from 'react';
import { theme } from '../core/themeProvider';

import { createStore, createEffect } from 'effector';
import { useStore } from 'effector-react';

import Moment from 'moment';
import Header from '../components/Header';
import Title from '../components/Title';
import CarouselArticles from '../components/CarouselArticles';
import ThumbList from '../components/ThumbList';

import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Platform
} from 'react-native';

import { API } from '../core/server';

// Есть конвеншен что эффекты начинаются с fx -> (fxFetchData), а сторы с $ -> ($data)
const fxFetchCountFromAsyncStorage = createEffect({
  handler: async () => {
    const api = new API({ lang: 'rus', platform: Platform.OS });
    const data = await api.getNews();
    return data || [];
  }
});

// Создаем стор у которого по дефолту пустой массив
const $counter = createStore([])
  // Подписываем стор на состояние эффекта когда он будет в статусе done, по дефолту все эффекты имеют 3 статуса pending, done, fail
  .on(fxFetchCountFromAsyncStorage.done, (_, { result }) => result);

fxFetchCountFromAsyncStorage.done.watch(({ result }) => {});

const NewsScreen = props => {
  const items = useStore($counter);

  useEffect(() => {
    fxFetchCountFromAsyncStorage();
  }, []);

  const { screenProps, navigation } = props;

  return (
    <View style={{ backgroundColor: theme.backgroundColor }}>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={theme.body}>
            <Title
              style={[theme.pageTitle, styles.pageTitle]}
              text={screenProps.translate('featured_news')} // "Featured News"
            />
            <CarouselArticles data={items} navigation={navigation} />
          </View>
          <View style={theme.body}>
            <ThumbList
              data={items}
              type="news"
              title={screenProps.translate('last_news')} // "Last news"
              navigation={navigation}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

NewsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: (
      <Header
        screen="wide"
        onPress={() => navigation.navigate('Menu')}
        title="News"
        date={Moment().format('dddd, MMMM DD')}
      />
    ),
    headerStyle: {
      height: Platform.OS === 'ios' ? 100 : 108
    }
  };
};

const styles = StyleSheet.create({
  pageTitle: {
    marginBottom: 20
  }
});

export default NewsScreen;
