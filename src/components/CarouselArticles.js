import React from 'react';
import { theme } from '../core/themeProvider';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const BAR_SPACE = 14;
import Card from '../components/Card';

const data = [
  {
    title: 'Reliable internet - a regulatory challenge For business',
    uri:
      'https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg',
    date: new Date()
  },
  {
    title: 'Reliable internet - a regulatory challenge For business',
    uri:
      'https://aebrus.ru/upload/iblock/245/whatsapp-image-2019_07_12-at-17.41.49.jpeg',
    date: new Date()
  },
  {
    title: 'Reliable internet - a regulatory challenge For business',
    uri:
      'https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg',
    date: new Date()
  },
  {
    title: 'Reliable internet - a regulatory challenge For business',
    uri:
      'https://aebrus.ru/upload/iblock/245/whatsapp-image-2019_07_12-at-17.41.49.jpeg',
    date: new Date()
  }
];

export class CarouselArticles extends React.Component {
  numItems = data.length;
  animVal = new Animated.Value(0);
  navigation = this.props.navigation;

  render() {
    let imageArray = [];
    let barArray = [];

    data.forEach((item, i) => {
      const thisImage = (
        <Card
          navigation={this.navigation}
          key={`image${i}`}
          data={item}
          width={deviceWidth - 14 - BAR_SPACE}
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
