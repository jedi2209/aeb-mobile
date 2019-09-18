import React, { Fragment } from 'react';

import Moment from 'moment';
import FavoritesButton from '../components/FavoritesButton';
import ShareButton from '../components/ShareButton';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Maps from '../components/Maps';
import Press from '../components/Press';
import Translation from '../components/Translation';
import CalendarIcon from '../components/CalendarIcon';
import CommitteesCard from '../components/CommitteesCard';

import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  Animated,
  Platform,
  StyleSheet,
  RefreshControl,
  TouchableOpacity
} from 'react-native';

const CommitData = {
  image: 'https://aebrus.ru/upload/resize_cache/iblock/950/269_386_0/cover.jpg',
  title: 'Business Quarterly (Spring 2019)',
  url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
};

const HEADER_MAX_HEIGHT = 406;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const data = {
  title:
    'Strategies and Prospects for European Companies in Russia: Survey and Case Studies',
  uri: 'https://aebrus.ru/local/templates/aeb2019en/img/bg_inner.jpg',
  date: new Date()
};

class ArticleScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
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
        <View style={[styles.scrollViewContent, { paddingHorizontal: 14 }]}>
          <Translation text="RUS / ENG, Translation available" />
          <Press text="Available for Press" />
          <SegmentedControlTab
            tabsContainerStyle={{ marginTop: 0 }}
            tabStyle={{ backgroundColor: '#F1F2F6', borderColor: '#F1F2F6' }}
            tabTextStyle={{ color: '#D8D8D8', fontSize: 16 }}
            activeTabStyle={{ backgroundColor: '#fff', borderColor: '#F1F2F6' }}
            activeTabTextStyle={{ color: '#000', fontSize: 16 }}
            values={['About', 'Attendance', 'Files']}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
          />
          {this.state.selectedIndex === 0 && (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{ marginTop: 20 }}>
              <Text>Text about</Text>
              <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                at urna ipsum. Mauris eu faucibus nulla. Fusce vel consectetur
                ipsum. Sed non erat sodales, finibus ligula vitae, facilisis
                neque. In fringilla massa leo, vehicula lobortis est efficitur
                eu. Praesent magna risus, suscipit at enim blandit, gravida
                pharetra sapien. volutpat interdum varius.
              </Text>
              <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                at urna ipsum. Mauris eu faucibus nulla. Fusce vel consectetur
                ipsum. Sed non erat sodales, finibus ligula vitae, facilisis
                neque. In fringilla massa leo, vehicula lobortis est efficitur
                eu. Praesent magna risus, suscipit at enim blandit, gravida
                pharetra sapien. volutpat interdum varius.
              </Text>
              <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                at urna ipsum. Mauris eu faucibus nulla. Fusce vel consectetur
                ipsum. Sed non erat sodales, finibus ligula vitae, facilisis
                neque. In fringilla massa leo, vehicula lobortis est efficitur
                eu. Praesent magna risus, suscipit at enim blandit, gravida
                pharetra sapien. volutpat interdum varius.
              </Text>
            </View>
          )}
          {this.state.selectedIndex === 1 && (
            <View style={{ marginTop: 20 }}>
              <View style={{ paddingLeft: 24 }}>
                <Text style={[styles.paragraph, { fontWeight: 'bold' }]}>
                  Attendance fees
                </Text>
              </View>
              <View style={styles.table}>
                <Text style={styles.tableText}>Assigned member</Text>
                <Text>18 000</Text>
              </View>
              <View style={styles.table}>
                <Text style={styles.tableText}>Additional member</Text>
                <Text>20 000</Text>
              </View>
              <View style={styles.table}>
                <Text style={styles.tableText}>Non-member</Text>
                <Text>24 000</Text>
              </View>

              <TouchableOpacity
                style={{ marginBottom: 150 }}
                onPress={() => {
                  this.props.navigation.navigate('CommitteesPage', {
                    itemId: 86,
                    otherParam: 'anything you want here'
                  });
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    width: deviceWidth - 28,
                    marginTop: 25,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,
                    elevation: 4
                  }}
                >
                  <CommitteesCard
                    extraPadding={28}
                    data={CommitData}
                    height={200}
                    deviceWidth={deviceWidth}
                    BAR_SPACE={0}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
          {this.state.selectedIndex === 2 && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.paragraph}>tab3</Text>
            </View>
          )}
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
              uri: data.uri
            }}
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
          <Text style={[styles.title]}>{data.title}</Text>
          <Text style={styles.date}>
            {Moment().format('DD MM YYYY, HH:MM')}
          </Text>
          <Maps text="AZIMUT Hotel Smolenskaya Moscow, Smolenskaya st.8, Moscow" />
          <View style={{ position: 'relative' }}>
            <CalendarIcon />
          </View>
        </Animated.View>
        <Animated.View
          pointerEvents="none"
          style={{
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 14,
            position: 'absolute',
            top: -5,
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
    fontSize: 17,
    color: '#FFF',
    letterSpacing: 0.32,
    lineHeight: 22,
    marginBottom: 15,
    marginTop: 15,
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
  }
});
export default ArticleScreen;
