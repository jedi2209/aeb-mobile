import React from 'react';
import { theme } from '../core/themeProvider';

import {
  Text,
  SectionList,
  Dimensions,
  TouchableOpacity,
  View
} from 'react-native';

const menuItems = [
  'News',
  'Events',
  'Publications',
  'Releases',
  'Committees',
  'Contacts'
];

const menuItemsBottom = ['settings'];

const { width } = Dimensions.get('window');

class Menu extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ height: 300 }}>
        <SectionList
          style={styles.linklList}
          sections={[
            { title: '', data: menuItems },
            { title: '', data: menuItemsBottom }
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigate(item)}>
              <Text style={[styles.link, theme.whiteLink]}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}

const styles = {
  linklList: {},
  link: {
    textAlign: 'center',
    textTransform: 'capitalize'
  }
};

export default Menu;
