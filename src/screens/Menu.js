import React from "react";
import { theme } from "../core/themeProvider";

import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";

import Close from "../images/Close.svg";
import Menu from "../components/Menu";

class MenuScreen extends React.Component {
  static navigationOptions = {
    title: "Menu"
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[style.container, theme.blueScreen]}>
        <TouchableOpacity
          style={[theme.whiteButton, style.whiteButton]}
          onPress={() => navigate("Login")}
        >
          <Text style={theme.whiteButtonText}>Sign In</Text>
        </TouchableOpacity>
        <Menu />
        <TouchableOpacity
          style={[theme.goBackButton, style.goBack]}
          onPress={() => navigate("Home")}
        >
          <Close />
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  whiteButton: {
    marginTop: 100
  },
  goBack: {
    marginBottom: 200
  }
});

export default MenuScreen;
