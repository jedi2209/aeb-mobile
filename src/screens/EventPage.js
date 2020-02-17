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
  Linking
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
        <WebViewAutoHeight text={`<div>${data.text}</div>`} />
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

  const styleLocal = StyleSheet.create({
    flatlist: {
      flexDirection: 'column',
      height: '100%',
      width: '100%'
    }
  });
  return (
    <View style={[styles.body]}>
      <View style={{marginTop: 20}}>
        <FlatList
          contentContainerStyle={styleLocal.flatlist}
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
            return item.name.toString();
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
      headerRight: (
        <Fragment>
          <ShareButton data={data} />
        </Fragment>
      ),
      headerLeft: <HeaderBackButtonCustom navigation={navigation} />,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: 'transparent',
        shadowRadius: 0,
        shadowOffset: {
          height: 0
        },
        elevation: 0,
        borderBottomWidth: 0,
        shadowColor: 'transparent'
      },
      headerRightStyle: {
        borderWidth: 0,
        borderColor: 'transparent',
        elevation: 0,
        shadowColor: 'transparent'
      }
    };
  };

  render() {
    let dateWithCupitalize = Moment(this.data.date * 1000).format('dddd');
    dateWithCupitalize = dateWithCupitalize.toString().split('');
    dateWithCupitalize[0] = dateWithCupitalize[0].toUpperCase();
    dateWithCupitalize = dateWithCupitalize.join('');

    return (
      <View
        style={{
          flex: 1
        }}>
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
              {this.data.registration.active && (
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
              )}
              <Text style={[styles.title]}>{this.data.name}</Text>
              <Text style={styles.date}>
                {`${Moment(this.data.date * 1000).format(
                  'DD MMMM YYYY, HH:mm'
                )}, ${dateWithCupitalize}`}
              </Text>
              <Maps place={this.data.place} translate={this.translate} />
            </View>
            <View style={{backgroundColor: 'white'}}>
              {this.data.registration.active ? (
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
                      height: this.data.registration.active ? 'auto' : 1
                    }}>
                    &nbsp;
                  </Text>
                )}
              </View>
              <View style={{marginLeft: 14}}>
                {this.data.registration.press ? (
                  <Press text={this.translate('press')} />
                ) : (
                  <Text
                    style={{
                      height: this.data.registration.active ? 'auto' : 1
                    }}>
                    &nbsp;
                  </Text>
                )}
              </View>
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
    top: -100,
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
