import React from "react";
import { theme } from "../core/themeProvider";
import { TouchableOpacity, StyleSheet } from "react-native";
import BurgerIcon from "../images/Burger.svg";

class Burger extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[this.props.style, theme.burger]}
      >
        <BurgerIcon style={style.burger} />
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  burger: {}
});

export default Burger;
