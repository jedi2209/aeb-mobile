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
    table {
      font-size: 12px !important;
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

class WebViewAutoHeight extends Component {
  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <ScrollView style={{flex: 1}}>
        <HTML
          html={htmlStyles + this.props.text}
          imagesMaxWidth={DeviceWidth}
        />
      </ScrollView>
    );
  }
}

export default WebViewAutoHeight;
