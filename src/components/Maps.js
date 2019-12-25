/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MapsSvg from '../images/Maps.svg';
import { View, TouchableOpacity, Text } from 'react-native';
import { DeviceWidth } from '../core/themeProvider';
import { showLocation } from 'react-native-map-link';

class Maps extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          showLocation({
            latitude: this.props.place.coords.lat,
            longitude: this.props.place.coords.lon,
            title: this.props.place.name, // optional
            googleForceLatLon: true, // optionally force GoogleMaps to use the latlon for the query instead of the title
            alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            dialogTitle: this.props.translate('Map.Title'), // optional (default: 'Open in Maps')
            dialogMessage: this.props.place.name, // optional (default: 'What app would you like to use?')
            cancelText: this.props.translate('Button.Cancel') // optional (default: 'Cancel')
          });
        }}
        style={{
          paddingLeft: 14,
          width: '90%',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        }}
      >
        <View
          style={{
            marginTop: 7,
            width: 32
          }}
        >
          <MapsSvg />
        </View>
        <Text
          selectable={true}
          style={{
            fontSize: 14,
            color: '#FFF',
            width: DeviceWidth - 160,
            flexDirection: 'column',
            flex: 1
          }}
        >
          {this.props.place.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Maps;
