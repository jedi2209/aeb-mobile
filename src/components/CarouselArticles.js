import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import { DeviceWidth } from '../core/themeProvider';

import Card from '../components/Card';

const cardWidth = DeviceWidth - 25;
export class CarouselArticles extends Component {
  _renderItem({ item }) {
    return (
      <Card
        navigation={this.props.navigation}
        key={`carousel-article-${item.id}`}
        data={item}
        width={cardWidth}
        height={200}
      />
    );
  }

  render() {
    return (
      <Carousel
        data={this.props.data}
        renderItem={this._renderItem.bind(this)}
        sliderWidth={DeviceWidth}
        inactiveSlideScale={0.97}
        activeSlideAlignment={'center'}
        itemWidth={cardWidth}
      />
    );
  }
}
