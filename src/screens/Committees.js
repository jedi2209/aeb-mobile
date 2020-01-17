/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {theme, DeviceWidth} from '../core/themeProvider';

import Header from '../components/Header';
import ThumbList from '../components/ThumbList';
import Tabs from '../components/Tabs';

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
  <View style={styles.body} key="committees32">
    <ThumbList
      paramsForFetch={{type: 32}}
      type="committees"
      navigation={navigation}
    />
  </View>
);

const SecondRoute = navigation => (
  <View style={styles.body} key="committees30">
    <ThumbList
      paramsForFetch={{type: 30}}
      type="committees"
      navigation={navigation}
    />
  </View>
);

const ThirdRoute = navigation => (
  <View style={styles.body} key="committees31">
    <ThumbList
      paramsForFetch={{type: 31}}
      type="committees"
      navigation={navigation}
    />
  </View>
);

class CommitteesScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation, screenProps}) => {
    return {
      headerLeft: (
        <Header
          onPress={() => navigation.navigate('Menu')}
          title={screenProps.translate('committees')} //committees
        />
      ),
      headerStyle: [
        theme.headerStyle,
        theme.headerShadow,
        {
          height: 58
        }
      ]
    };
  };

  render() {
    return (
      <View
        style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View>
              <View style={{backgroundColor: '#FAFAFA', paddingVertical: 14}}>
                <Tabs
                  tabTextStyle={{fontSize: 12}}
                  activeTabTextStyle={{fontSize: 12}}
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
    marginVertical: 10
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
