import React, {Fragment} from 'react';

import moment from 'moment/min/moment-with-locales';

import ShareButton from '../components/ShareButton';
import WebViewAutoHeight from '../components/WebViewAutoHeight';

import {API} from '../core/server';

const DEFAULT_IMAGE =
  'https://aebrus.ru/local/templates/aeb2019en/img/contacts_image.jpg';

import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Animated,
  Platform,
  StyleSheet,
  RefreshControl,
  StatusBar
} from 'react-native';

import {DeviceWidth, LoadingIndicator} from '../core/themeProvider';
import HeaderBackButtonCustom from '../components/HeaderBackButtonCustom';

const HEADER_MAX_HEIGHT = 406;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT;

class ArticleScreen extends React.Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;

    this.translate = this.props.screenProps.translate;

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
      ),
      refreshing: false,
      loading: true,
      data: navigation.getParam('otherParam', null)
    };
  }

  componentDidMount() {
    if (!this.state.data) {
      this._fetchArticleAPI(this.props.navigation.state.params.itemId);
    } else {
      this.setState({
        loading: false
      });
    }
  }

  _fetchArticleAPI = async (itemId = {}) => {
    this.api = new API({lang: this.lang, platform: Platform.OS});
    const apiData = await this.api.getNewsItem(itemId);
    this.setState({
      loading: false,
      data: apiData.items[0]
    });
  };

  static navigationOptions = ({navigation}) => {
    const data = navigation.getParam('otherParam', {});
    return {
      headerRight: <ShareButton data={data} />,
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

  _renderScrollViewContent(item) {
    moment.locale(this.props.screenProps.locale);

    const toUpperdate = date => {
      date = date.toString().split('');
      date[0] = date[0].toUpperCase();
      return date;
    };

    return (
      <SafeAreaView>
        <View style={[styles.scrollViewContent]}>
          <Text style={styles.date}>
            {toUpperdate(moment(item.created * 1000).format('dddd, DD MMMM'))}
          </Text>
          <WebViewAutoHeight text={`<div>${item.descr}</div>`} />
          <WebViewAutoHeight text={`<div>${item.text}</div>`} />
        </View>
      </SafeAreaView>
    );
  }

  render() {
    if (!this.state.data || this.state.loading) {
      return <LoadingIndicator />;
    }
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
      inputRange: [0, 10, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    });

    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp'
    });

    const textOpacity = scrollY.interpolate({
      inputRange: [0, 5, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    });

    return (
      <View style={styles.fill}>
        <StatusBar barStyle="light-content" />
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            {useNativeDriver: true}
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                setTimeout(() => this.setState({refreshing: false}), 1000);
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
          }}>
          {this._renderScrollViewContent(this.state.data)}
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{translateY: imageTranslate}]
              }
            ]}
            source={{
              uri:
                (this.state.data.img && this.state.data.img.full[0]) ||
                DEFAULT_IMAGE
            }}
          />
          <Animated.View
            style={[
              styles.backgroundImage,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                backgroundColor: 'rgba(0,0,0,.4)',
                opacity: imageOpacity,
                transform: [{translateY: imageTranslate}]
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
              transform: [{translateY: headerTranslate}]
            }
          ]}>
          <Text style={[styles.title]}>{this.state.data.name}</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    fontSize: 14,
    color: '#1E2432',
    letterSpacing: 0.32,
    lineHeight: 22,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: 'bold'
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
    top: -120,
    width: DeviceWidth,
    left: 0,
    right: 0
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    width: DeviceWidth,
    paddingHorizontal: 14,
    paddingTop: 120
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
    paddingHorizontal: 14,
    marginBottom: Platform.OS !== 'ios' ? 20 : 0
  },
  paragraph: {
    fontSize: 15,
    color: '#1E2432'
  }
});

export default ArticleScreen;
