import React, {Component} from 'react';
import moment from 'moment/min/moment-with-locales';

import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  NativeModules,
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

const BAR_SPACE = 14;

// TODO: use named export for better DX
export default class AllArticlesScreen extends Component {
  state = {
    data: [],
    // для новостей начинаем со 2 страницы, т.к рендерим первую страницу в карусели
    page: this.props.type === 'news' ? 2 : 1,
    loading: true,
    loadingMore: false,
    fullList: false,
    refreshing: false
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
    // TODO: разобраться почему изменение табов вызывают ререндер
    if (this.props.type === 'committees') {
      return;
    }

    if (this.props.paramsForFetch !== nextProps.paramsForFetch) {
      this._fetchAllArticles({force: true});
    }
  }

  _fetchAllArticles = async ({force} = {}) => {
    const {page = 1} = this.state;
    const paramsForFetch = this.props.paramsForFetch || {};

    let responsedData;
    let calc;

    try {
      switch (this.props.type) {
        case 'news':
        case 'newsCommitee':
          responsedData = await this.api.getNews(page, paramsForFetch);
          break;
        case 'events':
          responsedData = await this.api.getEvents(page, paramsForFetch);
          break;
        case 'publications':
          responsedData = await this.api.getPublications(page, paramsForFetch);
          break;
        case 'committees':
          responsedData = await this.api.getCommittees(page, paramsForFetch);
          break;
        default:
          responsedData = await this.api.getReleases(page, paramsForFetch);
      }

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

  _handleRefresh = () => {
    this.setState({page: 1, refreshing: true}, () => {
      this._fetchAllArticles();
    });
  };

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
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
            width: DeviceWidth - 14,
            height: 50
            // display: 'flex',
            // alignContent: 'center',
            // alignItems: 'stretch'
          }}>
          <View style={[theme.whiteButton, theme.cardShadow, {marginLeft: 14}]}>
            <Text style={theme.whiteButtonText}>{translate('load_more')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  _renderCardNews = item => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.navigation.navigate('Article', {
            itemId: item.id,
            otherParam: item
          });
        }}>
        <View style={[styles.card]}>
          <Card
            navigation={this.props.navigation}
            key={`thumb-list-article-${item.id}`}
            data={item}
            width={DeviceWidth - 14}
            padding={this.props.padding}
            height={200}
            BAR_SPACE={BAR_SPACE}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  _renderCardEvent = item => {
    return (
      <Card
        extraPadding={this.props.extraPadding}
        data={item}
        width={DeviceWidth - BAR_SPACE}
        key={`thumb-list-event-${item.id}`}
        height={200}
        deviceWidth={DeviceWidth}
        BAR_SPACE={BAR_SPACE}
      />
    );
  };

  _renderCardPublication = item => {
    return (
      <PublicationCard
        extraPadding={this.props.extraPadding}
        data={item}
        width={DeviceWidth - 28 - BAR_SPACE}
        height={200}
        key={`publication-card-${item.id}`}
        deviceWidth={DeviceWidth}
        BAR_SPACE={BAR_SPACE}
      />
    );
  };

  _renderCardCommittee = item => {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{marginTop: 10, width: '50%'}}>
        <CommitteesCard
          extraPadding={this.props.extraPadding}
          data={item}
          height={200}
          deviceWidth={DeviceWidth}
          BAR_SPACE={0}
        />
      </View>
    );
  };

  _renderReleasesCards(item) {
    return (
      <View key={item.created.toString + getRandomInt(1, 1000)}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            borderColor: '#D7D8DA',
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            width: DeviceWidth,
            paddingLeft: 14,
            paddingVertical: 5,
            marginTop: 0,
            marginBottom: 10
          }}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              color: '#8C8C8C',
              fontSize: 15
            }}>
            {moment(item.created * 1000).format('YYYY MMMM')}
          </Text>
        </View>
        {item.items.map(value => {
          return (
            <ReleasesCard
              key={`release-card-${value.id}`}
              extraPadding={this.props.extraPadding}
              data={value}
              width={DeviceWidth - 14 - BAR_SPACE}
              height={200}
              deviceWidth={DeviceWidth}
              BAR_SPACE={BAR_SPACE}
            />
          );
        })}
      </View>
    );
  }

  _renderCard = item => {
    const navigation = this.props.navigation;
    let component;

    switch (this.props.type) {
      case 'news':
      case 'newsCommitee':
        component = this._renderCardNews(item);
        break;
      case 'events':
        component = (
          <TouchableWithoutFeedback
            style={[theme.cardShadow, theme.cardBlock]}
            onPress={() => {
              navigation.navigate('Event', {
                itemId: item.id,
                otherParam: item
              });
            }}>
            <View style={styles.card}>{this._renderCardEvent(item)}</View>
          </TouchableWithoutFeedback>
        );
        break;
      case 'publications':
        component = this._renderCardPublication(item);
        break;
      case 'committees':
        component = (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('CommitteesPage', {
                itemId: item.id,
                otherParam: item
              });
            }}>
            {this._renderCardCommittee(item)}
          </TouchableWithoutFeedback>
        );
        break;
      default:
        component = this._renderReleasesCards(item);
    }

    return component;
  };

  render() {
    const {title} = this.props;

    return !this.state.loading ? (
      <View>
        {title && this.state.data.length > 0 && (
          <Title
            style={[
              theme.pageTitle,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                paddingHorizontal: this.props.padding,
                marginLeft: 14
              }
            ]}
            text={title}
          />
        )}
        <FlatList
          contentContainerStyle={styles.flatlist}
          numColumns={1}
          data={this.state.data}
          renderItem={({item}) => {
            return (
              <View style={styles.flatlistview}>{this._renderCard(item)}</View>
            );
          }}
          keyExtractor={item => {
            return (item.id || item.created).toString() + getRandomInt(1, 1000);
          }}
          ListFooterComponent={this._renderFooter}
          onRefresh={this._handleRefresh}
          refreshing={this.state.refreshing}
          onScroll={this._scrolled}
          initialNumToRender={3}
        />
      </View>
    ) : (
      <LoadingIndicator />
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
    width: '100%'
  },
  fllatlistview: {
    marginTop: 25,
    width: '50%'
  },
  loading: {
    alignSelf: 'center'
  }
});
