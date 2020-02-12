/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text} from 'react-native';
import {DeviceWidth} from '../core/themeProvider';

class Translation extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginVertical: 10
        }}>
        <View
          style={{
            marginRight: 15
          }}>
          <Icon name="translate" size={20} style={this.props.styleButton} />
        </View>
        <Text
          style={{
            fontSize: 14,
            color: '#000',
            width: DeviceWidth - 14
          }}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

export default Translation;
