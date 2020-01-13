/* eslint-disable react-native/no-inline-styles */
// todo: refactor this!!
import React from 'react';
import {theme} from '../core/themeProvider';
import {TouchableOpacity} from 'react-native';
import BurgerIcon from '../images/Burger.svg';

class Burger extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          theme.burger,
          {
            bottom:
              this.props.screen === 'news'
                ? 39
                : this.props.screen === 'committees'
                ? -2
                : 20,
            position: 'absolute',
            left: 2,
            width: 80,
            height: 50,
            paddingLeft: 14,
            paddingTop: 14,
            zIndex: 100
          }
        ]}>
        <BurgerIcon />
      </TouchableOpacity>
    );
  }
}

export default Burger;
