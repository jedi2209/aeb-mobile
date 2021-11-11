import React from 'react';
import {ScrollView, Linking} from 'react-native';
import HTML from 'react-native-render-html';
import {DeviceWidth} from '../core/themeProvider';

const tagsStyles = {
  div: {
    fontSize: 16,
    lineHeight: 24
  },
  p: {padding: 0, marginBottom: 2},
  img: {width: DeviceWidth, maxWidth: DeviceWidth}
};

const classesStyles = {
  div: {marginBottom: 0, padding: 0},
  divider: {marginRight: 10, width: 10}
};

export default WebViewAutoHeight = ({html}) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <ScrollView style={{flex: 1, marginTop: 20}}>
      <HTML
        contentWidth={DeviceWidth}
        source={{html}}
        tagsStyles={tagsStyles}
        classesStyles={classesStyles}
        imagesMaxWidth={DeviceWidth}
        renderersProps={{
          a:{
            onPress: (evt, href) => {
              return Linking.openURL(href);
            }
          }
        }}
      />
    </ScrollView>
  );
}
