import * as React from 'react';
import moment from 'moment/min/moment-with-locales';

import { View, Text, StyleSheet } from 'react-native';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { DeviceWidth } from '../core/themeProvider';

const initialLayout = { width: DeviceWidth };

const Tabs = props => {
  const { tabs } = props;
  const [index, setIndex] = React.useState(0);
  const routes = [];

  tabs.forEach((item, _index) => {
    let key = 'tab' + _index;
    if (item.route) {
      routes.push({ key: key, title: item.head });
    }
  });

  const getSceneMap = () => {
    let sceneMap = {};

    tabs.map((item, _index) => {
      sceneMap['tab' + _index] = () => {
        return item.route; // some component for tab scene
      };
    });

    return sceneMap;
  };

  const _renderScene = SceneMap(getSceneMap());

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={_renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={_renderTabBar}
    />
  );
};

const _renderTabBar = props => {
  const stylesTab = StyleSheet.create({
    indicator: {
      backgroundColor: '#fff',
      height: '97%',
      borderRadius: 4
    },
    main: {
      backgroundColor: '#F1F2F6',
      height: 35,
      marginTop: 10,
      width: '96%',
      marginLeft: '2%',
      borderRadius: 4
    }
  });
  return (
    <TabBar
      {...props}
      indicatorStyle={stylesTab.indicator}
      style={stylesTab.main}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={{
            color: focused ? '#000' : '#ACB1C0',
            margin: -12,
            fontSize: 12
          }}
        >
          {route.title}
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1
  }
});

// export default class TabBar extends Component {
//     const data = this.data;
//     const extraPadding = this.props.extraPadding;

//     const initialLayout = { width: DeviceWidth };

//     const [index, setIndex] = React.useState(0);
//     const [routes_arr] = [];

//     if (data.text) {
//       routes_arr.push({ key: 'first', title: this.translate('about') });
//     }
//     if (data.attendance) {
//       routes_arr.push({
//         key: 'second',
//         title: this.translate('attendance_fees')
//       });
//     }
//     if (data.files) {
//       routes_arr.push({ key: 'third', title: this.translate('files') });
//     }

//     const [routes] = React.useState(routes_arr);

//     return (
//       // <View style={[styles.scrollViewContent]}>
//       //   <View style={{ backgroundColor: '#FAFAFA' }}>
//           <TabView
//             renderTabBar={this._renderTabBar}
//             navigationState={{ index, routes }}
//             renderScene={({ route }) => {
//               switch (route.key) {
//                 case 'first':
//                   return FirstRoute(data);
//                 case 'second':
//                   return SecondRoute(data, this.translate);
//                 case 'third':
//                   return ThirdRoute(data, extraPadding);
//               }
//             }}
//             onIndexChange={setIndex}
//             initialLayout={initialLayout}
//           />
//       //   </View>
//       // </View>
//     );
//   }

export default Tabs;
