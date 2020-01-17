import React from 'react';
import {TouchableHighlight, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class ArrowButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={[this.props.style, style.arrowBack]}>
        <Icon name="md-download" size={30} style={this.props.styleButton} />
      </TouchableHighlight>
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
