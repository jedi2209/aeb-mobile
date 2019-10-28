import React, { useEffect } from 'react';
import { theme } from '../core/themeProvider';
import AsyncStorage from '@react-native-community/async-storage';

import { createStore, createEvent, createEffect } from 'effector';
import { useStore } from 'effector-react';

import Moment from 'moment';
import Header from '../components/Header';
import Title from '../components/Title';
import { CarouselArticles } from '../components/CarouselArticles';
import ThumbList from '../components/ThumbList';

import {
  Text,
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
    console.log(data, data);
    return data;
  }
});

// Создаем стор у которого по дефолту пустой массив
const $counter = createStore([])
  // Подписываем стор на состояние эффекта когда он будет в статусе done, по дефолту все эффекты имеют 3 статуса pending, done, fail
  .on(fxFetchCountFromAsyncStorage.done, (_, { result }) => result);

fxFetchCountFromAsyncStorage.done.watch(({ result }) => {
  console.log('>>> result', result[0]);
});

const NewsScreen = props => {
  const count = useStore($counter);

  useEffect(() => {
    fxFetchCountFromAsyncStorage();
  }, []);

  console.log('props ====>', props);
  console.log('translate ====>', props.translate);

  return (
    <View style={{ backgroundColor: theme.backgroundColor }}>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={theme.body}>
            <Title
              style={[theme.pageTitle, styles.pageTitle]}
              text={props.screenProps.translate('news')} //"Featured News"
            />
            <CarouselArticles data={count} navigation={props.navigation} />
          </View>
          <View style={theme.body}>
            <Text>{count.length}</Text>
            <ThumbList
              data={count}
              type="news"
              title="Last news"
              navigation={props.navigation}
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
