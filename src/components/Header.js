import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Burger from '../components/Burger';
import {theme} from '../core/themeProvider';

class Header extends React.Component {
  render() {
    return (
      <View style={style.header}>
        <Burger screen={this.props.screen} onPress={this.props.onPress} />
        <Text style={[theme.headerTitle, style.headerTitle]}>
          {this.props.title}
        </Text>
        {this.props.date && (
          <Text style={style.headerDate}>{this.props.date}</Text>
        )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 14
    // marginTop: Platform.OS !== 'ios' ? 0 : 0
  },
  headerTitle: {
    marginTop: Platform.OS !== 'ios' ? -12 : -8
  }
});

export default Header;
