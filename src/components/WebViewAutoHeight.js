import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import HTML from 'react-native-render-html';
import {DeviceWidth} from '../core/themeProvider';

const htmlStyles = `
  <style>
    body, html, #height-wrapper {
        margin: 0;
        padding: 0;
        font-size: 42px !important;
        color: #1E2432 !important;
        font-family: 'Helvetica' !important;
    }
    a, a:visited, a.hover {
        color: #0072e7;
    }
    #height-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
    table,
    th,
    td {
      border: 1px solid rgba(4,88,167,0.4);
    }
    img {
      width: auto;
      max-width: 100%;
    }
  </style>
`;

const tagsStyles = {
  p: {padding: 0, marginBottom: 2},
  // div: {display: 'flex', flex: 1, flexDirection: 'column'},
  //table: {fontSize: '12px !important', color: 'red'},
  img: {width: DeviceWidth, maxWidth: DeviceWidth}
};

const classesStyles = {
  'div': {marginBottom: 0, padding: 0},
  'divider': {marginRight: 10, width: 10}
}

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
