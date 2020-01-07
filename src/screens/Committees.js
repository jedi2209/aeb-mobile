/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { theme, DeviceWidth } from '../core/themeProvider';

import Header from '../components/Header';
import ThumbList from '../components/ThumbList';
import Tabs from '../components/Tabs';
import { TabView } from 'react-native-tab-view';

import {
  SafeAreaView,
  ScrollView,
  View,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
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

    // this.state = {
    //   index: 0,
    //   routes: [
    //     { key: 'first', title: props.screenProps.translate('cross_sectoral') }, //'CROSS-SECTORAL'
    //     { key: 'second', title: props.screenProps.translate('industrial') }, //'INDUSTRIAL',
    //     { key: 'third', title: props.screenProps.translate('working_groups') } //'WORKING GROUPS'
    //   ]
    // };
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
        height: Platform.OS === 'ios' ? 60 : 68,
        borderBottomWidth: 0,
        shadowOpacity: 0.2,
        shadowRadius: 15,
        shadowColor: '#000000',
        shadowOffset: {
          height: 2,
          width: 0
        }
      }
    };
  };

  // _renderTabBar = props => {
  //   return (
  //     <View style={styles.tabBar}>
  //       {props.navigationState.routes.map((route, i) => {
  //         return (
  //           <TouchableWithoutFeedback
  //             key={`tab-${i}`}
  //             accessibilityRole="tab"
  //             style={styles.tabItem}
  //             onPress={() => this.setState({ index: i })}
  //           >
  //             <Text
  //               style={{
  //                 color: props.navigationState.index === i ? '#000' : '#D8D8D8',
  //                 fontSize: 12,
  //                 paddingTop: 10,
  //                 paddingBottom: 20
  //               }}
  //             >
  //               {route.title}
  //             </Text>
  //           </TouchableWithoutFeedback>
  //         );
  //       })}
  //     </View>
  //   );
  // };

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
                <Tabs
                  tabs={[
                    {
                      head: this.props.screenProps.translate('cross_sectoral'),
                      route: FirstRoute(this.props.navigation)
                    },
                    {
                      head: this.props.screenProps.translate('industrial'),
                      route: SecondRoute(this.props.navigation)
                    },
                    {
                      head: this.props.screenProps.translate('working_groups'),
                      route: ThirdRoute(this.props.navigation)
                    }
                  ]}
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
    marginTop: 10
  },
  container: {
    flex: 1
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 14,
    marginRight: 14,
    height: 40
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    color: '#000000'
  }
});

export default CommitteesScreen;
