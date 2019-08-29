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
  SafeAreaView,
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
      headerLeft: <Header onPress={() => navigation.navigate('Menu')} />,
      headerStyle: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        height: Platform.OS === 'ios' ? 100 : 108
        // paddingTop: 10
      },
      headerTransparent: true
    };
  };

  render() {
    return (
      <ImageBackground
        source={require('../images/bg.png')}
        style={[styles.container]}
      >
        <SafeAreaView>
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
                <ThumbList data={dataFrom} type="news" extraPadding="28" />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
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
    marginTop: 40
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

// box-shadow: 0 20px 20px 0 rgba(0,0,0,0.08);
// border-radius: 8px;
// background: #D7D8DA;
// font-family: Helvetica;
// font-size: 15px;
// color: #000000;
// letter-spacing: 0.32px;
// text-align: left;
// line-height: 20px;
// font-family: Helvetica;
// font-size: 17px;
// color: #000000;
// letter-spacing: 0.32px;
// line-height: 22px;
// background: #D7D8DA;
// font-family: Helvetica;
// font-size: 15px;
// color: #8C8C8C;
// letter-spacing: 0.32px;
// text-align: left;
// line-height: 20px;
// font-family: Helvetica;
// font-size: 17px;
// color: #000000;
// letter-spacing: 0.32px;
// line-height: 22px;
// background: #D7D8DA;
// font-family: Helvetica;
// font-size: 15px;
// color: #8C8C8C;
// letter-spacing: 0.32px;
// text-align: left;
// line-height: 20px;
// font-family: Helvetica;
// font-size: 17px;
// color: #000000;
// letter-spacing: 0.32px;
// line-height: 22px;
// font-family: Helvetica;
// font-size: 15px;
// color: #ACB1C0;
// letter-spacing: 0.32px;
// line-height: 22px;
// /* Sketch doesnt export pattern fills at this point */
// border-radius: 6px;
// /* Sketch doesnt export pattern fills at this point */
// border-radius: 6px;
// /* Sketch doesnt export pattern fills at this point */
// border-radius: 6px;
// background: #FFFFFF;
// border-radius: 4px;
// /* Sketch doesnt export pattern fills at this point */
// border-radius: 4px;
// background: #0E4F9F;
// border-radius: 4px;

// font-family: Helvetica;
// font-size: 17px;
// color: #000000;
// letter-spacing: 0.32px;
// line-height: 22px;
// background: #FFFFFF;
// border-radius: 4px;
// /* Sketch doesnt export pattern fills at this point */
// border-radius: 4px;
// background: #0E4F9F;
// border-radius: 4px;

// font-family: Helvetica;
// font-size: 17px;
// color: #000000;
// letter-spacing: 0.32px;
// line-height: 22px;
// font-family: Helvetica;
// font-size: 20px;
// color: #1E2432;
// letter-spacing: 0.23px;
// /* Sketch doesnt export pattern fills at this point */
// border: 1px solid #F5F5F5;

