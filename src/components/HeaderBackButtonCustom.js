import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {theme} from '../core/themeProvider';
import Icon from 'react-native-vector-icons/Ionicons';

class HeaderBackButtonCustom extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
        <View style={theme.goBackButton}>
          <Icon name="ios-arrow-back" size={30} color="#fff" />
        </View>
      </TouchableOpacity>
    );
  }
}

export default HeaderBackButtonCustom;
