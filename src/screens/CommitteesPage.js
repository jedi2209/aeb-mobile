/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import ThumbList from '../components/ThumbList';
import {API} from '../core/server';
import {ActivityIndicator} from 'react-native';
import {theme} from '../core/themeProvider';

import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Platform,
  TouchableHighlight,
  Linking
} from 'react-native';

import {DeviceWidth, DeviceHeight} from '../core/themeProvider';

class PublicationsScreen extends React.Component {
  state = {
    data: [],
    loading: true,
    loadingMore: false,
    fullList: false,
    refreshing: false
  };

  data = this.props.navigation.getParam('otherParam', {});

  static navigationOptions = ({navigation, screenProps}) => {
    return {
      headerTintColor: '#fff',
      headerBackTitleStyle: {color: 'transparent'},
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

  componentDidMount() {
    this.api = new API({lang: this.lang, platform: Platform.OS});
    this._fetchAllArticles();
  }

  _fetchAllArticles = async ({force} = {}) => {
    let calc;

    let responsedData = await this.api.getCommitteeItem(this.data.id);

    if (force) {
      calc = responsedData.items;
    } else {
      calc = [...this.state.data, ...responsedData.items];
    }

    this.setState({fullList: true, data: calc[0]});
  };

  render() {
    if (!this.state.data.id) {
      return <ActivityIndicator />;
    } else {
      return (
        <ImageBackground
          source={require('../images/bg.png')}
          style={[
            styles.container,
            {
              top: -100,
              position: 'relative',
              marginBottom: -100,
              minHeight: DeviceHeight + 100
            }
          ]}>
          <View>
            <View
              style={{
                marginTop: Platform.OS === 'ios' ? 60 + 30 : 73 + 30
              }}>
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <View style={{marginBottom: 100}}>
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
                            width: DeviceWidth - 60 - 20 - 14 * 2
                          }
                        ]}>
                        {this.data.name}
                      </Text>
                    </View>
                    {(this.state.data.contacts.coordinator.name ?
                    <TouchableHighlight
                      onPress={() => {
                        if (this.state.data.contacts.coordinator.email) {
                          Linking.openURL(
                            `mailto:${
                              this.state.data.contacts.coordinator.email
                            }`
                          );
                        }
                      }}>
                      <View
                        style={[
                          theme.cardBlock,
                          theme.cardShadow,
                          {
                            width: DeviceWidth - 28,
                            marginHorizontal: 14,
                            // marginVertical: 14,
                            padding: 14
                          }
                        ]}>
                        <Text style={[styles.headerText, {flex: 1}]}>
                          {this.props.screenProps.translate('coordinator')}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            lineHeight: 20,
                            fontFamily: 'SFUIDisplay-Regular'
                          }}>
                          {this.state.data.contacts.coordinator.name}
                        </Text>
                      </View>
                    </TouchableHighlight>
                     : null)}
                    <ThumbList
                      paramsForFetch={{committees: this.data.id, limit: 3}}
                      translate={this.props.screenProps.translate}
                      type="publications"
                      extraPadding="28"
                    />
                    <View
                      style={{
                        backgroundColor: '#fff',
                        marginTop: 14,
                        borderRadius: 8,
                        marginHorizontal: 14
                      }}>
                      <ThumbList
                        paramsForFetch={{committees: this.data.id}}
                        translate={this.props.screenProps.translate}
                        navigation={this.props.navigation}
                        type="newsCommitee"
                        title={this.props.screenProps.translate(
                          'committee_news'
                        )}
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
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'transparent'
  },
  body: {
    backgroundColor: 'transparent',
    // paddingHorizontal: 14,
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
    marginHorizontal: 14,
    paddingVertical: 20,
    marginBottom: 20
  },
  headerText: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 20,
    fontFamily: 'SFUIDisplay-Regular'
  },
  headerImage: {
    width: 60,
    height: 60,
    borderRadius: 80,
    marginRight: 14
  }
});

export default PublicationsScreen;
