import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Linking
} from 'react-native';

import Logo from '../../images/logo-full-white.svg';
import CloseButton from '../../components/CloseButton';
import {TextInput} from '../../components/Textinput';
import {onPressSignIn} from './LoginScreen.model';
import {DeviceHeight} from '../../core/themeProvider';

export const LoginScreen = props => {
  const [values, setValues] = useState({email: '', password: ''});
  const {navigation} = props;

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../images/login-bg.png')}>
      <SafeAreaView style={{height: DeviceHeight}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Logo style={styles.logo} />
            <View style={styles.container}>
              <View style={styles.containerInner}>
                <View style={styles.field}>
                  <TextInput
                    label="Email"
                    value={values.email}
                    autoCapitalize={'none'}
                    textContentType={'emailAddress'}
                    keyboardType={'email-address'}
                    enablesReturnKeyAutomatically={true}
                    autoCompleteType={'username'}
                    returnKeyType={'next'}
                    autoFocus={true}
                    onChangeText={text => setValues({...values, email: text})}
                  />
                </View>
                <View style={styles.field}>
                  <TextInput
                    label={props.screenProps.translate('Auth.Password')}
                    value={values.password}
                    autoCapitalize={'none'}
                    secureTextEntry={true}
                    enablesReturnKeyAutomatically={true}
                    textContentType={'password'}
                    autoCompleteType={'password'}
                    onChangeText={text =>
                      setValues({...values, password: text})
                    }
                  />
                </View>
                <TouchableOpacity
                  style={[styles.button, {alignItems: 'flex-end'}]}
                  onPress={() => {
                    Linking.openURL(
                      props.screenProps.translate('Auth.ForgotPasswordLink')
                    );
                  }}>
                  <Text style={[styles.buttonText, {color: '#000'}]}>
                    {props.screenProps.translate('Auth.PasswordForgot')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.button}
                onPressIn={() => onPressSignIn(values)}>
                <Text style={[styles.buttonText, {textTransform: 'uppercase'}]}>
                  {props.screenProps.translate('Auth.SignIn')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{marginTop: 80}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking.openURL(props.screenProps.translate('Auth.RegisterLink'));
            }}>
            <Text style={[styles.buttonText, {color: '#9B9B9B'}]}>
              {props.screenProps.translate('Auth.NoAccount')}{' '}
              <Text style={{color: '#000'}}>
                {props.screenProps.translate('Auth.SignUp')}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <CloseButton
          style={styles.goBack}
          buttonColor="#024b9e"
          onPress={() => navigation.goBack()}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: 356
  },
  inner: {
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  logo: {
    marginVertical: 40
  },
  container: {
    borderRadius: 8,
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.1,
    shadowRadius: 13.16,
    elevation: 20
  },
  containerInner: {
    padding: 20
  },
  separator: {
    height: 2,
    width: '100%',
    backgroundColor: '#024b9e'
  },
  field: {
    marginBottom: 24
  },
  button: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#024b9e',
    fontSize: 15
  },
  goBack: {
    position: 'absolute',
    bottom: '10%',
    left: '43%'
  }
});
