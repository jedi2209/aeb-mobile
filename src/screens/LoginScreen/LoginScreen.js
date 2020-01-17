import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView
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
                    onChangeText={text => setValues({...values, email: text})}
                  />
                </View>
                <View style={styles.field}>
                  <TextInput
                    label="Password"
                    value={values.password}
                    onChangeText={text =>
                      setValues({...values, password: text})
                    }
                  />
                </View>
                <TouchableOpacity
                  style={[styles.button, {alignItems: 'flex-end'}]}>
                  <Text style={[styles.buttonText, {color: '#000'}]}>
                    Forgot your password?
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.button}
                onPressIn={() => onPressSignIn(values)}>
                <Text style={[styles.buttonText, {textTransform: 'uppercase'}]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{marginTop: 80}}>
          <TouchableOpacity style={styles.button}>
            <Text style={[styles.buttonText, {color: '#9B9B9B'}]}>
              Don't have an account?{' '}
              <Text style={{color: '#000'}}>Sign up</Text>
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
