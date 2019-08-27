import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Arrow from '../images/Arrow';

class ArrowButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[this.props.style, style.arrowBack]}
      >
        <Arrow />
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  arrowBack: {
    backgroundColor: '#0E4F9F',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ArrowButton;
