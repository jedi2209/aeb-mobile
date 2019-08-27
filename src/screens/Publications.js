import React from 'react';
import { theme } from '../core/themeProvider';

import Moment from 'moment';
import Header from '../components/Header';
import Title from '../components/Title';
import ThumbList from '../components/ThumbList';
import Dropdown from '../components/Dropdown';

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
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

class PublicationsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Header
          onPress={() => navigation.navigate('Menu')}
          title="Publications"
        />
      ),
      headerStyle: {
        height: 100,
        borderBottomWidth: 0
      }
    };
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View>
              <View style={styles.body}>
                <ThumbList data={ThumbListData} type="publications" />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {},
  body: {
    backgroundColor: '#fff',
    paddingLeft: 14
  }
});

export default PublicationsScreen;
