/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Platform
} from 'react-native';

import {DeviceWidth} from '../core/themeProvider';
import AsyncStorage from '@react-native-community/async-storage';
import {api} from '../lib/api';

import {TextInput} from '../components/Textinput';
import {$session} from './LoginScreen/LoginScreen.model';
import {useStore} from 'effector-react';

import {onPressSignOut} from './LoginScreen/LoginScreen.model';

export const Profile = props => {
  const session = useStore($session);

  const [values, setValues] = useState({
    second_name: session.second_name,
    last_name: session.last_name,
    email: session.email,
    phone: session.phone,
    name: session.name,
    id: session.id
  });

  return (
    <ScrollView>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.container}>
              <View style={styles.containerInner}>
                <View style={styles.field}>
                  <TextInput
                    label={props.screenProps.translate(
                      'Profile.Fields.FirstName'
                    )}
                    value={values.name}
                    returnKeyType={'next'}
                    onChangeText={text => setValues({...values, name: text})}
                  />
                </View>
                <View style={styles.field}>
                  <TextInput
                    label={props.screenProps.translate(
                      'Profile.Fields.SecondName'
                    )}
                    value={values.second_name}
                    returnKeyType={'next'}
                    onChangeText={text =>
                      setValues({...values, second_name: text})
                    }
                  />
                </View>
                <View style={styles.field}>
                  <TextInput
                    label={props.screenProps.translate(
                      'Profile.Fields.SurName'
                    )}
                    value={values.last_name}
                    returnKeyType={'next'}
                    onChangeText={text =>
                      setValues({...values, last_name: text})
                    }
                  />
                </View>
                <View style={styles.field}>
                  <TextInput
                    label={props.screenProps.translate('Profile.Fields.Phone')}
                    value={values.phone}
                    returnKeyType={'next'}
                    textContentType={'telephoneNumber'}
                    keyboardType={'phone-pad'}
                    onChangeText={text => setValues({...values, phone: text})}
                  />
                </View>
                <View style={styles.field}>
                  <TextInput
                    label="Email"
                    value={values.email}
                    autoCapitalize={'none'}
                    textContentType={'emailAddress'}
                    keyboardType={'email-address'}
                    enablesReturnKeyAutomatically={true}
                    autoCompleteType={'username'}
                    returnKeyType={'done'}
                    autoFocus={true}
                    onChangeText={text => setValues({...values, email: text})}
                  />
                </View>
              </View>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  const {
                    name,
                    second_name,
                    last_name,
                    phone,
                    email,
                    id
                  } = values;

                  const userData = await api.profile(
                    {
                      NAME: name,
                      SECOND_NAME: second_name,
                      LAST_NAME: last_name,
                      EMAIL: email,
                      PERSONAL_MOBILE: phone
                    },
                    id
                  );

                  await AsyncStorage.setItem(
                    'session',
                    JSON.stringify(userData)
                  );

                  alert('Сохранено успешно');
                }}>
                <Text style={[styles.buttonText, {textTransform: 'uppercase'}]}>
                  Редактировать
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.inner}>
          <View style={styles.container}>
            {/* <View style={styles.separator} /> */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => onPressSignOut()}>
              <Text style={[styles.buttonText, {textTransform: 'uppercase'}]}>
                {props.screenProps.translate('logout')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: 356
  },
  inner: {
    paddingVertical: 30,
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
  }
});
