import React from "react";
import { theme } from "../core/themeProvider";

import {
  Button,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet
} from "react-native";

import {
  Header,
  LearnMoreLinks,
  Colors
  // DebugInstructions,
  // ReloadInstructions
} from "react-native/Libraries/NewAppScreen";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "News"
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <Header />
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text>Привет, мир!</Text>
              </View>
              <View style={styles.sectionContainer}>
                <Image
                  source={require("../images/aeblogo.png")}
                  // style={{ width: 40, height: 40 }}
                />
              </View>
              <View style={styles.sectionContainer}>
                <Button
                  title="Go to menu"
                  onPress={() => navigate("Menu", { name: "Anna" })}
                />
                <Text style={styles.sectionDescription}>
                  А тут будет еще более замечательный текст
                </Text>
              </View>
              <LearnMoreLinks />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter
  },
  body: {
    backgroundColor: Colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark
  },
  highlight: {
    fontWeight: "700"
  }
});

export default HomeScreen;
