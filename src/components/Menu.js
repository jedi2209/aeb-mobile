/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {theme} from '../core/themeProvider';

import {Text, TouchableOpacity, View, Linking} from 'react-native';
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
        <>
          <TouchableOpacity
            key={item}
            onPress={() => {
              navigation.navigate(item);
            }}>
            <Text style={[styles.link, theme.whiteLink]}>
              {translate(menuNames[i])}
            </Text>
          </TouchableOpacity>
          {item === 'News' ? (
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: -60,
                top: 0,
                flexDirection: 'row'
              }}
              key={item}
              onPress={() => {
                Linking.openURL(
                  translate('const.mainDomain') + '/news_covid19/'
                );
              }}>
              <Text style={[styles.link, theme.whiteLink, {fontSize: 14}]}>
                {translate('NewsCovid.menuTitle')
                  .toString()
                  .toUpperCase()}
              </Text>
              <Icon name="new" size={17} color="#fff" />
            </TouchableOpacity>
          ) : null}
        </>
      ))}
    </View>
  );
};

// class Menu extends React.Component {
//   render() {
//     const { translate } = this.props;
//     const { navigate } = this.props.navigation;

//   }
// }

const styles = {
  linklList: {},
  link: {
    textAlign: 'center',
    textTransform: 'capitalize'
  }
};

export default Menu;
