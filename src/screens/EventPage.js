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
import AutoHeightWebView from 'react-native-autoheight-webview';
import { DeviceWidth, HTMLStyle } from '../core/themeProvider';

import { TabView, TabBar } from 'react-native-tab-view';

const BAR_SPACE = 14;

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
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
  if (!data.text) {
    return null;
  }
  // return (
  //   <AutoHeightWebView
  //     style={{ width: DeviceWidth - 25, marginLeft: 15, marginTop: 35 }}
  //     customStyle={HTMLStyle}
  //     source={{ html: data.text }}
  //     scalesPageToFit={true}
  //     zoomable={false}
  //   />
  // );

  return (
    <View style={[styles.body, { paddingHorizontal: 14 }]}>
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
    {data.registration.active ? (
      <TouchableOpacity
        onPress={() => Linking.openURL(data.url + '#event_payment_info')}
        style={{
          borderRadius: 6,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0E4F9F',
          marginTop: 25,
          marginBottom: 25,
          marginHorizontal: 18
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
    ) : null}
  </View>
);

const ThirdRoute = (data, extraPadding) => (
  <View style={[styles.body, { paddingHorizontal: 14 }]}>
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

class ArticleScreen extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const data = navigation.getParam('otherParam', {});

    this.translate = this.props.screenProps.translate;

    console.log('data', data);

    this.state = {
      index: 0,
      routes: [],
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
      ),
      refreshing: false
    };

    if (data.text) {
      this.state.routes.push({ key: 'first', title: this.translate('about') });
    }
    if (data.attendance) {
      this.state.routes.push({
        key: 'second',
        title: this.translate('attendance_fees')
      });
    }
    if (data.files) {
      this.state.routes.push({ key: 'third', title: this.translate('files') });
    }

    this.data = data;
  }

  static navigationOptions = ({ navigation }) => {
    const data = navigation.getParam('otherParam', {});
    return {
      headerRight: (
        <Fragment>
          <ShareButton data={data} />
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
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: '#fff',
          height: '97%',
          borderRadius: 4
        }}
        style={styles.tabBar}
        renderLabel={({ route, focused, color }) => (
          <Text
            style={{
              color: focused ? '#000' : '#ACB1C0',
              margin: -12,
              fontSize: 12
            }}
          >
            {route.title}
          </Text>
        )}
      />
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
          <View style={{ backgroundColor: '#FAFAFA' }}>
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
              initialLayout={{ height: 0, width: DeviceWidth }}
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
          pointerEvents="box-none"
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
                // backgroundColor: 'rgba(0,0,0,.4)',
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
              }
            ]}
          />
        </Animated.View>
        <Animated.View
          // pointerEvents="none"
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
          <Maps place={this.data.place} translate={this.translate} />
        </Animated.View>
        {this.data.registration.active ? (
          <Animated.View
            style={[
              styles.bar,
              {
                top: HEADER_MAX_HEIGHT,
                height: 0,
                opacity: textOpacity,
                transform: [{ translateY: headerTranslate }]
              }
            ]}
          >
            <View style={{ position: 'relative' }}>
              <CalendarIcon data={this.data} />
            </View>
          </Animated.View>
        ) : null}
      </View>
    );
  }
}

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
    width: DeviceWidth,
    left: 0,
    right: 0,
    zIndex: 10
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    width: DeviceWidth,
    paddingHorizontal: 14,
    paddingTop: 120
  },
  scrollViewContent: {
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
    backgroundColor: '#F1F2F6',
    height: 35,
    marginTop: 10,
    width: '96%',
    marginLeft: '2%',
    borderRadius: 4
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    color: '#fff',
    paddingTop: 5,
    paddingBottom: 10
  },
  scene: {
    flex: 1
  }
});

export default ArticleScreen;
