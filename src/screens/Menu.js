import React from "react";
import { theme } from "../core/themeProvider";

import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import Menu from "../components/Menu";
import CloseButton from "../components/CloseButton";

class MenuScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[style.container, theme.blueScreen]}>
        <TouchableOpacity
          onPress={() => navigate("Login")}
          style={{ marginTop: "20%", width: 305, height: 50 }}
        >
          <View style={[theme.whiteButton]}>
            <Text style={theme.whiteButtonText}>Sign In</Text>
          </View>
        </TouchableOpacity>
        <Menu navigation={this.props.navigation} />
        <CloseButton style={style.goBack} onPress={() => navigate("Home")} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  goBack: {
    marginBottom: "15%"
  }
});

export default MenuScreen;
