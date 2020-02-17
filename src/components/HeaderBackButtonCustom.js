import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {theme} from '../core/themeProvider';
import Icon from 'react-native-vector-icons/Ionicons';

class HeaderBackButtonCustom extends React.Component {
  render() {
    const backLink = this.props.navigation.getParam('backLink', null);
    return (
      <TouchableOpacity
        onPress={() =>
          backLink
            ? this.props.navigation.navigate(backLink)
            : this.props.navigation.goBack()
        }>
        <View style={theme.goBackButton}>
          <Icon
            name="ios-arrow-back"
            size={30}
            color={this.props.color ? this.props.color : '#fff'}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default HeaderBackButtonCustom;
