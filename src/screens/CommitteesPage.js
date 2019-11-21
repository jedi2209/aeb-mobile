/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import Header from '../components/Header';
import ThumbList from '../components/ThumbList';

import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Platform,
  Dimensions
} from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class PublicationsScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerLeft: (
        <Header
          screen={'committees'}
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
    const data = this.props.navigation.getParam('otherParam', {});

    return (
      <ImageBackground
        source={require('../images/bg.png')}
        style={[
          styles.container,
          {
            top: -100,
            position: 'relative',
            marginBottom: -100,
            minHeight: deviceHeight + 100
          }
        ]}
      >
        <View>
          <View
            style={{
              marginTop: Platform.OS === 'ios' ? 60 + 30 : 73 + 30
            }}
          >
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}
            >
              <View style={{ marginBottom: 100 }}>
                <View style={styles.body}>
                  <View style={styles.header}>
                    <Image
                      style={styles.headerImage}
                      source={{
                        uri:
                          'https://aebrus.ru/local/templates/aeb2019en/img/commitet_inner.png'
                      }}
                    />
                    <Text
                      style={[
                        styles.headerText,
                        {
                          // 60 - ширина картинки 40 marin right у картинки
                          // и 14 отсупы внутри и снаружи карточки
                          width: deviceWidth - 60 - 20 - 14 * 2 - 14 * 2
                        }
                      ]}
                    >
                      {data.name}
                    </Text>
                  </View>
                  <ThumbList
                    paramsForFetch={{ committees: data.id }}
                    translate={this.props.screenProps.translate}
                    type="publications"
                    extraPadding="28" // потому что 14 * 2
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
                      paramsForFetch={{ committees: data.id }}
                      translate={this.props.screenProps.translate}
                      navigation={this.props.navigation}
                      type="news"
                      extraPadding="28"
                      title={this.props.screenProps.translate('committee_news')}
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 20,
    marginBottom: 20
  },
  headerText: {
    fontSize: 17,
    color: '#000000',
    lineHeight: 20,
    fontWeight: 'bold'
  },
  headerImage: {
    width: 60,
    height: 60,
    borderRadius: 80,
    marginRight: 14
  }
});

export default PublicationsScreen;
