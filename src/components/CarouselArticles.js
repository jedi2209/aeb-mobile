import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet, Dimensions } from 'react-native';

import Card from '../components/Card';

const deviceWidth = Dimensions.get('window').width;
const BAR_SPACE = 14;
const PADDING = 14;

const cardWidth = deviceWidth - 25;
export class CarouselArticles extends Component {
  _renderItem({ item }) {
    return (
      <Card
        navigation={this.navigation}
        key={`carousel-article-${item.id}`}
        data={item}
        width={cardWidth}
        height={200}
        BAR_SPACE={BAR_SPACE}
      />
    );
  }

  render() {
    this.navigation = this.props.navigation;

    return (
      <Carousel
        style={styles.container}
        ref={c => {
          this._carousel = c;
        }}
        data={this.props.data}
        renderItem={this._renderItem}
        sliderWidth={deviceWidth}
        inactiveSlideScale={0.97}
        activeSlideAlignment={'center'}
        itemWidth={cardWidth}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid'
  }
});
