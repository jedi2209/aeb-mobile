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

const CarouselArticles = props => {
  const { data, navigation } = props;
  const animVal = new Animated.Value(0);

  const items = data.map(item => {
    return (
      <Card
        navigation={navigation}
        key={`carousel-article-${item.id}`}
        data={item}
        width={deviceWidth - PADDING - BAR_SPACE}
        height={200}
        deviceWidth={deviceWidth}
        BAR_SPACE={BAR_SPACE}
      />
    );
  });

  return (
    <View style={styles.container} flex={1}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={10}
        pagingEnabled
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: animVal } } }
        ])}
      >
        {items}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CarouselArticles;
