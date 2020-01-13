import React from 'react';
import {theme} from '../core/themeProvider';

import {Text, SectionList, TouchableOpacity, View} from 'react-native';

const menuItems = [
  'News',
  'Events',
  'Publications',
  'Releases',
  'Committees',
  'Contacts'
];

const Menu = props => {
  const {translate, navigation} = props;

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{height: 300}}>
      <SectionList
        style={styles.linklList}
        sections={[
          {title: '', data: menuItems}
          // { title: '', data: menuItemsBottom }
        ]}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(item);
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
