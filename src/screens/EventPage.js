/* eslint-disable react-native/no-inline-styles */
import React, { Fragment } from 'react';

import Moment from 'moment/min/moment-with-locales';
import ShareButton from '../components/ShareButton';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Maps from '../components/Maps';
import Press from '../components/Press';
import Translation from '../components/Translation';
import CalendarIcon from '../components/CalendarIcon';
import ReleasesCard from '../components/ReleasesCard';
import WebViewAutoHeight from '../components/WebViewAutoHeight';

const BAR_SPACE = 14;

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

class ArticleScreen extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const data = navigation.getParam('otherParam', {});

    this.state = {
      selectedIndex: 0,
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
      ),
      refreshing: false
    };

    this.data = data;
    this.translate = this.props.screenProps.translate;
    console.log(this.data);
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

  handleIndexChange = index => {
    //handle tab selection for custom Tab Selection SegmentedControlTab
    this.setState(prevState => ({ ...prevState, selectedIndex: index }));
  };

  _renderScrollViewContent() {
    return (
      <SafeAreaView>
        <View style={[styles.scrollViewContent]}>
          {this.data.translation && (
            <Translation text={this.translate('translation_avail')} />
          )}
          {this.data.registration.press && (
            <Press text={this.translate('press')} />
          )}
          {/* нельзя почему то передать стили ввиде объекта */}
          <SegmentedControlTab
            // eslint-disable-next-line react-native/no-inline-styles
            tabsContainerStyle={{ marginTop: 0 }}
            // eslint-disable-next-line react-native/no-inline-styles
            tabStyle={{ backgroundColor: '#F1F2F6', borderColor: '#F1F2F6' }}
            // eslint-disable-next-line react-native/no-inline-styles
            tabTextStyle={{ color: '#D8D8D8', fontSize: 16 }}
            // eslint-disable-next-line react-native/no-inline-styles
            activeTabStyle={{ backgroundColor: '#fff', borderColor: '#F1F2F6' }}
            // eslint-disable-next-line react-native/no-inline-styles
            activeTabTextStyle={{ color: '#000', fontSize: 16 }}
            values={[
              this.translate('about'),
              this.translate('attendance_fees'),
              this.translate('files')
            ]}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
          />
          {this.state.selectedIndex === 0 && (
            <WebViewAutoHeight text={this.data.text} />
          )}
          {this.state.selectedIndex === 1 && (
            <View style={{ marginTop: 20 }}>
              <View style={{ paddingLeft: 24 }}>
                <Text style={[styles.paragraph, { fontWeight: 'bold' }]}>
                  {this.translate('attendance_fees')}
                </Text>
              </View>
              <View style={styles.table}>
                <Text style={styles.tableText}>
                  {this.translate('assigned_member')}
                </Text>
                <Text>{`${this.data.attendance.gold.value} ${
                  this.data.attendance.gold.curr
                }`}</Text>
              </View>
              <View style={styles.table}>
                <Text style={styles.tableText}>
                  {this.translate('additional_member')}
                </Text>
                <Text>{`${this.data.attendance.members.value} ${
                  this.data.attendance.members.curr
                }`}</Text>
              </View>
              <View style={styles.table}>
                <Text style={styles.tableText}>
                  {this.translate('non_member')}
                </Text>
                <Text>{`${this.data.attendance['non-members'].value} ${
                  this.data.attendance.gold.curr
                }`}</Text>
              </View>
              <TouchableOpacity
                onPress={() => Linking.openURL(this.data.url)}
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
                  {this.translate('registration')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {this.state.selectedIndex === 2 && (
            <View style={{ marginTop: 20 }}>
              <FlatList
                contentContainerStyle={styles.flatlist}
                numColumns={1}
                data={this.data.file}
                renderItem={({ item }) => {
                  return (
                    <ReleasesCard
                      extraPadding={this.props.extraPadding}
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
          )}
        </View>
      </SafeAreaView>
    );
  }

  render() {
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
      inputRange: [0, HEADER_SCROLL_DISTANCE - 80, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    });

    const textOpacityReverd = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE - 80, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 1, 1],
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
                backgroundColor: '#FF4D2C',
                borderRadius: 6,
                textAlign: 'center',
                paddingTop: 5,
                paddingBottom: 3,
                width: 75
              }}
            >
              {this.translate('open')}
            </Text>
          )}
          <Maps text={this.data.place.name} />
          <View style={{ position: 'relative' }}>
            <CalendarIcon />
          </View>
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
  titlemini: {
    marginTop: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 14,
    position: 'absolute',
    top: -5,
    width: deviceWidth,
    left: 0,
    right: 0
  },
  titleminitext: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
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
  }
});
export default ArticleScreen;
