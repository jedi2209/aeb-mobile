/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MapsSvg from '../images/Maps.svg';
import { View, Text } from 'react-native';
import { DeviceWidth } from '../core/themeProvider';

class Maps extends React.Component {
  render() {
    return (
      <View
        style={{
          paddingLeft: 14,
          width: '90%',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        }}
      >
        <View
          style={{
            marginTop: 7,
            width: 32
          }}
        >
          <MapsSvg />
        </View>
        <Text
          style={{
            fontSize: 14,
            color: '#FFF',
            width: DeviceWidth - 160
          }}
        >
          {this.props.text}
        </Text>
      </View>
    );
  }
}

export default Maps;
