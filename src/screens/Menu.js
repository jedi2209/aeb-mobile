/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {theme} from '../core/themeProvider';

import {StyleSheet, View, TouchableOpacity, Text, Platform} from 'react-native';

import Menu from '../components/Menu';
import CloseButton from '../components/CloseButton';

class MenuScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={[style.container, theme.blueScreen]}>
        <TouchableOpacity
          onPress={() => navigate('Login')}
          style={{
            marginTop: Platform.OS === 'ios' ? '20%' : '10%',
            width: 305,
            height: 50
          }}>
          <View style={[theme.whiteButton]}>
            <Text style={theme.whiteButtonText}>
              {this.props.screenProps.translate('login')}
            </Text>
          </View>
        </TouchableOpacity>
        <Menu
          navigation={this.props.navigation}
          translate={this.props.screenProps.translate}
        />
        <CloseButton
          style={style.goBack}
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  goBack: {
    marginBottom: '15%'
  }
});

export default MenuScreen;
