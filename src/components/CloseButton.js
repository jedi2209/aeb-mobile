import React from "react";
import { theme } from "../core/themeProvider";
import { TouchableOpacity, StyleSheet } from "react-native";
import Close from "../images/Close.svg";

class CloseButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[this.props.style, theme.goBackButton]}
      >
        <Close style={style.close} />
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  close: {
    marginTop: 10,
    marginLeft: 10
  }
});

export default CloseButton;
