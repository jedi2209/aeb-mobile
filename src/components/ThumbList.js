import React, { Component } from "react";
import { theme } from '../core/themeProvider';
import {
  Dimensions,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";

const dataFrom = [
  {
    title: "Reliable internet - a regulatory challenge For business",
    uri:
      "https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg",
    date: new Date()
  },
  {
    title: "Reliable internet - a regulatory challenge For business",
    uri:
      "https://aebrus.ru/upload/iblock/245/whatsapp-image-2019_07_12-at-17.41.49.jpeg",
    date: new Date()
  },
  {
    title: "Reliable internet - a regulatory challenge For business",
    uri:
      "https://aebrus.ru/upload/iblock/245/whatsapp-image-2019_07_12-at-17.41.49.jpeg",
    date: new Date()
  }
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// presentational components
import Card from "../components/CardMini";
const deviceWidth = Dimensions.get("window").width;
const BAR_SPACE = 14;

// screen height and width
const { width, height } = Dimensions.get("window");

export default class AllBeersScreen extends Component {
  state = {
    data: [],
    page: 1,
    loading: true,
    loadingMore: false,
    fullList: false,
    refreshing: false
  };

  componentDidMount() {
    this._fetchAllBeers();
  }

  _fetchAllBeers = () => {
    const { page } = this.state;

    if (page > 3) {
      this.setState({ fullList: true });
    } else {
      this.setState((prevState, nextProps) => ({
        data:
          page === 1 ? Array.from(dataFrom) : [...this.state.data, ...dataFrom],
        loading: false,
        loadingMore: false,
        refreshing: false
      }));
    }
  };

  _handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true
      },
      () => {
        this._fetchAllBeers();
      }
    );
  };

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
        loadingMore: true
      }),
      () => {
        this._fetchAllBeers();
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

  render() {
    return !this.state.loading ? (
      <FlatList
        contentContainerStyle={{
          flex: 1,
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
        numColumns={1}
        data={this.state.data}
        renderItem={({ item }) => (
          <View
            style={{
              marginTop: 25,
              width: "50%",
            }}
          >
            <Card
              data={item}
              width={deviceWidth - 14 - BAR_SPACE}
              height={200}
              deviceWidth={deviceWidth}
              BAR_SPACE={BAR_SPACE}
            />
          </View>
        )}
        keyExtractor={item => item.date.toString + getRandomInt(1, 1000)}
        ListFooterComponent={this._renderFooter}
        onRefresh={this._handleRefresh}
        refreshing={this.state.refreshing}
        onScroll={this._scrolled}
        initialNumToRender={3}
      />
    ) : (
      <View>
        <Text style={{ alignSelf: "center" }}>Loading beers</Text>
        <ActivityIndicator />
      </View>
    );
  }
}
