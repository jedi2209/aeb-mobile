/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React, { Fragment } from 'react';

import Moment from 'moment/min/moment-with-locales';
import ShareButton from '../components/ShareButton';
import Maps from '../components/Maps';
import Press from '../components/Press';
import Translation from '../components/Translation';
import CalendarIcon from '../components/CalendarIcon';
import ReleasesCard from '../components/ReleasesCard';
import WebViewAutoHeight from '../components/WebViewAutoHeight';

import { TabView } from 'react-native-tab-view';
import * as AddCalendarEvent from 'react-native-add-calendar-event';

import moment from 'moment';

const BAR_SPACE = 14;

const utcDateToString = momentInUTC => {
  let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  // console.warn(s);
  return s;
};

import {
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  View,
  Text,
  Animated,
  Platform,
  StyleSheet,
  RefreshControl,
  FlatList,
  Linking
} from 'react-native';

const HEADER_MAX_HEIGHT = 406;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT;

const FirstRoute = data => {
  console.log('>>>>>>>', data);

  return (
    <View style={styles.body}>
      <WebViewAutoHeight text={data.text} />
    </View>
  );
};

const SecondRoute = (data, translate) => (
  <View style={{ marginTop: 20 }}>
    <View style={{ paddingLeft: 24 }}>
      <Text style={[styles.paragraph, { fontWeight: 'bold' }]}>
        {translate('attendance_fees')}
      </Text>
    </View>
    <View style={styles.table}>
      <Text style={styles.tableText}>{translate('assigned_member')}</Text>
      <Text>{`${data.attendance.gold.value} ${
        data.attendance.gold.curr
      }`}</Text>
    </View>
    <View style={styles.table}>
      <Text style={styles.tableText}>{translate('additional_member')}</Text>
      <Text>{`${data.attendance.members.value} ${
        data.attendance.members.curr
      }`}</Text>
    </View>
    <View style={styles.table}>
      <Text style={styles.tableText}>{translate('non_member')}</Text>
      <Text>{`${data.attendance['non-members'].value} ${
        data.attendance.gold.curr
      }`}</Text>
    </View>
    <TouchableOpacity
      onPress={() => Linking.openURL(data.url)}
      style={{
        borderRadius: 6,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0E4F9F',
        marginTop: 25,
        marginBottom: 25
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 15,
          letterSpacing: 0.32,
          textTransform: 'uppercase',
          fontWeight: '400'
        }}
      >
        {translate('registration')}
      </Text>
    </TouchableOpacity>
  </View>
);

const ThirdRoute = (data, extraPadding) => (
  <View style={styles.body}>
    <View style={{ marginTop: 20 }}>
      <FlatList
        contentContainerStyle={styles.flatlist}
        numColumns={1}
        data={data.file}
        renderItem={({ item }) => {
          return (
            <ReleasesCard
              extraPadding={extraPadding}
              data={item}
              width={deviceWidth - 14 - BAR_SPACE}
              height={200}
              deviceWidth={deviceWidth}
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

class ArticleScreen extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const data = navigation.getParam('otherParam', {});

    this.translate = this.props.screenProps.translate;

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: this.translate('about') },
        { key: 'second', title: this.translate('attendance_fees') },
        { key: 'third', title: this.translate('files') }
      ],
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
      ),
      refreshing: false
    };

    this.data = data;
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Fragment>
          <ShareButton onPress={() => navigation.navigate('Menu')} />
        </Fragment>
      ),
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

  _renderTabBar = props => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={`tab-${i}`}
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}
            >
              <Text
                style={{
                  color: props.navigationState.index === i ? '#000' : '#D8D8D8',
                  fontSize: 11
                }}
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScrollViewContent() {
    const data = this.data;
    const extraPadding = this.props.extraPadding;

    return (
      <SafeAreaView>
        <View style={[styles.scrollViewContent]}>
          {this.data.translation && (
            <Translation text={this.translate('translation_avail')} />
          )}
          {this.data.registration.press && (
            <Press text={this.translate('press')} />
          )}
          <View style={{ backgroundColor: '#FAFAFA', paddingVertical: 14 }}>
            <TouchableOpacity
              onPress={() => {
                const eventConfig = {
                  title: this.data.name,
                  startDate: utcDateToString(moment.now()),
                };

                AddCalendarEvent.presentEventCreatingDialog(eventConfig)
                  .then(eventInfo => {
                    // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
                    // These are two different identifiers on iOS.
                    // On Android, where they are both equal and represent the event id, also strings.
                    // when { action: 'CANCELED' } is returned, the dialog was dismissed
                    console.warn(JSON.stringify(eventInfo));
                  })
                  .catch(error => {
                    // handle error such as when user rejected permissions
                    console.error('error', error);
                  });
              }}
              style={{
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: 'red',
                width: '100%',
                height: 50,
                position: 'relative'
              }}
            >
              {/* <CalendarIcon /> */}
              <Text>{'ALO'}</Text>
            </TouchableOpacity>
            <TabView
              renderTabBar={this._renderTabBar}
              navigationState={this.state}
              renderScene={({ route }) => {
                switch (route.key) {
                  case 'first':
                    return FirstRoute(data);
                  case 'second':
                    return SecondRoute(data, this.translate);
                  default:
                    return ThirdRoute(data, extraPadding);
                }
              }}
              onIndexChange={index => this.setState({ index })}
              initialLayout={{ width: Dimensions.get('window').width }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  render() {
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0
    );

    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp'
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    });

    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp'
    });

    const textOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE - 80, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    });

    return (
      <View style={styles.fill}>
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT
          }}
        >
          {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] }
          ]}
        >
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
              }
            ]}
            source={{
              uri: this.data.img.full[0]
            }}
          />
          <Animated.View
            style={[
              styles.backgroundImage,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                backgroundColor: 'rgba(0,0,0,.4)',
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
              }
            ]}
          />
        </Animated.View>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.bar,
            {
              opacity: textOpacity,
              transform: [{ translateY: headerTranslate }]
            }
          ]}
        >
          <Text style={[styles.title]}>{this.data.name}</Text>
          <Text style={styles.date}>
            {Moment(this.data.date * 1000).format('dddd, DD MMMM')}
          </Text>
          {this.data.registration.active && (
            <Text
              style={{
                fontSize: 14,
                color: '#FFF',
                letterSpacing: 0.32,
                marginBottom: 15,
                marginHorizontal: 14,
                backgroundColor: '#FF2D55',
                borderRadius: 6,
                textAlign: 'center',
                paddingTop: 3,
                paddingBottom: 3,
                width: 75
              }}
            >
              {this.translate('open')}
            </Text>
          )}
          <Maps text={this.data.place.name} />
          <TouchableOpacity
            onPress={() => {
              alert('tyt');
              RNCalendarEvents.saveEvent(this.data.name, {
                location: this.data.place.name,
                notes: 'notes',
                startDate: this.data.date * 1000,
                endDate: this.data.date * 1000
              });
            }}
            style={{
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: 'red',
              width: '100%',
              height: 50,
              position: 'relative'
            }}
          >
            {/* <CalendarIcon /> */}
            <Text>{'ALO'}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  date: {
    fontSize: 17,
    color: '#FFF',
    letterSpacing: 0.32,
    lineHeight: 22,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 14
  },
  fill: {
    flex: 1
  },
  content: {
    flex: 1
  },
  header: {
    position: 'absolute',
    top: -100,
    left: 0,
    right: 0,
    backgroundColor: '#0E4F9F',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT + 100
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT + 100,
    resizeMode: 'cover'
  },
  bar: {
    height: HEADER_MAX_HEIGHT + 100,
    backgroundColor:
      'linear-gradient(180deg, rgba(0,0,0,0.19) 50%, rgba(0,0,0,0.50) 100%)',
    position: 'absolute',
    top: -100,
    width: deviceWidth,
    left: 0,
    right: 0
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    width: deviceWidth,
    paddingHorizontal: 14,
    paddingTop: 120
  },
  scrollViewContent: {
    paddingHorizontal: 14,
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paragraph: {
    fontSize: 15,
    color: '#1E2432'
  },
  table: {
    flex: 1,
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
  flatlist: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingBottom: 0
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 10
  },
  scene: {
    flex: 1
  }
});

export default ArticleScreen;
