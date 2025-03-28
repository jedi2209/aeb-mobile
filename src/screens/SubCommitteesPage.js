/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import ThumbList from '../components/ThumbList';
import {API} from '../core/server';
import {ActivityIndicator, StatusBar} from 'react-native';
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
import Plate from '../components/Plate';
import Icon from 'react-native-vector-icons/Ionicons';

class SubPublicationsScreen extends React.Component {
  state = {
    data: [],
    loading: true,
    loadingMore: false,
    fullList: false,
    refreshing: false
  };

  data = this.props.navigation.getParam('otherParam', {});

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
          <StatusBar barStyle="light-content" />
          <View>
            <View
              style={{
                marginTop: Platform.OS === 'ios' ? 100 : 90
              }}>
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <View style={{marginBottom: 100}}>
                  <View style={styles.body}>
                    <ActivityIndicator />
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      );
    } else {
      const contacts = [];
      if (
        this.state.data.contacts.chairman &&
        this.state.data.contacts.chairman.name
      ) {
        contacts.push({
          position: this.props.screenProps.translate('chairperson'),
          name:
            this.state.data.contacts.chairman.name +
            ' ' +
            this.state.data.contacts.chairman.surname,
          company: this.state.data.contacts.chairman.company.name
        });
      }
      if (this.state.data.contacts.chairmanDeputy) {
        this.state.data.contacts.chairmanDeputy.map(el => {
          contacts.push({
            id: el.id ? el.id : el.email ? el.email : el.phone,
            name: el.name + ' ' + el.surname,
            position: this.props.screenProps.translate('chairpersondeputy'),
            company: el.company.name
          });
        });
      }
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
                marginTop: Platform.OS === 'ios' ? 100 : 90
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
                            width: DeviceWidth,
                            paddingEnd: 150
                          }
                        ]}>
                        {this.data.name}
                      </Text>
                    </View>
                    {contacts.length ? (
                      <Plate items={contacts} padd={8} style={{marginTop: 8}} />
                    ) : null}
                    {this.state.data.contacts.coordinator &&
                    this.state.data.contacts.coordinator.name ? (
                      <TouchableHighlight
                        underlayColor="transparent"
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
                              marginHorizontal: 14,
                              padding: 14,
                              height: 49
                            }
                          ]}>
                          <Text
                            style={[
                              styles.headerText,
                              {flex: 1, flexDirection: 'row'}
                            ]}>
                            {this.props.screenProps.translate('coordinator')}
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              lineHeight: 20,
                              fontFamily: 'SFUIDisplay-Regular',
                              marginRight: 10
                            }}>
                            {this.state.data.contacts.coordinator.name}
                          </Text>
                          <Icon
                            style={styles.iconCoordinator}
                            name="ios-mail"
                            size={25}
                          />
                        </View>
                      </TouchableHighlight>
                    ) : null}
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
    backgroundColor: 'transparent',
    height: '100%'
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
    paddingVertical: 20
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
  },
  iconCoordinator: {
    marginTop: -2
  }
});

export default SubPublicationsScreen;
