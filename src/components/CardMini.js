import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Moment from 'moment';

class CardMini extends React.Component {
  render() {
    const extraPadding = this.props.extraPadding
      ? parseInt(this.props.extraPadding, 10)
      : 0;

    return (
      <View
        style={[
          styles.slide,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            width: this.props.deviceWidth - 14 - this.props.BAR_SPACE,
            paddingHorizontal: extraPadding ? extraPadding / 2 : 0,
            paddingTop: extraPadding ? 20 : 0
          }
        ]}
      >
        <Image
          source={{ uri: this.props.data.uri }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.image, { width: 64, height: 64, marginRight: 10 }]}
        />
        <View
          style={{
            width: this.props.deviceWidth - 64 - 10 - 15 - (extraPadding || 0)
          }}
        >
          <Text style={styles.title}>{this.props.data.title}</Text>
          <Text style={styles.date}>{Moment().format('D MMMM YYYY')}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    borderBottomColor: '#D7D8DA',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 20,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 4
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
  }
});

export default CardMini;
