import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {api} from '../lib/api';

import {TextInput} from '../components/Textinput';
import {$session} from './LoginScreen/LoginScreen.model';
import {useStore} from 'effector-react';

export const Settings = props => {
  return (
    <ScrollView>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.container}>
              <View style={styles.containerInner}>
                <View style={styles.field}>
                  <Text style={styles.label}>Уведомления о новостях</Text>
                  <Switch value={true} />
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>Уведомления о публикациях</Text>
                  <Switch value={true} />
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>Уведомления о пресс-релизах</Text>
                  <Switch value={true} />
                </View>
              </View>
              <View style={styles.separator} />
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    marginVertical: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    fontSize: 14
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
