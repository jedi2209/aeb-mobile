import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Image} from 'react-native-elements';

const Imager = props => {
  // Standard Image
  return (
    <Image
      source={props.source}
      style={props.style}
      PlaceholderContent={<ActivityIndicator />}
    />
  );
};

export default Imager;
