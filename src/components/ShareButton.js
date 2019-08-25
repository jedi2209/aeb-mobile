import React from "react";
import { theme } from "../core/themeProvider";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import Share from "../images/share.svg";

class ShareButton extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        style={[this.props.style, theme.goBackButton]}
      >
        <Share style={style.close} />
      </TouchableWithoutFeedback>
    );
  }
}

const style = StyleSheet.create({
  close: {
    marginTop: 10,
    marginLeft: 10,
    width: 18,
    height: 18
  }
});

export default ShareButton;
