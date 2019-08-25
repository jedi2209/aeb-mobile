import React from 'react';
import { StyleSheet } from 'react-native';
import ArrowD from '../images/ArrowDropdown.svg';

class ArrowDropdown extends React.Component {
  render() {
    return <ArrowD />;
  }
}

const style = StyleSheet.create({
  arrowBack: {
    backgroundColor: '#0E4F9F',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ArrowDropdown;
