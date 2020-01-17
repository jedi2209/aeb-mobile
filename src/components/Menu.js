import React from 'react';
import {theme} from '../core/themeProvider';

import {Text, SectionList, TouchableOpacity, View} from 'react-native';

let menuItems = [
  'News',
  'Events',
  'Publications',
  'Releases',
  'Committees',
  'Contacts'
];

const Menu = props => {
  const {translate, navigation} = props;

  if (props.isLogin && !menuItems.includes('Settings')) {
    menuItems.push('Settings');
  }
  console.log('>>> render', props.isLogin);
  return (
    <View style={{height: '60%'}} scrollEnabled={false}>
      <SectionList
        style={styles.linklList}
        sections={[
          {
            title: '',
            data: props.isLogin
              ? menuItems
              : [
                  'News',
                  'Events',
                  'Publications',
                  'Releases',
                  'Committees',
                  'Contacts'
                ]
          }
        ]}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(item);
            }}
            style={{
              paddingVertical: 10
            }}>
            <Text style={[styles.link, theme.whiteLink]}>
              {translate(item)}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item + index}
      />
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
