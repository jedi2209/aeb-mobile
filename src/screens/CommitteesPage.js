import React from 'react';
import { theme } from '../core/themeProvider';

import Moment from 'moment';
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
  }
];

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
  }
];

import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Platform
} from 'react-native';

class PublicationsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Header
          screen="committees"
          onPress={() => navigation.navigate('Menu')}
        />
      ),
      headerStyle: {
        backgroundImage: '../images/bg.png',
        backgroundColor: 'transparent',
        shadowRadius: 0,
        shadowOffset: {
          height: 0
        },
        elevation: 0,
        borderBottomWidth: 0,
        shadowColor: 'transparent'
      }
    };
  };

  render() {
    return (
      <ImageBackground
        source={require('../images/bg.png')}
        style={[
          styles.container,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            top: -100,
            position: 'relative',
            marginBottom: -100
          }
        ]}
      >
        <View>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              marginTop: Platform.OS === 'ios' ? 60 + 30 : 73 + 30
            }}
          >
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}
            >
              <View>
                <View style={styles.body}>
                  <View style={styles.header}>
                    <Image
                      style={styles.headerImage}
                      source={{
                        uri:
                          'https://aebrus.ru/local/templates/aeb2019en/img/commitet_inner.png'
                      }}
                    />
                    <Text style={styles.headerText}>
                      Product Conformity Assessment
                    </Text>
                  </View>
                  <ThumbList
                    data={ThumbListData}
                    type="publications"
                    extraPadding="28"
                  />
                  <View
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      backgroundColor: '#fff',
                      marginTop: 14,
                      borderRadius: 8
                    }}
                  >
                    <ThumbList
                      navigation={this.props.navigation}
                      data={dataFrom}
                      type="news"
                      extraPadding="28"
                      title="Committee news"
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'transparent'
  },
  body: {
    backgroundColor: 'transparent',
    paddingHorizontal: 14,
    marginTop: 10
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 20
  },
  headerText: {
    fontSize: 17,
    color: '#000000',
    lineHeight: 20,
    fontWeight: 'bold',
    width: 150
  },
  headerImage: {
    width: 60,
    height: 60,
    borderRadius: 80,
    marginRight: 20
  }
});

export default PublicationsScreen;
