import React from 'react';
import { theme } from '../core/themeProvider';

import Moment from 'moment';
import Header from '../components/Header';
import ThumbList from '../components/ThumbList';
import Dropdown from '../components/Dropdown';

const ThumbListData = [
  {
    title: 'Sales of cars and light commercial vehicles in June 2014',
    commit: 'Automobile Manufacturers Committee',
    date: Date.now()
  },
  {
    title: 'Sales of cars and light commercial vehicles in June 2014',
    commit: 'Automobile Manufacturers Committee',
    date: Date.now()
  },
  {
    title: 'Sales of cars and light commercial vehicles in June 2014',
    commit: 'Automobile Manufacturers Committee',
    date: Date.now()
  },
  {
    title: 'Sales of cars and light commercial vehicles in June 2014',
    commit: 'Automobile Manufacturers Committee',
    date: Date.now()
  },
  {
    title: 'Sales of cars and light commercial vehicles in June 2014',
    commit: 'Automobile Manufacturers Committee',
    date: Date.now()
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
          date={Moment().format('MMMM Do, YYYY H:mma')}
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
              <Dropdown style={{ marginTop: 10 }} />
              <View style={styles.body}>
                <ThumbList data={ThumbListData} />
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

export default ReleasesScreen;
