import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Burger from '../components/Burger';

class Header extends React.Component {
  render() {
    return (
      <View style={style.header}>
        <Burger screen={this.props.screen} onPress={this.props.onPress} />
        <Text style={[style.headerTitle]}>{this.props.title}</Text>
        {this.props.date && (
          <Text style={style.headerDate}>{this.props.date}</Text>
        )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 14,
    marginTop: Platform.OS !== 'ios' ? 10 : 0
  },
  headerTitle: {
    marginTop: 10,
    fontSize: 34,
    color: '#1E2432',
    fontWeight: 'bold'
  },
  headerDate: {
    marginTop: 0,
    fontSize: 15,
    color: '#ACB1C0'
    // ,
    // textTransform: 'capitalize'
  }
});

export default Header;
