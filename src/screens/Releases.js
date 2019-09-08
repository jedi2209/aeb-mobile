import React from 'react';
import { theme } from '../core/themeProvider';

import Header from '../components/Header';
import ThumbList from '../components/ThumbList';
import Dropdown from '../components/Dropdown';

const ThumbListData = [
  {
    date: '2019-10-01',
    items: [
      {
        title: 'Sales of cars and light commercial vehicles in June 2014',
        commit: 'Automobile Manufacturers Committee',
        date: Date.now(),
        url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
      },
      {
        title: 'Sales of cars and light commercial vehicles in June 2014',
        commit: 'Automobile Manufacturers Committee',
        date: Date.now(),
        url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
      }
    ]
  },
  {
    date: '2019-09-01',
    items: [
      {
        title: 'Sales of cars and light commercial vehicles in June 2014',
        commit: 'Automobile Manufacturers Committee',
        date: Date.now(),
        url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
      }
    ]
  },
  {
    date: '2019-08-01',
    items: [
      {
        title: 'Sales of cars and light commercial vehicles in June 2014',
        commit: 'Automobile Manufacturers Committee',
        date: Date.now(),
        url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
      },
      {
        title: 'Sales of cars and light commercial vehicles in June 2014',
        commit: 'Automobile Manufacturers Committee',
        date: Date.now(),
        url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
      }
    ]
  }
];

import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Platform
} from 'react-native';

class ReleasesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Header
          onPress={() => navigation.navigate('Menu')}
          title="Press Releases"
        />
      ),
      headerStyle: {
        height: Platform.OS === 'ios' ? 100 : 108,
        borderBottomWidth: 0,
        shadowRadius: 0,
        shadowOffset: {
          height: 0
        },
        elevation: 0,
        shadowColor: 'transparent'
      }
    };
  };

  render() {
    return (
      <View style={styles.body}>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View>
              <Dropdown style={{ marginTop: 10 }} />
              <View>
                <ThumbList data={ThumbListData} extraPadding="28" />
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
    backgroundColor: '#FAFAFA'
  }
});

export default ReleasesScreen;
