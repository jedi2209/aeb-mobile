import React from 'react';
import {Text} from 'react-native';

class Title extends React.Component {
  render() {
    return <Text style={this.props.style}>{this.props.text}</Text>;
  }
}

export default Title;
