/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useStore} from 'effector-react';
import {theme} from '../core/themeProvider';

import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Platform
} from 'react-native';

import Menu from '../components/Menu';
import CloseButton from '../components/CloseButton';
import {$session} from './LoginScreen/LoginScreen.model';

const MenuScreen = ({navigation, navigate, screenProps}) => {
  const session = useStore($session);

  return (
    <View style={[style.container, theme.blueScreen]}>
      {session.id ? (
        <TouchableHighlight
          onPress={() => navigation.navigate('Profile')}
          style={{
            marginTop: Platform.OS === 'ios' ? '20%' : '10%',
            width: 305,
            height: 50
          }}>
          <View style={[theme.whiteButton]}>
            <Text style={theme.whiteButtonText}>
              {screenProps.translate('profile')}
            </Text>
          </View>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          onPress={() => navigation.navigate('LoginScreen')}
          navigation={navigation}
          underlayColor={'#4A90E2'}
          style={{
            marginTop: Platform.OS === 'ios' ? '20%' : '10%',
            width: '75%',
            height: 50,
            marginHorizontal: 20,
            marginVertical: 10
          }}>
          <View style={[theme.whiteButton, theme.cardShadow]}>
            <Text style={theme.whiteButtonText}>
              {screenProps.translate('login')}
            </Text>
          </View>
        </TouchableHighlight>
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goBack: {
    marginVertical: 24,
    marginBottom: 48
  }
});

export default MenuScreen;
