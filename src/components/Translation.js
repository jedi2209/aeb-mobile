/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import TranslationIconSvg from '../images/Translation.svg';
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
            marginRight: 15,
            width: 14
          }}>
          <TranslationIconSvg />
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
