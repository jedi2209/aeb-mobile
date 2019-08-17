import React from "react";
// import { theme } from "../core/themeProvider";
import { View, Text, StyleSheet } from "react-native";
import Burger from "../components/Burger";

class Header extends React.Component {
  render() {
    return (
      <View style={style.header}>
        <Burger onPress={this.props.onPress} />
        <Text style={[style.headerTitle]}>{this.props.title}</Text>
        {this.props.date && (
          <Text style={style.headerDate}>{this.props.date}</Text>
        )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 14
  },
  headerTitle: {
    marginTop: 8,
    fontSize: 34,
    color: "#1E2432",
    fontWeight: "bold"
  },
  headerDate: {
    marginTop: 5,
    fontSize: 15,
    color: "#ACB1C0"
  }
});

export default Header;
