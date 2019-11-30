/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { theme } from '../core/themeProvider';

import Header from '../components/Header';
import ThumbList from '../components/ThumbList';
import { TabView } from 'react-native-tab-view';

import {
  SafeAreaView,
  ScrollView,
  View,
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native';

const FirstRoute = navigation => (
  <View style={styles.body}>
    <ThumbList
      paramsForFetch={{ type: 32 }}
      type="committees"
      navigation={navigation}
    />
  </View>
);

const SecondRoute = navigation => (
  <View style={styles.body}>
    <ThumbList
      paramsForFetch={{ type: 30 }}
      type="committees"
      navigation={navigation}
    />
  </View>
);

const ThirdRoute = navigation => (
  <View style={styles.body}>
    <ThumbList
      paramsForFetch={{ type: 31 }}
      type="committees"
      navigation={navigation}
    />
  </View>
);

class CommitteesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: props.screenProps.translate('cross_sectoral') }, //'CROSS-SECTORAL'
        { key: 'second', title: props.screenProps.translate('industrial') }, //'INDUSTRIAL',
        { key: 'third', title: props.screenProps.translate('working_groups') } //'WORKING GROUPS'
      ]
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerLeft: (
        <Header
          onPress={() => navigation.navigate('Menu')}
          title={screenProps.translate('committees')} //committees
        />
      ),
      headerStyle: {
        height: Platform.OS === 'ios' ? 60 : 68
      }
    };
  };

  _renderTabBar = props => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={`tab-${i}`}
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}
            >
              <Text
                style={{
                  color: props.navigationState.index === i ? '#000' : '#D8D8D8',
                  fontSize: 11
                }}
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
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
                <TabView
                  renderTabBar={this._renderTabBar}
                  navigationState={this.state}
                  renderScene={({ route }) => {
                    switch (route.key) {
                      case 'first':
                        return FirstRoute(this.props.navigation);
                      case 'second':
                        return SecondRoute(this.props.navigation);
                      default:
                        return ThirdRoute(this.props.navigation);
                    }
                  }}
                  onIndexChange={index => this.setState({ index })}
                  initialLayout={{ width: Dimensions.get('window').width }}
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
  scene: {
    flex: 1
  },
  body: {
    backgroundColor: '#FAFAFA',
    paddingLeft: 14,
    marginTop: -20
  },
  container: {
    flex: 1
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingBottom: 0
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 20
  }
});

export default CommitteesScreen;
