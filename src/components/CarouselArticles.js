import React from "react";
import { theme } from "../core/themeProvider";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
  Animated
} from "react-native";

const deviceWidth = Dimensions.get("window").width;
const BAR_SPACE = 14;
import Moment from "moment";

const data = [
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
      "https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg",
    date: new Date()
  },
  {
    title: "Reliable internet - a regulatory challenge For business",
    uri:
      "https://aebrus.ru/upload/iblock/245/whatsapp-image-2019_07_12-at-17.41.49.jpeg",
    date: new Date()
  }
];

export class CarouselArticles extends React.Component {
  numItems = data.length;
  //itemWidth = FIXED_BAR_WIDTH / this.numItems - (this.numItems - 1) * BAR_SPACE;
  animVal = new Animated.Value(0);

  render() {
    let imageArray = [];
    let barArray = [];

    data.forEach((item, i) => {
      const thisImage = (
        <View key={`image${i}`} style={styles.slide}>
          <Image
            source={{ uri: item.uri }}
            style={{ width: deviceWidth - 14 - BAR_SPACE, height: 200 }}
          />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>
            {Moment().format("MMMM Do, YYYY H:mma")}
          </Text>
        </View>
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
    alignItems: "center",
    justifyContent: "center"
  },
  barContainer: {
    position: "absolute",
    zIndex: 2,
    top: 40,
    flexDirection: "row"
  },
  slide: {
    width: deviceWidth - 14 - BAR_SPACE,
    marginRight: BAR_SPACE,
    borderBottomColor: "#D7D8DA",
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingBottom: 20
  },
  image: {
    borderRadius: 4
  },
  title: {
    fontSize: 20,
    color: "#000000",
    letterSpacing: 0.25,
    textAlign: "left",
    lineHeight: 32,
    fontWeight: "bold"
  },
  date: {
    fontSize: 17,
    color: "#8C8C8C",
    letterSpacing: 0.32,
    lineHeight: 22
  }
});
