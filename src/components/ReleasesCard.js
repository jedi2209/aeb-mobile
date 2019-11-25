import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Linking
} from 'react-native';
import ArrowButton from '../components/ArrowButton';

import moment from 'moment/min/moment-with-locales';

class ReleasesCard extends React.Component {
  render() {
    const extraPadding = this.props.extraPadding;

    // moment.locale(this.props.locale);

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Linking.openURL(this.props.data.file);
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
            <Text style={styles.title}>{this.props.data.name}</Text>
            <Text style={styles.commit}>{this.props.data.descr}</Text>
            {this.props.data.date && (
              <Text style={styles.date}>
                {moment(this.props.data.created * 1000).format('dddd, DD MMMM')}
              </Text>
            )}
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
