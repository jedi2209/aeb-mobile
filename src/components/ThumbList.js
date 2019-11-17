import React, { Component } from 'react';
import Moment from 'moment';

import {
  Dimensions,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';

import { theme } from '../core/themeProvider';
import { API } from '../core/server';
import getRandomInt from '../lib/getRandomInt';

import Title from '../components/Title';

import ReleasesCard from '../components/ReleasesCard';
import PublicationCard from '../components/PublicationCard';
import CommitteesCard from '../components/CommitteesCard';
import Card from '../components/CardMini';

const { width: deviceWidth } = Dimensions.get('window');
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
    this.api = new API({ lang: 'rus', platform: Platform.OS });

    this._fetchAllArticles();
  }

  _fetchAllArticles = async () => {
    const { page = 1 } = this.state;

    let responsedData;
    let calc;

    try {
      switch (this.props.type) {
        case 'news':
          responsedData = await this.api.getNews(page);
          break;
        case 'events':
          responsedData = await this.api.getEvents(page);
          break;
        case 'publications':
          responsedData = await this.api.getPublications(page);
          break;
        case 'committees':
          responsedData = await this.api.getCommittees(page);
          break;
        default:
          responsedData = await this.api.getReales(page);
      }

      calc = [...this.state.data, ...responsedData.items];

      if (responsedData.pagination.pages.next === null) {
        this.setState({ fullList: true });
      }

      this.setState((prevState, nextProps) => ({
        data: calc,
        loading: false,
        loadingMore: false,
        refreshing: false
      }));
    } catch (err) {
      console.error('error during load data:', err);

      this.setState({
        fullList: true,
        loading: false,
        loadingMore: false,
        refreshing: false
      });
    }
  };

  _handleRefresh = () => {
    this.setState({ page: 1, refreshing: true }, () => {
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
    if (this.state.fullList) {
      return null;
    }

    return (
      <View>
        <TouchableOpacity
          onPress={this._handleLoadMore}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ marginTop: 10, width: deviceWidth - 28, height: 50 }}
        >
          <View style={[theme.whiteButton]}>
            <Text style={theme.whiteButtonText}>Load more</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  _renderCardNews = item => {
    return (
      <Card
        extraPadding={this.props.extraPadding}
        navigation={this.props.navigation}
        key={`thumb-list-article-${item.id}`}
        data={item}
        width={deviceWidth - 14 - BAR_SPACE}
        height={200}
        deviceWidth={deviceWidth}
        BAR_SPACE={BAR_SPACE}
      />
    );
  };

  _renderCardEvent = item => {
    return (
      <Card
        extraPadding={this.props.extraPadding}
        data={item}
        width={deviceWidth - 14 - BAR_SPACE}
        key={`thumb-list-event-${item.id}`}
        height={200}
        deviceWidth={deviceWidth}
        BAR_SPACE={BAR_SPACE}
      />
    );
  };

  _renderCardPublication = item => {
    return (
      <PublicationCard
        extraPadding={this.props.extraPadding}
        data={item}
        width={deviceWidth - 28 - BAR_SPACE}
        height={200}
        deviceWidth={deviceWidth}
        BAR_SPACE={BAR_SPACE}
      />
    );
  };

  _renderCardCommittee = item => {
    return (
      <View style={{ marginTop: 25, width: '50%' }}>
        <CommitteesCard
          extraPadding={this.props.extraPadding}
          data={item}
          height={200}
          deviceWidth={deviceWidth}
          BAR_SPACE={BAR_SPACE}
        />
      </View>
    );
  };

  _renderRealesCards(item) {
    return (
      <View key={item.created.toString + getRandomInt(1, 1000)}>
        <View
          style={{
            borderColor: '#D7D8DA',
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            width: deviceWidth,
            paddingLeft: 14,
            paddingVertical: 5,
            marginTop: 0,
            marginBottom: 10
          }}
        >
          <Text
            style={{
              color: '#8C8C8C',
              fontSize: 15
            }}
          >
            {Moment(item.created).format('MMMM YYYY')}
          </Text>
        </View>
        {item.items.map(value => {
          return (
            <ReleasesCard
              extraPadding={this.props.extraPadding}
              data={value}
              width={deviceWidth - 14 - BAR_SPACE}
              height={200}
              deviceWidth={deviceWidth}
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
        component = (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate('Article', {
                itemId: item.id,
                otherParam: item
              });
            }}
          >
            {this._renderCardNews(item)}
          </TouchableOpacity>
        );
        break;
      case 'events':
        component = (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate('Event', {
                itemId: item.id,
                otherParam: item
              });
            }}
          >
            {this._renderCardEvent(item)}
          </TouchableOpacity>
        );
        break;
      case 'publications':
        component = this._renderCardPublication(item);
        break;
      case 'committees':
        component = (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CommitteesPage', {
                itemId: item.id,
                otherParam: item
              });
            }}
          >
            {this._renderCardCommittee(item)}
          </TouchableOpacity>
        );
        break;
      default:
        component = this._renderRealesCards(item);
    }

    return component;
  };

  render() {
    const { title, extraPadding } = this.props;

    return !this.state.loading ? (
      <View>
        {title && (
          <Title
            style={[
              theme.pageTitle,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                paddingHorizontal: extraPadding ? extraPadding / 2 : 0
              }
            ]}
            text={title}
          />
        )}
        <FlatList
          contentContainerStyle={styles.flatlist}
          numColumns={1}
          data={this.state.data}
          renderItem={({ item }) => {
            return (
              <View style={styles.flatlistview}>{this._renderCard(item)}</View>
            );
          }}
          keyExtractor={item => {
            return (item.id || item.created).toString + getRandomInt(1, 1000);
          }}
          ListFooterComponent={this._renderFooter}
          onRefresh={this._handleRefresh}
          refreshing={this.state.refreshing}
          onScroll={this._scrolled}
          initialNumToRender={3}
        />
      </View>
    ) : (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20
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
