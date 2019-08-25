import React from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  Image
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const BAR_SPACE = 14;

const data = [
  "https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg",
  'https://aebrus.ru/upload/iblock/245/whatsapp-image-2019_07_12-at-17.41.49.jpeg',
  'https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg',
  "https://aebrus.ru/upload/iblock/245/whatsapp-image-2019_07_12-at-17.41.49.jpeg",
  "https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg",
  'https://aebrus.ru/upload/iblock/245/whatsapp-image-2019_07_12-at-17.41.49.jpeg',
  'https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg',
  "https://aebrus.ru/upload/iblock/245/whatsapp-image-2019_07_12-at-17.41.49.jpeg"
];

export class CarouselImages extends React.Component {
  numItems = data.length;
  animVal = new Animated.Value(0);
  navigation = this.props.navigation;

  render() {
    let imageArray = [];
    let barArray = [];

    data.forEach((item, i) => {
      const thisImage = (
        <Image
          style={{ width: 60, height: 60, marginRight: BAR_SPACE }}
          key={"image" + i}
          source={{ uri: item }}
        />
      );
      imageArray.push(thisImage);
    });

    return (
      <View style={[styles.container, { marginVertical: 10 }]} flex={1}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.animVal } } },
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
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 40,
    flexDirection: 'row',
  },
});
