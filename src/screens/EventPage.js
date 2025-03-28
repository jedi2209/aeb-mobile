/* eslint-disable react-native/no-inline-styles */
import React, {Fragment} from 'react';

import Moment from 'moment/min/moment-with-locales';
import ShareButton from '../components/ShareButton';
import Maps from '../components/Maps';
import Press from '../components/Press';
import Translation from '../components/Translation';
import CalendarIcon from '../components/CalendarIcon';
import ReleasesCard from '../components/ReleasesCard';
import WebViewAutoHeight from '../components/WebViewAutoHeight';
// import AutoHeightWebView from 'react-native-autoheight-webview';
import {DeviceWidth} from '../core/themeProvider';
import Tabs from '../components/Tabs';
import HeaderBackButtonCustom from '../components/HeaderBackButtonCustom';
import Plate from '../components/Plate';
import {theme} from '../core/themeProvider';

const BAR_SPACE = 14;

import {
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  FlatList,
  Linking,
  StatusBar
} from 'react-native';

const HEADER_MAX_HEIGHT = 300;

const styleLocal = StyleSheet.create({
  table: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    marginHorizontal: 24,
    paddingVertical: 14
  },
  tableText: {
    color: '#D8D8D8'
  },
  paragraph: {
    fontSize: 15,
    color: '#1E2432'
  },
  flatlist: {
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  }
});

const FirstRoute = (data, translate) => {
  if (!data.text) {
    return null;
  }
  return (
    <ScrollView>
      <View style={[styles.body, {paddingHorizontal: 14}]}>
        <WebViewAutoHeight html={`<div>${data.text}</div>`} />
      </View>
    </ScrollView>
  );
};

const SecondRoute = (data, translate) => {
  if (!data.attendance || !data.registration.active) {
    return null;
  }

  return (
    <View style={{marginTop: 20}}>
      <View style={{paddingLeft: 24}}>
        <Text style={[styleLocal.paragraph, {fontWeight: 'bold'}]}>
          {translate('attendance_fees')}
        </Text>
      </View>
      <View style={styleLocal.table}>
        <Text style={styleLocal.tableText}>{translate('assigned_member')}</Text>
        <Text>{`${data.attendance.gold.value} ${
          data.attendance.gold.curr
        }`}</Text>
      </View>
      <View style={styleLocal.table}>
        <Text style={styleLocal.tableText}>
          {translate('additional_member')}
        </Text>
        <Text>{`${data.attendance.members.value} ${
          data.attendance.members.curr
        }`}</Text>
      </View>
      <View style={styleLocal.table}>
        <Text style={styleLocal.tableText}>{translate('non_member')}</Text>
        <Text>{`${data.attendance['non-members'].value} ${
          data.attendance.gold.curr
        }`}</Text>
      </View>
      {data.registration.active ? (
        <TouchableHighlight
          onPress={() => Linking.openURL(data.url + '#event_payment_info')}
          underlayColor={'#4A90E2'}
          style={[
            theme.cardShadow,
            {
              borderRadius: 6,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0E4F9F',
              marginTop: 25,
              marginBottom: 25,
              marginHorizontal: 18
            }
          ]}>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              letterSpacing: 0.32,
              textTransform: 'uppercase',
              fontWeight: '400'
            }}>
            {translate('registration')}
          </Text>
        </TouchableHighlight>
      ) : null}
    </View>
  );
};

const ThirdRoute = (data, extraPadding) => {
  if (!data.file) {
    return null;
  }

  return (
    <View style={[styles.body]}>
      <View style={{marginTop: 20}}>
        <FlatList
          numColumns={1}
          data={data.file}
          renderItem={({item}) => {
            return (
              <ReleasesCard
                extraPadding={extraPadding}
                data={item}
                width={DeviceWidth - 14 - BAR_SPACE}
                height={200}
                deviceWidth={DeviceWidth}
                BAR_SPACE={BAR_SPACE}
              />
            );
          }}
          keyExtractor={item => {
            return 'release' + item.name.toString();
          }}
        />
      </View>
    </View>
  );
};

class EventScreen extends React.Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;
    const data = navigation.getParam('otherParam', {});

    this.translate = this.props.screenProps.translate;
    this.data = data;
  }

  static navigationOptions = ({navigation}) => {
    const data = navigation.getParam('otherParam', {});
    return {
      headerRight: () => (
        <Fragment>
          <ShareButton data={data} />
        </Fragment>
      ),
    };
  };

  render() {
    let dateWithCupitalize = Moment(this.data.date * 1000).format('dddd');
    dateWithCupitalize = dateWithCupitalize.toString().split('');
    dateWithCupitalize[0] = dateWithCupitalize[0].toUpperCase();
    dateWithCupitalize = dateWithCupitalize.join('');

    const contacts = [];
    if (this.data.contacts) {
      this.data.contacts.map(el => {
        contacts.push({
          id: el.name,
          name: el.name,
          // position: el.position,
          company: el.position,
          email: el.email,
          phone: el.phone
        });
      });
    }

    console.log('>>> contacts', contacts);

    return (
      <View
        style={{
          flex: 1,
          paddingTop: 100,
        }}>
        <StatusBar barStyle="light-content" />
        <Image
          style={styles.backgroundImage}
          source={{
            uri: this.data.img.full[0]
          }}
        />
        <SafeAreaView
          style={{
            position: 'relative',
            flex: 1
          }}>
          <ScrollView>
            <View style={{height: HEADER_MAX_HEIGHT}}>
              {this.data.registration.active && this.data.type === 'Open' ? (
                <View
                  style={[
                    theme.badgeRed,
                    {
                      width: 75
                    }
                  ]}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#FFF',
                      letterSpacing: 0.32,
                      textAlign: 'center',
                      fontFamily: 'SFUIDisplay-Regular'
                    }}>
                    {this.translate('open')}
                  </Text>
                </View>
              ) : null}
              <Text style={[styles.title]}>{this.data.name}</Text>
              <Text style={styles.date}>
                {`${Moment(this.data.date * 1000).format(
                  'DD MMMM YYYY, HH:mm'
                )}, ${dateWithCupitalize}`}
              </Text>
              {this.data.place ? (
                <Maps place={this.data.place} translate={this.translate} />
              ) : null}
            </View>
            <View style={{backgroundColor: 'white'}}>
              {this.data.registration && this.data.registration.active ? (
                <View
                  style={{
                    position: 'absolute',
                    top: -25,
                    right: 10,
                    width: 55,
                    height: 55,
                    zIndex: 1000
                  }}>
                  <CalendarIcon data={this.data} />
                </View>
              ) : null}
              <View style={{marginLeft: 14}}>
                {this.data.translation ? (
                  <Translation text={this.translate('translation_avail')} />
                ) : (
                  <Text
                    style={{
                      height:
                        this.data.registration && this.data.registration.active
                          ? 'auto'
                          : 1
                    }}>
                    &nbsp;
                  </Text>
                )}
              </View>
              <View style={{marginLeft: 14}}>
                {this.data.registration && this.data.registration.press ? (
                  <Press text={this.translate('press')} />
                ) : (
                  <Text
                    style={{
                      height:
                        this.data.registration && this.data.registration.active
                          ? 'auto'
                          : 1
                    }}>
                    &nbsp;
                  </Text>
                )}
              </View>
              <Plate
                items={contacts}
                padd={3}
                style={{marginTop: 0, paddingHorizontal: 9}}
                stylePlate={{height: 115}}
              />
              {this.data.text || this.data.attendance || this.data.files ? (
                <Tabs
                  tabs={[
                    {
                      head: this.translate('about'),
                      route: FirstRoute(this.data)
                    },
                    {
                      head: this.translate('attendance_fees'),
                      route: SecondRoute(this.data, this.translate)
                    },
                    {
                      head: this.translate('files'),
                      route: ThirdRoute(this.data, 28)
                    }
                  ]}
                />
              ) : null}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    fontSize: 14,
    fontFamily: 'SFUIDisplay-Regular',
    color: '#FFF',
    letterSpacing: 0.32,
    lineHeight: 16,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 14
  },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: HEADER_MAX_HEIGHT + 100,
    resizeMode: 'cover',
    flex: 1
  },
  title: {
    fontSize: 22,
    fontFamily: 'SFUIDisplay-Heavy',
    // fontWeight: 'bold',
    color: '#fff',
    width: DeviceWidth,
    paddingHorizontal: 14,
    paddingTop: 10
  }
});

export default EventScreen;
