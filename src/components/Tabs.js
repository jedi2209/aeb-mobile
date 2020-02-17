import * as React from 'react';
import moment from 'moment/min/moment-with-locales';

import {View, Text, StyleSheet} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab';
import {theme} from '../core/themeProvider';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
    this.values = [];
    this.tabsContent = [];
    this.props.tabs.forEach((item, _index) => {
      if (item.route) {
        this.values.push(item.head);
        this.tabsContent.push(item.route);
      }
    });
  }

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
  };

  render() {
    return (
      <View>
        <SegmentedControlTab
          tabsContainerStyle={[styles.main, theme.cardShadow]}
          tabStyle={[styles.tabInActive, this.props.tabStyle]}
          tabTextStyle={[styles.tabInActiveFont, this.props.tabTextStyle]}
          activeTabStyle={[styles.tabActive, this.props.activeTabStyle]}
          activeTabTextStyle={[
            styles.tabActiveFont,
            this.props.activeTabTextStyle
          ]}
          values={this.values}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
        />
        <View>{this.tabsContent[this.state.selectedIndex]}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  // indicator: {
  //   backgroundColor: '#fff',
  //   height: 32,
  //   marginTop: 2,
  //   marginBottom: 2,
  //   borderRadius: 6,
  //   top: 0
  // },
  main: {
    backgroundColor: '#F1F2F6',
    borderWidth: 0,
    height: 36,
    marginTop: 5,
    width: '96%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 6,
    position: 'relative'
  },
  tabInActive: {
    paddingHorizontal: 2,
    borderColor: '#D8D8D8',
    backgroundColor: '#F1F2F6',
    borderWidth: 0
  },
  tabInActiveFont: {
    fontSize: 12,
    color: '#ACB1C0'
  },
  tabActive: {
    backgroundColor: '#fff',
    marginVertical: 1,
    borderWidth: 0,
    fontSize: 12
  },
  tabActiveFont: {
    fontSize: 12,
    color: '#1E2432'
  }
});

export default Tabs;
