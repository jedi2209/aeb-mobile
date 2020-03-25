/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {theme} from '../core/themeProvider';

import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

let menuNames = [
  'News',
  'Events',
  'Publications',
  'Releases.menuTitle',
  'Committees',
  'Contacts',
  'Settings'
];

let menuItems = [
  'News',
  'Events',
  'Publications',
  'Releases',
  'Committees',
  'Contacts',
  'Settings'
];

const Menu = props => {
  const {translate, navigation} = props;

  return (
    <View
      style={{
        marginTop: 24,
        justifyContent: 'center'
      }}
      scrollEnabled={false}>
      {menuItems.map((item, i) => (
        <TouchableOpacity
          key={item}
          onPress={() => {
            navigation.navigate(item);
          }}>
          <Text style={[styles.link, theme.whiteLink]}>
            {translate(menuNames[i])}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = {
  linklList: {},
  link: {
    textAlign: 'center',
    textTransform: 'capitalize'
  }
};

export default Menu;
