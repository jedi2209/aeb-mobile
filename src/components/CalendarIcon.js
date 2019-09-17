import React from 'react';
import CalendarIconSvg from '../images/calendarIcon.svg';
import { View } from 'react-native';

class CalendarIcon extends React.Component {
  render() {
    return (
      <View
        style={{
          zIndex: 1,
          position: 'absolute',
          right: 14,
          top: -25,
          backgroundColor: '#FF4D2C',
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
