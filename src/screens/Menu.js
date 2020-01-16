/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useStore} from 'effector-react';
import {theme} from '../core/themeProvider';

import {StyleSheet, View, TouchableOpacity, Text, Platform} from 'react-native';

import Menu from '../components/Menu';
import CloseButton from '../components/CloseButton';
import {$session, onPressSignOut} from './LoginScreen/LoginScreen.model';

const MenuScreen = ({navigation, navigate, screenProps}) => {
  const session = useStore($session);

  console.log('render menu screen', session.id);

  return (
    <View style={[style.container, theme.blueScreen]}>
      {session.id ? (
        <TouchableOpacity
          onPress={() => onPressSignOut()}
          style={{
            marginTop: Platform.OS === 'ios' ? '20%' : '10%',
            width: 305,
            height: 50
          }}>
          <View style={[theme.whiteButton]}>
            <Text style={theme.whiteButtonText}>Выйти</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          style={{
            marginTop: Platform.OS === 'ios' ? '20%' : '10%',
            width: 305,
            height: 50
          }}>
          <View style={[theme.whiteButton]}>
            <Text style={theme.whiteButtonText}>
              {screenProps.translate('login')}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      <Menu
        navigation={navigation}
        translate={screenProps.translate}
        isLogin={session.id}
      />
      <CloseButton style={style.goBack} onPress={() => navigation.goBack()} />
    </View>
  );
};

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
