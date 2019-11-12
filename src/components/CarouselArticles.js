import React from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated
} from 'react-native';

import Card from '../components/Card';

const deviceWidth = Dimensions.get('window').width;
const BAR_SPACE = 14;
const PADDING = 14;

export class CarouselArticles extends React.Component {
  state = {
    data: this.props.data,
    numItems: this.props.data.length,
    animVal: new Animated.Value(0),
    navigation: this.props.navigation
  };

  render() {
    let imageArray = [];
    let barArray = [];

    this.props.data.forEach((item, i) => {
      const thisImage = (
        <Card
          navigation={this.navigation}
          key={`image${i}`}
          data={item}
          width={deviceWidth - PADDING - BAR_SPACE}
          height={200}
          deviceWidth={deviceWidth}
          BAR_SPACE={BAR_SPACE}
        />
      );
      imageArray.push(thisImage);
    });

    return (
      <View style={styles.container} flex={1}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.animVal } } }
          ])}
        >
          {imageArray}
        </ScrollView>
        <View style={styles.barContainer}>{barArray}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 40,
    flexDirection: 'row'
  }
});
