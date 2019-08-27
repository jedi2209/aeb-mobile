import React, { Fragment } from 'react';
import { theme } from '../core/themeProvider';

import Moment from 'moment';
import Header from '../components/Header';
import FavoritesButton from '../components/FavoritesButton';
import ShareButton from '../components/ShareButton';
import { CarouselImages } from '../components/CarouselImages';

import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  RefreshControl,
  TouchableOpacity
} from 'react-native';

const HEADER_MAX_HEIGHT = 406;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const data = {
  title:
    'AEB statement regarding the release of Philippe Delpal from pre-trial imprisonment to house arrest',
  uri:
    'https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg',
  date: new Date()
};

class ArticleScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
      ),
      refreshing: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Fragment>
          <FavoritesButton onPress={() => navigation.navigate('Menu')} />
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
        shadowColor: 'transparent',
      },
      headerRightStyle: {
        borderWidth: 0,
        borderColor: 'transparent',
        elevation: 0,
        shadowColor: 'transparent'
      }
    };
  };

  _renderScrollViewContent() {
    return (
      <SafeAreaView>
        <View style={{ paddingHorizontal: 14 }}>
          <Text style={styles.date}>
            {Moment().format('MMMM Do, YYYY H:mma')}
          </Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at
            urna ipsum. Mauris eu faucibus nulla. Fusce vel consectetur ipsum.
            Sed non erat sodales, finibus ligula vitae, facilisis neque. In
            fringilla massa leo, vehicula lobortis est efficitur eu. Praesent
            magna risus, suscipit at enim blandit, gravida pharetra sapien. Sed
            volutpat interdum varius.
          </Text>
          <CarouselImages />
          <Text>
            Vivamus tincidunt, neque ac aliquet viverra, turpis ex dignissim
            tellus, sit amet iaculis mi massa id nulla. Suspendisse rhoncus
            ultrices nibh. Aliquam aliquet, eros vitae sollicitudin semper, sem
            ipsum finibus turpis, sit amet sagittis libero metus nec tellus.
            Aenean molestie vestibulum maximus. Sed non tellus ac lorem
            vestibulum vulputate eu id ante. Maecenas diam massa, euismod nec
            gravida ac, porttitor at libero. Proin tellus enim, porttitor vel
            risus nec, congue vehicula felis. Fusce ut euismod dui. Nunc
            fringilla purus dui, in cursus eros mattis eu. Curabitur ut lacus
            nisl. Donec congue mattis dolor, non venenatis ante vestibulum eu.
            Aenean elementum, lorem nec tempus facilisis, erat justo facilisis
            nunc, et varius nibh velit vel mi. Cras id convallis est. Quisque
            accumsan condimentum placerat. Mauris fringilla tellus et ornare
            suscipit. Nullam venenatis, risus eget hendrerit scelerisque, purus
            lorem hendrerit ex, id lobortis turpis sapien nec ante. Integer
            consequat libero enim, non aliquet dui ornare ac. Fusce ac risus
            eget urna luctus elementum vel eget tortor. Suspendisse sagittis
            ornare odio. Proin ac odio ut urna iaculis placerat ultrices
            convallis quam. Aenean non feugiat turpis. Praesent at nisi in
            libero suscipit gravida. Sed vitae tincidunt eros, a tincidunt
            nulla. Ut porta turpis vel elit posuere aliquam. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            Curae; In hac habitasse platea dictumst. Quisque luctus at ante sit
            amet suscipit. Quisque a odio eu est maximus convallis. Praesent
            pulvinar vestibulum ullamcorper. Phasellus bibendum, purus ut
            interdum efficitur, dui sapien sollicitudin lectus, lectus, ut
            bibendum dui velit et lectus. Orci varius natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus. Phasellus
            tincidunt nisi ut hendrerit ornare. Mauris mollis ligula nec nulla
            luctus, sit amet tempor nulla varius. Mauris ornare tincidunt elit
            sed hendrerit. Donec ultrices convallis felis eu dictum. Cras
            sagittis vel ligula sed sodales. Aenean id purus ut sem mattis
            dictum vitae non est. Maecenas magna nisi, consequat ut elit tempus,
            aliquet ultrices sem. Aliquam sit amet nibh ut enim ornare lacinia.
            Morbi non mauris tortor. Maecenas accumsan turpis ac diam accumsan
            tempor non ac velit. Mauris eget ultricies lacus. Aenean magna
            ligula, venenatis eget dui sed, vestibulum dapibus mi. In ac porta
            leo. Nunc urna arcu, dignissim non euismod ac, tempor id ligula.
            Aenean id odio auctor mi ultrices elementum. Vestibulum vitae elit
            purus. Donec imperdiet lectus arcu, a fermentum erat vestibulum
            eget. Aenean a eros ornare, condimentum orci vel, vel, efficitur
            risus. Vestibulum id rhoncus odio. Fusce vitae justo sit amet nibh
            blandit luctus.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
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
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    });

    const textOpacityReverd = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
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
              uri:
                'https://aebrus.ru/upload/resize_cache/iblock/1d1/1200_1200_1/aba_5543.jpg'
            }}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              opacity: textOpacity,
              transform: [{ translateY: headerTranslate }]
            }
          ]}
        >
          <Text style={[styles.title]}>{data.title}</Text>
        </Animated.View>
        <Animated.View
          style={{
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 14,
            position: 'absolute',
            top: 0,
            width: deviceWidth,
            left: 0,
            right: 0,
            opacity: textOpacityReverd
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              fontWeight: 'bold'
            }}
          >
            {data.title}
          </Text>
        </Animated.View>
      </View>
    );
  }
}

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  date: {
    fontSize: 11,
    color: '#1E2432',
    letterSpacing: 0.32,
    lineHeight: 22,
    marginBottom: 10,
    marginTop: 20
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
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    width: deviceWidth,
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
  }
});
export default ArticleScreen;
