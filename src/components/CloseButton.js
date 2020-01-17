import React from 'react';
import {theme} from '../core/themeProvider';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Close from 'react-native-vector-icons/Ionicons';

class CloseButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[this.props.style, theme.goBackButton]}>
        <Close
          name="ios-close-circle-outline"
          size={45}
          color={this.props.buttonColor ? this.props.buttonColor : '#fff'}
          style={style.close}
        />
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  close: {
    // marginTop: 10,
    // marginLeft: 10
  }
});

export default CloseButton;
