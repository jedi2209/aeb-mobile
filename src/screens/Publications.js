import React, {useEffect} from 'react';
import {useStore} from 'effector-react';
import {theme, DeviceWidth} from '../core/themeProvider';

import Header from '../components/Header';
import ThumbList from '../components/ThumbList';

const ThumbListData = [
  {
    image:
      'https://aebrus.ru/upload/resize_cache/iblock/950/269_386_0/cover.jpg',
    title: 'Business Quarterly (Spring 2019)',
    url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
  },
  {
    image:
      'https://aebrus.ru/upload/resize_cache/iblock/950/269_386_0/cover.jpg',
    title: 'How to invest in Russia',
    url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
  },
  {
    image:
      'https://aebrus.ru/upload/resize_cache/iblock/950/269_386_0/cover.jpg',
    title: 'Business Quarterly (Spring 2019)',
    url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
  },
  {
    image:
      'https://aebrus.ru/upload/resize_cache/iblock/950/269_386_0/cover.jpg',
    title: 'How to invest in Russia',
    url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
  },
  {
    image:
      'https://aebrus.ru/upload/resize_cache/iblock/950/269_386_0/cover.jpg',
    title: 'Business Quarterly (Spring 2019)',
    url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
  }
];

import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text
} from 'react-native';
import {
  onSubscribePressed,
  $notifications
} from '../features/notifications/Notifications.model';

const PublicationsScreen = ({screenProps, navigation}) => {
  const notifications = useStore($notifications);

  useEffect(() => {
    navigation.setParams({
      notificationsEnabled: notifications.Publications
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  return (
    <SafeAreaView style={{backgroundColor: theme.backgroundColor}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <ThumbList
            screenProps={screenProps}
            data={ThumbListData}
            type="publications"
            extraPadding="28"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

PublicationsScreen.navigationOptions = ({navigation, screenProps}) => {
  const {notificationsEnabled} = navigation.state.params;
  return {
    headerLeft: (
      <Header
        onPress={() => navigation.navigate('Menu')}
        title={screenProps.translate('publications')}
      />
    ),
    headerRight: (
      <TouchableOpacity onPress={() => onSubscribePressed('Publications')}>
        <Text>{notificationsEnabled ? 'Отписка' : 'Подписка'}</Text>
      </TouchableOpacity>
    ),
    headerStyle: [
      theme.headerStyle,
      theme.headerShadow,
      {
        height: 58
      }
    ]
  };
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FAFAFA',
    width: DeviceWidth
  },
  body: {
    //paddingLeft: 14
  }
});

export default PublicationsScreen;
