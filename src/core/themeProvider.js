import React from 'react';
import THEME from './themes.json';
import { Dimensions } from 'react-native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const theme = THEME;
export const DeviceWidth = Dimensions.get('window').width;
export const DeviceHeight = Dimensions.get('window').height;
export const HTMLStyle = `
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
`;

export const LoadingIndicator = () => {
  const LoadingStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    },
    indicator: {
      width: 50,
      height: 50
    }
  });
  return (
    <View style={[LoadingStyles.container, LoadingStyles.horizontal]}>
      <ActivityIndicator size="large" color="#0E4F9F" />
    </View>
  );
};
