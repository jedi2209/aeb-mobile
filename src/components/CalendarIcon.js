/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import CalendarIconSvg from '../images/calendarIcon.svg';
import { View } from 'react-native';

class CalendarIcon extends React.Component {
  render() {
    return (
      <View
        style={{
          shadowOpacity: 0.2,
          shadowRadius: 4,
          shadowColor: '#000000',
          shadowOffset: { height: 1, width: 0 },
          zIndex: 1,
          position: 'absolute',
          right: 14,
          top: -25,
          backgroundColor: '#FF2D55',
          borderRadius: 30,
          width: 50,
          height: 50,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CalendarIconSvg />
      </View>
    );
  }
}

export default CalendarIcon;
