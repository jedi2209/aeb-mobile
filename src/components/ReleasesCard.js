import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Linking
} from 'react-native';
import ArrowButton from '../components/ArrowButton';

import Moment from 'moment';

class ReleasesCard extends React.Component {
  render() {
    const extraPadding = this.props.extraPadding;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Linking.openURL(this.props.data.url);
        }}
      >
        <View
          style={[
            styles.slide,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              width: this.props.deviceWidth - 14 - this.props.BAR_SPACE,
              paddingHorizontal: 14,
              marginHorizontal: extraPadding ? extraPadding / 2 : 0,
              paddingVertical: 10,
              marginBottom: 10
            }
          ]}
        >
          <View style={{ width: this.props.deviceWidth - 64 - 35 - 14 }}>
            <Text style={styles.title}>{this.props.data.title}</Text>
            <Text style={styles.commit}>{this.props.data.commit}</Text>
            <Text style={styles.date}>
              {Moment().format('MMMM Do, YYYY H:mma')}
            </Text>
          </View>
          <ArrowButton
            style={[styles.image, { width: 60, height: 60, marginLeft: 10 }]}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 8
  },
  image: {
    borderRadius: 4
  },
  title: {
    fontSize: 17,
    color: '#000000',
    letterSpacing: 0.32,
    textAlign: 'left',
    lineHeight: 22,
    fontWeight: 'bold'
  },
  date: {
    fontSize: 15,
    color: '#8C8C8C',
    letterSpacing: 0.32,
    lineHeight: 20
  },
  commit: {
    color: '#007AFF',
    fontSize: 15
  }
});

export default ReleasesCard;
