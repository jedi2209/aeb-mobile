import React from 'react';
import {theme, DeviceWidth} from '../core/themeProvider';
import {Platform} from 'react-native';

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

import {SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';

class PublicationsScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      headerLeft: (
        <Header
          onPress={() => navigation.navigate('Menu')}
          title={screenProps.translate('publications')}
        />
      ),
      headerStyle: [
        theme.headerShadow,
        {
          height: Platform.OS === 'ios' ? 60 : 68,
          borderBottomWidth: 0
        }
      ]
    };
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <SafeAreaView style={{backgroundColor: theme.backgroundColor}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <ThumbList
              screenProps={this.props.screenProps}
              data={ThumbListData}
              type="publications"
              extraPadding="28"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

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
