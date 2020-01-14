/* eslint-disable react-native/no-inline-styles */
// todo: refactor this!!
import React from 'react';
import {theme} from '../core/themeProvider';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import BurgerIcon from '../images/Burger.svg';

class Burger extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={theme.burger}>
        <Icon name="menu" size={28} color="#000000" />
      </TouchableOpacity>
    );
  }
}

export default Burger;
