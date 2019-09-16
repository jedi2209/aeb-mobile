/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import TranslationIconSvg from '../images/Translation.svg';
import { View, Text, Dimensions } from 'react-native';

class Translation extends React.Component {
  render() {
    const deviceWidth = Dimensions.get('window').width;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginVertical: 10
        }}
      >
        <View
          style={{
            marginRight: 15,
            width: 14
          }}
        >
          <TranslationIconSvg />
        </View>
        <Text
          style={{
            fontSize: 14,
            color: '#000',
            width: deviceWidth - 14
          }}
        >
          {this.props.text}
        </Text>
      </View>
    );
  }
}

export default Translation;
