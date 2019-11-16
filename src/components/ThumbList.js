// todo: extraPadding lets refactor
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import Moment from 'moment';

import { theme } from '../core/themeProvider';

import {
  Dimensions,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity
} from 'react-native';

import Title from '../components/Title';
import ReleasesCard from '../components/ReleasesCard';
import PublicationCard from '../components/PublicationCard';
import CommitteesCard from '../components/CommitteesCard';

// TODO: move to lib/rng.js
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

import Card from '../components/CardMini';
const { width: deviceWidth } = Dimensions.get('window');
const BAR_SPACE = 14;

// screen height and width
// TODO: duplicate
const { width } = Dimensions.get('window');

// TODO: use named export for better DX
export default class AllArticlesScreen extends Component {
  state = {
    data: [],
    page: 1,
    loading: true,
    loadingMore: false,
    fullList: false,
    refreshing: false
  };

  componentDidMount() {
    this._fetchAllArticles();
  }

  _fetchAllArticles = () => {
    const { page } = this.state;

    if (page > 3) {
      this.setState({ fullList: true });
    } else {
      console.log('this.props.data !!!!!!!!!!', this.props.data);
      const calc =
        page === 1
          ? Array.from(this.props.data || [])
          : [...this.state.data, ...this.props.data];

      console.log('calc', calc);
      this.setState((prevState, nextProps) => ({
        data: calc,
        loading: false,
        loadingMore: false,
        refreshing: false
      }));
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
          style={{ marginTop: 10, width: width - 28, height: 50 }}
        >
          <View style={[theme.whiteButton]}>
            <Text style={theme.whiteButtonText}>Load more</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  _renderCard = item => {
    console.log('_renderCard', item);
    // if (this.props.type === 'news') {
    //   return (
    //     <TouchableOpacity
    //       onPress={() => {
    //         this.props.navigation.navigate('Article', {
    //           itemId: 86,
    //           otherParam: 'anything you want here'
    //         });
    //       }}
    //     >
    //       <Card
    //         extraPadding={this.props.extraPadding}
    //         data={item}
    //         width={deviceWidth - 14 - BAR_SPACE}
    //         height={200}
    //         deviceWidth={deviceWidth}
    //         BAR_SPACE={BAR_SPACE}
    //       />
    //     </TouchableOpacity>
    //   );
    // } else if (this.props.type === 'events') {
    //   console.log('tyt ????????????????')
    //   return (
    //     <TouchableOpacity
    //       onPress={() => {
    //         this.props.navigation.navigate('Event', {
    //           itemId: 86,
    //           otherParam: 'anything you want here'
    //         });
    //       }}
    //     >
    //       <Card
    //         extraPadding={this.props.extraPadding}
    //         data={item}
    //         width={deviceWidth - 14 - BAR_SPACE}
    //         height={200}
    //         deviceWidth={deviceWidth}
    //         BAR_SPACE={BAR_SPACE}
    //       />
    //     </TouchableOpacity>
    //   );
    // } else if (this.props.type === 'publications') {
    //   return (
    //     <PublicationCard
    //       extraPadding={this.props.extraPadding}
    //       data={item}
    //       width={deviceWidth - 28 - BAR_SPACE}
    //       height={200}
    //       deviceWidth={deviceWidth}
    //       BAR_SPACE={BAR_SPACE}
    //     />
    //   );
    // } else if (this.props.type === 'committees') {
    //   return (
    //     <TouchableOpacity
    //       onPress={() => {
    //         this.props.navigation.navigate('CommitteesPage', {
    //           itemId: 86,
    //           otherParam: 'anything you want here'
    //         });
    //       }}
    //     >
    //       <View style={{ marginTop: 25, width: '50%' }}>
    //         <CommitteesCard
    //           extraPadding={this.props.extraPadding}
    //           data={item}
    //           height={200}
    //           deviceWidth={deviceWidth}
    //           BAR_SPACE={BAR_SPACE}
    //         />
    //       </View>
    //     </TouchableOpacity>
    //   );
    // } else {
    //   return this._renderRealesCards(item);
    // }

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('Article', {
            itemId: 86,
            otherParam: 'anything you want here'
          });
        }}
      >
        <Card
          extraPadding={this.props.extraPadding}
          data={item}
          width={deviceWidth - 14 - BAR_SPACE}
          height={200}
          deviceWidth={deviceWidth}
          BAR_SPACE={BAR_SPACE}
        />
      </TouchableOpacity>
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

  render() {
    const { title, extraPadding, data } = this.props;

    console.log('data =============>', data, title, extraPadding);
    console.log(' ====> data', this.state.data);

    return !this.state.loading ? (
      <View>
        {title && (
          <Title
            style={[
              theme.pageTitle,
              {
                paddingHorizontal: extraPadding ? extraPadding / 2 : 0
              }
            ]}
            text={title}
          />
        )}
        <FlatList
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'column',
            height: '100%',
            width: '100%'
          }}
          numColumns={1}
          data={this.props.data}
          renderItem={({ item }) => {
            console.log('item =========>', item);
            return (
              <View style={{ marginTop: 25, width: '50%' }}>
                {this._renderCard(item)}
              </View>
            );
          }}
          keyExtractor={item => {
            //todo cerf tyt!!!
            return (item.date || item.uri).toString + getRandomInt(1, 1000);
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
        <Text style={{ alignSelf: 'center' }}>Loading Articles</Text>
        <ActivityIndicator />
      </View>
    );
  }
}
