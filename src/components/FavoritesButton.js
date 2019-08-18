import React from "react";
import { theme } from "../core/themeProvider";
import { TouchableOpacity, StyleSheet } from "react-native";
import Favorites from "../images/favorites.svg";

class FavoritesButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[this.props.style, theme.goBackButton]}
      >
        <Favorites style={style.close} />
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  close: {
    marginTop: 10,
    marginLeft: 10,
    width: 12,
    height: 18
  }
});

export default FavoritesButton;
