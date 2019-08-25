import React from "react";
import { theme } from "../core/themeProvider";

import Moment from "moment";
import Header from "../components/Header";
import Title from "../components/Title";
import { CarouselArticles } from "../components/CarouselArticles";
import ThumbList from "../components/ThumbList";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet
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
class NewsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Header
          onPress={() => navigation.navigate("Menu")}
          title="News"
          date={Moment().format("MMMM Do, YYYY H:mma")}
        />
      ),
      // headerRight: <Text>avatar</Text>,
      headerStyle: {
        height: 100
      }
    };
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View style={styles.body}>
              <Title style={theme.pageTitle} text="Featured News" />
              <CarouselArticles navigation={this.props.navigation} />
            </View>
            <View style={styles.body}>
              <Title
                style={[theme.pageTitle, { fontSize: 15 }]}
                text="Last news"
              />
              <ThumbList data={dataFrom} type='news' />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {},
  body: {
    backgroundColor: "#fff",
    paddingLeft: 14
  }
});

export default NewsScreen;
