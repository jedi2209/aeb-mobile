import React from 'react';
import { theme } from '../core/themeProvider';
import { TouchableOpacity } from 'react-native';
import BurgerIcon from '../images/Burger.svg';

class Burger extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[this.props.style, theme.burger]}
      >
        <BurgerIcon />
      </TouchableOpacity>
    );
  }
}

export default Burger;
