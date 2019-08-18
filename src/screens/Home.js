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

class HomeScreen extends React.Component {
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
              <ThumbList />
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

export default HomeScreen;
