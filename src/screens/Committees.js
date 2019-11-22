/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { theme } from '../core/themeProvider';

import Header from '../components/Header';
import ThumbList from '../components/ThumbList';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import {
  SafeAreaView,
  ScrollView,
  View,
  Platform,
  StyleSheet
} from 'react-native';

const CATEGORIES = {
  // TODO: Описать? что это за херня
  0: 32,
  1: 30,
  2: 31,
};

class CommitteesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0
    };
    // this.ids = [32, 30, 31];
  }

  handleIndexChange = selectedIndex => {
    //handle tab selection for custom Tab Selection SegmentedControlTab
    // this.setState(prevState => ({ ...prevState, selectedIndex: index }));
    this.setState({ selectedIndex });
  };

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerLeft: (
        <Header
          onPress={() => navigation.navigate('Menu')}
          title={screenProps.translate('committees')} //committees
        />
      ),
      headerStyle: {
        height: Platform.OS === 'ios' ? 100 : 108,
        borderBottomWidth: 0
      }
    };
  };

  render() {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View>
              <View style={{ backgroundColor: '#FAFAFA', paddingVertical: 14 }}>
                <SegmentedControlTab
                  tabsContainerStyle={{ marginTop: 0 }}
                  tabStyle={{
                    backgroundColor: '#FAFAFA',
                    borderColor: '#FAFAFA'
                  }}
                  tabTextStyle={{ color: '#D8D8D8', fontSize: 11 }}
                  activeTabStyle={{
                    backgroundColor: '#FAFAFA',
                    borderColor: '#FAFAFA'
                  }}
                  activeTabTextStyle={{ color: '#000', fontSize: 11 }}
                  values={['CROSS-SECTORAL', 'INDUSTRIAL', 'WORKING GROUPS']}
                  selectedIndex={this.state.selectedIndex}
                  onTabPress={this.handleIndexChange}
                />
              </View>
              <View style={styles.body}>
                <ThumbList
                  paramsForFetch={{
                    type: CATEGORIES[this.state.selectedIndex]
                  }}
                  type="committees"
                  navigation={this.props.navigation}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {},
  body: {
    backgroundColor: '#FAFAFA',
    paddingLeft: 14,
    marginTop: -20
  }
});

export default CommitteesScreen;
