import React from 'react';
import { theme } from '../core/themeProvider';

import Moment from 'moment';
import Header from '../components/Header';
import Title from '../components/Title';
import { CarouselArticles } from '../components/CarouselArticles';
import ThumbList from '../components/ThumbList';

import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';

const dataFrom = [
  {
    title: 'Reliable internet - a regulatory challenge For business',
    uri:
      'https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg',
    date: new Date()
  },
  {
    title: 'Reliable internet - a regulatory challenge For business',
    uri:
      'https://aebrus.ru/upload/iblock/245/whatsapp-image-2019_07_12-at-17.41.49.jpeg',
    date: new Date()
  },
  {
    title: 'Reliable internet - a regulatory challenge For business',
    uri:
      'https://aebrus.ru/upload/iblock/245/whatsapp-image-2019_07_12-at-17.41.49.jpeg',
    date: new Date()
  }
];
class NewsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Header
          onPress={() => navigation.navigate('Menu')}
          title="News"
          date={Moment().format('dddd, MMMM DD')}
        />
      ),
      headerStyle: {
        height: 100
      }
    };
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ backgroundColor: theme.backgroundColor }}>
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={theme.body}>
              <Title
                style={[theme.pageTitle, styles.pageTitle]}
                text="Featured News"
              />
              <CarouselArticles navigation={navigate} />
            </View>
            <View style={theme.body}>
              <ThumbList data={dataFrom} type="news" title="Last news" />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageTitle: {
    marginBottom: 20
  }
});

export default NewsScreen;
