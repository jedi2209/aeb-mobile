import React from 'react';
import {theme} from '../core/themeProvider';
import {TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Favorites from '../images/favorites.svg';

class FavoritesButton extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        style={[this.props.style, theme.goBackButton]}>
        <Favorites style={style.close} />
      </TouchableWithoutFeedback>
    );
  }
}

const style = StyleSheet.create({
  close: {
    marginTop: 10,
    marginRight: 20,
    width: 12,
    height: 18
  }
});

export default FavoritesButton;
