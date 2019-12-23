import React from 'react';
import { theme, DeviceWidth } from '../core/themeProvider';
import { Platform } from 'react-native';

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

import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';

class PublicationsScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerLeft: (
        <Header
          onPress={() => navigation.navigate('Menu')}
          title={screenProps.translate('publications')}
        />
      ),
      headerStyle: {
        height: Platform.OS === 'ios' ? 60 : 68,
        borderBottomWidth: 0,
        shadowOpacity: 0.2,
        shadowRadius: 15,
        shadowColor: '#000000',
        shadowOffset: {
          height: 2,
          width: 0
        }
      }
    };
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View
        style={[theme.cardBlock, { backgroundColor: theme.backgroundColor }]}
      >
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View>
              <View style={styles.body}>
                <ThumbList
                  screenProps={this.props.screenProps}
                  data={ThumbListData}
                  type="publications"
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
    backgroundColor: '#FAFAFA',
    paddingLeft: 14,
    width: DeviceWidth
  }
});

export default PublicationsScreen;
