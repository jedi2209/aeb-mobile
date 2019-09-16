/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { theme } from '../core/themeProvider';
import { TouchableOpacity } from 'react-native';
import BurgerIcon from '../images/Burger.svg';

class Burger extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          theme.burger,
          {
            top:
              this.props.screen === 'wide'
                ? -20
                : this.props.screen === 'committees'
                ? -7
                : -35,
            position: 'absolute',
            left: 0,
            width: 80,
            height: 50,
            paddingLeft: 14,
            paddingTop: 8,
            zIndex: 100
          }
        ]}
      >
        <BurgerIcon />
      </TouchableOpacity>
    );
  }
}

export default Burger;
