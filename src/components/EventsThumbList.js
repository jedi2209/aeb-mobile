import React, {PureComponent} from 'react';
import moment from 'moment/min/moment-with-locales';

import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  NativeModules,
  Linking,
  TouchableWithoutFeedback
} from 'react-native';

import {DeviceWidth, LoadingIndicator} from '../core/themeProvider';

import {theme} from '../core/themeProvider';
import {API} from '../core/server';
import getRandomInt from '../lib/getRandomInt';

import Title from '../components/Title';

import ReleasesCard from '../components/ReleasesCard';
import PublicationCard from '../components/PublicationCard';
import CommitteesCard from '../components/CommitteesCard';
import Card from '../components/CardMini';
import {Divider} from 'react-native-elements';

const BAR_SPACE = 14;

// TODO: use named export for better DX
export default class AllArticlesScreen extends PureComponent {
  state = {
    incomingEvents: [],
    upcomingEvents: [],

    data: [],
    // для новостей начинаем со 2 страницы, т.к рендерим первую страницу в карусели
    page: 1,
    loading: true,
    loadingMore: false,
    fullList: false,
    selectedDay: new Date()
    // refreshing: false
  };

  componentDidMount() {
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    this.lang = deviceLanguage.includes('ru') ? 'rus' : 'eng';

    // устанавливаем locale для moment
    const lang = deviceLanguage.includes('ru') ? 'ru' : 'en';
    moment.locale(lang);

    this.api = new API({lang: this.lang, platform: Platform.OS});

    this._fetchAllArticles();
  }

  componentDidUpdate(nextProps) {
    if (this.props.paramsForFetch !== nextProps.paramsForFetch) {
      this.setState({fullList: false});
      this._fetchAllArticles({force: true});
    }
    if (this.props.selectedDay !== nextProps.selectedDay) {
      this.setState({selectedDay: this.props.selectedDay});
    }
  }

  _fetchArticle = async ({force} = {}) => {
    const {page = 1} = this.state;
    const paramsForFetch = this.props.paramsForFetch || {};

    let responsedData;
    let calc;

    try {
      responsedData = await this.api.getEvents(page, paramsForFetch);

      if (force) {
        calc = responsedData.items;
      } else {
        calc = [...this.state.data, ...responsedData.items];
      }

      if (!responsedData.pagination) {
        this.setState({fullList: true, data: []});
        return;
      }

      if (responsedData.pagination.pages.next === null) {
        this.setState({fullList: true});
      }

      this.setState({
        data: calc,
        loading: false,
        loadingMore: false,
        refreshing: false
      });
    } catch (err) {
      console.log('error during load data:', err);

      this.setState({
        fullList: true,
        loading: false,
        loadingMore: false,
        refreshing: false
      });
    }
  };

  _fetchAllArticles = async ({force} = {}) => {
    const {page = 1} = this.state;
    const paramsForFetch = this.props.paramsForFetch || {};

    this.setState({loading: true});

    try {
      const events = await this.api.getEvents(page, paramsForFetch);

      let incomingEvents = events.items.filter(
        event =>
          event.date * 1000 < moment.utc(this.props.selectedDay).add(1, 'day')
      );
      let upcomingEvents = events.items.filter(
        event =>
          event.date * 1000 >= moment.utc(this.props.selectedDay).add(1, 'day')
      );

      if (!force) {
        incomingEvents = [...this.state.incomingEvents, ...incomingEvents];
        upcomingEvents = [...this.state.upcomingEvents, ...upcomingEvents];
      }

      if (!events.pagination) {
        this.setState({fullList: true, data: []});
        return;
      }

      if (events.pagination.pages.next === null) {
        this.setState({fullList: true});
      }

      this.setState({
        incomingEvents,
        upcomingEvents,
        loading: false,
        loadingMore: false,
        refreshing: false
      });
    } catch (err) {
      console.log('error during load data:', err);

      this.setState({
        fullList: true,
        loading: false,
        loadingMore: false,
        refreshing: false
      });
    }
  };

  _handleLoadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        loadingMore: true
      }),
      () => {
        this._fetchAllArticles();
      }
    );
  };

  _renderFooter = () => {
    const translate =
      (this.props.screenProps && this.props.screenProps.translate) ||
      this.props.translate;

    if (this.state.fullList) {
      return null;
    }

    return (
      <View>
        <TouchableOpacity
          onPress={this._handleLoadMore}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginTop: 10,
            marginBottom: 20,
            width: '100%',
            height: 50
            // display: 'flex',
            // alignContent: 'center',
            // alignItems: 'stretch'
          }}>
          <View
            style={[
              theme.whiteButton,
              theme.cardShadow,
              {marginHorizontal: 14}
            ]}>
            <Text style={theme.whiteButtonText}>{translate('load_more')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  _renderCard = item => {
    const translate =
      (this.props.screenProps && this.props.screenProps.translate) ||
      this.props.translate;
    return (
      <TouchableWithoutFeedback
        style={[theme.cardShadow, theme.cardBlock]}
        onPress={() => {
          if (item.iblock && item.iblock !== 14) {
            // если событие НЕ встреча комитета
            this.props.navigation.navigate('Event', {
              itemId: item.id,
              otherParam: item
            });
          } else {
            if (item.committee && item.committee.url) {
              return Linking.openURL(item.committee.url);
            }
          }
        }}>
        <View style={styles.card}>
          <Card
            extraPadding={this.props.extraPadding}
            data={item}
            width={DeviceWidth - BAR_SPACE}
            key={`thumb-list-event-${item.id}`}
            height={200}
            deviceWidth={DeviceWidth}
            BAR_SPACE={BAR_SPACE}
            translate={translate}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    return (
      <View>
        <View>
          {this.state.incomingEvents.length > 0 && (
            <Title
              style={[
                theme.pageTitle,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  paddingHorizontal: this.props.padding,
                  marginLeft: 14,
                  marginBottom: 14
                }
              ]}
              text={this.props.incomingTitle}
            />
          )}
          <FlatList
            contentContainerStyle={[styles.flatlist]}
            ItemSeparatorComponent={() => (
              <Divider
                style={{backgroundColor: '#D7D8DA', marginHorizontal: 15}}
              />
            )}
            numColumns={1}
            initialNumToRender={3}
            data={this.state.incomingEvents}
            renderItem={({item}) => (
              <View style={styles.flatlistview}>{this._renderCard(item)}</View>
            )}
            keyExtractor={item =>
              (item.id || item.created).toString() + getRandomInt(1, 1000)
            }
          />
        </View>

        <View>
          {this.state.upcomingEvents.length > 0 && (
            <Title
              style={[
                theme.pageTitle,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  paddingHorizontal: this.props.padding,
                  marginLeft: 14,
                  marginBottom: 14
                }
              ]}
              text={this.props.upcomingTitle}
            />
          )}
          <FlatList
            contentContainerStyle={[styles.flatlist]}
            ItemSeparatorComponent={() => (
              <Divider
                style={{backgroundColor: '#D7D8DA', marginHorizontal: 15}}
              />
            )}
            numColumns={1}
            initialNumToRender={3}
            data={this.state.upcomingEvents}
            renderItem={({item}) => (
              <View style={styles.flatlistview}>{this._renderCard(item)}</View>
            )}
            keyExtractor={item =>
              (item.id || item.created).toString() + getRandomInt(1, 1000)
            }
            ListFooterComponent={this._renderFooter}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginLeft: 14
  },
  flatlist: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    paddingVertical: 0
  },
  fllatlistview: {
    marginTop: 25,
    width: '50%'
  },
  loading: {
    alignSelf: 'center'
  }
});
