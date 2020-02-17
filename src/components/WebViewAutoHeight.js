import React, {Component} from 'react';
import {ScrollView} from 'react-native';
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

class WebViewAutoHeight extends Component {
  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <ScrollView style={{flex: 1, marginTop: 20}}>
        <HTML
          html={this.props.text}
          tagsStyles={tagsStyles}
          classesStyles={classesStyles}
          imagesMaxWidth={DeviceWidth}
        />
      </ScrollView>
    );
  }
}

export default WebViewAutoHeight;
