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
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerLeft: (
        <Header
          onPress={() => navigation.navigate('Menu')}
          title={screenProps.translate('realeses')}
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
              <Dropdown
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ marginTop: 10 }}
                options={[
                  { label: 'Тема', value: '0' },
                  { label: 'AEB Board News', value: '17' },
                  {
                    label: 'AEB Committees News',
                    value: '18'
                  },
                  { label: 'AEB News', value: '19' },
                  { label: 'AEB Statements', value: '20' },
                  {
                    label: 'Automobile Manufacturers Committee',
                    value: '21'
                  },
                  {
                    label: 'Commercial Vehicles Committee',
                    value: '22'
                  },
                  { label: 'Economic News', value: '23' },
                  { label: 'External Events', value: '24' },
                  { label: 'Legislative News', value: '25' },
                  {
                    label: 'Sales of cars and light commercial vehicles',
                    value: '26'
                  },
                  { label: 'Taxation', value: '27' },
                  {
                    label: 'Sales of new commercial vehicles',
                    value: '29'
                  },
                  {
                    label: 'Sales of new construction equipment',
                    value: '1341'
                  },
                  {
                    label: 'The AEB about sanctions',
                    value: '1379'
                  }
                ]}
              />
              <View>
                <ThumbList
                  screenProps={this.props.screenProps}
                  data={ThumbListData}
                  extraPadding="28"
                />
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
